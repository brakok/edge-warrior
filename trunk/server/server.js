//Enums
var Enum = {
	Color: {
		RED: 0,
		BLUE: 1,
		YELLOW: 2,
		WHITE: 3,
		GREEN: 4,
		ORANGE: 5,
		PURPLE: 6,
		BLACK: 7
	},
	UserData: {
		Type: {
			PLAYER: 0,
			BLOCK: 1,
			WINNING_GOAL: 2,
			RAYBALL: 3,
			ENERGY_SPIKE: 4
		}
	},
	Block: {
		Type: {
			NEUTRAL: 0,
			COLORED: 1,
			SPAWN: 2,
			SKILLED: 3
		},
		State: {
			STATIC: 0,
			DYNAMIC: 1
		},
		Destruction: {
			COLOR_CONTACT: 0,
			SPAWN: 1,
			CRUSHED: 2
		}
	},
	Collision: {
		Type: {
			STATIC: 0,
			PLAYER: 1,
			GROUND_SENSOR: 2,
			BLOCK: 3,
			DROP_SENSOR: 4,
			WINNING_GOAL: 5,
			DEATH_ZONE: 6
		}
	},
	Facing: {
		RIGHT:  0,
		LEFT: 1
	},
	StepReached: {
		NONE: 0,
		STANDING: 1,
		PLAYER: 2,
		OVERLORD: 3
	},
	Direction: {
		UP: 0,
		LEFT: 1,
		DOWN: 2,
		RIGHT: 3
	},
	Action: {
		Type: {
			NONE: -1,
			STANDING: 0,
			RUNNING: 1,
			JUMPING: 2,
			FALLING: 3,
			DOUBLE_JUMPING: 4,
			SUMMONING: 5,
			LANDING: 6
		}
	},
	DeathZone: {
		Type: {
			RAYBALL: 0,
			ENERGY_SPIKE: 1
		}
	},
	WinningGoal: {
		Type: {
			FLOATING_BALL: 1
		}
	}
};

//Constants
var Constants = {
	Game: {
		MAX_PLAYERS: 4
	},
	Physic: {
		GRAVITY: -150,
		FRICTION: 0.97,
		MASS_PLAYER: 10,
		MASS_BLOCK: 999999,
		MASS_BLOCK_STATIC: 999999999999,
		TIME_STEP: 1/60,
		FRICTION_FACTOR_ONGROUND: 0.85,
		TURN_FRICTION_FACTOR: 0.05
	},
	Spawn: {
		Limit: {
		OFFSET: 150
		}
	},
	Player: {
		INITIAL_SPAWN_Y: 100,
		JUMP_COOLDOWN: 0.1,
		JUMP_POWER: 1350,
		RUN_POWER_ONGROUND: 650,
		RUN_POWER_OFFGROUND: 15,
		WIDTH: 30,
		HEIGHT: 50,
		MAX_SPEED_FACTOR: 0.0000001,
		MAX_VELOCITY: 175,
		VELOCITY_FACTOR: 0.4,
		SPEED_LOWER_LIMIT: 100
	},
	Block: {
		WIDTH: 80,
		HEIGHT: 30,
		LAUNCHING_SPEED: -500,
		SPAWN_MAXLAUNCHING_Y: 500,
		SPAWN_MAXLAUNCHING_X: 500,
		Restriction: {
			SPAWN_TIMER: 6
		}
	},
	WinningGoal: {
		OFFSET_Y: 100,
		PHASE_TIME: 8,
		FloatingBall: {
			WIDTH: 90,
			HEIGHT: 90,
			SPEED: 1,
			MAX_SPEED: 12,
			FRICTION_FACTOR: 0.98,
			ORBIT_RADIUS: 20,
			ORBIT_SPEED: 0.05,
			STUCK_TIME: 0.4,
			TURN_FRICTION_FACTOR: 0.95
		}
	},
	DeathZone: {
		Rayball: {
			SPEED: 50,
			WIDTH: 45,
			HEIGHT: 45,
			COOLDOWN: 0.5
		},
		EnergySpike: {
			SPEED: 4,
			WIDTH: 30,
			COOLDOWN: 1,
			IMPULSE_X: 10000,
			IMPULSE_Y: 300
		}
	},
	KillCommand: {
		Time: {
			FIRST_STEP: 5,
			SECOND_STEP: 10
		}
	},
	Message: {
		NEXT_BLOCK: 'nextBlock',
		NEW_BLOCK: 'newBlock',
		SEND_BLOCK: 'sendBlock',
		DELETE_BLOCK: 'deleteBlock',
		PULL: 'pull',
		PUSH: 'push',
		INIT: 'init',
		CONNECTING: 'connecting',
		CONNECTION: 'connection',
		NEW_PLAYER: 'newPlayer',
		PLAYER_KILLED: 'playerKilled',
		PLAYER_SPAWNED: 'playerSpawned',
		LAUNCH: 'launch',
		KILL_COMMAND: 'killCommand',
		AT_GOAL: 'atGoal',
		WIN: 'win',
		DELETE_DEATHZONE: 'deleteDeathZone',
		NEW_DEATHZONE: 'newDeathZone',
		GOAL_ACTION: 'goalAction',
		PLAYER_ACTION: 'playerAction',
		BLOCK_ACTION: 'blockAction',
		CREATE_LOBBY: 'createLobby',
		JOIN_LOBBY: 'joinLobby',
		DISCONNECT_LOBBY: 'disconnectLobby',
		GAME_CREATED: 'gameCreated',
		PLAYER_READY: 'playerReady'
	}
};//Mortal things listener.
var DeathZoneListener = {
	begin: function(arbiter, space){
	
		var player = null;
		var block = null;
		var deathZone = null;
		
		if(arbiter.body_a.userdata != null)
		{
			if(arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
				player = arbiter.body_a.userdata.object;
			else if(arbiter.body_a.userdata.type == Enum.UserData.Type.BLOCK)
				block = arbiter.body_a.userdata.object;
			else	
				deathZone = arbiter.body_a.userdata.object;
		}	
		if(arbiter.body_b.userdata != null)
		{
			if(arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
				player = arbiter.body_b.userdata.object;
			else if(arbiter.body_b.userdata.type == Enum.UserData.Type.BLOCK)
				block = arbiter.body_b.userdata.object;
			else	
				deathZone = arbiter.body_b.userdata.object;
		}	
		
		if(player != null)
		{
			if(deathZone != null)
			{
				//Find killing player.
				var killingPlayer = null;
				
				for(var i in Game.players)
				{
					if(Game.players[i].id == deathZone.ownerId)
						killingPlayer = Game.players[i];
				}

				//If found, mark the player to be inserted in the next update in the killer blocks list.
				if(killingPlayer != null)
					killingPlayer.kill(player, deathZone.stats.type);
				else
					player.toBeDestroy = true;
			}
			else
				player.toBeDestroy = true;
		}
			
		if(block != null)
			block.markToDestroy(Enum.Block.Destruction.CRUSHED);
	}
};


//Goal listener.
var GoalListener = {
	begin: function(arbiter, space){
		var player = null;
		
		if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_a.userdata.object;

		if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_b.userdata.object;
			
		if(Game.winner == null)
			Game.electWinner(player);
		else
			player.toBeDestroy = true;
	}
};


//Drop listener.
var DropListener = {
	begin: function(arbiter, space){
		var player = null;
		
		if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_a.userdata.object;

		if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_b.userdata.object;
		
		if(player != null){
			player.obstruction++;
		}
	},
	separate: function(arbiter, space){
		var player = null;
		
		if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_a.userdata.object;

		if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_b.userdata.object;
		
		if(player != null){
			player.obstruction--;
		}
	}
};

//Ground listener.
var GroundListener = {
	begin: function(arbiter, space){
		var player = null;
		var sensorIsB = arbiter.b.sensor;
		
		if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_a.userdata.object;

		//Allow player to jump on other.
		if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER && (player == null || sensorIsB))
			player = arbiter.body_b.userdata.object;
		
		if(player != null){
			player.groundContact++;
		}
	},
	separate: function(arbiter, space){
		var player = null;
		var sensorIsB = arbiter.b.sensor;
		
		if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_a.userdata.object;

		//Allow player to jump on other.
		if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER && (player == null || sensorIsB))
			player = arbiter.body_b.userdata.object;
			
		if(player != null){
			player.groundContact--;
			return;
		}
	}
};

//Block listener.
var BlockListener = {
	begin: function(arbiter, space){
		
		var block1 = null;
		var block2 = null;
				
		if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.BLOCK)
			block1 = arbiter.body_a.userdata.object;

		if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.BLOCK)
			block2 = arbiter.body_b.userdata.object;

		//Special process for collision with two blocks.
		if(block1 != null && block2 != null)
		{	
			if(block1.type == Enum.Block.Type.COLORED && block2.type == Enum.Block.Type.COLORED
			&& block1.color == block2.color && block1.color < Enum.Color.GREEN)
			{			
				//If blocks are touching a third one, destroy them all.
				if((block1.linkedBlockId != null && block1.linkedBlockId != block2.id) 
					|| (block2.linkedBlockId != null && block2.linkedBlockId != block1.id))
				{
					block1.markToDestroy(Enum.Block.Destruction.COLOR_CONTACT);
					block2.markToDestroy(Enum.Block.Destruction.COLOR_CONTACT);
					
					//Destroy linked leaves.
					if(block1.linkedBlockId != null)
						this.destroyLeaves(block1.linkedBlockId, block1.id);
					if(block2.linkedBlockId != null)
						this.destroyLeaves(block2.linkedBlockId, block2.id);
									
					block1 = null;
					block2 = null;
				}
				else
				{
					block1.linkedBlockId = block2.id;
					block2.linkedBlockId = block1.id;
				}
			}
			else if(block1.type == Enum.Block.Type.COLORED && block2.type == Enum.Block.Type.COLORED 
					&& Math.abs(block1.color - block2.color) == 4)
			{
				//Destroy complementary blocks on contact.
				block1.markToDestroy(Enum.Block.Destruction.COLOR_CONTACT);
				block2.markToDestroy(Enum.Block.Destruction.COLOR_CONTACT);
				
				block1 = null;
				block2 = null;
			}
		}
		
		//Treament for player within contact.
		var player = null;
		
		if(block1 == null && arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_a.userdata.object;

		if(block2 == null && arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_b.userdata.object;
		
		//Trigger spawn.
		if(block1 != null && player == null && block1.type == Enum.Block.Type.SPAWN)
			block1.mustTrigger = true;
		if(block2 != null && player == null && block2.type == Enum.Block.Type.SPAWN)
			block2.mustTrigger = true;
		
		if(player != null)
		{
			var killingBlock = (block1 != null ? block1 : block2);
				
			if(killingBlock != null && !killingBlock.landed && killingBlock.ownerId != player.id)
			{
				if(killingBlock.ownerId == null)
				{
					Overlord.kill(player, killingBlock.type);
				}
				else
				{
					//Find killing player.
					var killingPlayer = null;
					
					for(var i in Game.players)
					{
						if(Game.players[i].id == killingBlock.ownerId)
							killingPlayer = Game.players[i];
					}

					//If found, mark the player to be inserted in the next update in the killer blocks list.
					if(killingPlayer != null)
						killingPlayer.kill(player, killingBlock.type);
				}
			}
			
			block1 = null;
			block2 = null;
		}
			
		//Check if blocks land.
		if(block1 != null && !block1.isStatic)
		{
			//State can't be changed during callback.
			block1.toggleState = true;
			block1.isStatic = true;
			block1.justLanded = true;
		}	
		
		if(block2 != null && !block2.isStatic)
		{
			block2.toggleState = true;
			block2.isStatic = true;
			block2.justLanded = true;
		}
	},
	separate: function(arbiter, space){
		
	},
	destroyLeaves: function(blockId, previousId){
		
		var block = Game.blocks[blockId];
		
		if(block != null)
		{
			block.markToDestroy(Enum.Block.Destruction.COLOR_CONTACT);
			
			if(block.linkedBlockId != null && block.linkedBlockId != previousId)
				this.destroyLeaves(block.linkedBlockId, blockId);
		}
	}
};//Server version of the player.
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
		killer : (killer != null ? killer.toClient() : null)
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
var Lobby = function(id){
	this.id = id;
	this.clientsId = [];
	this.connectedPlayers = 0;
	
	this.settings = null;
};//Server version of the block.
var Block = function(id, x, y, type, color, ownerId){
	
	this.id = id;
	this.linkedBlockId = null;
	this.ownerId = ownerId;
	
	this.width = Constants.Block.WIDTH;
	this.height = Constants.Block.HEIGHT;
	this.landed = false;
	this.stillExist = true;
	
	this.x = x;
	this.y = y;
	this.type = type;
	this.color = color;
	
	this.mustTrigger = false;
	this.justLanded = false;
	
	//Needed to indicate, during update, if state is changed. Cannot be done during a space step (callback).
	this.toggleState = false;
	this.isStatic = false;
	this.toBeDestroy = false;
	this.destroyCause = null;
	
	this.state = Enum.Block.State.DYNAMIC;
		
	//Body creation (when not static).
	this.body = Game.space.addBody(new chipmunk.Body(Constants.Physic.MASS_BLOCK, Infinity));
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
						
	//Assign custom data to body.
	this.body.userdata = {
		type: Enum.UserData.Type.BLOCK,
		object: this
	};
			
	//Create a shape associated with the body.
	this.shape = Game.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.shape.setCollisionType(Enum.Collision.Type.STATIC);
	this.shape.setFriction(1);
	
	//Sensor allowing shape to be defined as block, because listener overrides collision behavior.
	this.blockSensor = Game.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.blockSensor.setCollisionType(Enum.Collision.Type.BLOCK);
	this.blockSensor.sensor = true;
};

Block.prototype.markToDestroy = function(cause){
	this.toBeDestroy = true;
	this.destroyCause = cause;
};

Block.prototype.launch = function(){
	this.landed = false;
	this.body.setVel(new chipmunk.Vect(0, Constants.Block.LAUNCHING_SPEED));
};

Block.prototype.active = function(flag){
	
	if(flag)
	{
		//Block become dynamic.
		if(this.state != Enum.Block.State.DYNAMIC)
		{
			this.landed = false;
			this.state = Enum.Block.State.DYNAMIC;
			
			this.body.nodeIdleTime = 0;
			this.body.setMass(Constants.Physic.MASS_BLOCK);
			Game.space.addBody(this.body);
		}
	}
	else
	{
		//Block become static.
		if(this.state != Enum.Block.State.STATIC)
		{
			this.state = Enum.Block.State.STATIC;
			
			this.landed = true;
			Game.space.removeBody(this.body);
			this.body.nodeIdleTime = Infinity;
			this.body.setMass(Constants.Physic.MASS_BLOCK_STATIC);
			
			
		}
	}
};

Block.prototype.update = function(){
	
	if(this.toBeDestroy)
		this.explode(this.destroyCause);
	else{	
		//Trigger effect (can't during space step).
		if(this.mustTrigger)
			this.trigger();
	
		this.mustTrigger = false;
		
		if(this.stillExist)
		{
			//Check if it just landed to tell client to activate animation.
			if(this.justLanded)
			{
				var data = {
					action: Enum.Action.Type.LANDING,
					id: this.id
				};
			
				io.sockets.in(Game.id).emit(Constants.Message.BLOCK_ACTION, data);
				this.justLanded = false;
			}
		
			//Activate or desactivate a block to become static or dynamic.
			if(this.toggleState && (this.state == Enum.Block.State.STATIC || this.body.isSleeping()))
			{
				this.active(!this.isStatic);
				this.toggleState = false;
			}	
		}
	}
};

Block.prototype.toClient = function(){
	return {
		id: this.id,
		x: this.body.getPos().x,
		y: this.body.getPos().y,
		type: this.type,
		color: this.color
	};
};

Block.prototype.trigger = function(){

	if(this.stillExist)
	{
		if(this.type == Enum.Block.Type.SPAWN)
			this.spawn();
	}
	
};

Block.prototype.spawn = function(){

	var killerId = this.ownerId;
	var posY = Constants.Player.HEIGHT;
	
	//Respawn dead players.
	for(var i in Game.players)
	{
		var factor = Math.PI*(Math.random()*2);
		
		var launchPowerX = Constants.Block.SPAWN_MAXLAUNCHING_X*Math.sin(factor);
		var launchPowerY = Math.abs(Constants.Block.SPAWN_MAXLAUNCHING_Y*Math.cos(factor));
		
		//Prevent block to spawn player on the world edges.
		if((this.body.getPos().x < Constants.Spawn.Limit.OFFSET && launchPowerX < 0)
		|| (this.body.getPos().x > Game.width - Constants.Spawn.Limit.OFFSET && launchPowerX > 0))
			launchPowerX *= -1;
	
		if(!Game.players[i].isAlive && Game.players[i].killerId == killerId)
		{
			//Spawn the player.
			Game.players[i].spawn(this.body.getPos().x +(launchPowerX*0.1), this.body.getPos().y + posY);
			
			//Launch the player to random position.
			Game.players[i].body.setVel(new chipmunk.Vect(0,0));
			Game.players[i].body.applyImpulse(new chipmunk.Vect(launchPowerX, launchPowerY), new chipmunk.Vect(0,0));
		}
	}
	
	//Check if spawn block is overlord's one.
	if(this.ownerId == null)
		Overlord.hasActiveSpawnBlock = false;
	
	this.explode(Enum.Block.Destruction.SPAWN);
};

Block.prototype.explode = function(cause){
	
	var data = {
		cause: cause,
		id: this.id
	};
	
	//Strange behavior when trying to remove a static shape. Works fine when reactivated first.
	this.active(true);
	Game.space.removeShape(this.blockSensor);
	Game.space.removeShape(this.shape);
	Game.space.removeBody(this.body);

	//Unreference from game's blocks list.
	for(var i in Game.blocks)
	{
		if(Game.blocks[i] != null && Game.blocks[i].id == this.id)
			delete Game.blocks[i];
	}
	
	this.stillExist = false;
	this.toBeDestroy = false;
	
	io.sockets.in(Game.id).emit(Constants.Message.DELETE_BLOCK, data);
};
var GameSettings = function(id, width, height, maxPlayers){
	//Assign when game is created by the server.
	this.id = id;
	
	this.width = width;
	this.height = height;
	this.maxPlayers = maxPlayers;
};//Game container server-side.
var Game = function(settings){
	
	//Members
	this.id = settings.id;
	this.players = [];
	this.blocks = [];
	this.deathZones = [];
	
	this.blockSequence = 0;
	this.deathZoneSequence = 0;
	
	this.goal = null;
	this.intervalId = null;
	this.winner = null;
	this.winningPhaseTimer = Constants.WinningGoal.PHASE_TIME;
	
	this.spawnY = Constants.Player.INITIAL_SPAWN_Y;
	this.width = settings.width;
	this.height = settings.height;
	
	this.connectedPlayers = 0;
	this.connectingPlayers = 0;
	this.maxPlayers = settings.maxPlayers;
	
	this.state = false;
	this.space = null;
	
	var Game = this;
	
};

Game.prototype.createWorld = function(){

	if(this.space == null || this.space == 'undefined')
		{
			this.space = new chipmunk.Space();
			this.space.gravity = new chipmunk.Vect(0, Constants.Physic.GRAVITY);
			
			//Add goal listener.
			this.space.addCollisionHandler(Enum.Collision.Type.WINNING_GOAL, 
										   Enum.Collision.Type.PLAYER, 
										   function(arbiter, space){ GoalListener.begin(arbiter, space);}, 
										   null, 
										   null, 
										   null);
			
			//Add death zone listener.
			this.space.addCollisionHandler(Enum.Collision.Type.DEATH_ZONE, 
										   Enum.Collision.Type.PLAYER, 
										   function(arbiter, space){ DeathZoneListener.begin(arbiter, space);}, 
										   null, 
										   null, 
										   null);
										   
			this.space.addCollisionHandler(Enum.Collision.Type.DEATH_ZONE, 
										   Enum.Collision.Type.BLOCK, 
										   function(arbiter, space){ DeathZoneListener.begin(arbiter, space);}, 
										   null, 
										   null, 
										   null);
			
			//Add ground sensor callback.
			this.space.addCollisionHandler(Enum.Collision.Type.GROUND_SENSOR, 
										   Enum.Collision.Type.STATIC, 
										   function(arbiter, space){ GroundListener.begin(arbiter, space);}, 
										   null, 
										   null, 
										   function(arbiter, space){GroundListener.separate(arbiter, space);});
										   
			this.space.addCollisionHandler(Enum.Collision.Type.GROUND_SENSOR, 
										   Enum.Collision.Type.PLAYER, 
										   function(arbiter, space){ GroundListener.begin(arbiter, space);}, 
										   null, 
										   null, 
										   function(arbiter, space){GroundListener.separate(arbiter, space);});
						
			//Add block listener callback.
			this.space.addCollisionHandler(Enum.Collision.Type.BLOCK, 
										   Enum.Collision.Type.STATIC, 
										   function(arbiter, space){ BlockListener.begin(arbiter, space);}, 
										   null, 
										   null, 
										   function(arbiter, space){BlockListener.separate(arbiter, space);});
			this.space.addCollisionHandler(Enum.Collision.Type.BLOCK, 
										   Enum.Collision.Type.BLOCK, 
										   function(arbiter, space){ BlockListener.begin(arbiter, space); }, 
										   null, 
										   null, 
										   function(arbiter, space){BlockListener.separate(arbiter, space);});
			this.space.addCollisionHandler(Enum.Collision.Type.BLOCK, 
										   Enum.Collision.Type.PLAYER, 
										   function(arbiter, space){ BlockListener.begin(arbiter, space); }, 
										   null, 
										   null, 
										   function(arbiter, space){BlockListener.separate(arbiter, space);});

			//Add drop zone listener callback.
			this.space.addCollisionHandler(Enum.Collision.Type.DROP_SENSOR, 
										   Enum.Collision.Type.STATIC, 
										   function(arbiter, space){ DropListener.begin(arbiter, space);}, 
										   null, 
										   null, 
										   function(arbiter, space){DropListener.separate(arbiter, space);});
			
			//Force bodies to sleep when idle after 0.2 second.
			this.space.sleepTimeThreshold = 0.2;
			this.space.collisionBias = 0;
			
			//Create floor and walls.
			var ground = new chipmunk.SegmentShape(this.space.staticBody,
													new chipmunk.Vect(0, 0),
													new chipmunk.Vect(this.width, 0),
													10);
			
			var leftWall = new chipmunk.SegmentShape(this.space.staticBody,
													new chipmunk.Vect(0, 0),
													new chipmunk.Vect(0, this.height*3),
													1);
													
			var rightWall = new chipmunk.SegmentShape(this.space.staticBody,
														new chipmunk.Vect(this.width, 0),
														new chipmunk.Vect(this.width, this.height*3),
														1);																
			
			//Set friction on ground.
			ground.setFriction(Constants.Physic.FRICTION);
			
			this.space.addShape(ground);
			this.space.addShape(leftWall);
			this.space.addShape(rightWall);			
				
			//Init players' bodies.
			for(var i in this.players)
				this.players[i].initBody();
				
			//Add the goal. TODO: Random between multiples goals.
			this.goal = new FloatingBall(this.width*0.5, this.height - Constants.WinningGoal.OFFSET_Y);
		}
};

Game.prototype.update = function(){

	//When world's ready...
	if(this.ready)
	{	
		for(var i in this.players)
			this.players[i].update();

		if(this.space != null)
			this.space.step(Constants.Physic.TIME_STEP);
			
		for(var i in this.blocks)
		{
			if(this.blocks[i] != null)
				this.blocks[i].update();
		}
		
		//Check if Overlord needs to use a spawn block.
		var overlordGotKills = false;
		
		for(var i in this.players)
			if(!this.players[i].isAlive && this.players[i].killerId == null)
			{
				overlordGotKills = true;
				break;
			}
				
		if(overlordGotKills && !Overlord.hasActiveSpawnBlock)
			Overlord.launch(Enum.Block.Type.SPAWN);
			
		for(var i in this.deathZones)
			if(this.deathZones[i] != null)
				this.deathZones[i].update();
		
		//Reduce winning phase timer when there's a winner.
		if(this.winner != null)
		{
			var hasSurvivors = false;
			for(var i in this.players)
			{	
				if(this.players[i].id != this.winner.id && this.players[i].isAlive)
					hasSurvivors = true;
			}
			
			//Stop countdown if there's no more survivor.
			if(!hasSurvivors)
				this.winningPhaseTimer = 0;
		
			if(this.winningPhaseTimer > 0)
				this.winningPhaseTimer -= Constants.Physic.TIME_STEP*0.5;
		}
		
		//Winner!
		if(this.winningPhaseTimer <= 0)
			this.end();
		
		//Send data to clients.
		this.pull();
	}
};

Game.prototype.electWinner = function(winner){
	this.winner = winner;
	this.winner.hasWon = true;
};

Game.prototype.end = function(){
	var survivors = 0;
			
	//Count and kill survivors.
	for(var i in this.players)
	{
		if(this.players[i].isAlive && i != this.winner.id)
		{
			this.players[i].die();
			survivors++;
		}
	}
	
	var data = {
		winner: this.winner.toClient(),
		succeed: (survivors == 0)
	};
	
	io.sockets.in(this.id).emit(Constants.Message.WIN, data);
	clearInterval(this.intervalId);
};

Game.prototype.push = function(inputs, id){
	this.players[id].keys = inputs;
};


Game.prototype.pull = function(){
		
	var players = [];
	
	//Players.
	for(var i in this.players)
		if(this.players[i].isAlive)
			players.push(this.players[i].toClient());
	
	//Blocks.
	var blocks = [];
	for(var i in this.blocks)
	{
		if(this.blocks[i] != null)
			blocks.push(this.blocks[i].toClient());
	}
	
	//Death zones.
	var deathZones = [];
	for(var i in this.deathZones)
		if(this.deathZones[i] != null)
			deathZones.push(this.deathZones[i].toClient());
	
	var data = {
		players: players,
		goal: this.goal.toClient(),
		blocks: blocks,
		deathZones: deathZones
	};
	
	//Send message to all players.
	io.sockets.in(this.id).emit(Constants.Message.PULL, data);
}

Game.prototype.launch = function(){
	//17 milliseconds = 60 FPS
	this.intervalId = setInterval(function(){Game.update()}, 8);
};
var Overlord = {
	hasActiveSpawnBlock: false,
	assignKill: function(killed, keepList){
	
		var otherPlayers = [];
		for(var i in Game.players)
		{
			if(Game.players[i].id != killed.id && Game.players[i].isAlive)
				otherPlayers.push(Game.players[i]);
		}
		
		if(otherPlayers.length == 0)
		{		
			this.kill(killed, null);
			return;
		}
		
		var killerIndex = (otherPlayers.length == 1 ? 0 : Math.round((Math.random()*(otherPlayers.length-1))-0.5));
				
		//Assign the kill.
		otherPlayers[killerIndex].kill(killed, Enum.Block.Type.NEUTRAL, (keepList == null || !keepList));
	},
	launch: function(blockType){
		
		if(blockType == Enum.Block.Type.SPAWN)
		{
			//Spawn block falls from the sky.
			if(!this.hasActiveSpawnBlock)
			{
				var spawnY = Game.height + 100;
				var spawnX = Constants.Block.WIDTH*0.5 + (Math.random()*(Game.width-Constants.Block.WIDTH));
				
				//Create a block and launch it.
				var block = new Block(Game.blockSequence, 
									  spawnX, 
									  spawnY, 
									  Enum.Block.Type.SPAWN, 
									  null,
									  null);
				
				Game.blocks.push(block);
				block.launch();
				
				Game.blockSequence++;	
				io.sockets.in(Game.id).emit(Constants.Message.NEW_BLOCK, block.toClient());
				
				this.hasActiveSpawnBlock = true;
			}
		}
	},
	kill: function(killed, cause){
		
		//Steal killed's list.
		for(var i in Game.players)
			if(Game.players[i].killerId == killed.id)
				Game.players[i].killerId = null;
		
		//Force player to die.
		killed.toBeDestroy = true;
	}
};//Modules.
var http = require('http');
var chipmunk = require('chipmunk');

//Create server.
var server = http.createServer(function(req, res){});

//Port.
server.listen(80); //localhost

//Remove log level or adjust it to have every log in console.
var io = require('socket.io').listen(server).set('log level', 1);

//Server object.
var Server = new function(){
	this.gameList = {};
	this.gameSequenceId = 0;
	this.lobbies = {};
	
	this.addGame = function(settings){	
		this.gameList[settings.id] = new Game(settings);
	};
};

//Bind listeners on sockets.
io.sockets.on(Constants.Message.CONNECTION, function (socket){

	console.log('Connection to client established');
		
	//Send game id to player.
	socket.on(Constants.Message.CREATE_LOBBY, function(){
			
		console.log('Lobby created');
		
		Server.lobbies[Server.gameSequenceId] = new Lobby(Server.gameSequenceId);
		Server.lobbies[Server.gameSequenceId].connectedPlayers++;
		
		socket.emit(Constants.Message.CREATE_LOBBY, Server.gameSequenceId);
		
		Server.gameSequenceId++;
	});
	
	//Join a lobby.
	socket.on(Constants.Message.JOIN_LOBBY, function(gameId){
		console.log('Lobby joined');
		
		if(Server.lobbies[gameId].connectedPlayers <= Constants.Game.MAX_PLAYERS)
		{
			Server.lobbies[gameId].clientsId.push(socket.id);
			Server.lobbies[gameId].connectedPlayers++;
			
			//Join the room.
			socket.join(gameId);
		}
	});
	
	//Disconnect from lobby.
	socket.on(Constants.Message.DISCONNECT_LOBBY, function(gameId){
		//TODO.
	});
	
	//Lobby to game.
	socket.on(Constants.Message.START_GAME, function(settings){
	
		console.log('Creating game...');
		
		//Create game.
		Server.addGame(new Game(settings));
		
		//Destroy old lobby.
		delete Server.lobbies[settings.id];
		
		io.sockets.in(settings.id).emit(Constants.Message.GAME_CREATED);
	});
		
	//Send information about enemies to the connecting player.
	socket.on(Constants.Message.CONNECTING, function(data){
	
		console.log('Connecting player...');
		var enemies = [];
		console.log(Server.gameList);
				
		for(var i in Server.gameList[data.gameId].players)
			enemies.push(Server.gameList[data.gameId].players[i].toClient());
		
		//Create connecting player.
		var player = new Player(socket.id, 
								Server.gameList[data.gameId].width*0.2*(Server.gameList[data.gameId].connectingPlayers+1), 
								Server.gameList[data.gameId].spawnY, 
								data.color);
		
		//Value initiating a player.
		var initData = {
			player: player.toClient(),
			enemies: enemies
		};
		
		Server.gameList[data.gameId].players[socket.id] = player;
		Server.gameList[data.gameId].connectingPlayers++;

		//Start initiation.
		socket.emit(Constants.Message.INIT, initData);
	});

	//When player ready, refresh information of his opponents about his existence.
	socket.on(Constants.Message.PLAYER_READY, function(gameId){
		console.log('Player ready!');
		
		Server.gameList[gameId].connectedPlayers++;		
		
		//Send connected player to others.
		for(var i in io.sockets.in(gameId).sockets)
			if(i != socket.id)
				io.sockets.sockets[i].emit(Constants.Message.NEW_PLAYER, Server.gameList[gameId].players[socket.id].toClient());
		
		if(Server.gameList[gameId].connectedPlayers == Server.gameList[gameId].maxPlayers)
		{
			console.log('Game launching...');
			
			//Init physic world.
			Server.gameList[gameId].createWorld();
			Server.gameList[gameId].launch();
		
			var data = {
				goal: Server.gameList[gameId].goal.toClient(),
				width: Server.gameList[gameId].width,
				height: Server.gameList[gameId].height
			};
			
			data.goal.type = Server.gameList[gameId].goal.type;
			
			console.log('Game launched!');
			io.sockets.in(gameId).emit(Constants.Message.LAUNCH, data);
			
			Server.gameList[gameId].ready = true;
		}
	});
	
	socket.on(Constants.Message.NEXT_BLOCK, function(data){
		//Do not override if server has given a special block to player (as a Spawn Block).
		if(!Server.gameList[data.gameId].players[socket.id].hasGivenBlock)
			Server.gameList[data.gameId].players[socket.id].currentBlock = data.command;
	});
	
	//Retrieving information from players.
	socket.on(Constants.Message.PUSH, function(data){
		Server.gameList[data.gameId].push(data.inputs, socket.id);
	});
});

console.log('Server created');var FloatingBall = function(x, y){	this.x = x;	this.y = y;		this.velocity = 0;	this.orbitTime = 0;		this.cooldown = 0;	this.stuckTime = 0;		this.jumpPressed = false;		this.type = Enum.WinningGoal.Type.FLOATING_BALL;		this.spikeStats = {		speed: Constants.DeathZone.EnergySpike.SPEED,		direction: Enum.Direction.UP,		type: Enum.DeathZone.Type.ENERGY_SPIKE,		distance: this.y	};		//Make a static body.	this.body = new chipmunk.Body(Infinity, Infinity);	this.body.setPos(new chipmunk.Vect(this.x, this.y));		//Assign custom data to body.	this.body.userdata = {		type: Enum.UserData.Type.WINNING_GOAL,		object: this	};		//Create a shape associated with the body.	this.shape = Game.space.addShape(chipmunk.BoxShape(this.body, Constants.WinningGoal.FloatingBall.WIDTH, Constants.WinningGoal.FloatingBall.HEIGHT));	this.shape.setCollisionType(Enum.Collision.Type.WINNING_GOAL);	this.shape.sensor = true;};FloatingBall.prototype.update = function(inputs){		if(this.stuckTime <= 0)	{		var nextX = 0;				if(inputs.right)			nextX += Constants.WinningGoal.FloatingBall.SPEED;		if(inputs.left)			nextX -= Constants.WinningGoal.FloatingBall.SPEED;					if(nextX != 0)		{			//Turn.			if((nextX > 0 && this.velocity < 0) ||(nextX < 0 && this.velocity > 0))				this.velocity *= Constants.WinningGoal.FloatingBall.TURN_FRICTION_FACTOR;							this.velocity += nextX;		}		else		{			if(this.velocity != 0)			{				//Artificial friction.				if(Math.abs(this.velocity) < Constants.WinningGoal.FloatingBall.SPEED*0.25)					this.velocity = 0;				else					this.velocity *= Constants.WinningGoal.FloatingBall.FRICTION_FACTOR;			}		}	}		//Trigger action on jump command.	if(inputs.jump && this.cooldown <= 0 && !this.jumpPressed)	{		this.launch();		this.cooldown = Constants.DeathZone.EnergySpike.COOLDOWN;		this.jumpPressed = true;	}	if(!inputs.jump && this.jumpPressed)		this.jumpPressed = false;			if(this.cooldown > 0)		this.cooldown -= Constants.Physic.TIME_STEP*0.5;		if(this.stuckTime > 0)		this.stuckTime -= Constants.Physic.TIME_STEP*0.5;		//Velocity can't be higher than max speed.	if(this.velocity < -(Constants.WinningGoal.FloatingBall.MAX_SPEED))		this.velocity = -(Constants.WinningGoal.FloatingBall.MAX_SPEED);	if(this.velocity > Constants.WinningGoal.FloatingBall.MAX_SPEED)		this.velocity = Constants.WinningGoal.FloatingBall.MAX_SPEED;		//Calculate ball's orbit.	this.orbitTime += Constants.WinningGoal.FloatingBall.ORBIT_SPEED;	var nextY = Math.sin(this.orbitTime)*Constants.WinningGoal.FloatingBall.ORBIT_RADIUS;		if(this.orbitTime >= 360)		this.orbitTime = 0;		this.translate(this.velocity, nextY);};FloatingBall.prototype.launch = function(){	DeathZoneManager.launch(new Spike(Game.deathZoneSequence,									  this.x, 									  0, 									  Constants.DeathZone.EnergySpike.WIDTH, 									  this.y, 									  Game.winner.id,									  this.spikeStats));		//Resets velocity and immobilizes the curse ball for a moment.	this.velocity = 0;	this.stuckTime = Constants.WinningGoal.FloatingBall.STUCK_TIME;		io.sockets.in(Game.id).emit(Constants.Message.GOAL_ACTION, Enum.Action.Type.SUMMONING);};FloatingBall.prototype.translate = function(velX, velY) {	this.x += velX;	var tmpY = this.y + velY;		if(this.x > Game.width - Constants.WinningGoal.FloatingBall.WIDTH*0.5)	{		this.x = Game.width - Constants.WinningGoal.FloatingBall.WIDTH*0.5;		this.velocity = 0;	}	else if(this.x < Constants.WinningGoal.FloatingBall.WIDTH*0.5)	{		this.x = Constants.WinningGoal.FloatingBall.WIDTH*0.5;		this.velocity = 0;	}			this.body.setPos(new chipmunk.Vect(this.x, tmpY));};FloatingBall.prototype.getPosition = function(){	return this.body.getPos();};FloatingBall.prototype.toClient = function(){	return {		x: this.getPosition().x,		y: this.getPosition().y	};};
var Missile = function(id, x, y, width, height, stats){
	
	this.stillExists = true;
	this.id = id;

	this.x = x;
	this.y = y;
	this.velocity = {x:0, y:0};
	
	this.width = width;
	this.height = height;
	
	this.stats = stats;
	
	if(this.stats.distance != null)
	{
		this.originalX = this.x;
		this.originalY = this.y;
	}
	
	this.body = new chipmunk.Body(Infinity, Infinity);
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
	
	var userDataType = null;
	
	//Find good type for association.
	switch(this.stats.type)
	{
		case Enum.DeathZone.Type.RAYBALL:
			userDataType = Enum.UserData.Type.RAYBALL;
			break;
	}
	
	//Assign custom data to body.
	this.body.userdata = {
		type: userDataType,
		object: this
	};
	
	//Create a shape associated with the body.
	this.shape = Game.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.shape.setCollisionType(Enum.Collision.Type.DEATH_ZONE);
	this.shape.sensor = true;
};

Missile.prototype.move = function(){
	
	this.x += this.velocity.x;
	this.y += this.velocity.y;
	
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
};

Missile.prototype.toClient = function(){
	return {
		x: this.x,
		y: this.y,
		id: this.id
	};
};

Missile.prototype.explode = function(){

	//Remove physical presence.
	Game.space.removeShape(this.shape);
		
	//Remove from game.
	for(var i in Game.deathZones)
		if(Game.deathZones[i] != null && Game.deathZones[i].id == this.id)
			delete Game.deathZones[i];
	
	var data = {
		id: this.id
	};
	
	//Send info to client.
	this.stillExists = false;
	io.sockets.in(Game.id).emit(Constants.Message.DELETE_DEATHZONE, data);
};

Missile.prototype.update = function(){

	var distX = (this.x - this.originalX);
	var distY = (this.y - this.originalY);
				
	//If distance has been reached or surpassed, missile is deleted.
	if((distX*distX)+(distY*distY) > this.stats.distance*this.stats.distance)
		this.explode();
	
	if(this.stillExists)
	{
		var push = {x:0, y:0};
		var degree = 0;
		
		switch(this.stats.direction)
		{
			case Enum.Direction.UP:
				degree = 0;
				break;
			case Enum.Direction.LEFT:
				degree = 270;
				break;
			case Enum.Direction.DOWN:
				degree = 180;
				break;
			case Enum.Direction.RIGHT:
				degree = 90;
				break;
		}
		
		if(this.stats.acceleration != null)
		{
			var tmpVelY = this.velocity.y;
			var tmpVelX = this.velocity.x;
			
			tmpVelX += this.stats.acceleration.x;
			tmpVelY += this.stats.acceleration.y;
			
			if((tmpVelX*tmpVelX)+(tmpVelY*tmpVelY) > (this.stats.maxspeed*this.stats.maxspeed))
			{
				this.velocity.x = this.stats.maxspeed*Math.sin(degree);
				this.velocity.y = this.stats.maxspeed*Math.cos(degree);
			}
			else
			{
				this.velocity.x += this.stats.acceleration.x*Math.sin(degree);
				this.velocity.y += this.stats.acceleration.y*Math.cos(degree);
			}
		}
		else
		{
			this.velocity.x = this.stats.speed*Math.sin(degree);
			this.velocity.y = this.stats.speed*Math.cos(degree);
		}
			
		this.move();
	}
};


var DeathZoneManager = {
	launch: function(deathZone){
	
		Game.deathZoneSequence++;
		Game.deathZones.push(deathZone);
		
		var data = {
			id: deathZone.id,
			type: deathZone.stats.type,
			x: deathZone.x,
			y: deathZone.y
		};
		
		//Insert specific custom data.
		switch(deathZone.stats.type){
			case Enum.DeathZone.Type.ENERGY_SPIKE:
				data.finalX = deathZone.finalX;
				data.finalY = deathZone.finalY;
				break;
		}
		
		io.sockets.in(Game.id).emit(Constants.Message.NEW_DEATHZONE, data);
	}
};
var BlockManager = {
	launch: function(block){
			
		Game.blocks.push(block);
		block.launch();
		
		Game.blockSequence++;		
		
		//Emit the new block to all players.
		io.sockets.in(Game.id).emit(Constants.Message.NEW_BLOCK, block.toClient());
	}
};var Spike = function(id, x, y, width, height, ownerId, stats){		this.stillExists = true;	this.mustMove = true;	this.stats = stats;		this.ownerId = ownerId;	this.id = id;	this.distance = stats.distance;		//Get original X and Y.	var degree = null;	switch(stats.direction)	{		case Enum.Direction.UP:			degree = 0;			break;		case Enum.Direction.LEFT:			degree = 270;			break;		case Enum.Direction.DOWN:			degree = 180;			break;		case Enum.Direction.RIGHT:			degree = 90;			break;	}		this.x = x - (this.distance*0.5*Math.sin(degree));	this.y = y - (this.distance*0.5*Math.cos(degree));		this.finalX = this.x + (this.distance*Math.sin(degree));	this.finalY = this.y + (this.distance*Math.cos(degree));		this.originalX = this.x;	this.originalY = this.y;		this.velocity = {x:0, y:0};		this.width = width;	this.height = height;		this.body = new chipmunk.Body(Infinity, Infinity);	this.body.setPos(new chipmunk.Vect(this.x, this.y));		var userDataType = null;		//Find good type for association.	switch(this.stats.type)	{		case Enum.DeathZone.Type.ENERGY_SPIKE:			userDataType = Enum.UserData.Type.ENERGY_SPIKE;			break;	}		//Assign custom data to body.	this.body.userdata = {		type: userDataType,		object: this	};		//Create a shape associated with the body.	this.shape = Game.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));	this.shape.setCollisionType(Enum.Collision.Type.DEATH_ZONE);	this.shape.sensor = true;};Spike.prototype.move = function(){		this.x += this.velocity.x;	this.y += this.velocity.y;		this.body.setPos(new chipmunk.Vect(this.x, this.y));};Spike.prototype.toClient = function(){	return {		x: this.x,		y: this.y,		id: this.id	};};Spike.prototype.explode = function(){	//Remove physical presence.	Game.space.removeShape(this.shape);			//Remove from game.	for(var i in Game.deathZones)		if(Game.deathZones[i] != null && Game.deathZones[i].id == this.id)			delete Game.deathZones[i];		var data = {		id: this.id	};		//Send info to client.	this.stillExists = false;	io.sockets.in(Game.id).emit(Constants.Message.DELETE_DEATHZONE, data);};Spike.prototype.endProcess = function(){	switch(this.stats.type)	{		case Enum.DeathZone.Type.ENERGY_SPIKE:						for(var i in Game.players)			{				if(Game.players[i] != null && Game.players[i].isAlive && !Game.players[i].isRemoved)				{					var factor = 1;										if(Game.players[i].body.getPos().x < this.x)						factor = -1;											Game.players[i].body.applyImpulse(new chipmunk.Vect(factor*Constants.DeathZone.EnergySpike.IMPULSE_X, 																		Constants.DeathZone.EnergySpike.IMPULSE_Y),													  new chipmunk.Vect(0,0));				}			}						break;	}};Spike.prototype.update = function(){	if(this.stillExists && this.mustMove)	{		var push = {x:0, y:0};		var degree = 0;				switch(this.stats.direction)		{			case Enum.Direction.UP:				degree = 0;				break;			case Enum.Direction.LEFT:				degree = 270;				break;			case Enum.Direction.DOWN:				degree = 180;				break;			case Enum.Direction.RIGHT:				degree = 90;				break;		}				if(this.stats.acceleration != null)		{			var tmpVelY = this.velocity.y;			var tmpVelX = this.velocity.x;						tmpVelX += this.stats.acceleration.x;			tmpVelY += this.stats.acceleration.y;						if((tmpVelX*tmpVelX)+(tmpVelY*tmpVelY) > (this.stats.maxspeed*this.stats.maxspeed))			{				this.velocity.x = this.stats.maxspeed*Math.sin(degree);				this.velocity.y = this.stats.maxspeed*Math.cos(degree);			}			else			{				this.velocity.x += this.stats.acceleration.x*Math.sin(degree);				this.velocity.y += this.stats.acceleration.y*Math.cos(degree);			}		}		else		{			this.velocity.x = this.stats.speed*Math.sin(degree);			this.velocity.y = this.stats.speed*Math.cos(degree);		}				var tmpX = this.x + this.velocity.x;		var tmpY = this.y + this.velocity.y;				var distX = (tmpX - this.originalX);		var distY = (tmpY - this.originalY);							//If distance has been reached or surpassed, spike stops moving.		if((distX*distX)+(distY*distY) >= this.stats.distance*this.stats.distance)		{			this.mustMove = false;			this.x = this.finalX;			this.y = this.finalY;						//Set new position and trigger effect when spike is set.			this.body.setPos(new chipmunk.Vect(this.x, this.y));			this.endProcess();		}			else			this.move();	}};