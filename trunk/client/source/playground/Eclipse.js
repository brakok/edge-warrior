
var Eclipse = function(x, y, power, isOwner){

	this.x = x;
	this.y = y;
	this.hasEnded = false;
	this.isOwner = isOwner;
	
	this.sprite = cc.Sprite.create(assetsEffectDir + 'Eclipse.png');
	this.sprite.setZOrder(Constants.Element.Eclipse.Z_ORDER);
	
	this.maxOpacity = this.isOwner ? Constants.Element.Eclipse.OWNER_MAX_OPACITY : 255;
			
	this.power = power;
	this.scale = 1 + power*Constants.Element.Eclipse.SCALE_STEP;
	this.originalDuration = this.duration = Constants.Element.Eclipse.DURATION + Constants.Element.Eclipse.DURATION_STEP*power;
	
	this.radius = this.sprite.getTextureRect().width*0.5*this.scale;
	this.dotTimer = Constants.Element.Eclipse.Dot.TIMER;
	this.dots = [];
};

Eclipse.prototype.init = function(){
	Client.game.frontLayer.addChild(this.sprite);
};

Eclipse.prototype.end = function(){

	for(var i = 0; i < this.dots.length; ++i)
		this.dots[i].end();

	this.dots = null;

	Client.game.frontLayer.removeChild(this.sprite);
	this.hasEnded = true;
};

Eclipse.prototype.render = function(){
	Client.game.camera.project(this.sprite, this.x, this.y, this.scale, this.scale);
	
	if(this.dots != null)
		for(var i = 0; i < this.dots.length; i++)
			if(this.dots[i] != null)
				this.dots[i].render();
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
		{
			this.sprite.setOpacity(this.maxOpacity);
			
			if(this.dotTimer <= 0)
			{
				this.dots.push(new ChargingDot(this.x, 
											   this.y, 
											   Constants.Element.Eclipse.Dot.SPEED, 
											   assetsParticles + 'WhiteDot.png', 
											   this.radius + Constants.Element.Eclipse.Dot.OFFSET*this.scale, 
											   Constants.Element.Eclipse.Dot.OFFSET_VAR*this.scale, 
											   this.radius*0.45, 
											   this.scale*Constants.Element.Eclipse.Dot.SCALE, 
											   Client.game.frontLayer));
											   
				this.dotTimer = Constants.Element.Eclipse.Dot.TIMER;
			}
		}
		
		this.dotTimer -= dt;
		this.duration -= dt;
		
		//Manage dots.
		for(var i = 0; i < this.dots.length; i++)
			if(!this.dots[i].isAlive)
			{
				this.dots[i].end();
				this.dots.splice(i, 1);
			}
			
		for(var i = 0; i < this.dots.length; i++)
			this.dots[i].update();
	}
	else
		this.end();
};