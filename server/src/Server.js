//Create server.
var server = http.createServer(function(req, res){});

//Port.
server.listen(Constants.Network.SERVER_PORT); //localhost

//Remove log level or adjust it to have every log in console.
var io = require('socket.io').listen(server).set('log level', 1);

//Server object.
var Server = new function(){
	this.gameList = {};
	this.address = null;
	
	this.addGame = function(settings){	
		this.gameList[settings.id] = new Game(settings);
	};
		
	this.register = function(){
		var socket = require('socket.io-client').connect(Constants.Network.ADDRESS);
		
		//Get ip address.
		var os = require('os')

		var interfaces = os.networkInterfaces();

		for (k in interfaces) {
			for (k2 in interfaces[k]) {
				var address = interfaces[k][k2];
				
				if (address.family == 'IPv4' && !address.internal)
				{
					this.address = address.address;
						break;
				}
			}
			
			if(this.address != null)
				break;
		}
		
		//Lobby to game.
		socket.on(Constants.Message.START_GAME, function(settings){
		
			console.log('Creating game... ' + Server.address);
			
			var data = {
				gameId: settings.id,
				address: Server.address
			};
			
			//Create game.
			Server.addGame(new Game(settings));
			socket.emit(Constants.Message.GAME_CREATED, data);
		});
		
		this.socket = socket;
	};
};

Server.register();

//Bind listeners on sockets.
io.sockets.on(Constants.Message.CONNECTION, function (socket){

	console.log('Connection to client established');
		
	//Send information about enemies to the connecting player.
	socket.on(Constants.Message.JOIN_GAME, function(data){
	
		console.log('Connecting player... (' + data.gameId + ')');
		socket.join(data.gameId);
		
		var enemies = [];
		
		for(var i in Server.gameList[data.gameId].players)
			enemies.push(Server.gameList[data.gameId].players[i].toClient());
		
		//Create connecting player.
		var player = new Player(socket.id, 
								Server.gameList[data.gameId].width*0.2*(Server.gameList[data.gameId].connectingPlayers+1), 
								Server.gameList[data.gameId].spawnY, 
								data.color,
								Server.gameList[data.gameId]);
		
		//Value initiating a player.
		var initData = {
			player: player.toClient(),
			enemies: enemies
		};
		
		Server.gameList[data.gameId].players[socket.id] = player;
		Server.gameList[data.gameId].connectingPlayers++;

		//Start initiation.
		socket.emit(Constants.Message.INIT, initData);
	});

	//When player ready, refresh information of his opponents about his existence.
	socket.on(Constants.Message.PLAYER_READY, function(gameId){
		console.log('Player ready!');
		
		Server.gameList[gameId].connectedPlayers++;		
		
		//Send connected player to others.
		for(var i in io.sockets.in(gameId).sockets)
			if(i != socket.id)
				io.sockets.sockets[i].emit(Constants.Message.NEW_PLAYER, Server.gameList[gameId].players[socket.id].toClient());
		
		if(Server.gameList[gameId].connectedPlayers == Server.gameList[gameId].maxPlayers)
		{
			console.log('Game launching...');
			
			//Init physic world.
			Server.gameList[gameId].createWorld();
			Server.gameList[gameId].launch();
		
			var data = {
				goal: Server.gameList[gameId].goal.toClient(),
				width: Server.gameList[gameId].width,
				height: Server.gameList[gameId].height
			};
			
			data.goal.type = Server.gameList[gameId].goal.type;
			
			console.log('Game launched!');
			io.sockets.in(gameId).emit(Constants.Message.LAUNCH, data);
			
			Server.gameList[gameId].ready = true;
		}
	});
	
	socket.on(Constants.Message.NEXT_BLOCK, function(data){
		//Do not override if server has given a special block to player (as a Spawn Block).
		if(!Server.gameList[data.gameId].players[socket.id].hasGivenBlock)
			Server.gameList[data.gameId].players[socket.id].currentBlock = data.command;
	});
	
	//Retrieving information from players.
	socket.on(Constants.Message.PUSH, function(data){
		Server.gameList[data.gameId].push(data.inputs, socket.id);
	});
});

console.log('Server created');