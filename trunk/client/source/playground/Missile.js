
var Missile = function(x, y, type){
	this.x = x;
	this.y = y;
	this.type = type
	this.init();	
};

Missile.prototype.init = function(){

	switch(this.type){
		case Enum.DeathZone.Type.RAYBALL:
			this.sprite = cc.Sprite.create(assestsPlaceHolderDir + 'ray_ball.png');
			break;
	}
	
	this.setPosition(this.x, this.y);	
	this.sprite._zOrder = Constants.DeathZone.Missile.Z_INDEX;
	
	Client.game.layer.addChild(this.sprite);
};

Missile.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
};

Missile.prototype.update = function(){
	Client.game.camera.project(this.sprite, this.x, this.y);
};

Missile.prototype.fromServer = function(remoteMissile){	
	this.setPosition(remoteMissile.x, remoteMissile.y);
};

Missile.prototype.explode = function(){
	Client.game.layer.removeChild(this.sprite);
};