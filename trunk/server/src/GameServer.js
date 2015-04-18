//Create server.
var server = http.createServer(function(req, res){});

//Port.
server.listen(Constants.Network.SERVER_PORT);

//Remove log level or adjust it to have every log in console.
var io = require('socket.io').listen(server).set('log level', 1);

//Server object.
var Server = new function(){
	this.gameList = {};
	this.address = null;
	
	var previousUserTime = 0;
	var previousSysTime = 0;
	var previousIdleTime = 0;
	
	this.addGame = function(settings){	
		this.gameList[settings.id] = new Game(settings);
	};
		
	this.register = function(){
		var socket = require('socket.io-client').connect(Constants.Network.ADDRESS);

		//Notify master server that this server is still running.
		setInterval(function(){
		
			//Process cpu usage for load balacing between game servers.
			var cpuUsage = 0;
			var cpus = os.cpus();
			var cpuCount = 0;
			
			var userTime = 0;
			var sysTime = 0;
			var idleTime = 0;
			
			for(var i in cpus)
			{
				cpuCount++;
				var cpu = cpus[i];
				
				userTime += cpu.times.user;
				sysTime += cpu.times.sys;
				idleTime += cpu.times.idle;
			}
			
			userTime /= cpuCount;
			sysTime /= cpuCount;
			idleTime /= cpuCount;
			
			var tmpUserTime = userTime - previousUserTime;
			var tmpSysTime = sysTime - previousSysTime;
			var tmpIdleTime = idleTime - previousIdleTime;
			
			//Get cpu usage in percent.
			cpuUsage = parseInt((tmpUserTime + tmpSysTime)/(tmpUserTime + tmpSysTime + tmpIdleTime)*100);
			
			previousUserTime = userTime;
			previousSysTime = sysTime;
			previousIdleTime = idleTime;
			
			socket.emit(Constants.Message.KEEP_SERVER_ALIVE, { cpuUsage: cpuUsage });
			
		}, Constants.Network.REFRESH_PRESENCE);
				
		//Get external ip from master server.
		socket.on(Constants.Message.HANDSHAKE_INFO, function(data){
			console.log('External IP : ' + data.address);
			Server.address = data.address;
		});
				
		//Lobby to game.
		socket.on(Constants.Message.START_GAME, function(settings){
					
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
		
		socket.leave(socket.userdata.gameId);
	};
	
	this.register();
};

//Bind listeners on sockets.
io.sockets.on(Constants.Message.CONNECTION, function (socket){
	socket.set("heartbeat interval", 20);
	socket.set("heartbeat timeout", 60);
		
	//Socket disconnected.
	socket.on(Constants.Message.DISCONNECT, function(){
		if(socket.userdata != null && socket.userdata.gameId != null && Server.gameList[socket.userdata.gameId] != null)
			Server.disconnectPlayer(socket);
	});
		
	//Send information about enemies to the connecting player.
	socket.on(Constants.Message.JOIN_GAME, function(data){
	
		socket.join(data.gameId);
		
		socket.userdata = {
			gameId: data.gameId,
			username: data.username
		};
		
		var players = [];
		
		for(var i in Server.gameList[data.gameId].players)
		{
			var enemy = Server.gameList[data.gameId].players[i].toClient();
			enemy.username = Server.gameList[data.gameId].players[i].username;
			players.push(enemy);
		}
		
		var color = null;
		for(var i in Server.gameList[data.gameId].playerInfos)
			if(Server.gameList[data.gameId].playerInfos[i].username == data.username)
				color = Server.gameList[data.gameId].playerInfos[i].color-1;
		
		//Create connecting player.
		var player = new Player(socket.id, 
								data.username,
								Server.gameList[data.gameId].world.width*0.2*(Server.gameList[data.gameId].connectingPlayers+1), 
								Server.gameList[data.gameId].spawnY, 
								color,
								Server.gameList[data.gameId]);
		
		var playerToClient = player.toClient();
		playerToClient.username = data.username;
		
		//Send last player connected.
		players.push(playerToClient);
		
		//Value initiating a player.
		var initData = {
			players: players
		};
		
		Server.gameList[data.gameId].players[socket.id] = player;
		Server.gameList[data.gameId].connectingPlayers++;

		//Start initiation.
		if(Server.gameList[data.gameId].connectingPlayers == Server.gameList[data.gameId].maxPlayers)
			io.sockets.in(data.gameId).emit(Constants.Message.INIT, initData);
	});
	
	//Disconnect player.
	socket.on(Constants.Message.DISCONNECT_PLAYER, function(){
		Server.disconnectPlayer(socket);
	});

	//When player ready, refresh information of his opponents about his existence.
	socket.on(Constants.Message.PLAYER_READY, function(){
		var gameId = socket.userdata.gameId;
				
		Server.gameList[gameId].connectedPlayers++;		
		
		var player = Server.gameList[gameId].players[socket.id].toClient();
		player.username = Server.gameList[gameId].players[socket.id].username;
				
		if(Server.gameList[gameId].connectedPlayers == Server.gameList[gameId].maxPlayers)
		{			
			//Init physic world.
			Server.gameList[gameId].createWorld();
			Server.gameList[gameId].launch();
		
			var data = {
				goal: Server.gameList[gameId].goal.toClient(),
				width: Server.gameList[gameId].world.width,
				height: Server.gameList[gameId].world.height,
				worldType: Server.gameList[gameId].world.type
			};
			
			data.goal.type = Server.gameList[gameId].goal.type;
			io.sockets.in(gameId).emit(Constants.Message.LAUNCH, data);
			
			//Launch warmup!
			(function(gameId){
				setTimeout(function(){ 
					io.sockets.in(gameId).emit(Constants.Message.GO); 
				}, Constants.Warmup.PHASE_TIME*1000);
			})(gameId);
			
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