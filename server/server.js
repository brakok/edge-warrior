//Enums
var Color = {
	RED: 0,
	BLUE: 1,
	YELLOW: 2,
	WHITE: 3,
	GREEN: 4,
	ORANGE: 5,
	PURPLE: 6,
	BLACK: 7
};

var UserDataType = {
	PLAYER: 0,
	BLOCK: 1
};

var BlockType = {
	NEUTRAL: 0,
	COLORED: 1,
	SPAWN: 2,
	SKILLED: 3
};

var CollisionType = {
	STATIC: 0,
	PLAYER: 1,
	GROUND_SENSOR: 2,
	BLOCK: 3,
	DROP_SENSOR: 4
};

var Facing = {
	RIGHT:  0,
	LEFT: 1
};

var BlockState = {
	STATIC: 0,
	DYNAMIC: 1
};

var BlockDestructionType = {
	COLOR_CONTACT: 0,
	SPAWN: 1
};

//Constants
var PhysicConstants = {
	GRAVITY: -150,
	FRICTION: 0.99,
	MASS_PLAYER: 10,
	MASS_BLOCK: 99999999,
	MASS_BLOCK_STATIC: 99999999999,
	TIME_STEP: 1/60,
	FRICTION_FACTOR_ONGROUND: 0.9,
	TURN_FRICTION_FACTOR: 0.05
};

var PlayerConstants = {
	JUMP_POWER: 1350,
	RUN_POWER_ONGROUND: 1000,
	RUN_POWER_OFFGROUND: 15,
	WIDTH: 40,
	HEIGHT: 40,
	MAX_SPEED_FACTOR: 0.01
};

var BlockConstants = {
	WIDTH: 80,
	HEIGHT: 40,
	LAUNCHING_SPEED: -500,
	SPAWN_MAXLAUNCHING_Y: 500,
	SPAWN_MAXLAUNCHING_X: 500
};

//Socket messages.
var Message = {
	NEXT_BLOCK: 'nextBlock',
	NEW_BLOCK: 'newBlock',
	SEND_BLOCK: 'sendBlock',
	DELETE_BLOCK: 'deleteBlock',
	PULL: 'pull',
	PUSH: 'push',
	INIT: 'init',
	CONNECTED: 'connected',
	CONNECTION: 'connection',
	NEW_PLAYER: 'newPlayer',
	PLAYER_KILLED: 'playerKilled',
	PLAYER_SPAWNED: 'playerSpawned',
	LAUNCH: 'launch'
};//Drop listener.
var DropListener = {
	begin: function(arbiter, space){
		var player = null;
		
		if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == UserDataType.PLAYER)
			player = arbiter.body_a.userdata.object;

		if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == UserDataType.PLAYER)
			player = arbiter.body_b.userdata.object;
		
		if(player != null){
			player.obstruction++;
		}
	},
	separate: function(arbiter, space){
		var player = null;
		
		if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == UserDataType.PLAYER)
			player = arbiter.body_a.userdata.object;

		if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == UserDataType.PLAYER)
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
		
		if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == UserDataType.PLAYER)
			player = arbiter.body_a.userdata.object;

		if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == UserDataType.PLAYER)
			player = arbiter.body_b.userdata.object;
		
		if(player != null){
			player.groundContact++;
		}
	},
	separate: function(arbiter, space){

		var player = null;
		
		if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == UserDataType.PLAYER)
			player = arbiter.body_a.userdata.object;

		if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == UserDataType.PLAYER)
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
				
		if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == UserDataType.BLOCK)
			block1 = arbiter.body_a.userdata.object;

		if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == UserDataType.BLOCK)
			block2 = arbiter.body_b.userdata.object;

		//Special process for collision with two blocks.
		if(block1 != null && block2 != null)
		{	
			if(block1.type == BlockType.COLORED && block2.type == BlockType.COLORED
			&& block1.color == block2.color && block1.color < Color.GREEN)
			{			
				//If blocks are touching a third one, destroy them all.
				if((block1.linkedBlockId != null && block1.linkedBlockId != block2.id) 
					|| (block2.linkedBlockId != null && block2.linkedBlockId != block1.id))
				{
					block1.markToDestroy(BlockDestructionType.COLOR_CONTACT);
					block2.markToDestroy(BlockDestructionType.COLOR_CONTACT);
					
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
			else if(block1.type == BlockType.COLORED && block2.type == BlockType.COLORED 
					&& Math.abs(block1.color - block2.color) == 4)
			{
				//Destroy complementary blocks on contact.
				block1.markToDestroy(BlockDestructionType.COLOR_CONTACT);
				block2.markToDestroy(BlockDestructionType.COLOR_CONTACT);
				
				block1 = null;
				block2 = null;
			}
		}
		
		//Treament for player within contact.
		var player = null;
		
		if(block1 == null && arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == UserDataType.PLAYER)
			player = arbiter.body_a.userdata.object;

		if(block2 == null && arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == UserDataType.PLAYER)
			player = arbiter.body_b.userdata.object;
			
		//Trigger spawn.
		if(block1 != null && player == null && block1.type == BlockType.SPAWN)
			block1.mustTrigger = true;
		if(block2 != null && player == null && block2.type == BlockType.SPAWN)
			block2.mustTrigger = true;
		
		if(player != null)
		{		
			var killingBlock = (block1 != null ? block1 : block2);
			if(killingBlock != null && !killingBlock.landed)
			{
				//Find killing player.
				var killingPlayer = null;
				
				for(var i in Game.players)
				{
					if(Game.players[i].color == killingBlock.color)
						killingPlayer = Game.players[i];
				}

				//If found, mark the player to be inserted in the next update in the killer blocks list.
				if(killingPlayer != null)
					killingPlayer.kill(player, killingBlock.type);
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
			block1.landed = true;
		}	
		if(block2 != null && !block2.isStatic)
		{
			block2.toggleState = true;
			block2.isStatic = true;
			block2.landed = true;
		}
	},
	separate: function(arbiter, space){
		
	},
	destroyLeaves: function(blockId, previousId){
		
		var block = Game.blocks[blockId];
		
		if(block != null)
		{
			block.markToDestroy(BlockDestructionType.COLOR_CONTACT);
			
			if(block.linkedBlockId != null && block.linkedBlockId != previousId)
				this.destroyLeaves(block.linkedBlockId, blockId);
		}
	}
};//Server version of the player.
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
	
	//Swap killer colored blocks to killed complementary one.
	for(var i in Game.blocks)
	{
		if(Game.blocks[i] != null 
		   && Game.blocks[i].type != BlockType.NEUTRAL 
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
															new chipmunk.BB(-(BlockConstants.WIDTH*0.33), 
																			-(playerHalfHeight+(BlockConstants.HEIGHT*0.5)), 
																			(BlockConstants.WIDTH*0.33), 
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
};//Server version of the block.
var Block = function(id, x, y, type, color, ownerId){
	
	this.id = id;
	this.linkedBlockId = null;
	this.ownerId = ownerId;
	
	this.width = BlockConstants.WIDTH;
	this.height = BlockConstants.HEIGHT;
	this.landed = false;
	this.stillExist = true;
	
	this.x = x;
	this.y = y;
	this.type = type;
	this.color = color;
	
	this.mustTrigger = false;
	
	//Needed to indicate, during update, if state is changed. Cannot be done during a space step (callback).
	this.toggleState = false;
	this.isStatic = false;
	this.toBeDestroy = false;
	this.destroyCause = null;
	
	this.state = BlockState.DYNAMIC;
		
	//Body creation (when not static).
	this.body = Game.space.addBody(new chipmunk.Body(PhysicConstants.MASS_BLOCK, Infinity));
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
						
	//Assign custom data to body.
	this.body.userdata = {
		type: UserDataType.BLOCK,
		object: this
	};
			
	//Create a shape associated with the body.
	this.shape = Game.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.shape.setCollisionType(CollisionType.STATIC);
	this.shape.setFriction(1);
	
	//Sensor allowing shape to be defined as block, because listener overrides collision behavior.
	this.blockSensor = Game.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.blockSensor.setCollisionType(CollisionType.BLOCK);
	this.blockSensor.sensor = true;

};

Block.prototype.markToDestroy = function(cause){
	this.toBeDestroy = true;
	this.destroyCause = cause;
};

Block.prototype.launch = function(){
	this.landed = false;
	this.body.setVel(new chipmunk.Vect(0, BlockConstants.LAUNCHING_SPEED));
};

Block.prototype.active = function(flag){
	
	if(flag)
	{
		//Block become dynamic.
		if(this.state != BlockState.DYNAMIC)
		{
			this.landed = false;
			this.state = BlockState.DYNAMIC;
			
			this.body.nodeIdleTime = 0;
			this.body.setMass(PhysicConstants.MASS_BLOCK);
			Game.space.addBody(this.body);
		}
	}
	else
	{
		//Block become static.
		if(this.state != BlockState.STATIC)
		{
			this.state = BlockState.STATIC;
			
			Game.space.removeBody(this.body);
			this.body.nodeIdleTime = Infinity;
			this.body.setMass(PhysicConstants.MASS_BLOCK_STATIC);
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
			//Activate or desactivate a block to become static or dynamic.
			if(this.toggleState && (this.state == BlockState.STATIC || this.body.isSleeping()))
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
		if(this.type == BlockType.SPAWN)
			this.spawn();
	}
	
};

Block.prototype.spawn = function(){
	var player = Game.players[this.ownerId];
	
	if(player != null && player.killedList != null)
	{
		var posY = PlayerConstants.HEIGHT;
	
		//Respawn enemies killed by player.
		for(var i in player.killedList)
		{
			var factor = Math.PI*(Math.random()*2);
		
			var launchPowerX = BlockConstants.SPAWN_MAXLAUNCHING_X*Math.sin(factor);
			var launchPowerY = Math.abs(BlockConstants.SPAWN_MAXLAUNCHING_Y*Math.cos(factor));
			
			//Spawn the player.
			Game.players[player.killedList[i]].spawn(this.body.getPos().x +(launchPowerX*0.1), this.body.getPos().y + posY);
			
			//Launch the player to random position.
			Game.players[player.killedList[i]].body.setVel(new chipmunk.Vect(0,0));
			Game.players[player.killedList[i]].body.applyImpulse(new chipmunk.Vect(launchPowerX, launchPowerY), new chipmunk.Vect(0,0));
		}
		
		player.killedList = null;
	}
	
	this.explode(BlockDestructionType.SPAWN);
};

Block.prototype.explode = function(cause){
	
	var data = {
		cause: cause,
		id: this.id
	};
	
	//Strange behavior when trying to remove a static shape. Works fine when reactivate first.
	this.active(true);
	Game.space.removeShape(this.blockSensor);
	Game.space.removeShape(this.shape);
	Game.space.removeBody(this.body);

	//Unreference from game's blocks list.
	for(var i in Game.blocks)
	{
		if(Game.blocks[i] != null && Game.blocks[i].id == this.id)
		{
			delete Game.blocks[i];
			console.log(Game.blocks[i]);
		}
	}
	
	this.stillExist = false;
	this.toBeDestroy = false;
	
	io.sockets.in(Game.id).emit(Message.DELETE_BLOCK, data);
};//Game container server-side.
var Game = {
	id: 1,
	players: [],
	blocks: [],
	blockSequence: 0,
	spawnX: 100,
	spawnY: 100,
	width: 1200,
	height: 800,
	connectedPlayers: 0,
	connectingPlayers:0,
	maxPlayers: 2,
	keys: [],
	state: false,
	space: null,
	createWorld: function() {
	
		if(this.space == null || this.space == 'undefined')
		{
			this.space = new chipmunk.Space();
			this.space.gravity = new chipmunk.Vect(0, PhysicConstants.GRAVITY);
			
			//Add ground sensor callback.
			this.space.addCollisionHandler(CollisionType.GROUND_SENSOR, 
										   CollisionType.STATIC, 
										   function(arbiter, space){ GroundListener.begin(arbiter, space);}, 
										   null, 
										   null, 
										   function(arbiter, space){GroundListener.separate(arbiter, space);});
						
			//Add block listener callback.
			this.space.addCollisionHandler(CollisionType.BLOCK, 
										   CollisionType.STATIC, 
										   function(arbiter, space){ BlockListener.begin(arbiter, space);}, 
										   null, 
										   null, 
										   function(arbiter, space){BlockListener.separate(arbiter, space);});
			this.space.addCollisionHandler(CollisionType.BLOCK, 
										   CollisionType.BLOCK, 
										   function(arbiter, space){ BlockListener.begin(arbiter, space); }, 
										   null, 
										   null, 
										   function(arbiter, space){BlockListener.separate(arbiter, space);});
			this.space.addCollisionHandler(CollisionType.BLOCK, 
										   CollisionType.PLAYER, 
										   function(arbiter, space){ BlockListener.begin(arbiter, space); }, 
										   null, 
										   null, 
										   function(arbiter, space){BlockListener.separate(arbiter, space);});

			//Add drop zone listener callback.
			this.space.addCollisionHandler(CollisionType.DROP_SENSOR, 
										   CollisionType.STATIC, 
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
			ground.setFriction(PhysicConstants.FRICTION);
			
			this.space.addShape(ground);
			this.space.addShape(leftWall);
			this.space.addShape(rightWall);			
				
			//Init players' bodies.
			for(var i in this.players)
				this.players[i].initBody();
		}
	},
	update: function() {
		//When world's ready...
		if(this.ready)
		{	
			for(var i in this.players)
				this.players[i].update();
				
			if(this.space != null)
				this.space.step(PhysicConstants.TIME_STEP);
				
			for(var i in this.blocks)
			{
				if(this.blocks[i] != null)
					this.blocks[i].update();
			}
		}
	},
	launch: function(){
		//17 milliseconds = 60 FPS
		setInterval(function(){Game.update()}, 8);
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

//Bind listeners on sockets.
io.sockets.on(Message.CONNECTION, function (socket){

	console.log('Connection to client established');
	
	//Room.
	socket.join(Game.id);
	
	var enemies = [];
	for(var i in Game.players)
		enemies.push(Game.players[i].toClient());
	
	var player = new Player(socket.id, Game.spawnX*(Game.connectingPlayers+1), Game.spawnY, Game.connectingPlayers);
	
	//Value initiating a player.
	var initData = {
		player: player.toClient(),
		enemies: enemies
	};
	
	Game.players[socket.id] = player;
	Game.connectingPlayers++;

	//Start initiation.
	socket.emit(Message.INIT, initData);

	//Continue when player connected.
	socket.on(Message.CONNECTED, function(){
		console.log('Connected player');
		Game.connectedPlayers++;		
		
		//Send connected player to others.
		for(var i in io.sockets.in(Game.id).sockets)
		{			
			if(i != socket.id)
				io.sockets.sockets[i].emit(Message.NEW_PLAYER, Game.players[socket.id].toClient());
		}
		
		if(Game.connectedPlayers == Game.maxPlayers)
		{
			//Init physic world.
			Game.createWorld();
			Game.launch();
		
			console.log('Game launching!');
			io.sockets.in(Game.id).emit(Message.LAUNCH);
			
			Game.ready = true;
		}
	});
	
	socket.on(Message.NEXT_BLOCK, function(command){
		//Do not override if server has given a special block to player (as a Spawn Block).
		if(!Game.players[socket.id].hasGivenBlock)
			Game.players[socket.id].currentBlock = command;
	});
	
	//Retrieving information from players.
	socket.on(Message.PUSH, function(inputs){
		Game.players[socket.id].keys = inputs;
	});
	
	//Sending information upon pull request.
	socket.on(Message.PULL, function(){
	
		var enemies = [];
		
		for(var i in Game.players)
		{
			if(i != socket.id && Game.players[i].isAlive)
				enemies.push(Game.players[i].toClient());
		}
		
		var blocks = [];
		for(var i in Game.blocks)
		{
			if(Game.blocks[i] != null)
				blocks.push(Game.blocks[i].toClient());
		}
		
		var data = {
			player: Game.players[socket.id].toClient(),
			enemies: enemies,
			blocks: blocks
		};
		
		socket.emit(Message.PULL, data);
	});
});

console.log('Server created');