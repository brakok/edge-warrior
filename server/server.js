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

var assignColor = [];
assignColor[0] = Color.RED;
assignColor[1] = Color.BLUE;
assignColor[2] = Color.YELLOW;
assignColor[3] = Color.WHITE;


var http = require('http');

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
};

//Game container server-side.
var Game = {
	id: 1,
	players: [],
	blocks: []
};

var connectedPlayers = 0;
var spawnX = 100;
var spawnY = 100;

//Remove log level or adjust it to have every log in console.
var io = require('socket.io').listen(server).set('log level', 1);

//Bind listeners on sockets.
io.sockets.on('connection', function (socket){

	console.log('Connection to client established');
	
	//Room.
	socket.join(Game.id);
	
	var initData = {
		player: new Player(spawnX*(connectedPlayers+1), spawnY, assignColor[connectedPlayers]),
		enemies: Game.players
	};
	
	//TODO: Broadcast needed information to all players at the beginning.
	socket.emit('init', initData);
	Game.players[socket.id] = initData.player;

	socket.on('connected', function(){
		console.log('Connected player');
		connectedPlayers++;		
		
		//Send connected player to others.
		for(var i in io.sockets.in(Game.id).sockets)
		{			
			if(i != socket.id)
				io.sockets.sockets[i].emit('newPlayer', Game.players[socket.id]);
		}
		
		if(connectedPlayers == 2)
		{
			console.log('Game launching!');
			io.sockets.in(Game.id).emit('launch');
			connectedPlayers = 0;
		}
	});
	
	//Retrieving information from players.
	socket.on('push', function(inputs){

		console.log(Game.players[socket.id].color + ': ' + inputs.right);
	});
	
	//Sending information upon pull request.
	socket.on('pull', function(){
	
		var enemies = new Array();
		
		for(var i in Game.players)
		{
			if(i != socket.id)
			{
				enemies.push(Game.players[i]);
			}
		}
		
		var data = {
			player: Game.players[socket.id],
			enemies: enemies
		};
		
		socket.emit('pull', data);
	});
});

console.log('Server created');