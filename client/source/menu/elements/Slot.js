
var Slot = function(layer, number, x, y, username, color, ready){

	this.layer = layer;
	this.number = number;
	this.x = x;
	this.y = y;
	this.username = username;
	
	this.lblUsername = null;
	this.colorBox = null;
	this.chkReady = null;
	
	this.init(color, ready);
};

Slot.prototype.init = function(color, ready){
	
	this.lblUsername = cc.LabelTTF.create(this.username, Constants.Font.NAME, Constants.Font.SIZE);
	this.lblUsername.setPosition(new cc.Point(this.x - 100, this.y));
	
	//Create color box and checkbox with their slot in scope.
	this.colorBox = new ColorBox(this.layer, this.x, this.y, color);
	this.chkReady = new CheckBox(this.layer, this.x + 100, this.y, ready);
	
	//Set callbacks.
	(function(slot){
		slot.colorBox.callback = function(){ slot.pushUpdates(); };
		slot.chkReady.callback = function(){ slot.pushUpdates(); };
	})(this);
	
	//Disabled color box and checkbox.
	if(this.username != Client.username)
		this.setEnabled(false);
	
	this.layer.addChild(this.lblUsername);
};

//Update slot from server.
Slot.prototype.fromServer = function(data){
	this.colorBox.switchColor(data.color);
	this.chkReady.setChecked(data.ready);
};

//Push slot's updates to server.
Slot.prototype.pushUpdates = function(){

	//Send new color to server.
	Client.masterSocket.emit(Constants.Message.UPDATE_SLOT, {
								gameId: Client.currentGameId,
								username: Client.username,
								color: this.getColor(),
								ready: this.isReady()
							});
};

Slot.prototype.setEnabled = function(enabled){
	this.colorBox.setEnabled(enabled);
	this.chkReady.setEnabled(enabled);
};

Slot.prototype.getColor = function(){
	return this.colorBox.colorType;
};

Slot.prototype.isReady = function(){
	return this.chkReady.checked;
};

Slot.prototype.close = function(){
	this.layer.removeChild(this.lblUsername);
	this.colorBox.removeChildren();
	this.chkReady.removeChildren();
};