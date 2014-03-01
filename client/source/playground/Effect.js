
var Effect = function(type, x, y){
	
	this.type = type;
	this.x = x;
	this.y = y;
	
	this.hasEnded = false;
	
	this.init();
};

Effect.prototype.init = function(){

	this.sprite = null;
	this.animation = null;
	
	switch(this.type){
		case Enum.Effect.Type.PLAYER_DEATH:
		
			//Create player death animation.
			this.sprite = cc.Sprite.createWithSpriteFrameName('PlayerDeath.0000.png');
			this.animation = AnimationManager.create('PlayerDeath', 0, 12, 24);
			break;
		case Enum.Effect.Type.BLOCK_LANDING:
		
			//Create fog animation on block landing.
			this.sprite = cc.Sprite.createWithSpriteFrameName('BlockLanding.0000.png');
			this.animation = AnimationManager.create('BlockLanding', 0, 12, 24);
			break;
		case Enum.Effect.Type.BLOCK_DISAPPEARING:
		
			//Create fog animation on block landing.
			this.sprite = cc.Sprite.createWithSpriteFrameName('BlockDisappearing.0000.png');
			this.animation = AnimationManager.create('BlockDisappearing', 0, 6, 24);
			break;
		case Enum.Effect.Type.SWAP_COLOR:
		
			//Trigger animation when a block swaps his color.
			this.sprite = cc.Sprite.createWithSpriteFrameName('SwapColor.0000.png');
			this.animation = AnimationManager.create('SwapColor', 0, 12, 24);
			break;
		case Enum.Effect.Type.DOUBLE_JUMP:
			
			//Effect when double jumping.
			this.sprite = cc.Sprite.createWithSpriteFrameName('DoubleJump.0000.png');
			this.animation = AnimationManager.create('DoubleJump', 0, 8, 24);
			break;
		case Enum.Effect.Type.SPARK:
		
			//Light explosion.
			this.sprite = cc.Sprite.createWithSpriteFrameName('Spark.0000.png');
			this.animation = AnimationManager.create('Spark', 0, 6, 48);
			break;
		case Enum.Effect.Type.SPAWN_UNLEASHED:
		
			//Effect created by spawn explosion.
			this.sprite = cc.Sprite.createWithSpriteFrameName('spawn_unleashed.0000.png');
			this.animation = AnimationManager.create('spawn_unleashed', 0, 16, 24);
			break;
		case Enum.Effect.Type.FIREBALL_EXPLOSION:

			//Effect created by dying fireball.
			this.sprite = cc.Sprite.createWithSpriteFrameName('Fireball_explosion.0000.png');
			this.animation = AnimationManager.create('Fireball_explosion', 0, 12, 24);
			break;
		
		case Enum.Effect.Type.FIREPULSE_EXPLOSION:

			//Effect created by dying fireball.
			this.sprite = cc.Sprite.createWithSpriteFrameName('FirePulse_explosion.0000.png');
			this.animation = AnimationManager.create('FirePulse_explosion', 0, 12, 24);
			break;
		
		case Enum.Effect.Type.JAW_DISAPPEARING:

			//Effect created by dying fireball.
			this.sprite = cc.Sprite.createWithSpriteFrameName('JawDisappearing.0000.png');
			this.animation = AnimationManager.create('JawDisappearing', 0, 10, 24);
			break;
	}
	
	this.sprite._zOrder = Constants.Effect.Z_INDEX;
	this.callback = cc.CallFunc.create(function(node){
								Client.game.layer.removeChild(node);
								this.hasEnded = true;
							}, this.sprite);
};

Effect.prototype.launch = function(){

	//Trigger death animation.
	this.sprite.runAction(cc.Sequence.create(this.animation, 
											 this.callback));
			 
	this.sprite.setPosition(new cc.Point(this.x, this.y));
	Client.game.layer.addChild(this.sprite);
};

Effect.prototype.update = function(){
	Client.game.camera.project(this.sprite, this.x, this.y);
};