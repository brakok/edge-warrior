
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

//Assign good color to duplicata.
GameSettings.prototype.validateColors = function(){
		
	//Find duplicated colors.
	var usedColors = {};
	var wrongColors = {};
	for(var i in this.players)
		if(usedColors[this.players[i].color] == null)
			usedColors[this.players[i].color] = 1;
		else
		{
			usedColors[this.players[i].color]++;
			wrongColors[this.players[i].color] = usedColors[this.players[i].color];
		}
	
	//Find unused colors.
	var unusedColors = [];
	for(var i = 1; i < 5; i++)
		if(usedColors[i] == null)
			unusedColors.push(i);
	
	//Assign unused color to player with duplicated color.
	for(var i = this.players.length-1; i > -1; i--)
	{
		if(wrongColors[this.players[i].color] != null && wrongColors[this.players[i].color] > 1)
		{
			wrongColors[this.players[i].color]--;
			
			var index = Math.round(Math.random()*(unusedColors.length-1));
			this.players[i].color = unusedColors[index];
			unusedColors.splice(index, 1);
		}
	}
};