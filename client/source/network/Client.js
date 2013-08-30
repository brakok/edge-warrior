//Object containing network information.
var Client = new function(){

	this.username = null;
	this.game = null;
	
	//Members.
	this.keys = {};
	
	//Connected game id.
	this.currentGameId = null;
	this.isHost = false;
		
	//Init keys.
	this.keys[cc.KEY.d] = false;
	this.keys[cc.KEY.a] = false;
	this.keys[cc.KEY.space] = false;
	this.keys[cc.KEY.q] = false;
	
	//Option keys.
	this.keys[cc.KEY.z] = false;
	this.keys[cc.KEY.x] = false;
	
	//Authentification.
	this.authenticate = function(username, password){
		//TODO: Add DB.
	
		this.username = username;
		return true;
	};
		
	//Create a lobby.
	this.createLobby = function(){
		this.masterSocket.emit(Constants.Message.CREATE_LOBBY, this.username);
	};
	
	//Close lobby.
	this.closeLobby = function(){
	
		if(this.isHost)
		{
			this.masterSocket.emit(Constants.Message.CLOSE_LOBBY, this.currentGameId);
			this.isHost = false;
		}
		else
		{
			var data = {
				gameId: this.currentGameId,
				username: this.username
			};
			
			this.masterSocket.emit(Constants.Message.LEAVE_LOBBY, data);	
		}
		
		this.currentGameId = null;
	};
	
	//Disconnect from a game.
	this.disconnect = function(){
		
	};
	
	//Join a lobby.
	this.joinLobby = function(gameId){
		this.masterSocket.emit(Constants.Message.JOIN_LOBBY, {
																gameId: gameId,
																username: this.username
															});
		this.currentGameId = gameId;
	};
	
	//Join a game.
	this.joinGame = function(data){
		this.socket.emit(Constants.Message.JOIN_GAME, data);
	};
	
	//Start game.
	this.startGame = function(){
		this.masterSocket.emit(Constants.Message.START_GAME, this.currentGameId);
	};
	
	//Search lobbies.
	this.search = function(){
		this.masterSocket.emit(Constants.Message.SEARCH_LOBBY);
	};	
	
	//Connect to master server.
	this.connectToNetwork = function(){
		var masterSocket = io.connect(Constants.Network.ADDRESS);
		
		//Create lobby and receive game id.
		masterSocket.on(Constants.Message.CREATE_LOBBY, function(gameId){
			console.log('Lobby created');
			Client.currentGameId = gameId;
			Client.isHost = true;
			MenuScreens.lobbyScreen.addSlot(Client.username, Enum.Slot.Color.UNASSIGNED, false);
			
			//Set current lobby online when ID received.
			MenuScreens.lobbyScreen.setOnline();
		});
		
		//Join game when game is created.
		masterSocket.on(Constants.Message.GAME_CREATED, function(ipAddress){
			console.log('Game created');
			Client.connect(ipAddress);
			
			var data = {
				gameId: Client.currentGameId, 
				username: Client.username
			 };
			
			console.log('Joining... ' + Client.currentGameId);
			Client.joinGame(data);
		});
		
		//Get lobbies' list.
		masterSocket.on(Constants.Message.SEARCH_LOBBY, function(lobbies){
			MenuScreens.serverList.list.lobbies = lobbies;
			MenuScreens.serverList.list.refresh();
		});
		
		//Add user to lobby.
		masterSocket.on(Constants.Message.JOIN_LOBBY, function(username){
			console.log('Lobby joined');
			MenuScreens.lobbyScreen.addSlot(username, Enum.Slot.Color.UNASSIGNED, false);
		});
		
		//When correctly connected to lobby.
		masterSocket.on(Constants.Message.CONNECTED_LOBBY, function(data){
			console.log('Connected to lobby');
			
			for(var i in data.players)
				MenuScreens.lobbyScreen.addSlot(data.players[i].username, data.players[i].color, data.players[i].ready);
				
			MenuScreens.switchTo(MenuScreens.lobbyScreen);
			
			Client.currentGameId = data.gameId;
			MenuScreens.lobbyScreen.setOnline();
		});
		
		//Player leaving...
		masterSocket.on(Constants.Message.LEAVE_LOBBY, function(username){
			MenuScreens.lobbyScreen.removeSlot(username);
		});
		
		//Update slot's informations from server.
		masterSocket.on(Constants.Message.UPDATE_SLOT, function(data){
			var slot = MenuScreens.lobbyScreen.getSlot(data.username);
			
			if(slot != null)
				slot.fromServer(data);
		});
		
		//When lobby is closing...
		masterSocket.on(Constants.Message.CLOSE_LOBBY, function(gameId){
			console.log('Lobby closed (' + gameId + ')');
			if(Client.currentGameId == gameId)
			{
				Client.currentGameId = null;
				Client.isHost = false;
				
				MenuScreens.switchTo(MenuScreens.mainMenu);
			}
		});
		
		this.masterSocket = masterSocket;
	};	
	
	//Connect to game server.
	this.connect = function(ipAddress){		
		
		var socket = io.connect(ipAddress);
		
		//Init.
		socket.on(Constants.Message.INIT, function (data) {
			console.log('Initialize');		
			Client.game = new Game();
			
			//Server positioning and giving color to player.
			Client.game.player = new Player(data.player.x, data.player.y, data.player.color, true);	

			for(var i in data.enemies)
			{
				Client.game.enemies.push(new Player(data.enemies[i].x,
											   data.enemies[i].y,
											   data.enemies[i].color,
											   false));
			}

			socket.emit(Constants.Message.PLAYER_READY, Client.currentGameId);
		});
		
		//Incoming enemy.
		socket.on(Constants.Message.NEW_PLAYER, function(data){
			console.log('New player...');
			
			Client.game.enemies.push(new Player(data.x,
										   data.y,
										   data.color,
										   false));
		});
		
		socket.on(Constants.Message.LAUNCH, function(data){
			console.log('Launching!');
			
			//Add goal.
			switch(data.goal.type)
			{
				case Enum.WinningGoal.Type.FLOATING_BALL:
					Client.game.goal = new FloatingBall(data.goal.x, data.goal.y);
					break;
			}
			
			Client.game.mapSize = {
				width: data.width,
				height: data.height
			};
			
			cc.Director.getInstance().replaceScene(myApp.GameScene);
		});
		
		socket.on(Constants.Message.NEW_BLOCK, function(block){
			//Add a new block.
			Client.game.addBlock(block); 
		});
		
		socket.on(Constants.Message.DELETE_BLOCK, function(data){
			//Delete a block.
			Client.game.deleteBlock(data.id, data.cause);
		});
		
		//Pulling info from server.
		socket.on(Constants.Message.PULL, function (data){	
			Client.game.updateFromServer(data.players, data.blocks, data.goal, data.deathZones);
		});
		
		//Ask for next block.
		socket.on(Constants.Message.NEXT_BLOCK, function(data){
			Client.game.randomBlock();
		});
				
		//Received dead people information.
		socket.on(Constants.Message.PLAYER_KILLED, function(data){
			Client.game.kill(data.killed, data.killer);
		});
		
		//Received information to build spawn block.
		socket.on(Constants.Message.SEND_BLOCK, function(blockType){
			Client.game.player.addNextBlock(blockType);
		});
		
		//Spawn player.
		socket.on(Constants.Message.PLAYER_SPAWNED, function(remotePlayer){
			Client.game.spawnPlayer(remotePlayer);
		});
		
		//Indicate at which step user is currently.
		socket.on(Constants.Message.KILL_COMMAND, function(stepReached){
			Client.game.changeStep(stepReached);
		});
		
		//On victory of any player.
		socket.on(Constants.Message.WIN, function(data){
			Client.game.end(data);
		});
		
		//Execute new action (goal).
		socket.on(Constants.Message.GOAL_ACTION, function(actionType){
			Client.game.goal.execute(actionType);
		});
		
		//Execute new action (player).
		socket.on(Constants.Message.PLAYER_ACTION, function(data){
			
			//Redirect action to right player.
			Client.game.redirectAction(data);
		});
		
		//When a player touches the goal.
		socket.on(Constants.Message.AT_GOAL, function(winner){
			Client.game.electWinner(winner);
		});
		
		//Delete a death zone.
		socket.on(Constants.Message.DELETE_DEATHZONE, function(data){
			Client.game.deleteDeathZone(data.id);
		});
		
		//Add a death zone.
		socket.on(Constants.Message.NEW_DEATHZONE, function(data){
			Client.game.addDeathZone(data);
		});
		
		//Execute new action for a specified block.
		socket.on(Constants.Message.BLOCK_ACTION, function(data){
			Client.game.blocks[data.id].execute(data.action);
		});
		
		//Once defined, preserved the socket.
		this.socket = socket;
	};
	
	//Pushing info to server.
	this.push = function(){
		
		var inputs = {
			right: this.keys[cc.KEY.d],
			left: this.keys[cc.KEY.a],
			jump: this.keys[cc.KEY.space],
			kill: this.keys[cc.KEY.q]
		};
	
		//Send key pressed to server.
		this.socket.emit(Constants.Message.PUSH, {
													inputs: inputs,
													gameId: this.currentGameId
												 });
	};
};