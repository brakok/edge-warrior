
var BlackBox = function(x, y, width, height){
	
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.init();
};

BlackBox.prototype.init = function(){
	//Create the black box.
	this.sprite = cc.Sprite.create(assetsWorldDir + 'black_box.png');
	this.sprite.setPosition(new cc.Point(this.x, this.y));
	this.sprite._zOrder = Constants.World.BlackBox.Z_INDEX;
	
	Client.game.layer.addChild(this.sprite);
};

BlackBox.prototype.update = function(){
	Client.game.camera.project(this.sprite, this.x, this.y, this.width*0.01, this.height*0.01);
};