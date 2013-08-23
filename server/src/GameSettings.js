
var GameSettings = function(id, width, height, maxPlayers, username){
	//Assign when game is created by the server.
	this.id = id;
	
	this.players = [];
	this.addPlayer(username, Enum.Slot.Color.UNASSIGNED);
	
	this.width = width;
	this.height = height;
	this.maxPlayers = maxPlayers;
};

GameSettings.prototype.getPlayer = function(username){
	for(var i in this.players)
		if(this.players[i] != null && this.players[i].username == username)
			return this.players[i];
		
	return null;
};

GameSettings.prototype.updatePlayer = function(username, color, ready){
	var player = this.getPlayer(username);
	player.color = color;
	player.ready = ready;
};

GameSettings.prototype.addPlayer = function(username, color){
	this.players.push({
		username: username,
		color: color,
		ready: false
	});
};

GameSettings.prototype.removePlayer = function(username){
	
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