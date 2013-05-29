
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
			this.currentAnimation._zOrder = 997;
			
			//Animations.
			this.tentacleAnimation = AnimationManager.create('EnergySpike_tentacle', 0, 24, 24);
			
			var distance = Math.abs(y - finalY);
			
			//Creation of a floating light ball seeked by the shadow tentacle.
			this.lightBall = cc.Sprite.create(assetsEffectDir + 'lightBall.png');
			this.lightBall.setPosition(new cc.Point(this.finalX, this.finalY + distance*0.5));
			
			//Create some movement for the floating light ball.
			var orbitTime = 0;
			this.lightBall.schedule(function(dt){
				var tmpY = finalY + distance*0.5 + (Math.sin(orbitTime)*Constants.DeathZone.EnergySpike.LIGHTBALL_ORBIT_RADIUS);
				this.setPosition(new cc.Point(finalX, tmpY));
				orbitTime += dt*Constants.DeathZone.EnergySpike.LIGHTBALL_ORBIT_SPEED;
				
				if(orbitTime > 360)
					orbitTime = 0;
			});
			
			this.lightBall._zOrder = 998;
			
			//Resize to good scale.
			var factor = Constants.DeathZone.EnergySpike.HEIGHT/distance;
			this.currentAnimation.setScaleY(1/factor);
			this.currentAnimation.runAction(cc.RepeatForever.create(this.tentacleAnimation));
			
			break;
	}

	this.currentAnimation.setPosition(new cc.Point(this.x, this.y));	
	this.currentAnimation._zOrder = 997;
};

Spike.prototype.fromServer = function(remoteSpike){

	this.x = remoteSpike.x;
	this.y = remoteSpike.y;
	
	this.currentAnimation.setPosition(new cc.Point(this.x, this.y));
};

Spike.prototype.explode = function(){
	Client.layer.removeChild(this.currentAnimation);
};