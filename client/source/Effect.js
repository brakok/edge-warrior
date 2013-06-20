
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
	}
	
	this.sprite._zOrder = Constants.Effect.Z_INDEX;
	this.callback = cc.CallFunc.create(function(node){
								Client.layer.removeChild(node);
								this.hasEnded = true;
							}, this.sprite);
};

Effect.prototype.launch = function(){

	//Trigger death animation.
	this.sprite.runAction(cc.Sequence.create(this.animation, 
											 this.callback));
			 
	this.sprite.setPosition(new cc.Point(this.x, this.y));
	Client.layer.addChild(this.sprite);
};

Effect.prototype.update = function(){
	Client.camera.project(this.sprite, this.x, this.y);
};