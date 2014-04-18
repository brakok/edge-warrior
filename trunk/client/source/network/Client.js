//Object containing network information.
var Client = new function(){

	this.isLoading = false;
	this.username = null;
	this.game = null;
	
	this.stats = {
		score: 0,
		wins: 0,
		loses: 0
	};
	
	this.loadingScreen = null;
	this.isCreatingAccount = false;
	
	//Members.
	this.keys = {};
	this.pressedKeys = {};
	
	//Connected game id.
	this.currentGameId = null;
	this.isHost = false;
		
	this.init = function(data){
	
		//Init game.
		this.game = new Game();
		
		//Server positioning and giving color to player.
		for(var i = 0; i < data.players.length; i++)
		{
			if(this.username == data.players[i].username)
			{
				this.game.player = new Player(data.players[i].x, data.players[i].y, data.players[i].color, true, this.username);
			}
			else
			{
				this.game.enemies.push(new Player(data.players[i].x,
												  data.players[i].y,
												  data.players[i].color,
												  false,
												  data.players[i].username));
			}
		}
	};
	
	this.initKeys = function(){
	
		//Init keys.
		this.keys[Options.keys.RIGHT] = this.pressedKeys[Options.keys.RIGHT] = false;
		this.keys[Options.keys.LEFT] = this.pressedKeys[Options.keys.LEFT] = false;
		this.keys[Options.keys.JUMP] = this.pressedKeys[Options.keys.JUMP] = false;
		this.keys[Options.keys.KILL] = this.pressedKeys[Options.keys.KILL] = false;
		
		//Option keys.
		this.keys[Options.keys.OPT1] = this.pressedKeys[Options.keys.OPT1] = false;
		this.keys[Options.keys.OPT2] = this.pressedKeys[Options.keys.OPT2] = false;
		
		this.keys[Options.keys.SKILL1] = this.pressedKeys[Options.keys.SKILL1] = false;
		this.keys[Options.keys.SKILL2] = this.pressedKeys[Options.keys.SKILL2] = false;
		this.keys[Options.keys.SKILL3] = this.pressedKeys[Options.keys.SKILL3] = false;
		this.keys[Options.keys.SKILL4] = this.pressedKeys[Options.keys.SKILL4] = false;
		this.keys[Options.keys.TOGGLE_BUY_MODE] = this.pressedKeys[Options.keys.TOGGLE_BUY_MODE] = false;
		this.keys[Options.keys.CHAT] = this.pressedKeys[Options.keys.CHAT] = false;
		
		this.keys[Options.keys.DIG] = this.pressedKeys[Options.keys.DIG] = false;
	};
	
	this.initKeys();
	
	//Authentification.
	this.authenticate = function(profile){
		this.connectToNetwork();
	
		this.masterSocket.emit(Constants.Message.LOGIN, profile);
	};
	
	//Refresh player stats from server.
	this.refreshStats = function(){
	
		if(this.username == null || this.username == '')
			return;
			
		this.masterSocket.emit(Constants.Message.REFRESH_STATS, this.username);
	};
	
	//Create an account.
	this.createAccount = function(profile){
	
		var errors = [];
	
		if(!validateProfile(profile))
		{
			errors.push('Invalid account.');
			return errors;
		}
			
		this.masterSocket.emit(Constants.Message.CREATE_ACCOUNT, profile);
		return errors;
	};
	
	//Change password.
	this.changePassword = function(oldPassword, newPassword, confirmation){
		
		if(!validateNewPassword(oldPassword, newPassword, confirmation))
			return false;
		
		var profile = new Profile(this.username, null, null, null);
		
		this.masterSocket.emit(Constants.Message.CHANGE_PASSWORD, { profile: profile, oldPassword: oldPassword, newPassword: newPassword, confirmation: confirmation});
		return true;
	};	
	
	//Reset password.
	this.resetPassword = function(username, email){
		
		if(!validateResetPassword(username, email))
			return false;
			
		var profile = new Profile(username, null, null, null);
		
		this.masterSocket.emit(Constants.Message.RESET_PASSWORD, { profile: profile, email: email});
		return true;
	};
	
	//Show loading screen.
	this.startLoading = function(){
	
		if(!this.isLoading && this.loadingScreen != null)
		{
			this.isLoading = true;
			myApp.GameScene.layer.addChild(this.loadingScreen);
		}
	};
	
	//Hide loading screen.
	this.stopLoading = function(){
	
		if(this.isLoading && this.loadingScreen != null)
		{
			this.isLoading = false;
			myApp.GameScene.layer.removeChild(this.loadingScreen);
		}
	};
	
	//Log off.
	this.logout = function(){
	
		this.masterSocket.emit(Constants.Message.LOGOUT, this.username);
		this.username = null;

		this.masterSocket.disconnect();
		MenuScreens.switchTo(MenuScreens.login);
	};
		
	//Create a lobby.
	this.createLobby = function(){
		this.masterSocket.emit(Constants.Message.CREATE_LOBBY, this.username);
	};
	
	//Close lobby.
	this.closeLobby = function(){
	
		if(this.isHost)
		{
			this.masterSocket.emit(Constants.Message.CLOSE_LOBBY);
			this.isHost = false;
		}
		else
			this.masterSocket.emit(Constants.Message.LEAVE_LOBBY);	
		
		this.currentGameId = null;
	};
	
	//Disconnect from a game.
	this.disconnect = function(){
		this.socket.emit(Constants.Message.DISCONNECT_PLAYER);						
		this.socket.disconnect();
		
		cc.Director.getInstance().replaceScene(myApp.MenuScene);
		delete this.game;
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
	this.startGame = function(settings){
		this.masterSocket.emit(Constants.Message.START_GAME, settings);
	};
	
	//Search lobbies.
	this.search = function(){
		this.masterSocket.emit(Constants.Message.SEARCH_LOBBY);
	};	
	
	//Send message for chat.
	this.sendMessage = function(value){
		this.masterSocket.emit(Constants.Message.CHAT, {
			username: this.username,
			value: value
		});
	};
	
	//Connect to master server.
	this.connectToNetwork = function(){
		
		var socketOptions = {
			'force new connection': true
		};
		
		var masterSocket = io.connect(Constants.Network.ADDRESS, socketOptions);
		
		//Chat.
		masterSocket.on(Constants.Message.CHAT, function(data){
			Chat.addLine(data.username, data.value);
			
			if(Client.game != null)
				Chat.poke();
		});
		
		//Result from account creation.
		masterSocket.on(Constants.Message.CREATE_ACCOUNT, function(errors){
			MenuScreens.createAccount.result(errors);
		});
		
		//Result from log in.
		masterSocket.on(Constants.Message.LOGIN, function(errors){
			MenuScreens.login.result(errors);
		});
		
		//Result from change password.
		masterSocket.on(Constants.Message.CHANGE_PASSWORD, function(errors){
			MenuScreens.changePassword.result(errors);
		});
		
		//Result from reset password.
		masterSocket.on(Constants.Message.RESET_PASSWORD, function(errors){
			MenuScreens.resetPassword.result(errors);
		});
		
		//Create lobby and receive game id.
		masterSocket.on(Constants.Message.CREATE_LOBBY, function(gameId){
			console.log('Lobby created');
			Client.currentGameId = gameId;
			Client.isHost = true;
			
			MenuScreens.lobbyScreen.addSlot(Client.username, Enum.Slot.Color.UNASSIGNED, false);
			MenuScreens.lobbyScreen.update({name: 'Lobby of ' + Client.username });
			
			//Set current lobby online when ID received.
			MenuScreens.lobbyScreen.setOnline();
		});
		
		//Show error message sent by server.
		masterSocket.on(Constants.Message.ERROR, function(msg){
			HtmlHelper.showError(msg);
			
			AudioManager.playEffect(Constants.Menu.ACTION_EFFECT);
			Client.currentGameId = null;
		});
		
		//Set new stats gained from server.
		masterSocket.on(Constants.Message.GET_STATS, function(stats){

			if(stats != null)
			{
				Client.stats.score = stats.score == null ? 0 : stats.score;
				Client.stats.wins = stats.wins == null ? 0 : stats.wins;
				Client.stats.loses = stats.loses == null ? 0 : stats.loses;
				
				MenuScreens.mainMenu.refresh();
			}
		});
		
		masterSocket.on(Constants.Message.UPDATE_LOBBY, function(data){
			MenuScreens.lobbyScreen.update(data);
		});
		
		//Join game when game is created.
		masterSocket.on(Constants.Message.GAME_CREATED, function(ipAddress){
			console.log('Game created');
			
			//Change to game scene.
			cc.Director.getInstance().replaceScene(myApp.GameScene);
			
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
				
			MenuScreens.lobbyScreen.update({ name: data.name });
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
		console.log('Connected to :' + ipAddress);
		
		var socketOptions = {
			'force new connection': true
		};
		
		var socket = io.connect(ipAddress, socketOptions);
		
		//Init.
		socket.on(Constants.Message.INIT, function (data) {
			console.log('Initialize');		

			Client.init(data);
			socket.emit(Constants.Message.PLAYER_READY);
		});
		
		//Incoming enemy.
		socket.on(Constants.Message.NEW_PLAYER, function(data){
			console.log('New player...');
			
			if(Client.game != null)
				Client.game.enemies.push(new Player(data.x,
												   data.y,
												   data.color,
												   false,
												   data.username));
		});
		
		//Disconnecting player.
		socket.on(Constants.Message.DISCONNECT_PLAYER, function(username){
		
			if(Client.game.currentPhase != Enum.Game.Phase.ENDING)
				HtmlHelper.showMessage(username + ' has disconnected');
				
			Client.game.removeEnemy(username);
		});
		
		//Process units for player.
		socket.on(Constants.Message.PROCESS_UNITS, function(username){
			Client.game.processUnits();
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
			
			//Launch game when initiation ends.
			Client.game.launch(data.worldType);
		});
		
		socket.on(Constants.Message.GO, function(){
			console.log('GO!!!');
			Client.game.currentPhase = Enum.Game.Phase.PLAYING;
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
			if(Client.game != null)
				Client.game.updateFromServer(data.players, data.blocks, data.goal, data.deathZones, data.npcs);
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
		socket.on(Constants.Message.SEND_BLOCK, function(block){
			Client.game.player.addNextBlock(block);
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
		
		//Add a trigger.
		socket.on(Constants.Message.NEW_TRIGGER, function(data){
			Client.game.addTrigger(data);
		});
		
		//Add a npc.
		socket.on(Constants.Message.NEW_NPC, function(data){
			Client.game.addNpc(data);
		});
		
		//Delete a npc.
		socket.on(Constants.Message.DELETE_NPC, function(data){
			Client.game.deleteNpc(data.id);
		});
		
		//Delete a Trigger.
		socket.on(Constants.Message.DELETE_TRIGGER, function(data){
			Client.game.deleteTrigger(data.id);
		});
		
		//Action for triggers.
		socket.on(Constants.Message.ACTION_TRIGGER, function(data){
			if(Client.game.triggers[data.id] != null)
				Client.game.triggers[data.id].execute(data.type);
		});
		
		//Add new element.
		socket.on(Constants.Message.NEW_ELEMENT, function(data){
			Client.game.addElement(data);
		});
		
		//Execute new action for a specified block.
		socket.on(Constants.Message.BLOCK_ACTION, function(data){
			if(Client.game.blocks[data.id] != null)
				Client.game.blocks[data.id].execute(data.action);
		});
		
		//Once defined, preserved the socket.
		this.socket = socket;
	};
	
	//Pushing info to server.
	this.push = function(){
		
		var inputs = {
			right: this.keys[Options.keys.RIGHT],
			left: this.keys[Options.keys.LEFT],
			jump: this.keys[Options.keys.JUMP],
			kill: this.keys[Options.keys.KILL],
			dig: this.keys[Options.keys.DIG] && !this.pressedKeys[Options.keys.DIG]
		};
	
		//Send key pressed to server.
		this.socket.emit(Constants.Message.PUSH, inputs);
	};
	
	//Validate profile fields before being inserted.
	function validateProfile(profile){
				
		var valid = true;	
			
		//Required fields.
		if(profile.username == null || profile.username == '')
		{
			HtmlHelper.showError('Username is required.');
			valid = false;
		}
			
		if(profile.password == null || profile.password == '')
		{
			HtmlHelper.showError('Password is required.');
			valid = false;
		}
			
		if(profile.confirmation == null || profile.confirmation == '')
		{
			HtmlHelper.showError('Password confirmation is required.');
			valid = false;
		}
			
		if(profile.email == null || profile.email == '')
		{
			HtmlHelper.showError('Email is required.');
			valid = false;
		}
			
		if(!valid)
			return false;
			
		//Other validations.
		if(profile.username.length < 6)
		{
			HtmlHelper.showError('Username must have at least 6 characters.');
			valid = false;
		}
			
		if(profile.password.length < 6)
		{
			HtmlHelper.showError('Password must have at least 6 characters.');
			valid = false;
		}
			
		if(profile.password != profile.confirmation)
		{
			HtmlHelper.showError('Password differs from his confirmation.');
			valid = false;
		}
			
		if(!Constants.Regex.EMAIL.test(profile.email))
		{
			HtmlHelper.showError('Email is not in a good format.');
			valid = false;
		}
		
		return valid;
	};
	
	//Validate new password.
	function validateNewPassword(oldPassword, newPassword, confirmation){
		
		var valid = true;
		
		if(!oldPassword || oldPassword == '')
		{
			HtmlHelper.showError('Old password is required.');
			valid = false;
		}
		
		if(!newPassword || newPassword == '')
		{
			HtmlHelper.showError('New password is required.');
			valid = false;
		}
		
		if(!confirmation || confirmation == '')
		{
			HtmlHelper.showError('Password confirmation is required.');
			valid = false;
		}
		
		if(!valid)
			return false;
		
		if(newPassword.length < 6)
		{
			HtmlHelper.showError('Password must have at least 6 characters.');
			valid = false;
		}
		
		if(oldPassword == newPassword)
		{
			HtmlHelper.showError('Old password and new password are the same.');
			valid = false;
		}
			
		if(newPassword != confirmation)
		{
			HtmlHelper.showError('Password differs from his confirmation.');
			valid = false;
		}
			
		return valid;
	}
	
	//Validate username and email to reset password.
	function validateResetPassword(username, email){
		
		var valid = true;
		
		if(username == null || username == '')
		{
			HtmlHelper.showError('Username is required.');
			valid = false;
		}
		
		if(email == null || email == '')
		{
			HtmlHelper.showError('Email is required.');
			valid = false;
		}
		
		if(!valid)
			return false;
		
		if(!Constants.Regex.EMAIL.test(email))
		{
			HtmlHelper.showError('Email is not in a good format.');
			valid = false;
		}
		
		return valid;
	}
};