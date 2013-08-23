
var Lobby = function(id, username){

	this.id = id;
	this.connectedPlayers = 1;
	
	this.players = [];
	this.addPlayer(username, Enum.Slot.Color.UNASSIGNED);
	
	this.settings = new GameSettings(id, 1200, 800, 2);
};

Lobby.prototype.addPlayer = function(username, color){
	this.players.push({
		username: username,
		color: color,
		ready: false
	});
};

Lobby.prototype.removePlayer = function(username){
	
	var index = null;
	for(var i in this.players)	
		if(this.players[i].username == username)
		{
			index = i;
			break;
		}
	
	if(index != null)
		this.players.splice(index, 1);
};

Lobby.prototype.toClient = function(){

	var players = [];
	
	for(var i in this.players)
		if(this.players[i] != null)
			players.push(this.players[i]);

	return {
		id: this.id,
		players: players,
		settings: this.settings,
		connectedPlayers: this.connectedPlayers
	};
};