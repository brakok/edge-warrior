//Enum of possible colors.
var Color = {
	RED: 'red',
	BLUE: 'blue',
	YELLOW: 'yellow',
	WHITE: 'white',
	GREEN: 'green',
	PURPLE: 'purple',
	ORANGE: 'orange',
	BLACK: 'black'
};

//Used to assign a color.
var assignColor = [];
assignColor[0] = Color.RED;
assignColor[1] = Color.BLUE;
assignColor[2] = Color.YELLOW;
assignColor[3] = Color.WHITE;

var http = require('http');
var chipmunk = require('chipmunk');

//Create server.
var server = http.createServer(function(req, res){
	res.writeHead(200, {'Content-type' : 'text/plain'});
	res.end('Hello World');
});

//Port.
server.listen(80); //localhost

//Server version of the player.
var Player = function(x, y, color){
	this.x = x;
	this.y = y;
	this.color = color;

	this.update = function(inputs){

		var nextX = 0;
		var nextY = 0;
		
		if(inputs.right)
			nextX += 5;
			
		if(inputs.left)
			nextX -= 5;
			
		if(inputs.jump)
			nextY += 5;
			
		this.x += nextX;
		this.y += nextY;
	};
};

//Game container server-side.
var Game = {
	id: 1,
	players: [],
	blocks: [],
	connectedPlayers: 0,
	connectingPlayers:0,
	maxPlayers: 2,
	keys: [],
	ready: false,
	space: null
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
		enemies.push(Game.players[i]);
	
	//Value initiating a player.
	var initData = {
		player: new Player(spawnX*(Game.connectingPlayers+1), spawnY, assignColor[Game.connectingPlayers]),
		enemies: enemies
	};
	
	Game.players[socket.id] = initData.player;
	Game.keys[socket.id] = {
		right: false,
		left: false,
		jump: false
	};
	
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
				io.sockets.sockets[i].emit('newPlayer', Game.players[socket.id]);
		}
		
		if(Game.connectedPlayers == Game.maxPlayers)
		{
			console.log('Game launching!');
			io.sockets.in(Game.id).emit('launch');
			
			Game.ready = true;
		}
	});
	
	//Retrieving information from players.
	socket.on('push', function(inputs){
		Game.keys[socket.id] = inputs;
	});
	
	//Sending information upon pull request.
	socket.on('pull', function(){
	
		var enemies = new Array();
		
		for(var i in Game.players)
		{
			if(i != socket.id)
				enemies.push(Game.players[i]);
		}
		
		var data = {
			player: Game.players[socket.id],
			enemies: enemies
		};
		
		socket.emit('pull', data);
	});
});

setInterval(function(){updateWorld(Game)}, 17);

//Game loop.
function updateWorld(game)
{
	//When world's ready...
	if(game.ready)
	{	
		/*
		//Create the physic world.
		if(game.space == null || game.space == 'undefined')
		{
			game.space = new Space();
			game.space.setGravity(new Vect(0, -10));
		}*/
			
		for(var i in io.sockets.in(game.id).sockets)
			game.players[i].update(game.keys[i]);
	}
}


console.log('Server created');