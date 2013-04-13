//Modules.
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