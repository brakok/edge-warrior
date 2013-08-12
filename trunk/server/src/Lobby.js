
var Lobby = function(id, username){

	this.id = id;
	this.clientsId = [];
	this.connectedPlayers = 1;
	this.host = username;
	
	this.clientsId.push(this.username);
	this.settings = null;
};