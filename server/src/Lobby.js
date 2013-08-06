
var Lobby = function(id){
	this.id = id;
	this.clientsId = [];
	this.connectedPlayers = 0;
	
	this.settings = null;
};