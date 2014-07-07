//Version 0.9.0.10
//Constants
var Constants = {
	Database: {
		ADDRESS: 'http://127.0.0.1'
	},
	Network: {
		MASTER_PORT: 1050,
		SERVER_TO_SERVER_PORT: 1060
	},
	Message: {
		NEXT_BLOCK: 'nextBlock',
		NEW_BLOCK: 'newBlock',
		SEND_BLOCK: 'sendBlock',
		DELETE_BLOCK: 'deleteBlock',
		PULL: 'pull',
		PUSH: 'push',
		INIT: 'init',
		CONNECTION: 'connection',
		DISCONNECT: 'disconnect',
		NEW_PLAYER: 'newPlayer',
		PLAYER_KILLED: 'playerKilled',
		PLAYER_SPAWNED: 'playerSpawned',
		LAUNCH: 'launch',
		KILL_COMMAND: 'killCommand',
		AT_GOAL: 'atGoal',
		WIN: 'win',
		DELETE_DEATHZONE: 'deleteDeathZone',
		NEW_DEATHZONE: 'newDeathZone',
		GOAL_ACTION: 'goalAction',
		PLAYER_ACTION: 'playerAction',
		BLOCK_ACTION: 'blockAction',
		CREATE_LOBBY: 'createLobby',
		JOIN_LOBBY: 'joinLobby',
		CLOSE_LOBBY: 'closeLobby',
		LEAVE_LOBBY: 'leaveLobby',
		CONNECTED_LOBBY: 'connectedLobby',
		GAME_CREATED: 'gameCreated',
		PLAYER_READY: 'playerReady',
		REGISTER: 'register',
		SEARCH_LOBBY: 'searchLobby',
		JOIN_GAME: 'joinGame',
		DISCONNECT_PLAYER: 'disconnectPlayer',
		UPDATE_SLOT: 'updateSlot',
		UPDATE_LOBBY: 'updateLobby',
		GO: 'go',
		PROCESS_UNITS: 'processUnit',
		ERROR: 'serverError',
		CREATE_ACCOUNT: 'createAccount',
		LOGIN: 'login',
		CHANGE_PASSWORD: 'changePassword',
		RESET_PASSWORD: 'resetPassword',
		LOGOUT: 'logout',
		NEW_ELEMENT: 'newElement',
		DELETE_NPC: 'deleteNPC',
		NEW_NPC: 'newNPC',
		REFRESH_STATS: 'refreshStats',
		GET_STATS: 'getStats',
		KEEP_SERVER_ALIVE: 'keepServerAlive',
		HANDSHAKE_INFO: 'handshakeInfo',
		CHAT: 'chat',
		NEW_TRIGGER: 'newTrigger',
		DELETE_TRIGGER: 'deleteTrigger',
		ACTION_TRIGGER: 'actionTrigger',
		ACTION_NPC: 'actionNpc'
	},
	ErrorMessage: {
		INVALID_LOBBY: 'Lobby is invalid. Full or game already started.'
	},
	Regex: {
		EMAIL: /^\S{0,}@\S{0,}[.]{1}[a-zA-Z0-9]{2,}$/
	}
};//Modules.var http = require('http');var chipmunk = require('chipmunk');var os = require('os');//Namespace for server objects.var cd = {	Server: {}};
var Config = {
	CreateCouchDbViews: true
};
var Account = new function(){
	var cradle = require('cradle');
	var db = new(cradle.Connection)(Constants.Database.ADDRESS, 5984, { cache: false, raw: false, auth: { username: 'ptlarouche', password: 'Silver75' } }).database('dream');
	var crypto = require('crypto');
	
	//To send email.
	var nodemailer = require('nodemailer');
	var smtpTransport = nodemailer.createTransport('SMTP', {
		service: 'Gmail',
		auth: {
			user: 'crushed.dream.the.game@gmail.com',
			pass: 'goldrush975'
		}
	});

	//Create views.
	if(Config.CreateCouchDbViews)
		db.save('_design/players', {
			views: {
				all: {
					map: function(doc){ 
						if(doc.username) 
							emit(doc.username, doc); 
					}
				},
				byEmail: {
					map: function(doc){ 
						if(doc.email) 
							emit(doc.email.toLowerCase(), doc);
					}
				}
			}
		}, function(err, res){
		
			if(err)
				console.log('Error when creating couchdb views.');
		});
	
	//Hash password with salt.
	function sha1(pass, salt) {
	  return crypto.createHmac('sha1', salt).update(pass).digest('hex');
	}
	
	//Generate random salt.
	function generateSalt(len) {
	
	  var chars = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	  var salt = '';
		  
	  for (var i = 0; i < len; i++) {
		var p = Math.floor(Math.random() * chars.length);
		salt += chars[p];
	  }
	  
	  return salt;
	}
	
	//Validate profile.
	function validateProfile(profile){
		
		if(profile.username == null || profile.username == '')
			return false;
			
		if(profile.password == null || profile.password == '')
			return false;
			
		if(profile.confirmation == null || profile.confirmation == '')
			return false;
			
		if(profile.email == null || profile.email == '')
			return false;
			
		if(profile.password.length < 6)
			return false;
			
		if(profile.username.length < 6)
			return false;
			
		if(profile.password != profile.confirmation)
			return false;
			
		if(!/^\S{0,}@\S{0,}[.]{1}[a-zA-Z0-9]{2,}$/.test(profile.email))
			return false;
		
		return true;
	}
	
	function validateNewPassword(oldPassword, newPassword, confirmation){
		
		if(!oldPassword || !newPassword || !confirmation || oldPassword == '' || newPassword == '' || confirmation == '')
			return false;
			
		if(oldPassword == newPassword)
			return false;
			
		if(newPassword != confirmation)
			return false;
			
		return true;
	}
	
	function validateResetPassword(username, email){
		
		if(username == null || username == '')
			return false;
		
		if(email == null || email == '')
			return false;
		
		if(!Constants.Regex.EMAIL.test(email))
			return false;
		
		return true;
	}
	
	//Add score to winner.
	this.win = function(username, points){
	
		if(username == null || username == '')
			return;
			
		db.get(username.toLowerCase(), function(err, profile){
			
			if(profile == null)
				return;
				
			if(profile.score == null)
				profile.score = 0;
				
			if(profile.wins == null)
				profile.wins = 0;
			
			profile.score += points;
			profile.wins++;
			
			db.merge(username.toLowerCase(), { score: profile.score, wins: profile.wins }, function(err, res){
			
				if(err)
					console.log('Add victory failed (' + profile.username + ')');
			});
		});
	};
	
	//Get player stats.
	this.getStats = function(username, callback){
		
		if(username == null || username == '')
			return;
			
		db.get(username.toLowerCase(), function(err, profile){
		
			if(profile == null)
				return;
				
			var stats = {
				score: profile.score,
				wins: profile.wins,
				loses: profile.loses
			};
			
			callback(stats);
		});
	};
	
	//Remove score to loser.
	this.lose = function(username){
	
		if(username == null || username == '')
			return;
			
		db.get(username.toLowerCase(), function(err, profile){
			
			if(profile == null)
				return;
				
			if(profile.score == null)
				profile.score = 0;
				
			if(profile.loses == null)
				profile.loses = 0;
				
			profile.score--;
			profile.loses++;
			
			db.merge(username.toLowerCase(), { score: profile.score, loses: profile.loses }, function(err, res){
			
				if(err)
					console.log('Add defeat failed (' + profile.username + ')');
			});
		});
	};
	
	//Authentication
	this.authenticate = function(profile, callback){
		
		var errorMsg = [];
		
		if(profile.username == null || profile.username == '' || profile.password == null || profile.password == '')
		{
			errorMsg.push('Username/password are required.');
			callback(errorMsg);
			return;
		}
		
		db.get(profile.username.toLowerCase(), function(err, doc){
			
			if(doc == null)
			{
				errorMsg.push('Invalid username/password.');
				callback(errorMsg);
				return;
			}
			
			var password = sha1(profile.password, doc.salt);
						
			if(password != doc.password)
			{
				errorMsg.push('Invalid username/password.');
				callback(errorMsg);
				return;
			}
			else
				callback(errorMsg);
		});
	};
	
	//Create new account
	this.create = function(profile, callback){
	
		var errorMsg = [];
	
		if(!validateProfile(profile))
		{
			errorMsg.push('Invalid account.');
			callback(errorMsg);
			return;
		}
		
		//Check unicity.
		db.view('players/byEmail', { key: profile.email.toLowerCase() }, function(err, players){
				
			if(players && players.length > 0)
			{
				errorMsg.push('Email already taken.');
				callback(errorMsg);
				return;
			}
		
			db.get(profile.username.toLowerCase(), function(err, doc){
			
				if(doc != null)
				{
					errorMsg.push('Username already taken.');
					callback(errorMsg);
					return;
				}
			
				//Erase confirmation (useless to stock).
				delete profile.confirmation;
			
				//Hash password.
				profile.salt = generateSalt(12);
				profile.password = sha1(profile.password, profile.salt);
				profile.score = 0;
				profile.wins = 0;
				profile.loses = 0;
		
				db.save(profile.username.toLowerCase(), profile, function(err, res){

					if(err)
					{
						console.log('Adding user failed (' + profile.username + ')');
						errorMsg.push('Unexpected error when creating account.');
					}
					
					callback(errorMsg);
				});
			});
		});
	};
	
	//Change password
	this.changePassword = function(profile, oldPassword, newPassword, confirmation, callback){
	
		var errors = [];
	
		if(!validateNewPassword(oldPassword, newPassword, confirmation))
		{
			errors.push('Error when validating new password.');
			callback(errors);
			return;
		}

		db.get(profile.username.toLowerCase(), function(err, doc){
			
			if(err || !doc)
			{
				errors.push('Error when changing password.');
				callback(errors);
				return;
			}
			
			var password = sha1(oldPassword, doc.salt);

			//Check if old password has been correctly input.
			if(password != doc.password)
			{
				errors.push('Old password mismatches current password.');
				callback(errors);
				return;
			}
			
			//Hash password.
			doc.salt = generateSalt(12);
			doc.password = sha1(newPassword, doc.salt);
			
			db.merge(profile.username.toLowerCase(), { salt: doc.salt, password: doc.password }, function(err, res){
			
				if(err)
				{
					console.log('Change password failed (' + profile.username + ')');
					errors.push('Unexpected error when changing password.');
				}
				
				callback(errors);
			});
		});
	};
	
	//Reset password.
	this.resetPassword = function(profile, email, callback){
		
		var errors = [];
		
		if(!validateResetPassword(profile.username, email))
		{
			errors.push('Error when validating informations to reset password.');
			callback(errors);
			return;
		}
		
		db.view('players/byEmail', { key: email.toLowerCase() }, function(err, players){
		
			if(!players || players.length == 0)
			{
				errors.push('No user is bound to this email.');
				callback(errors);
				return;
			}
		
			var player = players[0].value;
		
			if(player.username.toLowerCase() != profile.username.toLowerCase())
			{
				errors.push('Wrong user/email.');
				callback(errors);
				return;
			}
			
			var newPassword = generateSalt(8);
			var newSalt = generateSalt(12);
			
			player.salt = newSalt;
			player.password = sha1(newPassword, newSalt);
			
			db.merge(player.username.toLowerCase(), { salt: player.salt, password: player.password }, function(err, res){
			
				if(err)
				{
					console.log('Reset password failed (' + profile.username + ')');
					errors.push('Unexpected error when resetting password.');
				}
				else
				{
					//Send email to player to confirm.
					var mailOptions = {
						from: 'Crushed Dream <crushed.dream.the.game@gmail.com>',
						to: player.email,
						port: '1052',
						subject: 'Reset password',
						html: '<h1>Password has been reset!</h1><p>This is your new password : ' + newPassword  
							  + ' <br /> Please change this password in the Change Password screen after your next login. </p><p> See you soon!</p>'
					};
					
					smtpTransport.sendMail(mailOptions, function(err, response){
					
						if(err)
						{
							errors.push('Error when sending email. Try again or contact crushed.dream.the.game@gmail.com for help.');
							console.log(err);
							callback(errors);
							return;
						}
					});
				}
				
				callback(errors);
			});
		});
	};
};//Create server.
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
};

//Bind listeners on sockets.
//Server to client.
ioMasterClient.sockets.on(Constants.Message.CONNECTION, function (socket){
	socket.set("heartbeat interval", 20);
	socket.set("heartbeat timeout", 60);

	//Authenticate.
	socket.on(Constants.Message.LOGIN, function(profile){
		
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
			
		Account.create(profile, function(errors){
			socket.emit(Constants.Message.CREATE_ACCOUNT, errors);
		});
	});
	
	//Change password.
	socket.on(Constants.Message.CHANGE_PASSWORD, function(data){
			
		Account.changePassword(data.profile, data.oldPassword, data.newPassword, data.confirmation, function(errors){
			socket.emit(Constants.Message.CHANGE_PASSWORD, errors);
		});
	});
	
	//Reset password.
	socket.on(Constants.Message.RESET_PASSWORD, function(data){
		
		Account.resetPassword(data.profile, data.email, function(errors){
			socket.emit(Constants.Message.RESET_PASSWORD, errors);
		});
	});
		
	//Discover servers.
	socket.on(Constants.Message.SEARCH_LOBBY, function(){
	
		for(var i in ioMasterServer.sockets.sockets)
			ioMasterServer.sockets.sockets[i].emit(Constants.Message.SEARCH_LOBBY, socket.id);
	});

});

//Server to server.
ioMasterServer.sockets.on(Constants.Message.CONNECTION, function (socket){
	
	console.log('Server connected : ' + socket.manager.handshaken[socket.id].address.address);
	
	//Return lobby to client.
	socket.emit(Constants.Message.SEARCH_LOBBY, function(data){
	
		data.lobby.address = 'http://' + socket.manager.handshaken[socket.id].address.address + ':' + Constants.Network.SERVER_PORT;
	
		ioMasterClient.sockets.sockets[data.id].emit(Constants.Message.SEARCH_LOBBY, lobby);
	});
	
	//Update players' scores.
	socket.on(Constants.Message.WIN, function(data){
		
		//Winner
		Account.win(data.winner.username, data.winner.score);
		
		//Losers
		for(var i = 0; i < data.losers.length; i++)
			Account.lose(data.losers[i].username);
	});
});

console.log('Master server created');