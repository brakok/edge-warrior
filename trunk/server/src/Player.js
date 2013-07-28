//Server version of the player.
var Player = function(id, x, y, color){
	this.id = id;
	this.x = x;
	this.y = y;
		
	this.killTime = 0;	
	this.stepReached = Enum.StepReached.NONE;
	
	this.isAlive = true;
	this.toBeDestroy = false;
	this.hasWon = false;
	this.isRemoved = false;
	
	//Timer indicating how long a player may keep a spawn block in his inventory.
	this.spawnTimer = Constants.Block.Restriction.SPAWN_TIMER;
	
	this.width = Constants.Player.WIDTH;
	this.height = Constants.Player.HEIGHT;
	
	this.groundContact = 0;
	
	//Used to prevent player to drop a block if obstructed.
	this.obstruction = 0;
	
	this.doubleJumpEnabled = false;
	this.doubleJumpUsed = true;
	this.jumpCooldown = Constants.Player.JUMP_COOLDOWN;
	
	this.currentBlock = Enum.Block.Type.NEUTRAL;
	this.hasGivenBlock = false;
	
	//Killer's id.
	this.killerId = null;
	
	this.facing = Enum.Facing.LEFT;
	this.currentAction = Enum.Action.Type.STANDING;
	
	this.color = color;
	this.keys = {
		right: false,
		left: false,
		jump: false
	};
	
	//Physic body.
	this.body = null;	
};

Player.prototype.kill = function(killed, blockType, mustStealList){

	killed.toBeDestroy = true;
	
	//Assign spawn block.
	if(blockType != Enum.Block.Type.SPAWN)
	{
		this.currentBlock = Enum.Block.Type.SPAWN;
		io.sockets.sockets[this.id].emit(Constants.Message.SEND_BLOCK, Enum.Block.Type.SPAWN);
		this.hasGivenBlock = true;
	}
		
	killed.killerId = this.id;
		
	//Steal killed killeds' list to killer.
	if(mustStealList == null || mustStealList)
	{
		for(var i in Game.players)
		{
			if(Game.players[i].killerId == killed.id)
				Game.players[i].killerId = this.id;
		}
	}
	
	//Swap killer colored blocks to killed complementary one.
	for(var i in Game.blocks)
	{
		if(Game.blocks[i] != null 
		   && Game.blocks[i].type != Enum.Block.Type.NEUTRAL 
		   && Game.blocks[i].color == this.color)
	    {
			Game.blocks[i].color = killed.color + 4; //Color + 4 = complementary one.
		}
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
	this.killerId = null;
	this.isRemoved = false;
	
	io.sockets.in(Game.id).emit(Constants.Message.PLAYER_SPAWNED, this.toClient());
};

Player.prototype.win = function(){
	
	//Remove physical presence.
	Game.space.removeShape(this.shape);
	Game.space.removeShape(this.groundSensor);
	Game.space.removeShape(this.dropSensor);
	Game.space.removeBody(this.body);
	
	this.isRemoved = true;
	io.sockets.in(Game.id).emit(Constants.Message.AT_GOAL, this.toClient());
};

Player.prototype.die = function(){

	//Remove physical presence.
	Game.space.removeShape(this.shape);
	Game.space.removeShape(this.groundSensor);
	Game.space.removeShape(this.dropSensor);
	Game.space.removeBody(this.body);
	
	this.isAlive = false;
	this.toBeDestroy = false;
	this.isRemoved = true;
	this.hasGivenBlock = false;
		
	this.stepReached = 0;
	this.killTime = 0;
	this.groundContact = 0;
	
	var killer = null;
	
	for(var i in Game.players)
		if(Game.players[i].id == this.killerId)
		{
			killer = Game.players[i];
			break;
		}
	
	var data = {
		killed : this.toClient(),
		killer : killer.toClient()
	};
	
	io.sockets.in(Game.id).emit(Constants.Message.PLAYER_KILLED, data);
	
	//Ask for the next block if player is currently holding a spawn block.
	if(this.currentBlock == Enum.Block.Type.SPAWN)
		io.sockets.sockets[this.id].emit(Constants.Message.NEXT_BLOCK);
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
	if(this.hasWon && !this.isRemoved)
		this.win();
	
	//Control goal for winner phase.
	if(this.hasWon)
		Game.goal.update(this.keys);
	
	if(this.isAlive && !this.hasWon)
	{
		this.x = this.getPosition().x;
		this.y = this.getPosition().y;
		
		var nextX = 0;
		var impulse = 0;
		
		if(this.keys.right || this.keys.left)
		{
			var velX = Math.abs(this.body.getVel().x);
			var factor = 1;
			
			if(velX > Constants.Player.MAX_VELOCITY)
				factor *= Constants.Player.MAX_SPEED_FACTOR;
				
			//Reduce impulse if velocity is above a specified limit.
			if(velX > Constants.Player.SPEED_LOWER_LIMIT)
				factor /= velX*Constants.Player.VELOCITY_FACTOR;
				
			impulse = Constants.Player.RUN_POWER_ONGROUND * factor;
		}	
		
		//Move
		if(this.keys.right)
			nextX += impulse;
			
		if(this.keys.left)
			nextX -= impulse;
		
		if(this.groundContact > 0 && this.doubleJumpUsed)
			this.doubleJumpUsed = false;
		
		//Look if player is falling.
		if(this.groundContact == 0 && this.currentAction != Enum.Action.Type.FALLING && this.currentAction != Enum.Action.Type.NONE && this.jumpCooldown <= 0)
		{
			if(this.currentAction == Enum.Action.Type.RUNNING || this.currentAction == Enum.Action.Type.STANDING)
				this.execute(Enum.Action.Type.FALLING);
			else
				this.currentAction = Enum.Action.Type.NONE;
		}
		
		//Jump
		if(this.keys.jump && this.groundContact > 0)
		{
			this.jump(false);
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
			this.facing = (nextX > 0 ? Enum.Facing.RIGHT : Enum.Facing.LEFT);
			
			if(lastFacing != this.facing)
				this.turn();
				
			this.body.applyImpulse(new chipmunk.Vect(nextX, 0), new chipmunk.Vect(0,0));
			
			//Switch current action to running if player is on the ground.
			if(this.groundContact > 0 && this.currentAction != Enum.Action.Type.RUNNING && this.currentAction != Enum.Action.Type.JUMPING)
				this.execute(Enum.Action.Type.RUNNING);	
		}
		else
		{
			//Artificial friction for players when on ground and pressing no key.
			if(this.groundContact > 0)
			{
				this.body.setVel(new chipmunk.Vect(this.body.getVel().x*Constants.Physic.FRICTION_FACTOR_ONGROUND, this.body.getVel().y));
				
				if(this.currentAction != Enum.Action.Type.STANDING && this.currentAction != Enum.Action.Type.JUMPING)
					this.execute(Enum.Action.Type.STANDING);					
				
				//Calculate standing time to a limit of 1 min.
				if(this.isAlive)
				{
					var addTime = false;
					var sendMessage = false;
				
					if(this.killTime < Constants.KillCommand.Time.FIRST_STEP)
						addTime = true;
				
					//Standing phase.
					if(this.killTime == 0)
					{
						sendMessage = true;
						this.stepReached = Enum.StepReached.STANDING;
					}
									
					//Assign to a player phase.
					if(this.killTime >= Constants.KillCommand.Time.FIRST_STEP && this.keys.kill)
					{
						addTime = true;
						
						if(this.stepReached < Enum.StepReached.PLAYER)
						{
							sendMessage = true;
							this.stepReached = Enum.StepReached.PLAYER;
						}
					}
					
					//Assign to the overlord phase.
					if(this.killTime >= Constants.KillCommand.Time.SECOND_STEP && this.keys.kill && this.stepReached < Enum.StepReached.OVERLORD)
						this.stepReached = Enum.StepReached.OVERLORD;
				
					if(sendMessage)
						io.sockets.sockets[this.id].emit(Constants.Message.KILL_COMMAND, this.stepReached);
				
					if(addTime)
						this.killTime += Constants.Physic.TIME_STEP*0.5;	
				}	
			}
		}
		
		//Reset kill command timer.
		if(this.killTime > 0 && (nextX != 0 || this.keys.jump))
		{
			this.killTime = 0;
			this.stepReached = 0;
			
			io.sockets.sockets[this.id].emit(Constants.Message.KILL_COMMAND, Enum.StepReached.NONE);
		}	
		
		if(this.jumpCooldown > 0)
			this.jumpCooldown -= Constants.Physic.TIME_STEP*0.5;
	}
	
	//Manage kill command.
	if(this.stepReached > Enum.StepReached.STANDING && (!this.keys.kill || this.stepReached == Enum.StepReached.OVERLORD))
	{	
		switch(this.stepReached)
		{
			case Enum.StepReached.PLAYER:
				Overlord.assignKill(this);
				break;
			case Enum.StepReached.OVERLORD:
				Overlord.kill(this, null);
				break;
		}
	}
	
	//Check timers related to player and trigger actions associated.
	this.checkTimers();
};

Player.prototype.checkTimers = function(){

	//Prevent player to keep a spawn block (kill him and drop spawn block). 
	if(this.currentBlock == Enum.Block.Type.SPAWN && this.isAlive)
	{
		this.spawnTimer -= Constants.Physic.TIME_STEP*0.5;
		
		if(this.spawnTimer < 0)
		{
			var hasLivingPlayer = false;
			
			for(var i in Game.players)
				if(Game.players[i].isAlive && Game.players[i].id != this.id)
				{
					hasLivingPlayer = true;
					break;
				}
					
			if(hasLivingPlayer)
				this.dropBlock(this.body.getPos().x, this.body.getPos().y, false);
			
			//Assign kill to a random player.
			Overlord.assignKill(this, hasLivingPlayer);
		}
	}
	else
	{
		if(this.spawnTimer < Constants.Block.Restriction.SPAWN_TIMER)
			this.spawnTimer = Constants.Block.Restriction.SPAWN_TIMER;
	}
	
};

Player.prototype.turn = function(){
	this.body.setVel(new chipmunk.Vect(this.body.getVel().x*Constants.Physic.TURN_FRICTION_FACTOR, this.body.getVel().y));
};

Player.prototype.jump = function(isDoubleJumping){

	if(this.jumpCooldown <= 0)
	{
		this.jumpCooldown = Constants.Player.JUMP_COOLDOWN;
		
		if(!isDoubleJumping)
			this.execute(Enum.Action.Type.JUMPING);
		
		this.body.setVel(new chipmunk.Vect(this.body.getVel().x, 0));
		this.body.applyImpulse(new chipmunk.Vect(0, Constants.Player.JUMP_POWER), new chipmunk.Vect(0,0));
	}
	
};

Player.prototype.doubleJump = function(){

	if(this.jumpCooldown <= 0)
	{
		this.jump(true);
		this.dropBlock();

		this.execute(Enum.Action.Type.DOUBLE_JUMPING);
		this.doubleJumpUsed = true;
		this.doubleJumpEnabled = false;
	}
};

Player.prototype.dropBlock = function(x, y, checkDropzone){

	//Spawn a block if drop zone isn't obstructed.
	if(this.obstruction == 0 || (checkDropzone != null && !checkDropzone)){	

		var tmpX = (x != null ? x : this.getPosition().x);
		var tmpY = (y != null ? y : this.getPosition().y - (Constants.Player.HEIGHT*0.5 + Constants.Block.HEIGHT*0.5) - 5);
	
		//Create a block and launch it.
		BlockManager.launch(new Block(Game.blockSequence, 
									  tmpX, 
									  tmpY, 
									  this.currentBlock, 
									  this.color,
									  this.id));
		
		this.hasGivenBlock = false;
		
		//Ask for next block of current player.
		io.sockets.sockets[this.id].emit(Constants.Message.NEXT_BLOCK);
	}
};

//Init the physical part of the player.
Player.prototype.initBody = function(space){
	
	var groundSensorHalfWidth = Constants.Player.WIDTH*0.33;
	var playerHalfHeight = Constants.Player.HEIGHT*0.5;
	var groundSensorHeight = 2;

	//Body creation.
	this.body = Game.space.addBody(new chipmunk.Body(Constants.Physic.MASS_PLAYER, Infinity));
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
						
	//Assign custom data to body.
	this.body.userdata = {
		type: Enum.UserData.Type.PLAYER,
		object: this
	};
						
	//Create a shape associated with the body.
	this.shape = Game.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.shape.setCollisionType(Enum.Collision.Type.PLAYER);
		
	//Add ground sensor.
	this.groundSensor = Game.space.addShape(chipmunk.BoxShape2(this.body, 
																new chipmunk.BB(-(groundSensorHalfWidth), 
																				-(playerHalfHeight+groundSensorHeight), 
																				(groundSensorHalfWidth), 
																				-(playerHalfHeight))));
	this.groundSensor.setCollisionType(Enum.Collision.Type.GROUND_SENSOR);
	this.groundSensor.sensor = true;
	
	//Add drop sensor to prevent double jump when drop zone is obstructed.
	this.dropSensor = Game.space.addShape(chipmunk.BoxShape2(this.body,
															new chipmunk.BB(-(Constants.Block.WIDTH*0.33), 
																			-(playerHalfHeight+(Constants.Block.HEIGHT*0.75)), 
																			(Constants.Block.WIDTH*0.33), 
																			-(playerHalfHeight))));
																
	this.dropSensor.setCollisionType(Enum.Collision.Type.DROP_SENSOR);
	this.dropSensor.sensor = true;
};

Player.prototype.execute = function(action){
	this.currentAction = action;
	
	var data = {
		action: action,
		playerColor: this.color
	};
	
	io.sockets.in(Game.id).emit(Constants.Message.PLAYER_ACTION, data);
};
	
//Format for client.
Player.prototype.toClient = function(){
	return {
		x: this.getPosition().x,
		y: this.getPosition().y,
		color: this.color,
		facing: this.facing
	};
};