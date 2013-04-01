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

//Constants
var PhysicConstants = {
	FRICTION: 0.99,
	MASS: 10,
	TIME_STEP: 1/30
};

var CollisionType = {
	STATIC: 0,
	PLAYER: 1,
	GROUND_SENSOR: 2
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
	
	this.width = 40;
	this.height = 40;
	
	this.groundContact = 0;
	
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
		var nextY = 0;
		
		if(this.keys.right)
			nextX += 40;
			
		if(this.keys.left)
			nextX -= 40;
			
		if(this.keys.jump && this.groundContact > 0)
			nextY += 350;
		
		if(nextX != 0 || nextY != 0)
			this.body.applyImpulse(new chipmunk.Vect(nextX, nextY), new chipmunk.Vect(0,0));
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
			this.space.gravity = new chipmunk.Vect(0, -50);
			
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
				
			//Add players.
			for(var i in this.players)
			{
				//Body creation.
				this.players[i].body = this.space.addBody(new chipmunk.Body(PhysicConstants.MASS, Infinity));
				this.players[i].body.setPos(new chipmunk.Vect(this.players[i].x, this.players[i].y));
									
				this.players[i].body.userdata = this.players[i];
									
				//Create a shape associated with the body.
				var shape = this.space.addShape(chipmunk.BoxShape(this.players[i].body, this.players[i].width, this.players[i].height));
				shape.setFriction(PhysicConstants.FRICTION);
				shape.setCollisionType(CollisionType.PLAYER);
				
				var groundSensorHalfWidth = (this.players[i].width*0.33);
				var playerHalfHeight = this.players[i].height*0.5;
				var groundSensorHeight = 2;
				
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