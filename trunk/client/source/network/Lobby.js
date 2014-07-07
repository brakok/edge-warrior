
cd.Server.Lobby = function(hostId, username){
	this.name = 'Lobby of ' + username;
	
	this.hostId = hostId;
	this.connectedPlayers = 1;
	this.settings = new cd.Server.GameSettings(1200, 800, 2, username);
};

cd.Server.Lobby.prototype.update = function(data){
	this.name = data.name;
};

cd.Server.Lobby.prototype.toClient = function(){

	return {
		name: this.name,
		settings: this.settings,
		connectedPlayers: this.connectedPlayers,
		maxPlayers: Constants.Game.MAX_PLAYERS
	};
};