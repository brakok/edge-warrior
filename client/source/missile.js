
var Missile = function(x, y, type){
	this.x = x;
	this.y = y;
	this.type = type
	
	switch(this.type){
		case Enum.Missile.Type.RAYBALL:
			this.sprite = cc.Sprite.create(assestsPlaceHolderDir + 'ray_ball.png');
			break;
	}
	
	this.sprite.setPosition(new cc.Point(this.x, this.y));	
	this.sprite._zOrder = 999;
};

Missile.prototype.fromServer = function(remoteMissile){

	this.x = remoteMissile.x;
	this.y = remoteMissile.y;
	
	this.sprite.setPosition(new cc.Point(this.x, this.y));
};

Missile.prototype.explode = function(){
	Client.layer.removeChild(this.sprite);
};