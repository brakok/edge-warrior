
var Missile = function(x, y, type, vel){
	this.x = x;
	this.y = y;
	this.vel = vel;
	this.type = type
	this.currentAnimation = null;
	this.sprite = null;
	
	this.facing = (this.vel.x < 0 ? Enum.Facing.LEFT : Enum.Facing.RIGHT);
	
	this.audioId = null;
	
	this.init();	
};

Missile.prototype.init = function(){

	switch(this.type){
		case Enum.DeathZone.Type.FIREBALL:
		
			//Set fireball animation.
			this.currentAnimation = cc.Sprite.createWithSpriteFrameName('Fireball.0000.png');
			this.currentAnimation.runAction(cc.RepeatForever.create(AnimationManager.create('Fireball', 0, 3, 24)));
			
			this.audioId = AudioManager.playEffect(Constants.Sound.File.Common.FIRE, true);
			break;
		case Enum.DeathZone.Type.PICK_AXE:
		
			var degree = 0;
			var that = this;
		
			//Set pickaxe animation.
			this.sprite = cc.Sprite.create(assetsEffectDir + 'PickAxe.png');
			this.sprite.schedule(function(dt){
				that.sprite.setRotation(degree);
				degree += 24*(that.facing == Enum.Facing.LEFT ? -1 : 1); //360 degree for 60 frames.
				
				if(degree == 360)
					degree = 0;
			});
			
			this.audioId = AudioManager.playEffect(Constants.Sound.File.PickAxe.MOVING, true);
			break;
	}
	
	this.setPosition(this.x, this.y);
	
	if(this.sprite)
	{
		this.sprite.setFlippedX(this.facing == Enum.Facing.LEFT);
		
		this.sprite._zOrder = Constants.DeathZone.Missile.Z_INDEX;
		Client.game.layer.addChild(this.sprite);		
	}
	else if(this.currentAnimation)
	{
		this.currentAnimation.setFlippedX(this.facing == Enum.Facing.LEFT);
	
		this.currentAnimation._zOrder = Constants.DeathZone.Missile.Z_INDEX;
		Client.game.layer.addChild(this.currentAnimation);
	}
		
};

Missile.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
};

Missile.prototype.update = function(){

	if(this.sprite != null)
		Client.game.camera.project(this.sprite, this.x, this.y);
	else if(this.currentAnimation != null)
		Client.game.camera.project(this.currentAnimation, this.x, this.y);
};

Missile.prototype.fromServer = function(remoteMissile){	
	this.setPosition(remoteMissile.x, remoteMissile.y);
};

Missile.prototype.explode = function(){

	if(this.sprite != null)
	{
		Client.game.layer.removeChild(this.sprite);
			
		switch(this.type){
			case Enum.DeathZone.Type.PICK_AXE:
				//Create pickaxe ending animation.
				EffectManager.create(Enum.Effect.Type.PICK_AXE_DISAPPEARING, this.x, this.y);
				AudioManager.playEffect(Constants.Sound.File.PickAxe.ENDING, false);
				break;
		}
	}
	else if(this.currentAnimation != null)
	{
		Client.game.layer.removeChild(this.currentAnimation);
		
		switch(this.type){
			case Enum.DeathZone.Type.FIREBALL:
			
				//Create fireball explosion animation.
				EffectManager.create(Enum.Effect.Type.FIREBALL_EXPLOSION, this.x, this.y);
				
				AudioManager.playEffect(Constants.Sound.File.Common.EXPLOSION01, false);
				break;
		}
	}
		
	if(this.audioId != null)
	{
		AudioManager.stopEffect(this.audioId);
		this.audioId = null;
	}
};