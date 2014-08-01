//Server object.
var Server = new function(){
	
	this.phase = Enum.Server.Phase.STAND_BY;
	this.lobby = null;
	this.game = null;
	
	this.masterSocket = null;
	this.clientSockets = null;
		
	this.closeLobby = function(socket){
		socket.broadcast.emit(Constants.Message.CLOSE_LOBBY);
		
		//Disconnect all players from lobby.
		for(var i in this.clientSockets.sockets.sockets)			
			this.clientSockets.sockets.sockets[i].disconnect();
		
		Server.phase = Enum.Server.Phase.STAND_BY;
		delete this.lobby;
	};
	
	this.connect = function(){
	
		var socketOptions = {
			'force new connection': true
		};
		
		//Connect to master server.
		var masterSocket = io.connect(Constants.Network.ADDRESS + ':' + Constants.Network.SERVER_TO_SERVER_PORT, socketOptions);
		
		//Return lobby infos when ask.
		masterSocket.on(Constants.Message.SEARCH_LOBBY, function(data){
			
			if(Server.phase == Enum.Server.Phase.LOBBY && Server.lobby && Server.lobby.connectedPlayers < Constants.Game.MAX_PLAYERS)
				masterSocket.emit(Constants.Message.SEARCH_LOBBY, {lobby: Server.lobby.toClient(), socketId: data.id});
		});
		
		this.masterSocket = masterSocket;
		
		console.log(chrome.sockets);
		
		//Wait for client to connect.
		var clientSockets = requirejs(['lib/socket.io/lib/socket.io', 'lib/socket.io/lib/transports/http'], function(io, http){
			srv = http.createServer(function(req, res){});
			srv.listen(Constants.Network.SERVER_PORT);
			return io.listen(srv);
		}); 
	
		clientSockets.sockets.on(Constants.Message.CONNECTION, function (socket){
		
			socket.set("heartbeat interval", 20);
			socket.set("heartbeat timeout", 60);
				
			//Socket disconnected.
			socket.on(Constants.Message.DISCONNECT, function(){
				Server.disconnectPlayer(socket);
			});
			
			//Send game id to player.
			socket.on(Constants.Message.CREATE_LOBBY, function(username){
				console.log('Lobby created : ' + username);	
				
				Server.lobby = new cd.Server.Lobby(socket.id, username);
				Server.phase = Enum.Server.Phase.LOBBY;
				
				socket.emit(Constants.Message.CREATE_LOBBY);
			});
			
			//Join a lobby.
			socket.on(Constants.Message.JOIN_LOBBY, function(data){
				
				//If lobby no longer exists, prevent from joining.
				if(!Server.lobby || Server.lobby.connectedPlayers >= Constants.Game.MAX_PLAYERS)
				{
					socket.emit(Constants.Message.ERROR, Constants.ErrorMessage.INVALID_LOBBY);
					return;
				}
				
				Server.lobby.connectedPlayers++;
				Server.lobby.settings.addPlayer(data.username, Enum.Slot.Color.UNASSIGNED);
				
				clientSockets.sockets.emit(Constants.Message.JOIN_LOBBY, data.username);
				
				var returnData = {
					name: Server.lobby.name,
					players: Server.lobby.settings.players
				};
				
				socket.emit(Constants.Message.CONNECTED_LOBBY, returnData);
			});
			
			//Chat.
			socket.on(Constants.Message.CHAT, function(data){
				clientSockets.sockets.emit(Constants.Message.CHAT, data);
			});
			
			//Disconnect from lobby.
			socket.on(Constants.Message.LEAVE_LOBBY, function(){
				Server.disconnectPlayer(socket);
			});
				
			//Close lobby.
			socket.on(Constants.Message.CLOSE_LOBBY, function() {
				Server.closeLobby(socket);
			});
			
			//When player updates his slot info.
			socket.on(Constants.Message.UPDATE_SLOT, function(data){
				Server.lobby.settings.updatePlayer(socket.userdata.username, data.color, data.ready);
				
				data.username = socket.userdata.username;
				socket.broadcast.emit(Constants.Message.UPDATE_SLOT, data);
			});
			
			//Update lobby informations.
			socket.on(Constants.Message.UPDATE_LOBBY, function(data){
				Server.lobby.update(data);
	
				socket.broadcast.emit(Constants.Message.UPDATE_LOBBY, data);
			});
			
			//Lobby to game.
			socket.on(Constants.Message.START_GAME, function(gameSettings){
				
				//Tweaks some informations.
				Server.lobby.settings.maxPlayers = Server.lobby.connectedPlayers;
				Server.lobby.settings.validateColors();	
				Server.lobby.settings.update(gameSettings);
								
				//Create game.
				Server.game = new cd.Server.Game(settings);
				delete Server.lobby;
				
				Server.phase = Enum.Server.Phase.IN_GAME;
				
				clientSockets.sockets.emit(Constants.Message.GAME_CREATED);
			});
			
			//Send information about enemies to the connecting player.
			socket.on(Constants.Message.JOIN_GAME, function(data){
			
				socket.userdata = {
					username: data.username
				};
				
				var players = [];
				
				for(var i in Server.game.players)
				{
					var enemy = Server.game.players[i].toClient();
					enemy.username = Server.game.players[i].username;
					players.push(enemy);
				}
				
				var color = null;
				for(var i in Server.game.playerInfos)
					if(Server.game.playerInfos[i].username == data.username)
						color = Server.game.playerInfos[i].color-1;
				
				//Create connecting player.
				var player = new cd.Server.Player(socket.id, 
												data.username,
												Server.game.world.width*0.2*(Server.game.connectingPlayers+1), 
												Server.game.spawnY, 
												color,
												Server.game);
				
				var playerToClient = player.toClient();
				playerToClient.username = data.username;
				
				//Send last player connected.
				players.push(playerToClient);
				
				//Value initiating a player.
				var initData = {
					players: players
				};
				
				Server.game.players[socket.id] = player;
				Server.game.connectingPlayers++;

				//Start initiation.
				if(Server.game.connectingPlayers == Server.game.maxPlayers)
					clientSockets.sockets.emit(Constants.Message.INIT, initData);
			});
			
			//Disconnect player.
			socket.on(Constants.Message.DISCONNECT_PLAYER, function(){
				Server.disconnectPlayer(socket);
			});

			//When player ready, refresh information of his opponents about his existence.
			socket.on(Constants.Message.PLAYER_READY, function(){

				Server.game.connectedPlayers++;		
				
				var player = Server.game.players[socket.id].toClient();
				player.username = Server.game.players[socket.id].username;
						
				if(Server.game.connectedPlayers == Server.game.maxPlayers)
				{			
					//Init physic world.
					Server.game.createWorld();
					Server.game.launch();
				
					var data = {
						goal: Server.game.goal.toClient(),
						width: Server.game.world.width,
						height: Server.game.world.height,
						worldType: Server.game.world.type
					};
					
					data.goal.type = Server.game.goal.type;
					clientSockets.sockets.emit(Constants.Message.LAUNCH, data);
					
					//Launch warmup!
					setTimeout(function(){
						clientSockets.sockets.emit(Constants.Message.GO); 
					}, Constants.Game.Phase.Warmup.PHASE_TIME*1000);
					
					Server.game.ready = true;
				}
			});
			
			socket.on(Constants.Message.NEXT_BLOCK, function(command){
				//Do not override if server has given a special block to player (as a Spawn Block).
				if(!Server.game.players[socket.id].hasGivenBlock)
					Server.game.players[socket.id].currentBlock = command;
			});
			
			//Retrieving information from players.
			socket.on(Constants.Message.PUSH, function(inputs){
				if(Server.game)
					Server.game.push(inputs, socket.id);
			});
		});
		
		this.clientSockets = clientSockets;
	};
	
	//Disconnect player.
	this.disconnectPlayer = function(socket){
		
		if(this.game)
		{
			//Remove player from game.
			var index = null;
			
			for(var i in this.game.players)
				if(this.game.players[i].username == socket.userdata.username)
				{
					index = i;
					break;
				}
				
			socket.broadcast.emit(Constants.Message.DISCONNECT_PLAYER, socket.userdata.username);	
			
			if(index != null)
			{
				this.game.players[index].leave();
				delete this.game.players[index];
				
				var hasPlayers = false;
				
				//Check if game has players.
				for(var i in this.game.players)
					if(this.game.players[i] != null)
					{
						hasPlayers = true;
						break;
					}
				
				//Remove game instance if empty.
				if(!hasPlayers)
				{
					this.game.trash();
					delete this.game;
				}
			}
		}
		else if(this.lobby && Server.phase == Enum.Server.Phase.LOBBY)
		{
			if(Server.lobby.hostId != socket.id)
			{
				//Remove player from lobby.
				this.lobby.settings.removePlayer(socket.userdata.username);
				this.lobby.connectedPlayers--;
				
				socket.broadcast.emit(Constants.Message.LEAVE_LOBBY, socket.userdata.username);
			}
			else
				this.closeLobby(socket);
		}
		
		socket.disconnect();
	};
};