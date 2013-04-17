//Server version of the player.
var Player = function(id, x, y, color){
	this.id = id;
	this.x = x;
	this.y = y;
	
	this.isAlive = true;
	this.toBeDestroy = false;
	
	this.width = PlayerConstants.WIDTH;
	this.height = PlayerConstants.HEIGHT;
	
	this.groundContact = 0;
	this.obstruction = 0;
	
	this.doubleJumpEnabled = false;
	this.doubleJumpUsed = true;
	
	this.currentBlock = BlockType.NEUTRAL;
	this.hasGivenBlock = false;
	
	//Id list of people killed by player.
	this.killedList = null;
	
	this.facing = Facing.RIGHT;
	
	this.color = color;
	this.keys = {
		right: false,
		left: false,
		jump: false
	};
	
	//Physic body.
	this.body = null;	
};

Player.prototype.kill = function(killed, blockType){

	killed.toBeDestroy = true;
	
	//Assign spawn block.
	if(blockType != BlockType.SPAWN)
	{
		this.currentBlock = BlockType.SPAWN;
		io.sockets.sockets[this.id].emit(Message.SEND_BLOCK, BlockType.SPAWN);
		this.hasGivenBlock = true;
	}
		
	if(this.killedList == null)
		this.killedList = [];
	
	this.killedList.push(killed.id);
	
	//Steal killed killeds' list to killer.
	if(killed.killedList != null)
	{
		for(var i in killed.killedList)
			this.killedList.push(killed.killedList[i]);
			
		killed.killedList = null;
	}
};

Player.prototype.spawn = function(x, y){

	//Set new position.
	this.body.setPos(new chipmunk.Vect(x, y));

	//Add physical presence.
	Game.space.addBody(this.body);
	Game.space.addShape(this.shape);
	Game.space.addShape(this.groundSensor);
	Game.space.addShape(this.dropSensor);
	
	this.isAlive = true;
	
	io.sockets.in(Game.id).emit(Message.PLAYER_SPAWNED, this.toClient());
};

Player.prototype.die = function(){

	//Remove physical presence.
	Game.space.removeShape(this.shape);
	Game.space.removeShape(this.groundSensor);
	Game.space.removeShape(this.dropSensor);
	Game.space.removeBody(this.body);
	
	this.isAlive = false;
	this.toBeDestroy = false;
	
	io.sockets.in(Game.id).emit(Message.PLAYER_KILLED, this.toClient());
};

Player.prototype.getPosition = function(){
	
	return (this.body != null ? this.body.getPos() : new chipmunk.Vect(this.x, this.y));
};

Player.prototype.update = function(){
	
	if(this.toBeDestroy)
	{	
		this.die();
		return;
	}
	
	if(this.isAlive)
	{
		this.x = this.getPosition().x;
		this.y = this.getPosition().y;
		
		var nextX = 0;
		var impulse = 0;
		
		if(this.keys.right || this.keys.left)
		{
			var factor = Math.abs(this.body.getVel().x*this.body.getVel().x*PlayerConstants.MAX_SPEED_FACTOR);
			impulse = PlayerConstants.RUN_POWER_ONGROUND * 1/(factor < 1 ? 1 : factor);
		}	
		
		//Move
		if(this.keys.right)
			nextX += impulse;
			
		if(this.keys.left)
			nextX -= impulse;
		
		if(this.groundContact > 0 && this.doubleJumpUsed)
			this.doubleJumpUsed = false;
		
		//Jump
		if(this.keys.jump && this.groundContact > 0)
		{
			this.jump();
			this.doubleJumpEnabled = false;
		}
			
		//Double jump
		if(this.keys.jump && this.groundContact == 0 && this.doubleJumpEnabled && !this.doubleJumpUsed)
			this.doubleJump();
			
		//Allow double jump.
		if(!this.keys.jump && this.groundContact == 0 && !this.doubleJumpUsed)
			this.doubleJumpEnabled = true;
		
		if(nextX != 0)
		{
			var lastFacing = this.facing;
			this.facing = (nextX > 0 ? Facing.RIGHT : Facing.LEFT);
			
			if(lastFacing != this.facing)
				this.turn();
				
			this.body.applyImpulse(new chipmunk.Vect(nextX, 0), new chipmunk.Vect(0,0));
		}
		else
		{
			//Artificial friction for players when on ground and pressing no key.
			if(this.groundContact > 0)
				this.body.setVel(new chipmunk.Vect(this.body.getVel().x*PhysicConstants.FRICTION_FACTOR_ONGROUND, this.body.getVel().y));
		}
	}
};

Player.prototype.turn = function(){
	this.body.setVel(new chipmunk.Vect(this.body.getVel().x*PhysicConstants.TURN_FRICTION_FACTOR, this.body.getVel().y));
};

Player.prototype.jump = function(){
	this.body.setVel(new chipmunk.Vect(this.body.getVel().x, 0));
	this.body.applyImpulse(new chipmunk.Vect(0, PlayerConstants.JUMP_POWER), new chipmunk.Vect(0,0));
};

Player.prototype.doubleJump = function(){
	this.jump();
	this.dropBlock();
	
	this.doubleJumpUsed = true;
	this.doubleJumpEnabled = false;
};

Player.prototype.dropBlock = function(){
	//Spawn a block if drop zone isn't obstructed.
	if(this.obstruction == 0){	
	
		//Create a block and launch it.
		var block = new Block(Game.blockSequence, 
							  this.getPosition().x, 
							  this.getPosition().y - (PlayerConstants.HEIGHT*0.5 + BlockConstants.HEIGHT*0.5) - 5, 
							  this.currentBlock, 
							  this.color,
							  this.id);
		
		Game.blocks.push(block);
		block.launch();
		
		Game.blockSequence++;		
		this.hasGivenBlock = false;
		
		//Emit the new block to all players and ask for next block of current player.
		io.sockets.in(Game.id).emit(Message.NEW_BLOCK, block.toClient());
		io.sockets.sockets[this.id].emit(Message.NEXT_BLOCK);
	}
};

//Init the physical part of the player.
Player.prototype.initBody = function(space){
	
		var groundSensorHalfWidth = PlayerConstants.WIDTH*0.33;
		var playerHalfHeight = PlayerConstants.HEIGHT*0.5;
		var groundSensorHeight = 2;
	
		//Body creation.
		this.body = Game.space.addBody(new chipmunk.Body(PhysicConstants.MASS_PLAYER, Infinity));
		this.body.setPos(new chipmunk.Vect(this.x, this.y));
							
		//Assign custom data to body.
		this.body.userdata = {
			type: UserDataType.PLAYER,
			object: this
		};
							
		//Create a shape associated with the body.
		this.shape = Game.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
		this.shape.setCollisionType(CollisionType.PLAYER);
		
		//Add ground sensor.
		this.groundSensor = Game.space.addShape(chipmunk.BoxShape2(this.body, 
															new chipmunk.BB(-(groundSensorHalfWidth), 
																			-(playerHalfHeight+groundSensorHeight), 
																			(groundSensorHalfWidth), 
																			-(playerHalfHeight))));
		this.groundSensor.setCollisionType(CollisionType.GROUND_SENSOR);
		this.groundSensor.sensor = true;
		
		//Add drop sensor to prevent double jump when drop zone is obstructed.
		this.dropSensor = Game.space.addShape(chipmunk.BoxShape2(this.body, 
															new chipmunk.BB(-(BlockConstants.WIDTH*0.5), 
																			-(playerHalfHeight+BlockConstants.HEIGHT), 
																			(BlockConstants.WIDTH*0.5), 
																			-(playerHalfHeight))));
																	
		this.dropSensor.setCollisionType(CollisionType.DROP_SENSOR);
		this.dropSensor.sensor = true;
	};

//Format for client.
Player.prototype.toClient = function(){
	return {
		x: this.getPosition().x,
		y: this.getPosition().y,
		color: this.color
	};
};