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

//Server version of the player.
var Player = function(x, y, color){
	this.x = x;
	this.y = y;
	this.color = color;
	this.keys = {
		right: false,
		left: false,
		jump: false
	};
	
	//Physic shape.
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
			
		if(this.keys.jump)
			nextY += 100;
		
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
			
			//TODO: add ground sensor callback.
			//this.space.addCollisionHandler(CollisionType.STATIC, CollisionType.GROUND_SENSOR, begin, preSolve, postSolve, separate)
									
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
			leftWall.setFriction(PhysicConstants.FRICTION);
			rightWall.setFriction(PhysicConstants.FRICTION);
			
			this.space.addShape(ground);
			this.space.addShape(leftWall);
			this.space.addShape(rightWall);
						
			//Add players.
			for(var i in this.players)
			{
				//Body creation.
				this.players[i].body = this.space.addBody(new chipmunk.Body(PhysicConstants.MASS, Infinity));
				this.players[i].body.setPos(new chipmunk.Vect(this.players[i].x, this.players[i].y));
				
				//Create a shape associated with the body.
				var shape = this.space.addShape(new chipmunk.BoxShape(this.players[i].body, 40, 40));
				shape.setFriction(PhysicConstants.FRICTION);
				shape.setCollisionType(1);
				
				//TODO: Add ground sensor.
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