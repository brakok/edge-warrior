
var Spike = function(x, y, type){
	this.x = x;
	this.y = y;
	this.type = type
	
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