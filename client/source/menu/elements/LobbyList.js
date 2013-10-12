
var LobbyList = function(divId){
	
	this.x = 0;
	this.y = 0;
	
	this.lobbies = null;
	this.div = document.getElementById(divId);
	this.table = this.div.getElementsByTagName('table')[0];
	
	this.selectedValue = null;
	
	this.visible = false;
};

LobbyList.prototype.setPosition = function(x, y){

	this.x = x;
	this.y = y;
	
	this.div.style.left = x + 'px';
	this.div.style.top = y + 'px';
};

LobbyList.prototype.setVisible = function(isVisible){
	this.visible = isVisible;
	this.div.style.display = this.visible ? 'block' : 'none';	
};

LobbyList.prototype.addLine = function(lobby){
	var row = this.table.insertRow(this.table.rows.length);
	var tdId = row.insertCell(0)
	var tdName = row.insertCell(1);
	var tdPlayers = row.insertCell(2);
	
	tdId.innerHTML = '<span>' + lobby.id + '</span>';
	tdName.innerHTML = '<span>' + lobby.name + '</span>';
	tdPlayers.innerHTML = '<span>' + lobby.connectedPlayers + '/' + lobby.maxPlayers + '</span>';
	
	//Add td.
	this.table.appendChild(row);
	
	//Add onclick event.
	(function(list, row, lobby){
		var rowIndex = list.table.rows.length - 1;
		row.onclick = function() { list.selectLobby(lobby.id, rowIndex); };
	})(this, row, lobby);	
};

//Select lobby.
LobbyList.prototype.selectLobby = function(lobbyId, rowIndex){
	this.selectedValue = lobbyId;
	
	for(var i = 1; i < this.table.rows.length; i++)
	{
		if(i == rowIndex)
			this.table.rows[i].className = 'selected';
		else
			this.table.rows[i].className = 'unselected';
	}	
};

//Return random lobby.
LobbyList.prototype.random = function(){
	var lobby = null;
	
	if(this.lobbies != null && this.lobbies.length > 0)
		lobby = this.lobbies[Math.round((this.lobbies.length-1)*Math.random())];
			
	return lobby;
};

//Clean previous row.
LobbyList.prototype.clear = function(){
	
	var end = this.table.rows.length;
	for(var i = 1; i < end; i++)
		this.table.deleteRow(1);
};

//Refresh lobbies list.
LobbyList.prototype.refresh = function(){

	this.clear();

	for(var i in this.lobbies)
		if(this.lobbies[i] != null)
			this.addLine(this.lobbies[i]);
};