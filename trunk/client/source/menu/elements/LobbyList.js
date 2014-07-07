
var LobbyList = function(divId, parent){
	
	this.x = 0;
	this.y = 0;
	
	this.parent = parent;
	
	this.lobbies = null;
	this.div = document.getElementById(divId);
	this.table = this.div.getElementsByTagName('table')[0];
	
	this.selectedValue = null;
	
	this.firstClickTimespan = null;
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
	var tdName = row.insertCell(0);
	var tdPlayers = row.insertCell(1);
	
	tdName.innerHTML = '<span>' + lobby.name + '</span>';
	tdPlayers.innerHTML = '<span>' + lobby.connectedPlayers + '/' + lobby.maxPlayers + '</span>';
	
	//Add td.
	this.table.appendChild(row);
	
	//Add onclick event.
	(function(list, row, lobby){
		var rowIndex = list.table.rows.length - 1;
		row.onclick = function() { list.selectLobby(rowIndex); };
	})(this, row, lobby);	
};

//Select lobby.
LobbyList.prototype.selectLobby = function(rowIndex){
	this.selectedValue = rowIndex;
	
	//Join selected lobby.
	if(this.firstClickTimespan != null && new Date() - this.firstClickTimespan < Constants.Mouse.DOUBLE_CLICK_THRESHOLD)
	{
		this.parent.join();
		return;
	}
	
	for(var i = 1; i < this.table.rows.length; i++)
	{
		if(i == rowIndex)
			this.table.rows[i].className = 'selected';
		else
			this.table.rows[i].className = 'unselected';
	}	
	
	this.firstClickTimespan = new Date();
};

//Return random lobby.
LobbyList.prototype.random = function(){
	var lobby = null;
	
	if(this.lobbies != null && this.lobbies.length > 0)
		lobby = this.lobbies[Math.floor(this.lobbies.length*Math.random())];
			
	return lobby;
};

//Clean previous row.
LobbyList.prototype.clear = function(){
	
	var end = this.table.rows.length;
	for(var i = 1; i < end; i++)
		this.table.deleteRow(1);
};