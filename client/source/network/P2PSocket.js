
var P2PSocket = function(isHost, listenPort){
	this.udpSocketId = null;
	this.tcpSocketId = null;
	
	this.clientSocketIds = [];
	this.serverSocketId = null;
	
	this.isHost = isHost;
	this.callbacks = {};
	
	this.udpListenPort = listenPort;
	this.tcpListenPort = listenPort + 1;
	
	var that = this;
	
	function onReceive(info){
		if(info.socketId != that.udpSocketId && info.socketId != that.tcpSocketId && info.socketId != that.serverSocketId)
			return;
			
		//TODO: Deserialise.
		
		var data = info.data;
		
		console.log(data);
		
		this.callbacks[data.message](data.data);
	}
	
	function onAccept(info){
		if(info.socketId != that.serverSocketId)
			return;
			
		that.clientSocketIds.push(info.clientSocketId);
			
		//TODO: Send confirmation.
		
		chrome.sockets.tcp.onReceive(info.clientSocketId, onReceive);
		chrome.sockets.tcp.setPaused(false);
	}
	
	if(isHost){
	
		//Open port for UDP.
		chrome.sockets.udp.create({}, function(socketInfo){
			that.udpSocketId = socketInfo.socketId;
			
			chrome.sockets.udp.onReceive.addListener(onReceive);
			chrome.sockets.udp.bind(that.udpSocketId, "0.0.0.0", that.udpListenPort, function(result){
				if(result < 0){
					console.log("Error when binding udp socket");
					return;
				}
			});
		});
		
		//Open TCP server.
		chrome.sockets.tcpServer.create({}, function(createInfo){
			that.serverSocketId = createInfo.socketId;
			
			//Listen on localhost at specified port.
			chrome.sockets.tcp.listen(that.serverSocketId, "127.0.0.1", that.tcpListenPort, function(resultCode){
				if(resultCode < 0)
				{
					console.log("Error when creating TCP server:" + chrome.runtime.lastError.message);
					return;
				}
				
				chrome.sockets.tcpServer.onAccept.addListener(onAccept);
			});
		});
	}
	
};

P2PSocket.prototype.on = function(message, callback){
	
	this.callbacks[message] = callback;
};

P2PSocket.prototype.emit = function(message, data, isSecured){

};