
var P2PSocket = function(udpPort){
	this.udpSocketId = null;
	this.tcpSocketId = null;
	this.connectedAddress = null;
	
	this.clientSocketId = null;
	this.callbacks = {};
	
	this.udpPort = udpPort;
	this.remoteUdpPort = null;
	
	this.isServerSide = false;
	
	var that = this;
	
	this.on(Constants.Message.CONNECTION, function(data){
		that.clientSocketId = data.clientSocketId;
	});
};

//Callback called when object is received from network.
P2PSocket.prototype.onReceive = function(info){

	console.log('Client ici');
	if(info.socketId != this.udpSocketId && info.socketId != this.tcpSocketId && info.clientSocketId != this.clientSocketId)
		return;

	var data = NetworkHelper.deserialize(info.data.data);
	console.log(data);
	this.callbacks[data.message](data.data);
};

//Callback called when object is received from network.
P2PSocket.prototype.onTransfer = function(data){
	this.callbacks[data.message](data.data);
};

//Connect to remote TCP server and open UDP port.
P2PSocket.prototype.connect = function(address, remoteUdpPort, remoteTcpPort){
	var that = this;
		
	this.connectedAddress = address;
	this.remoteUdpPort = remoteUdpPort;
	this.remoteTcpPort = remoteTcpPort;
	
	//Create UDP socket.
	chrome.sockets.udp.create({}, function(socketInfo){
		that.udpSocketId = socketInfo.socketId;
		
		chrome.sockets.udp.onReceive.addListener(this.onReceive);
		chrome.sockets.udp.bind(socketInfo.socketId, "0.0.0.0", that.udpPort, function(result){
			if(result < 0){
				console.log("Error when binding udp socket");
				return;
			}
		});
	});
	
	//Create TCP socket.
	chrome.sockets.tcp.create({}, function(createInfo){
		that.tcpSocketId = createInfo.socketId;
		chrome.sockets.tcp.setPaused(that.tcpSocketId, false);
		
		chrome.sockets.tcp.onReceive.addListener(this.onReceive);
		chrome.sockets.tcp.connect(createInfo.socketId, that.connectedAddress, that.remoteTcpPort, function(info){
			console.log('TCP socket created');
		});
	});
};

//Used on server to indicate information without connect to server.
P2PSocket.prototype.register = function(address, udpSocketId, remoteUdpPort, clientSocketId){
	var that = this;
	
	this.connectedAddress = address;
	this.clientSocketId = clientSocketId;
	this.udpSocketId = udpSocketId;
	
	this.isServerSide = true;
	this.remoteUdpPort = remoteUdpPort;
};

//Disconnect from TCP server.
P2PSocket.prototype.disconnect = function(){
	chrome.sockets.tcp.disconnect(this.tcpSocketId);
};

//Add callback to socket.
P2PSocket.prototype.on = function(message, callback){
	this.callbacks[message] = callback;
};

//Emit object over network.
P2PSocket.prototype.emit = function(message, data, isSafe){
		
	var data = NetworkHelper.serialize({
		message: message,
		data: data,
		clientSocketId: this.clientSocketId
	});

	if(isSafe != null && isSafe)
		chrome.sockets.tcp.send(!this.isServerSide ? this.tcpSocketId : this.clientSocketId, data, function(sendInfo){
			console.log(sendInfo);
		});
	else
		chrome.sockets.udp.send(this.udpSocketId, data, this.connectedAddress, this.remoteUdpPort, function(sendInfo){
			console.log(sendInfo);
		});
		
		
};