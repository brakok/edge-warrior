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
	
		data.lobby.address = 'http://' + socket.manager.handshaken[socket.id].address.address;
	
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