
var Missile = function(x, y, type, direction){
	this.x = x;
	this.y = y;
	this.type = type
	this.currentAnimation = null;
	this.sprite = null;
	this.direction = direction;
	
	this.audioId = null;
	
	this.init();	
};

Missile.prototype.init = function(){

	switch(this.type){
		case Enum.DeathZone.Type.FIREBALL:
		
			//Set fireball animation.
			this.currentAnimation = cc.Sprite.createWithSpriteFrameName('Fireball.0000.png');
			var anim = AnimationManager.create('Fireball', 0, 3, 24);
			this.currentAnimation.runAction(cc.RepeatForever.create(anim));
			
			this.audioId = AudioManager.playEffect(Constants.Sound.File.Common.FIRE, true);
			
			break;
	}
	
	this.setPosition(this.x, this.y);
	
	if(this.sprite != null)
	{
		if(this.direction != null)
		{
			switch(this.direction)
			{
				case Enum.Direction.LEFT:
					this.sprite.setFlippedX(true);
					break;
				case Enum.Direction.RIGHT:
					//Nothing to do.
					break;
			}
		}
	
		this.sprite._zOrder = Constants.DeathZone.Missile.Z_INDEX;
		Client.game.layer.addChild(this.sprite);
	}
	else if(this.currentAnimation != null)
	{
		if(this.direction != null)
		{
			switch(this.direction)
			{
				case Enum.Direction.LEFT:
					this.currentAnimation.setFlippedX(true);
					break;
				case Enum.Direction.RIGHT:
					//Nothing to do.
					break;
			}
		}
	
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
		Client.game.layer.removeChild(this.sprite);
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