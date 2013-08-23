//Create server.
var masterServer = {
	client: null,
	server: null
};

masterServer.client = http.createServer(function(req, res){});
masterServer.server = http.createServer(function(req, res){});

//Port.
masterServer.client.listen(Constants.Network.MASTER_PORT); //localhost
masterServer.server.listen(Constants.Network.SERVER_TO_SERVER_PORT);

//Remove log level or adjust it to have every log in console.
var ioMasterClient = require('socket.io').listen(masterServer.client).set('log level', 1);
var ioMasterServer = require('socket.io').listen(masterServer.server).set('log level', 1);

var MasterServer = new function(){
	this.lobbies = {};
	this.gameSequenceId = 1;
};

//Bind listeners on sockets.
//Server to client.
ioMasterClient.sockets.on(Constants.Message.CONNECTION, function (socket){

	console.log('Connection to client established - Master');

	//Return lobbies to client.
	socket.on(Constants.Message.SEARCH_LOBBY, function(){
	
		var lobbies = [];
		
		for(var i in MasterServer.lobbies)
			if(MasterServer.lobbies[i] != null)
				lobbies.push(MasterServer.lobbies[i].toClient());
	
		socket.emit(Constants.Message.SEARCH_LOBBY, lobbies);
	});
	
	//Send game id to player.
	socket.on(Constants.Message.CREATE_LOBBY, function(username){
			
		console.log('Lobby created (' + MasterServer.gameSequenceId + ')');
		MasterServer.lobbies[MasterServer.gameSequenceId] = new Lobby(MasterServer.gameSequenceId, username);
		
		socket.emit(Constants.Message.CREATE_LOBBY, MasterServer.gameSequenceId);
		socket.join(MasterServer.gameSequenceId);
		
		MasterServer.gameSequenceId++;
	});
	
	//Join a lobby.
	socket.on(Constants.Message.JOIN_LOBBY, function(data){
		
		if(MasterServer.lobbies[data.gameId].connectedPlayers <= Constants.Game.MAX_PLAYERS)
		{
			console.log('Lobby joined (' + data.gameId + ') :' + data.username);
			MasterServer.lobbies[data.gameId].connectedPlayers++;
			MasterServer.lobbies[data.gameId].addPlayer(data.username, Enum.Slot.Color.UNASSIGNED);
			
			ioMasterClient.sockets.in(data.gameId).emit(Constants.Message.JOIN_LOBBY, data.username);
						
			var returnData = {
				gameId: data.gameId,
				players: MasterServer.lobbies[data.gameId].toClient().players
			};
			
			//Join the room.
			socket.join(data.gameId);
			socket.emit(Constants.Message.CONNECTED_LOBBY, returnData);
		}
	});
	
	//Disconnect from lobby.
	socket.on(Constants.Message.LEAVE_LOBBY, function(data){
		console.log(data.username + ' left lobby (' + data.gameId + ')');
		
		//Remove player from lobby.
		MasterServer.lobbies[data.gameId].removePlayer(data.username);		
		
		socket.leave(data.gameId);
		
		for(var i in ioMasterClient.sockets.in(data.gameId).sockets)
			if(i != socket.id)
				ioMasterClient.sockets.sockets[i].emit(Constants.Message.LEAVE_LOBBY, data.username);
	});
	
	//Close lobby.
	socket.on(Constants.Message.CLOSE_LOBBY, function(gameId){
		console.log('Lobby closed (' + gameId + ')');
						
		//Disconnect all players from game room.
		for(var i in ioMasterClient.sockets.in(gameId).sockets)
		{			
			if(i != socket.id)
				ioMasterClient.sockets.sockets[i].emit(Constants.Message.CLOSE_LOBBY, gameId);
				
			ioMasterClient.sockets.sockets[i].leave(gameId);
		}
		
		delete MasterServer.lobbies[gameId];
	});
	
	//Lobby to game.
	socket.on(Constants.Message.START_GAME, function(gameId){
		
		if(ioMasterServer.sockets.clients().length > 0)
		{
			var index = Math.round(Math.random()*(ioMasterServer.sockets.clients().length-1));
			var count = 0;
			
			var serverSocket = null;
			var socketId = null;
			
			for(var i in ioMasterServer.sockets.sockets)
			{
				if(count == index)
				{
					serverSocket = ioMasterServer.sockets.sockets[i];
					break;
				}
				
				count++;
			}

			//Ask specified server to create a game.
			if(serverSocket != null)
			{
				console.log('Server found : ' + serverSocket.manager.handshaken[serverSocket.id].address.address);
				MasterServer.lobbies[gameId].settings.maxPlayers = MasterServer.lobbies[gameId].settings.connectedPlayers;
				
				serverSocket.emit(Constants.Message.START_GAME, MasterServer.lobbies[gameId].settings);
			}
			else
				console.log('No server socket found');
		}
		else
			console.log('No server found');
	});
});

//Server to server.
ioMasterServer.sockets.on(Constants.Message.CONNECTION, function (socket){
	
	console.log('Server connected : ' + socket.manager.handshaken[socket.id].address.address);
	
	//Send to client ip address for their game server.
	socket.on(Constants.Message.GAME_CREATED, function(data){
		console.log('Game created : ' + data.gameId);
		ioMasterClient.sockets.in(data.gameId).emit(Constants.Message.GAME_CREATED, 'http://' + data.address + ':' + Constants.Network.SERVER_PORT);
	});
});

console.log('Master server created');