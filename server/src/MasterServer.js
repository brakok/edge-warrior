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
	
	this.closeLobby = function(socket){
		console.log('Lobby closed (' + socket.userdata.gameId + ')');
						
		socket.broadcast.to(socket.userdata.gameId).emit(Constants.Message.CLOSE_LOBBY, socket.userdata.gameId);
		
		//Disconnect all players from game room.
		for(var i in ioMasterClient.sockets.in(socket.userdata.gameId).sockets)			
			ioMasterClient.sockets.sockets[i].leave(socket.userdata.gameId);
		
		delete MasterServer.lobbies[socket.userdata.gameId];
	};
};

//Bind listeners on sockets.
//Server to client.
ioMasterClient.sockets.on(Constants.Message.CONNECTION, function (socket){
	socket.set("heartbeat interval", 20);
	socket.set("heartbeat timeout", 60);

	console.log('Connection to client established - Master');

	//Socket disconnected.
	socket.on(Constants.Message.DISCONNECT, function(){
		if(socket.userdata.gameId != null && MasterServer.lobbies[socket.userdata.gameId] != null)
			MasterServer.closeLobby(socket);
	});
	
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
		socket.userdata = { 
			gameId: MasterServer.gameSequenceId
		};
		
		MasterServer.gameSequenceId++;
	});
	
	//Join a lobby.
	socket.on(Constants.Message.JOIN_LOBBY, function(data){
		
		if(MasterServer.lobbies[data.gameId].connectedPlayers <= Constants.Game.MAX_PLAYERS)
		{
			console.log('Lobby joined (' + data.gameId + ') :' + data.username);
			MasterServer.lobbies[data.gameId].connectedPlayers++;
			MasterServer.lobbies[data.gameId].settings.addPlayer(data.username, Enum.Slot.Color.UNASSIGNED);
			
			ioMasterClient.sockets.in(data.gameId).emit(Constants.Message.JOIN_LOBBY, data.username);
						
			var returnData = {
				gameId: data.gameId,
				players: MasterServer.lobbies[data.gameId].settings.players
			};
			
			//Join the room.
			socket.join(data.gameId);
			socket.userdata = {
				gameId: data.gameId
			};
			
			socket.emit(Constants.Message.CONNECTED_LOBBY, returnData);
		}
	});
	
	//Disconnect from lobby.
	socket.on(Constants.Message.LEAVE_LOBBY, function(username){
		if(socket.userdata.gameId != null)
		{
			console.log(username + ' left lobby (' + socket.userdata.gameId + ')');
			
			//Remove player from lobby.
			MasterServer.lobbies[socket.userdata.gameId].settings.removePlayer(username);		
			
			socket.broadcast.to(socket.userdata.gameId).emit(Constants.Message.LEAVE_LOBBY, username);
			socket.leave(socket.userdata.gameId);
		}
	});
	
	//Close lobby.
	socket.on(Constants.Message.CLOSE_LOBBY, function() {
		MasterServer.closeLobby(socket);
	});
	
	//When player updates his slot info.
	socket.on(Constants.Message.UPDATE_SLOT, function(data){
	
		MasterServer.lobbies[socket.userdata.gameId].settings.updatePlayer(data.username, data.color, data.ready);
		socket.broadcast.to(socket.userdata.gameId).emit(Constants.Message.UPDATE_SLOT, data);
	});
	
	//Lobby to game.
	socket.on(Constants.Message.START_GAME, function(){
		
		//Tweaks some informations.
		MasterServer.lobbies[socket.userdata.gameId].settings.maxPlayers = MasterServer.lobbies[socket.userdata.gameId].connectedPlayers;
		MasterServer.lobbies[socket.userdata.gameId].settings.validateColors();		
		
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
				serverSocket.emit(Constants.Message.START_GAME, MasterServer.lobbies[socket.userdata.gameId].settings);
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
		
		delete MasterServer.lobbies[data.gameId];
		ioMasterClient.sockets.in(data.gameId).emit(Constants.Message.GAME_CREATED, 'http://' + data.address + ':' + Constants.Network.SERVER_PORT);
	});
});

console.log('Master server created');