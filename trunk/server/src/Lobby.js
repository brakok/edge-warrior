
var Lobby = function(id, hostId, username){
	this.id = id;
	this.hostId = hostId;
	this.connectedPlayers = 1;
	this.settings = new GameSettings(id, 1200, 800, 2, username);
};

Lobby.prototype.toClient = function(){

	return {
		id: this.id,
		settings: this.settings,
		connectedPlayers: this.connectedPlayers
	};
};