
var Eclipse = function(x, y, power, isOwner){

	this.x = x;
	this.y = y;
	this.hasEnded = false;
	this.isOwner = isOwner;
	
	this.sprite = cc.Sprite.create(assetsEffectDir + 'Eclipse.png');
	this.sprite.setZOrder(Constants.Element.Eclipse.Z_ORDER);
	
	this.maxOpacity = this.isOwner ? 125 : 255;
			
	this.power = power;
	this.scale = 1 + power*Constants.Element.Eclipse.SCALE_STEP;
	this.originalDuration = this.duration = Constants.Element.Eclipse.DURATION + Constants.Element.Eclipse.DURATION_STEP*power;
};

Eclipse.prototype.init = function(){
	Client.game.frontLayer.addChild(this.sprite);
};

Eclipse.prototype.end = function(){
	Client.game.frontLayer.removeChild(this.sprite);
	this.hasEnded = true;
};

Eclipse.prototype.update = function(dt){

	if(this.duration > 0)
	{
		var fadeInTime = this.originalDuration - this.duration;
		
		//Deal with opacity (fade in/fade out).
		if(fadeInTime <= Constants.Element.Eclipse.FADE_IN)
			this.sprite.setOpacity(fadeInTime/Constants.Element.Eclipse.FADE_IN*this.maxOpacity);
		else if(this.duration <= Constants.Element.Eclipse.FADE_OUT)
			this.sprite.setOpacity(this.duration/Constants.Element.Eclipse.FADE_OUT*this.maxOpacity);
		else
			this.sprite.setOpacity(this.maxOpacity);
	
		this.duration -= dt;
		Client.game.camera.project(this.sprite, this.x, this.y, this.scale, this.scale);
	}
	else
		this.end();
};