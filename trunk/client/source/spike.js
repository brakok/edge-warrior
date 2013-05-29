
var Spike = function(x, y, type, finalX, finalY){
	this.x = x;
	this.y = y;
	this.type = type;
	
	//Indicate whether or not the spike has evolved to his other form.
	this.isTransformed = false;
	
	this.finalX = finalX;
	this.finalY = finalY;
	
	this.init();
};

Spike.prototype.init = function(){

	this.currentAnimationType = Enum.Anim.Type.IDLE;

	switch(this.type){
		case Enum.DeathZone.Type.ENERGY_SPIKE:
		
			//Base frame.
			this.currentAnimation = cc.Sprite.createWithSpriteFrameName('EnergySpike_tentacle.0000.png');
			this.currentAnimation.setPosition(new cc.Point(this.x, this.y));
			this.currentAnimation._zOrder = 997;
			
			//Animations.
			this.tentacleAnimation = AnimationManager.create('EnergySpike_tentacle', 0, 24, 24);
			this.twistedAnimation = AnimationManager.create('EnergySpike_twisted', 0, 24, 24);
			
			var distance = Math.abs(this.y - this.finalY);
			
			//Creation of a floating light ball seeked by the shadow tentacle.
			this.lightBall = cc.Sprite.create(assetsEffectDir + 'lightBall.png');
			this.lightBall.setPosition(new cc.Point(this.finalX, this.finalY + distance*0.5));
			
			//Create some movement for the floating light ball.
			var orbitTime = 0;
			var finalX = this.finalX;
			var finalY = this.finalY;
			
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
			
			Client.layer.addChild(this.lightBall);
			break;
	}

	this.currentAnimation.setPosition(new cc.Point(this.x, this.y));	
	this.currentAnimation._zOrder = 997;

	Client.layer.addChild(this.currentAnimation);
};

Spike.prototype.endProcess = function(){

	switch(this.type){
		case Enum.DeathZone.Type.ENERGY_SPIKE:
			//Remove light ball and previous tentacle.
			Client.layer.removeChild(this.lightBall);
			Client.layer.removeChild(this.currentAnimation);
			
			//TODO: transition anim.
			
			//Add twisted tentacle.
			this.currentAnimation.runAction(cc.RepeatForever.create(this.twistedAnimation));
			Client.layer.addChild(this.currentAnimation);
			break;
	}
	
	this.isTransformed = true;
};

Spike.prototype.fromServer = function(remoteSpike){

	this.x = remoteSpike.x;
	this.y = remoteSpike.y;
	
	this.currentAnimation.setPosition(new cc.Point(this.x, this.y));
	
	//Activate final process if needed.
	if(this.y == this.finalY && !this.isTransformed)
		this.endProcess();
};

Spike.prototype.explode = function(){
	Client.layer.removeChild(this.currentAnimation);
};