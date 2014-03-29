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
		
		delete this.lobbies[socket.userdata.gameId];
	};
	
	//Search socket bound to a player currently logged in.
	this.searchPlayer = function(username){
	
		for(var i in ioMasterClient.sockets.sockets)
		{
			var currentSocket = ioMasterClient.sockets.sockets[i];
			
			if(currentSocket.userdata && currentSocket.userdata.username == username)
				return currentSocket;
		}
			
		return null;
	};
		
	this.disconnectPlayer = function(socket){
		if(socket.userdata.gameId != null)
		{
			console.log(socket.userdata.username + ' left lobby (' + socket.userdata.gameId + ')');
			
			//Remove player from lobby.
			this.lobbies[socket.userdata.gameId].settings.removePlayer(socket.userdata.username);
			this.lobbies[socket.userdata.gameId].connectedPlayers--;
			
			socket.broadcast.to(socket.userdata.gameId).emit(Constants.Message.LEAVE_LOBBY, socket.userdata.username);
			socket.leave(socket.userdata.gameId);
		}
	};
	
	//Check for game servers.
	setInterval(function(){

		for(var i in ioMasterServer.sockets.sockets)
		{
			var serverSocket = ioMasterServer.sockets.sockets[i];
			var timeElapsed = new Date() - serverSocket.lastPresence;
			
			if(timeElapsed > Constants.Network.SERVER_THRESHOLD)
			{
				console.log('Server kicked out : ' + serverSocket.manager.handshaken[serverSocket.id].address.address);
				ioMasterServer.sockets.sockets[i].disconnect();
			}
				
		}
			
		
	}, Constants.Network.CHECK_GAME_SERVER);
};

//Bind listeners on sockets.
//Server to client.
ioMasterClient.sockets.on(Constants.Message.CONNECTION, function (socket){
	socket.set("heartbeat interval", 20);
	socket.set("heartbeat timeout", 60);

	console.log('Connection to client established - Master');

	//Authenticate.
	socket.on(Constants.Message.LOGIN, function(profile){
		
		console.log('Player connecting : ' + profile.username);
		
		Account.authenticate(profile, function(errors){
			
			var player = MasterServer.searchPlayer(profile.username);
			
			if(player != null)
				errors.push('User already logged in.');
			
			//Set userdata.
			if(!errors || errors.length == 0)
				socket.userdata = {
					username: profile.username,
					gameId: null
				};

			socket.emit(Constants.Message.LOGIN, errors);
		});
	});
	
	//Send user stats to client.
	socket.on(Constants.Message.REFRESH_STATS, function(username){
		console.log(username + ' getting stats');

		Account.getStats(username, function(stats){
			socket.emit(Constants.Message.GET_STATS, stats);
		});
	});
	
	//Logout.
	socket.on(Constants.Message.LOGOUT, function(username){
		delete socket.userdata;	
	});
	
	//Create an account.
	socket.on(Constants.Message.CREATE_ACCOUNT, function(profile){
		
		console.log('Creating account : ' + profile.username);
			
		Account.create(profile, function(errors){
			socket.emit(Constants.Message.CREATE_ACCOUNT, errors);
		});
	});
	
	//Change password.
	socket.on(Constants.Message.CHANGE_PASSWORD, function(data){
	
		console.log('Change password : ' + data.profile.username);
		
		Account.changePassword(data.profile, data.oldPassword, data.newPassword, data.confirmation, function(errors){
			socket.emit(Constants.Message.CHANGE_PASSWORD, errors);
		});
	});
	
	//Reset password.
	socket.on(Constants.Message.RESET_PASSWORD, function(data){
	
		console.log('Reset password : ' + data.profile.username);
		
		Account.resetPassword(data.profile, data.email, function(errors){
			socket.emit(Constants.Message.RESET_PASSWORD, errors);
		});
	});
	
	//Socket disconnected.
	socket.on(Constants.Message.DISCONNECT, function(){
		if(socket.userdata != null && socket.userdata.gameId != null && MasterServer.lobbies[socket.userdata.gameId] != null)
		{
			if(MasterServer.lobbies[socket.userdata.gameId].hostId == socket.id)
				MasterServer.closeLobby(socket);
			else
				MasterServer.disconnectPlayer(socket);
		}
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
		console.log('Lobby created (' + MasterServer.gameSequenceId + ') : ' + username);
		MasterServer.lobbies[MasterServer.gameSequenceId] = new Lobby(MasterServer.gameSequenceId, socket.id, username);
		
		socket.emit(Constants.Message.CREATE_LOBBY, MasterServer.gameSequenceId);
		socket.join(MasterServer.gameSequenceId);
		
		//Set game id into socket userdata.
		socket.userdata.gameId = MasterServer.gameSequenceId;
		
		MasterServer.gameSequenceId++;
	});
	
	//Join a lobby.
	socket.on(Constants.Message.JOIN_LOBBY, function(data){
		
		//If lobby no more exists, prevent from joining.
		if(MasterServer.lobbies[data.gameId] == null)
		{
			socket.emit(Constants.Message.ERROR, Constants.ErrorMessage.INVALID_LOBBY);
			return;
		}
		
		if(MasterServer.lobbies[data.gameId].connectedPlayers < Constants.Game.MAX_PLAYERS)
		{
			console.log('Lobby joined (' + data.gameId + ') :' + data.username);

			MasterServer.lobbies[data.gameId].connectedPlayers++;
			MasterServer.lobbies[data.gameId].settings.addPlayer(data.username, Enum.Slot.Color.UNASSIGNED);
			
			ioMasterClient.sockets.in(data.gameId).emit(Constants.Message.JOIN_LOBBY, data.username);
						
			var returnData = {
				gameId: data.gameId,
				name: MasterServer.lobbies[data.gameId].name,
				players: MasterServer.lobbies[data.gameId].settings.players
			};
			
			//Join the room.
			socket.join(data.gameId);
			socket.userdata.gameId = data.gameId;
			
			socket.emit(Constants.Message.CONNECTED_LOBBY, returnData);
		}
		else
			socket.emit(Constants.Message.ERROR, Constants.ErrorMessage.INVALID_LOBBY);
	});
	
	//Disconnect from lobby.
	socket.on(Constants.Message.LEAVE_LOBBY, function(){
		MasterServer.disconnectPlayer(socket);
	});
	
	//Close lobby.
	socket.on(Constants.Message.CLOSE_LOBBY, function() {
		MasterServer.closeLobby(socket);
	});
	
	//When player updates his slot info.
	socket.on(Constants.Message.UPDATE_SLOT, function(data){
		MasterServer.lobbies[socket.userdata.gameId].settings.updatePlayer(socket.userdata.username, data.color, data.ready);
		
		data.username = socket.userdata.username;
		socket.broadcast.to(socket.userdata.gameId).emit(Constants.Message.UPDATE_SLOT, data);
	});
	
	//Update lobby informations.
	socket.on(Constants.Message.UPDATE_LOBBY, function(data){
		var lobby = MasterServer.lobbies[socket.userdata.gameId];
		lobby.update(data);
		
		socket.broadcast.to(socket.userdata.gameId).emit(Constants.Message.UPDATE_LOBBY, data);
	});
	
	//Lobby to game.
	socket.on(Constants.Message.START_GAME, function(gameSettings){
		
		//Tweaks some informations.
		MasterServer.lobbies[socket.userdata.gameId].settings.maxPlayers = MasterServer.lobbies[socket.userdata.gameId].connectedPlayers;
		MasterServer.lobbies[socket.userdata.gameId].settings.validateColors();	
		MasterServer.lobbies[socket.userdata.gameId].settings.update(gameSettings);
		
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
	
	//Send external ip address to game server.
	socket.emit(Constants.Message.HANDSHAKE_INFO, { address: socket.manager.handshaken[socket.id].address.address });
	
	socket.lastPresence = new Date();
	
	//Get pinged from game server.
	socket.on(Constants.Message.KEEP_SERVER_ALIVE, function(){
		socket.lastPresence = new Date();
	});
	
	//Send to client ip address for their game server.
	socket.on(Constants.Message.GAME_CREATED, function(data){
		console.log('Game created : ' + data.gameId);
		
		delete MasterServer.lobbies[data.gameId];
		ioMasterClient.sockets.in(data.gameId).emit(Constants.Message.GAME_CREATED, 'http://' + data.address + ':' + Constants.Network.SERVER_PORT);
	});
});

console.log('Master server created');