
var Spike = function(x, y, type, finalX, finalY){
	this.x = x;
	this.y = y;
	this.type = type
	
	this.finalX = finalX;
	this.finalY = finalY;
	
	this.currentAnimationType = Enum.Anim.Type.IDLE;
	
	switch(this.type){
		case Enum.DeathZone.Type.ENERGY_SPIKE:
		
			//Base frame.
			this.currentAnimation = cc.Sprite.createWithSpriteFrameName('EnergySpike_tentacle.0000.png');
			this.currentAnimation.setPosition(new cc.Point(x, y));
			this.currentAnimation._zOrder = 998;
			
			//Animations.
			this.tentacleAnimation = AnimationManager.create('EnergySpike_tentacle', 0, 24, 24);
			
			this.currentAnimation.runAction(cc.RepeatForever.create(this.tentacleAnimation));
			break;
	}

	var distance = Math.abs(y - finalY);
	
	//Resize to good scale.
	var factor = Constants.DeathZone.EnergySpike.HEIGHT/distance;
	console.log(distance + ' ' + Constants.DeathZone.EnergySpike.HEIGHT);
	this.currentAnimation.setScaleY(1/factor);
	
	this.currentAnimation.setPosition(new cc.Point(this.x, this.y));	
	this.currentAnimation._zOrder = 998;
};

Spike.prototype.fromServer = function(remoteSpike){

	this.x = remoteSpike.x;
	this.y = remoteSpike.y;
	
	this.currentAnimation.setPosition(new cc.Point(this.x, this.y));
};

Spike.prototype.explode = function(){
	Client.layer.removeChild(this.currentAnimation);
};