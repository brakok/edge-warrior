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
			Server.addGame(settings);
			socket.emit(Constants.Message.GAME_CREATED, data);
		});
		
		this.socket = socket;
	};
	
	//Disconnect player.
	this.disconnectPlayer = function(socket){
		console.log('Player left (' + socket.userdata.gameId + ') : ' + socket.userdata.username);
		
		var game = this.gameList[socket.userdata.gameId];
		var index = null;
		
		for(var i in game.players)
			if(game.players[i].username == socket.userdata.username)
			{
				index = i;
				break;
			}
			
		socket.broadcast.to(socket.userdata.gameId).emit(Constants.Message.DISCONNECT_PLAYER, socket.userdata.username);	
		
		if(index != null)
		{
			var disconnectingPlayer = this.gameList[socket.userdata.gameId].players[index]
			disconnectingPlayer.leave();
			io.sockets.sockets[disconnectingPlayer.id].gameId = null;
			
			delete this.gameList[socket.userdata.gameId].players[index];
			
			var hasPlayers = false;
			
			//Check if game has players.
			for(var i in this.gameList[socket.userdata.gameId].players)
				if(this.gameList[socket.userdata.gameId].players[i] != null)
				{
					hasPlayers = true;
					break;
				}
			
			//Remove game instance if empty.
			if(!hasPlayers)
			{
				this.gameList[socket.userdata.gameId].trash();
				delete this.gameList[socket.userdata.gameId];
			}
		}
	};
	
	this.register();
};

//Bind listeners on sockets.
io.sockets.on(Constants.Message.CONNECTION, function (socket){
	socket.set("heartbeat interval", 20);
	socket.set("heartbeat timeout", 60);

	console.log('Connection to client established');
		
	//Socket disconnected.
	socket.on(Constants.Message.DISCONNECT, function(){
		console.log('Disconnect : ' + socket.userdata.gameId);
		if(socket.userdata != null && socket.userdata.gameId != null && Server.gameList[socket.userdata.gameId] != null)
			Server.disconnectPlayer(socket);
	});
		
	//Send information about enemies to the connecting player.
	socket.on(Constants.Message.JOIN_GAME, function(data){
	
		console.log('Connecting player... (' + data.gameId + ') : ' + data.username);
		socket.join(data.gameId);
		
		socket.userdata = {
			gameId: data.gameId,
			username: data.username
		};
		
		var enemies = [];
		
		for(var i in Server.gameList[data.gameId].players)
		{
			var enemy = Server.gameList[data.gameId].players[i].toClient();
			enemy.username = Server.gameList[data.gameId].players[i].username;
			enemies.push(enemy);
		}
		
		var color = null;
		for(var i in Server.gameList[data.gameId].playerInfos)
			if(Server.gameList[data.gameId].playerInfos[i].username == data.username)
				color = Server.gameList[data.gameId].playerInfos[i].color-1;
		
		//Create connecting player.
		var player = new Player(socket.id, 
								data.username,
								Server.gameList[data.gameId].width*0.2*(Server.gameList[data.gameId].connectingPlayers+1), 
								Server.gameList[data.gameId].spawnY, 
								color,
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
	
	//Disconnect player.
	socket.on(Constants.Message.DISCONNECT_PLAYER, function(){
		Server.disconnectPlayer(socket);
	});

	//When player ready, refresh information of his opponents about his existence.
	socket.on(Constants.Message.PLAYER_READY, function(){
		var gameId = socket.userdata.gameId;
		
		console.log('Player ready! (' + gameId + ')');
		
		Server.gameList[gameId].connectedPlayers++;		
		
		var player = Server.gameList[gameId].players[socket.id].toClient();
		player.username = Server.gameList[gameId].players[socket.id].username;
		
		//Send connected players to others.
		socket.broadcast.to(gameId).emit(Constants.Message.NEW_PLAYER, player);
		
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
	
	socket.on(Constants.Message.NEXT_BLOCK, function(command){
		//Do not override if server has given a special block to player (as a Spawn Block).
		if(!Server.gameList[socket.userdata.gameId].players[socket.id].hasGivenBlock)
			Server.gameList[socket.userdata.gameId].players[socket.id].currentBlock = command;
	});
	
	//Retrieving information from players.
	socket.on(Constants.Message.PUSH, function(inputs){
		if(socket.userdata.gameId != null)
			Server.gameList[socket.userdata.gameId].push(inputs, socket.id);
	});
});

console.log('Server created');