//Server version of the player.
var Player = function(id, username, x, y, color, game){

	this.currentGame = game;
	this.username = username;
	
	this.id = id;
	this.x = x;
	this.y = y;
		
	this.mass = Constants.Physic.MASS_PLAYER;
	
	this.pickAxeCount = 0;
	this.pickAxeTimer = Constants.Player.PickAxe.TIMER + Constants.Warmup.PHASE_TIME;
	this.pickAxePressed = false;
		
	this.stunTimer = 0;
	this.stuckTimer = 0;
	
	//Timer that prevents player to land on each others.
	this.noGroundTimer = 0;
	this.playerContact = 0;
	
	this.isStuck = false;
		
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
	
	this.currentBlock = {
		type: Enum.Block.Type.NEUTRAL,
		skill: null
	};
	
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
	if(this.currentBlock.type != Enum.Block.Type.SPAWN && blockType != Enum.Block.Type.SPAWN && (!this.currentGame.winner || this.currentGame.winner.id != this.id))
	{	
		this.currentBlock = {
			type: Enum.Block.Type.SPAWN,
			skill: null
		};
		
		io.sockets.sockets[this.id].emit(Constants.Message.SEND_BLOCK, 
										{
											type: Enum.Block.Type.SPAWN,
											skill: null
										});
		this.hasGivenBlock = true;
	}
		
	killed.killerId = this.id;
		
	//Steal killed killeds' list to killer.
	if(mustStealList == null || mustStealList)
	{
		for(var i in this.currentGame.players)
		{
			if(this.currentGame.players[i].killerId == killed.id)
				this.currentGame.players[i].killerId = this.id;
		}
	}
	
	//Swap killer colored blocks to killed complementary one.
	for(var i in this.currentGame.blocks)
	{
		if(this.currentGame.blocks[i] != null 
		   && this.currentGame.blocks[i].type == Enum.Block.Type.COLORED 
		   && this.currentGame.blocks[i].color == this.color)
	    {
			this.currentGame.blocks[i].color = killed.color + 4; //Color + 4 = complementary one.
			this.currentGame.blocks[i].needPush = true;
		}
	}
};

Player.prototype.spawn = function(x, y){

	//Set new position.
	this.body.setPos(new chipmunk.Vect(x, y));

	//Add physical presence.
	this.currentGame.space.addBody(this.body);
	this.currentGame.space.addShape(this.shape);
	this.currentGame.space.addShape(this.groundSensor);
	this.currentGame.space.addShape(this.dropSensor);
	
	this.isAlive = true;
	this.killerId = null;
	this.isRemoved = false;
	
	this.stunTimer = Constants.Spawn.STUN_TIMER;
	this.noGroundTimer = Constants.Spawn.NO_GROUND_FROM_PLAYER_TIMER;
	
	io.sockets.in(this.currentGame.id).emit(Constants.Message.PLAYER_SPAWNED, this.toClient());
};

Player.prototype.win = function(){
	
	//Remove physical presence.
	this.currentGame.space.removeShape(this.shape);
	this.currentGame.space.removeShape(this.groundSensor);
	this.currentGame.space.removeShape(this.dropSensor);
	this.currentGame.space.removeBody(this.body);
	
	this.isRemoved = true;
	io.sockets.in(this.currentGame.id).emit(Constants.Message.AT_GOAL, this.toClient());
};

Player.prototype.die = function(){

	//Remove physical presence.
	this.currentGame.space.removeShape(this.shape);
	this.currentGame.space.removeShape(this.groundSensor);
	this.currentGame.space.removeShape(this.dropSensor);
	this.currentGame.space.removeBody(this.body);
	
	this.isAlive = false;
	this.toBeDestroy = false;
	this.isRemoved = true;
	this.hasGivenBlock = false;
		
	this.groundContact = 0;
	this.stuckTimer = 0;
	this.stunTimer = 0;
	
	var killer = null;
	
	if(this.killerId != null)
	{
		//A player can't be is killer. Overlord needs to handle this.
		if(this.killerId == this.id)
			this.killerId = null;
		else
		{
			for(var i in this.currentGame.players)
				if(i == this.killerId)
				{
					killer = this.currentGame.players[i];
					break;
				}
		}
	}
	
	var data = {
		killed : this.toClient(),
		killer : (killer != null ? killer.toClient() : null)
	};
	
	io.sockets.in(this.currentGame.id).emit(Constants.Message.PLAYER_KILLED, data);
	
	//Ask for the next block if player is currently holding a spawn block.
	if(this.currentBlock.type == Enum.Block.Type.SPAWN)
	{
		this.hasGivenBlock = false;
		io.sockets.sockets[this.id].emit(Constants.Message.NEXT_BLOCK);
	}
};

//Leave current game.
Player.prototype.leave = function(){
	
	if(this.isAlive && !this.isRemoved)
	{
		//Drop spawn block if hold.
		if(this.currentBlock.type == Enum.Block.Type.SPAWN && this.isAlive)
			this.dropBlock(this.body.getPos().x, this.body.getPos().y, false);
	
		//Remove physical presence.
		this.currentGame.space.removeShape(this.shape);
		this.currentGame.space.removeShape(this.groundSensor);
		this.currentGame.space.removeShape(this.dropSensor);
		this.currentGame.space.removeBody(this.body);
		
		this.isRemoved = true;
		this.isAlive = false;
	}
};

Player.prototype.getPosition = function(){
	
	return (this.body != null ? this.body.getPos() : new chipmunk.Vect(this.x, this.y));
};

Player.prototype.update = function(){
	
	//Can't allow a player from falling down the map.
	if(this.y < 0)
		this.toBeDestroy = true;
	
	if(this.toBeDestroy)
	{	
		this.die();
		return;
	}
	if(this.hasWon && !this.isRemoved)
		this.win();
	
	//Control goal for winner phase.
	if(this.hasWon)
		this.currentGame.goal.update(this.keys);
	
	if(this.isAlive && !this.hasWon)
	{
		this.x = this.getPosition().x;
		this.y = this.getPosition().y;
		
		var nextX = 0;

		//Add pick axe.
		if(this.pickAxeCount < Constants.Player.PickAxe.LIMIT)
		{
			this.pickAxeTimer -= this.currentGame.dt;
			
			if(this.pickAxeTimer <= 0)
			{
				this.pickAxeCount++;
				this.pickAxeTimer = Constants.Player.PickAxe.TIMER;
			}
		}
		
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
		
		//If not stunned.
		if(this.stunTimer <= 0 && this.stuckTimer <= 0)
		{
			var impulse = 0;
		
			if(this.keys.right || this.keys.left)
			{
				var velX = Math.abs(this.body.getVel().x);
				var factor = 1-((this.keys.right && this.body.getVel().x < 0) || (this.keys.left && this.body.getVel().x > 0) ? Constants.Player.WRONG_SIDE_MINUS_FACTOR 
																															  : (velX/Constants.Player.MAX_SPEED_FACTOR));
					
				impulse = Constants.Player.RUN_POWER_ONGROUND * factor;
			}
			
			//Move
			if(this.keys.right)
				nextX += impulse;
				
			if(this.keys.left)
				nextX -= impulse;
		
			//Throw pickaxe.
			if(this.keys.dig && !this.pickAxePressed && this.pickAxeCount > 0)
			{
				this.throwPickAxe();
				this.pickAxePressed = true;
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
		}
			
		if(!this.keys.dig && this.pickAxePressed)
			this.pickAxePressed = false;
			
		//Allow double jump.
		if(!this.keys.jump && this.groundContact == 0 && !this.doubleJumpUsed)
			this.doubleJumpEnabled = true;
				
		if(this.stuckTimer <= 0)
		{
			if(this.isStuck)
				this.unstuck();
		
			if(nextX != 0)
			{
				var lastFacing = this.facing;
				
				//Turn only if one of movement keys is pressed.
				if((this.keys.right && !this.keys.left) || (!this.keys.right && this.keys.left))
				{
					this.facing = (this.keys.right ? Enum.Facing.RIGHT : Enum.Facing.LEFT);
					
					if(lastFacing != this.facing)
						this.turn();
				}

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
					
					//Stand if no movement keys are pressed.
					if(this.currentAction != Enum.Action.Type.STANDING && this.currentAction != Enum.Action.Type.JUMPING && this.keys.right == this.keys.left)
						this.execute(Enum.Action.Type.STANDING);					
				}
			}
		}
		else
		{		
			//Stand if no movement keys are pressed.
			if(this.groundContact > 0 && this.currentAction != Enum.Action.Type.STANDING && this.currentAction != Enum.Action.Type.JUMPING)
				this.execute(Enum.Action.Type.STANDING);

			this.body.setVel(new chipmunk.Vect(0, 0));	
		}
	}
	
	if(this.jumpCooldown > 0)
		this.jumpCooldown -= this.currentGame.dt;
	
	//Reduce stun timer.
	if(this.stunTimer > 0)
		this.stunTimer -= this.currentGame.dt;
		
	//Reduce stuck timer.
	if(this.stuckTimer > 0)
		this.stuckTimer -= this.currentGame.dt;
		
	//Reduce no ground timer.
	if(this.noGroundTimer > 0 && this.playerContact <= 0)
		this.noGroundTimer -= this.currentGame.dt;
		
	//Check timers related to player and trigger actions associated.
	if(!this.hasWon)
		this.checkTimers();
};

Player.prototype.throwPickAxe = function(){

	//Launch pickaxe.
	this.currentGame.managers.DeathZoneManager.launch(new Missile(this,
																  null,
																  Enum.DeathZone.Type.PICK_AXE,
																  this.x + Constants.Player.PickAxe.OFFSET_X*(this.facing == Enum.Facing.RIGHT ? 1 : -1), 
																  this.y + Constants.Player.PickAxe.OFFSET_Y, 
																  Constants.Player.PickAxe.VEL_X*(this.facing == Enum.Facing.RIGHT ? 1 : -1),
																  Constants.Player.PickAxe.VEL_Y,
																  Constants.Player.PickAxe.DISTANCE,
																  Constants.Player.PickAxe.WIDTH, 
																  Constants.Player.PickAxe.HEIGHT,
																  this.currentGame));
	
	this.pickAxeCount--;
};

Player.prototype.checkTimers = function(){

	//Prevent player to keep a spawn block (kill him and drop spawn block). 
	if(this.currentBlock.type == Enum.Block.Type.SPAWN && this.isAlive)
	{
		this.spawnTimer -= this.currentGame.dt;
		
		if(this.spawnTimer < 0)
		{
			var hasLivingPlayer = false;
			
			for(var i in this.currentGame.players)
				if(this.currentGame.players[i].isAlive && this.currentGame.players[i].id != this.id)
				{
					hasLivingPlayer = true;
					break;
				}
			
			if(hasLivingPlayer)
				this.dropBlock(this.body.getPos().x, this.body.getPos().y, false);
			else
			{
				this.hasGivenBlock = false;
				io.sockets.sockets[this.id].emit(Constants.Message.NEXT_BLOCK);
			}
			
			//Assign kill to a random player.
			this.currentGame.overlord.assignKill(this, hasLivingPlayer);
		}
	}
	else
	{
		if(this.spawnTimer < Constants.Block.Restriction.SPAWN_TIMER)
			this.spawnTimer = Constants.Block.Restriction.SPAWN_TIMER;
	}
	
};

Player.prototype.turn = function(){
	//Nothing.
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

	//minor adjust from smoothering.
	var tmpX = (x != null ? x : this.getPosition().x);
	var tmpY = (y != null ? y : this.getPosition().y - (Constants.Player.HEIGHT*0.5 + Constants.Block.HEIGHT*0.5) - 5);

	//Spawn a block if drop zone isn't obstructed.
	if((this.obstruction == 0 || (checkDropzone != null && !checkDropzone)) 
		&& this.y < this.currentGame.world.goalStartPosition + Constants.Game.OFFSET_Y_ALLOWED_FOR_PLAYERS)
	{
		//Create a block and launch it.
		this.currentGame.managers.BlockManager.launch(new Block(tmpX, 
															  tmpY, 
															  this.currentBlock.type, 
															  this.color,
															  this,
															  this.currentGame,
															  this.currentBlock.skill));
		
		this.hasGivenBlock = false;
		
		//Ask for next block of current player.
		io.sockets.sockets[this.id].emit(Constants.Message.NEXT_BLOCK);
	}
	else
	{
		//If player can't drop a block, create effect.
		var data = {
			x: tmpX,
			y: tmpY,
			type: Enum.Element.Type.CANCEL_DROP
		};
		
		io.sockets.in(this.currentGame.id).emit(Constants.Message.NEW_ELEMENT, data);
	}
};

Player.prototype.changeMass = function(factor){
	this.mass *= factor;
	this.body.setMass(this.mass);
};

//Init the physical part of the player.
Player.prototype.initBody = function(){
	
	var groundSensorHalfWidth = Constants.Player.WIDTH*0.25;
	var playerHalfHeight = Constants.Player.HEIGHT*0.5;
	var groundSensorHeight = 2;

	//Body creation.
	this.body = this.currentGame.space.addBody(new chipmunk.Body(this.mass, Infinity));
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
						
	//Assign custom data to body.
	this.body.userdata = {
		type: Enum.UserData.Type.PLAYER,
		object: this
	};
						
	//Create a shape associated with the body.
	this.shape = this.currentGame.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.shape.setCollisionType(Enum.Collision.Type.PLAYER);
		
	//Add ground sensor.
	this.groundSensor = this.currentGame.space.addShape(chipmunk.BoxShape2(this.body, 
																new chipmunk.BB(-(groundSensorHalfWidth), 
																				-(playerHalfHeight+groundSensorHeight), 
																				(groundSensorHalfWidth), 
																				-(playerHalfHeight))));
	this.groundSensor.setCollisionType(Enum.Collision.Type.GROUND_SENSOR);
	this.groundSensor.sensor = true;
	
	//Add drop sensor to prevent double jump when drop zone is obstructed.
	this.dropSensor = this.currentGame.space.addShape(chipmunk.BoxShape2(this.body,
															new chipmunk.BB(-(Constants.Block.WIDTH*0.4), 
																			-(playerHalfHeight+(Constants.Block.HEIGHT*0.9)), 
																			(Constants.Block.WIDTH*0.4), 
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
	
	io.sockets.in(this.currentGame.id).emit(Constants.Message.PLAYER_ACTION, data);
};

Player.prototype.stuck = function(time){
	this.stuckTimer = time;
	
	if(!this.isStuck)
	{
		this.isStuck = true;
		this.changeMass(Constants.Player.STUCK_MASS_FACTOR);
	}
};

Player.prototype.unstuck = function(){
	this.stuckTimer = 0;
	
	if(this.isStuck)
	{
		this.isStuck = false;
		this.changeMass(1/Constants.Player.STUCK_MASS_FACTOR);
	}
};

//Format for client.
Player.prototype.toClient = function(){
	return {
		x: this.getPosition().x,
		y: this.getPosition().y,
		color: this.color,
		facing: this.facing,
		pickAxeCount: this.pickAxeCount,
		stuckTimer: this.stuckTimer,
		stunTimer: this.stunTimer
	};
};