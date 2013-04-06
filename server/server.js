//Enums
var Color = {
	RED: 0,
	BLUE: 1,
	YELLOW: 2,
	WHITE: 3,
	GREEN: 4,
	PURPLE: 5,
	ORANGE: 6,
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
	BLOCK: 3
};

var Facing = {
	RIGHT:  0,
	LEFT: 1
};

//Constants
var PhysicConstants = {
	GRAVITY: -90,
	FRICTION: 0.99,
	MASS_PLAYER: 10,
	MASS_BLOCK: 9999999,
	TIME_STEP: 1/30,
	FRICTION_FACTOR_ONGROUND: 0.9,
	TURN_FRICTION_FACTOR: 0.05
};

var PlayerConstants = {
	JUMP_POWER: 1050,
	RUN_POWER_ONGROUND: 250,
	RUN_POWER_OFFGROUND: 15,
	WIDTH: 40,
	HEIGHT: 40,
	MAX_SPEED_FACTOR: 0.08
};

var BlockConstants = {
	WIDTH: 80,
	HEIGHT: 20,
	LAUNCHING_SPEED: -50
};

//Modules.
var http = require('http');
var chipmunk = require('chipmunk');

//Create server.
var server = http.createServer(function(req, res){});

//Port.
server.listen(80); //localhost

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
		}
	}
};

var BlockListener = {
	begin: function(arbiter, space){
		var block = null;
		
		if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == UserDataType.BLOCK)
			block = arbiter.body_a.userdata.object;

		if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == UserDataType.BLOCK)
			block = arbiter.body_b.userdata.object;
			
		if(block != null)
			block.launched = false;
	}
};

//Server version of the block.
var Block = function(id, x, y, type, color){
	this.id = id;
	this.launched = false;
	
	this.width = BlockConstants.WIDTH;
	this.height = BlockConstants.HEIGHT;
	
	this.x = x;
	this.y = y;
	this.type = type;
	this.color = color;
	
	//Body creation.
	this.body = Game.space.addBody(new chipmunk.Body(PhysicConstants.MASS_BLOCK, Infinity));
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
						
	//Assign custom data to body.
	this.body.userdata = {
		type: UserDataType.BLOCK,
		object: this
	};
						
	//Create a shape associated with the body.
	var shape = Game.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	shape.setCollisionType(CollisionType.BLOCK);
	shape.setFriction(1);
			
	this.launch = function(){
		this.body.setVel(new chipmunk.Vect(0, BlockConstants.LAUNCHING_SPEED));
		this.launched = true;
	};
	
	this.toClient = function(){
		return {
			id: this.id,
			x: this.body.getPos().x,
			y: this.body.getPos().y,
			type: this.type,
			color: this.color
		};
	};
};

//Server version of the player.
var Player = function(id, x, y, color){
	this.id = id;
	this.x = x;
	this.y = y;
	
	this.width = PlayerConstants.WIDTH;
	this.height = PlayerConstants.HEIGHT;
	
	this.groundContact = 0;
	this.doubleJumpEnabled = false;
	this.doubleJumpUsed = true;
	
	this.currentBlock = BlockType.NEUTRAL;
	
	this.facing = Facing.RIGHT;
	
	this.color = color;
	this.keys = {
		right: false,
		left: false,
		jump: false
	};
	
	//Physic body.
	this.body = null;
	
	this.update = function(){
		
		this.x = this.body.getPos().x;
		this.y = this.body.getPos().y;
		
		var nextX = 0;
		var impulse = 0;
		
		if(this.keys.right || this.keys.left)
		{
			var factor = Math.abs(this.body.getVel().x*PlayerConstants.MAX_SPEED_FACTOR);
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
	};
	
	this.turn = function(){
		this.body.setVel(new chipmunk.Vect(this.body.getVel().x*PhysicConstants.TURN_FRICTION_FACTOR, this.body.getVel().y));
	};
	
	this.jump = function(){
		this.body.setVel(new chipmunk.Vect(this.body.getVel().x, 0));
		this.body.applyImpulse(new chipmunk.Vect(0, PlayerConstants.JUMP_POWER), new chipmunk.Vect(0,0));
	};
	
	this.doubleJump = function(){
		this.jump();
		
		//Create a block and launch it.
		var block = new Block(Game.blockSequence, 
							  this.x, 
							  this.y - (PlayerConstants.HEIGHT*0.5 + BlockConstants.HEIGHT*0.5) - 5, 
							  this.currentBlock, 
							  (this.currentBlock != BlockType.NEUTRAL ? this.color : null));
		Game.blocks.push(block);
		block.launch();
		Game.blockSequence++;
		
		//Emit the new block to all players and ask for next block of current player.
		io.sockets.in(Game.id).emit('newBlock', block.toClient());
		io.sockets.sockets[this.id].emit('nextBlock');
		
		this.doubleJumpUsed = true;
		this.doubleJumpEnabled = false;
	};
	
	this.toClient = function(){
		return {
			x: this.x,
			y: this.y,
			color: this.color
		};
	};
};

//Game container server-side.
var Game = {
	id: 1,
	players: [],
	blocks: [],
	blockSequence: 0,
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
			this.space.addCollisionHandler(CollisionType.GROUND_SENSOR, 
										   CollisionType.BLOCK, 
										   function(arbiter, space){ GroundListener.begin(arbiter, space);}, 
										   null, 
										   null, 
										   function(arbiter, space){GroundListener.separate(arbiter, space);});						   
									
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
			
			//Set friction on 3.
			ground.setFriction(PhysicConstants.FRICTION);
			
			this.space.addShape(ground);
			this.space.addShape(leftWall);
			this.space.addShape(rightWall);			
				
			var groundSensorHalfWidth = PlayerConstants.WIDTH*0.33;
			var playerHalfHeight = PlayerConstants.HEIGHT*0.5;
			var groundSensorHeight = 2;
				
			//Add players.
			for(var i in this.players)
			{
				//Body creation.
				this.players[i].body = this.space.addBody(new chipmunk.Body(PhysicConstants.MASS_PLAYER, Infinity));
				this.players[i].body.setPos(new chipmunk.Vect(this.players[i].x, this.players[i].y));
									
				//Assign custom data to body.
				this.players[i].body.userdata = {
					type: UserDataType.PLAYER,
					object: this.players[i]
				};
									
				//Create a shape associated with the body.
				var shape = this.space.addShape(chipmunk.BoxShape(this.players[i].body, this.players[i].width, this.players[i].height));
				shape.setCollisionType(CollisionType.PLAYER);
				
				//Add ground sensor.
				var groundSensor = this.space.addShape(chipmunk.BoxShape2(this.players[i].body, 
																			new chipmunk.BB(-(groundSensorHalfWidth), 
																							-(playerHalfHeight+groundSensorHeight), 
																							(groundSensorHalfWidth), 
																							-(playerHalfHeight))))
				groundSensor.setCollisionType(CollisionType.GROUND_SENSOR);
				groundSensor.sensor = true;
			}
		}
	},
	update: function() {
		//When world's ready...
		if(this.ready)
		{	
			for(var i in io.sockets.in(this.id).sockets)
				this.players[i].update();
				
			if(this.space != null)
				this.space.step(PhysicConstants.TIME_STEP);
		}
	},
	addBlock: function(command){
	
	},
	deleteBlock: function(id){
	
	}
};

var spawnX = 100;
var spawnY = 100;

//Remove log level or adjust it to have every log in console.
var io = require('socket.io').listen(server).set('log level', 1);

//Bind listeners on sockets.
io.sockets.on('connection', function (socket){

	console.log('Connection to client established');
	
	//Room.
	socket.join(Game.id);
	
	var enemies = [];
	for(var i in Game.players)
		enemies.push(Game.players[i].toClient());
	
	var player = new Player(socket.id, spawnX*(Game.connectingPlayers+1), spawnY, Game.connectingPlayers);
	
	//Value initiating a player.
	var initData = {
		player: player.toClient(),
		enemies: enemies
	};
	
	Game.players[socket.id] = player;
	Game.connectingPlayers++;

	//Start initiation.
	socket.emit('init', initData);

	//Continue when player connected.
	socket.on('connected', function(){
		console.log('Connected player');
		Game.connectedPlayers++;		
		
		//Send connected player to others.
		for(var i in io.sockets.in(Game.id).sockets)
		{			
			if(i != socket.id)
				io.sockets.sockets[i].emit('newPlayer', Game.players[socket.id].toClient());
		}
		
		if(Game.connectedPlayers == Game.maxPlayers)
		{
			//Init physic world.
			Game.createWorld();
			setInterval(function(){Game.update()}, 17);
		
			console.log('Game launching!');
			io.sockets.in(Game.id).emit('launch');
			
			Game.ready = true;
		}
	});
	
	socket.on('nextBlock', function(command){
		Game.players[socket.id].currentBlock = command;
	});
	
	//Retrieving information from players.
	socket.on('push', function(inputs){
		Game.players[socket.id].keys = inputs;
	});
	
	//Sending information upon pull request.
	socket.on('pull', function(){
	
		var enemies = [];
		
		for(var i in Game.players)
		{
			if(i != socket.id)
				enemies.push(Game.players[i].toClient());
		}
		
		var blocks = [];
		for(var i in Game.blocks)
			blocks.push(Game.blocks[i].toClient());
		
		var data = {
			player: Game.players[socket.id].toClient(),
			enemies: enemies,
			blocks: blocks
		};
		
		socket.emit('pull', data);
	});
});

console.log('Server created');