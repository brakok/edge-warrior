
cd.Server.Lobby = function(id, hostId, username){
	this.id = id;
	this.name = 'Lobby of ' + username;
	
	this.hostId = hostId;
	this.connectedPlayers = 1;
	this.settings = new cd.Server.GameSettings(id, 1200, 800, 2, username);
};

cd.Server.Lobby.prototype.update = function(data){
	this.name = data.name;
};

cd.Server.Lobby.prototype.toClient = function(){

	return {
		id: this.id,
		name: this.name,
		settings: this.settings,
		connectedPlayers: this.connectedPlayers,
		maxPlayers: Constants.Game.MAX_PLAYERS
	};
};