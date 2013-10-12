
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
	this.lblUsername.setPosition(new cc.Point(this.x, this.y));
	this.lblUsername.setColor(new cc.Color3B(0,0,0));
	
	this.lblColor = cc.LabelTTF.create("Color", Constants.Font.NAME, Constants.Font.SIZE);
	this.lblColor.setPosition(new cc.Point(this.x + 560, this.y));
	this.lblColor.setColor(new cc.Color3B(0,0,0));
	
	this.lblReady = cc.LabelTTF.create("Ready", Constants.Font.NAME, Constants.Font.SIZE);
	this.lblReady.setPosition(new cc.Point(this.x + 725, this.y));
	this.lblReady.setColor(new cc.Color3B(0,0,0));
	
	//Create color box and checkbox with their slot in scope.
	this.colorBox = new ColorBox(this.layer, this.x + 650, this.y, color);
	this.chkReady = new CheckBox(this.layer, this.x + 800, this.y, ready);
	
	//Set callbacks.
	(function(slot){
		slot.colorBox.callback = function(){ slot.pushUpdates(); };
		slot.chkReady.callback = function(){ slot.pushUpdates(); };
	})(this);
	
	//Disabled color box and checkbox.
	if(this.username != Client.username)
		this.setEnabled(false);
	
	this.layer.addChild(this.lblUsername);
	this.layer.addChild(this.lblColor);
	this.layer.addChild(this.lblReady);
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
	this.layer.removeChild(this.lblColor);
	this.layer.removeChild(this.lblReady);
	this.colorBox.removeChildren();
	this.chkReady.removeChildren();
};