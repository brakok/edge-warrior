
var Spike = function(x, y, type){
	this.x = x;
	this.y = y;
	this.type = type
	
	this.currentAnimationType = Enum.Anim.Type.IDLE;
	
	switch(this.type){
		case Enum.DeathZone.Type.ENERGY_SPIKE:
		
			cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsEffectDir + 'EnergySpike_tentacle.plist', 
															  assetsEffectDir + 'EnergySpike_tentacle.png');
	
			//Base frame.
			this.currentAnimation = cc.Sprite.createWithSpriteFrameName('EnergySpike_tentacle.0000.png');
			this.currentAnimation.setPosition(new cc.Point(x, y));
			this.currentAnimation._zOrder = 998;
			
			//When tentacle raises.
			var tentacleAnimFrames = [];
			var str = "";
			for (var i = 0; i < 24; i++) {
				str = "EnergySpike_tentacle." + (i < 10 ? ("000" + i) : ('00' + i)) + ".png";
				var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
				tentacleAnimFrames.push(frame);
			}
			
			//Creation of the idle animation.
			var animation = cc.Animation.create(tentacleAnimFrames, 0.042);
			this.tentacleAnimation = cc.Animate.create(animation);
			
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