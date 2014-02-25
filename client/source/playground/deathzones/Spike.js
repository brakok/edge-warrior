
var Spike = function(x, y, type, finalX, finalY){
	this.x = x;
	this.y = y;
	this.type = type;
	
	//Indicate whether or not the spike has evolved to his other form.
	this.isTransformed = false;
	
	this.finalX = finalX;
	this.finalY = finalY;
	
	this.currentAnimationType = Enum.Anim.Type.IDLE;
	
	//Call init immeditately to add to the layer.
	this.init();
};

Spike.prototype.init = function(){

	switch(this.type){
		case Enum.DeathZone.Type.ENERGY_SPIKE:
		
			//Base frame.
			this.currentAnimation = cc.Sprite.createWithSpriteFrameName('EnergySpike_tentacle.0000.png');

			//Animations.
			this.tentacleAnimation = AnimationManager.create('EnergySpike_tentacle', 0, 24, 24);
			this.twistedAnimation = AnimationManager.create('EnergySpike_twisted', 0, 24, 24);
			this.transformAnimation = AnimationManager.create('EnergySpike_transform', 0, 24, 24);
			
			var distance = Math.abs(this.y - this.finalY);
			
			//Creation of a floating light ball seeked by the shadow tentacle.
			this.lightBall = new LightBall(this.finalX, this.finalY + distance*0.5);

			//Resize to good scale.
			var factor = Constants.DeathZone.EnergySpike.HEIGHT/distance;
			this.ratioY = 1/factor;
			
			this.currentAnimation.setScaleY(this.ratioY);
			this.currentAnimation.runAction(cc.RepeatForever.create(this.tentacleAnimation));
			
			//Callback after transformation to set twisted tentacle.
			this.transformCallback = cc.CallFunc.create(function(node){
										Client.game.layer.removeChild(this.currentAnimation);
										
										//Add twisted tentacle.
										this.currentAnimation.runAction(cc.RepeatForever.create(this.twistedAnimation));
										Client.game.layer.addChild(this.currentAnimation);
									}, this);
			
			break;
	}

	this.setPosition(this.x, this.y);
	this.currentAnimation._zOrder = Constants.DeathZone.EnergySpike.Z_INDEX;

	Client.game.layer.addChild(this.currentAnimation);
};

Spike.prototype.endProcess = function(){

	switch(this.type){
		case Enum.DeathZone.Type.ENERGY_SPIKE:
			//Remove light ball and previous tentacle.
			this.lightBall.explode();
			Client.game.layer.removeChild(this.currentAnimation);
			
			//Add transformation animation.
			this.currentAnimation.runAction(cc.Sequence.create(this.transformAnimation,
															   this.transformCallback));
			Client.game.layer.addChild(this.currentAnimation);
			
			AudioManager.playEffect(Constants.Sound.File.Spike.TENTACLE_TRANSFORM, false);
			break;
	}
	
	this.isTransformed = true;
};

Spike.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
};

Spike.prototype.update = function(dt){

	Client.game.camera.project(this.currentAnimation, this.x, this.y, 1, this.ratioY);
	this.lightBall.update(dt);
};

Spike.prototype.fromServer = function(remoteSpike){

	this.setPosition(remoteSpike.x, remoteSpike.y);
	
	//Activate final process if needed.
	if(this.y == this.finalY && !this.isTransformed)
		this.endProcess();
};

Spike.prototype.explode = function(){
	Client.game.layer.removeChild(this.currentAnimation);
};