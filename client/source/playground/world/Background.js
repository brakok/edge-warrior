
var Background = function(x, y, width, height, info) {

	this.x = x;
	this.y = y;
	this.info = info;
	
	this.width = width;
	this.height = height;
		
	this.sky = null;
	this.background = null;
	
	console.log(this.height);
};

Background.prototype.load = function(layer){
	
	this.sky = cc.Sprite.create(this.info.SKY_SPRITE_PATH);
	this.background = cc.Sprite.create(this.info.BACKGROUND_SPRITE_PATH);
	
	this.sky.setPosition(new cc.Point(this.x, this.y));
	this.background.setPosition(new cc.Point(this.x, this.y));
	
	this.sky._zOrder = Constants.World.Background.Z_INDEX - 1;
	this.background._zOrder = Constants.World.Background.Z_INDEX;
	
	layer.addChild(this.sky);
	layer.addChild(this.background);
};

Background.prototype.update = function(){
	Client.game.camera.project(this.sky, this.x, this.y + this.height, this.width*0.015, this.height*0.03);
	Client.game.camera.project(this.background, this.x, this.y);
};