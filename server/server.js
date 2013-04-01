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

var CollisionType = {
	STATIC: 0,
	PLAYER: 1,
	GROUND_SENSOR: 2
};

var Facing = {
	RIGHT:  0,
	LEFT: 1
};

//Constants
var PhysicConstants = {
	GRAVITY: -70,
	FRICTION: 0.99,
	MASS: 10,
	TIME_STEP: 1/30,
	FRICTION_FACTOR_ONGROUND: 0.9,
	TURN_FRICTION_FACTOR: 0.05
};

var PlayerConstants = {
	JUMP_POWER: 850,
	RUN_POWER_ONGROUND: 250,
	RUN_POWER_OFFGROUND: 15,
	WIDTH: 40,
	HEIGHT: 40,
	MAX_SPEED_FACTOR: 0.065
};

var http = require('http');
var chipmunk = require('chipmunk');

//Create server.
var server = http.createServer(function(req, res){});

//Port.
server.listen(80); //localhost

//Ground listener.
var GroundListener = {
	begin: function(arbiter, space){
	
		var player = (arbiter.body_a.userdata != null ? arbiter.body_a.userdata : arbiter.body_b.userdata);
		player.groundContact++;
	},
	separate: function(arbiter, space){
	
		var player = (arbiter.body_a.userdata != null ? arbiter.body_a.userdata : arbiter.body_b.userdata);
		player.groundContact--;
	}
};

//Server version of the player.
var Player = function(x, y, color){
	this.x = x;
	this.y = y;
	
	this.width = PlayerConstants.WIDTH;
	this.height = PlayerConstants.HEIGHT;
	
	this.groundContact = 0;
	this.doubleJumpEnabled = false;
	this.doubleJumpUsed = true;
	
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
			this.jump();
			
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
		this.body.setVel(new chipmunk.Vect(this.body.getVel().x, 0));
		this.body.applyImpulse(new chipmunk.Vect(0, PlayerConstants.JUMP_POWER), new chipmunk.Vect(0,0));
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
									
			var ground = new chipmunk.SegmentShape(this.space.staticBody,
													new chipmunk.Vect(0, 0),
													new chipmunk.Vect(this.width, 0),
													1);
			
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
				this.players[i].body = this.space.addBody(new chipmunk.Body(PhysicConstants.MASS, Infinity));
				this.players[i].body.setPos(new chipmunk.Vect(this.players[i].x, this.players[i].y));
									
				//Assign custom data to body.
				this.players[i].body.userdata = this.players[i];
									
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
	
	var player = new Player(spawnX*(Game.connectingPlayers+1), spawnY, Game.connectingPlayers);
	
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
	
	//Retrieving information from players.
	socket.on('push', function(inputs){
		Game.players[socket.id].keys = inputs;
	});
	
	//Sending information upon pull request.
	socket.on('pull', function(){
	
		var enemies = new Array();
		
		for(var i in Game.players)
		{
			if(i != socket.id)
				enemies.push(Game.players[i].toClient());
		}
		
		var data = {
			player: Game.players[socket.id].toClient(),
			enemies: enemies
		};
		
		socket.emit('pull', data);
	});
});

console.log('Server created');