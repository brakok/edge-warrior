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
			io.sockets.in(Game.id).emit(Message.LAUNCH, Game.goal.toClient());
			
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
		Game.push(inputs, socket.id);
	});
	
	//Sending information upon pull request.
	socket.on(Message.PULL, function(){
		var data = Game.pull(socket.id);
		socket.emit(Message.PULL, data);
	});
});

console.log('Server created');