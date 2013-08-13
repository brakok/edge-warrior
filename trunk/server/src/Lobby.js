
var Lobby = function(id, username){

	this.id = id;
	this.connectedPlayers = 1;
	this.host = username;
	
	this.settings = new GameSettings(id, 1200, 800, 2);
};

Lobby.prototype.toClient = function(){

	return {
		id: this.id,
		settings: this.settings,
		connectedPlayers: this.connectedPlayers
	};
};