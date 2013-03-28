var http = require('http');

//Create server.
var server = http.createServer(function(req, res){
	res.writeHead(200, {'Content-type' : 'text/plain'});
	res.end('Hello World');
});

//Port.
server.listen(80); //localhost

//Server version of the player.
var Player = function(id, x, y, color){
	this.id = id
	this.x = x;
	this.y = y;
	this.color = color;
};

//Initiation data.
var initData = {
	you: new Player(1, 150, 150, 'red'),
	enemies:[new Player(2, 150, 300, 'blue')]
};

//Game container server-side.
var EWServer = {
	players: new Array(),
	blocks: new Array()
};

//Remove log level or adjust it to have every log in console.
var io = require('socket.io').listen(server).set('log level', 1);

//Bind listeners on sockets.
io.sockets.on('connection', function (socket){

	console.log('Connection to client established');
	
	//TODO: Broadcast needed information to all players at the beginning.
	socket.emit('init', initData);
	
	socket.on('init', function(player){
		console.log('Incoming player');
		EWServer.players.push(player);
	});
	
	//Retrieving information from players.
	socket.on('push', function(player){
		for(var i in EWServer.players)
		{
			if(EWServer.players[i].color == player.color)
				EWServer.players[i] = player;
		}
	});
	
	//Sending information upon pull request.
	socket.on('pull', function(){
		socket.emit('pull', EWServer.players[0]);
	});
});

console.log('Server created');