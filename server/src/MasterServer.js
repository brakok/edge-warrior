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
	this.serverList = [];
};

//Bind listeners on sockets.
//Server to client.
ioMasterClient.sockets.on(Constants.Message.CONNECTION, function (socket){

	console.log('Connection to client established - Master');

	socket.on(Constants.Message.CREATE_LOBBY, function(){
	
		if(MasterServer.serverList.length > 0)
		{
			var i = Math.round(Math.random()*(MasterServer.serverList.length-1));
			var address = MasterServer.serverList[i];
			
			console.log('Server found : ' + address);
			socket.emit(Constants.Message.CREATE_LOBBY, address);
		}
		else
			console.log('No server found');
	});
});

//Server to server.
ioMasterServer.sockets.on(Constants.Message.CONNECTION, function (socket){
		
	//Register game server.
	socket.on(Constants.Message.REGISTER, function(ipAddress){
		console.log('New server registred : ' + ipAddress);
		MasterServer.serverList.push('http://' + ipAddress + ':' + Constants.Network.SERVER_PORT);
	});
	
	//Search all lobbies available.
	socket.on(Constants.Message.SEARCH_LOBBY, function(){
		//TODO.
	});
});

console.log('Master server created');