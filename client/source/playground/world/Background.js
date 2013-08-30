
var Background = function(x, y, width, height, type) {

	this.x = x;
	this.y = y;
	this.type = type;
	
	this.width = width;
	this.height = height;
	
	this.sky = null;
	this.background = null;
};

Background.prototype.init = function(){
	
	switch(this.type){
		case Enum.World.Type.PIT:
			this.sky = cc.Sprite.create(assetsWorldDir + 'sky.png');
			this.background = cc.Sprite.create(assetsWorldDir + 'background_pit.png');
			break;
	};
	
	this.sky.setPosition(new cc.Point(this.x, this.y));
	this.background.setPosition(new cc.Point(this.x, this.y));
	
	this.sky._zOrder = Constants.World.Background.Z_INDEX - 1;
	this.background._zOrder = Constants.World.Background.Z_INDEX;
	
	Client.game.layer.addChild(this.sky);
	Client.game.layer.addChild(this.background);
};

Background.prototype.update = function(){
	Client.game.camera.project(this.sky, this.x, this.y + this.height, this.width*0.015, this.height*0.02);
	Client.game.camera.project(this.background, this.x, this.y);
};