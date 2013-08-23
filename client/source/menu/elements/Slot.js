
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
	
	this.colorBox = new ColorBox(this.layer, this.x, this.y, color);
	this.chkReady = new CheckBox(this.layer, this.x + 100, this.y, ready);
	
	this.layer.addChild(this.lblUsername);
};

Slot.prototype.close = function(){
	this.layer.removeChild(this.lblUsername);
	this.colorBox.removeChildren();
	this.chkReady.removeChildren();
};