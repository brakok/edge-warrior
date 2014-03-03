
var Eclipse = function(x, y, power, isOwner){

	this.x = x;
	this.y = y;
	this.hasEnded = false;
	this.isOwner = isOwner;
	
	this.sprite = cc.Sprite.create(assetsEffectDir + 'Eclipse.png');
	this.sprite._zOrder = Constants.Element.Eclipse.Z_ORDER;
	
	//if(this.isOwner)
		//this.sprite.setOpacity(150);
		
	this.power = power;
	this.scale = 1 + power*Constants.Element.Eclipse.SCALE_STEP;
	this.duration = Constants.Element.Eclipse.DURATION + Constants.Element.Eclipse.DURATION_STEP*power;
};

Eclipse.prototype.init = function(){
	Client.game.layer.addChild(this.sprite);
};

Eclipse.prototype.end = function(){
	Client.game.layer.removeChild(this.sprite);
	this.hasEnded = true;
};

Eclipse.prototype.update = function(dt){

	if(this.duration > 0)
	{
		this.duration -= dt;
		Client.game.camera.project(this.sprite, this.x, this.y, this.scale, this.scale);
	}
	else
		this.end();
};