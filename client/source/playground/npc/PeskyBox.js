
var PeskyBox = function(x, y, facing, target){
	this.x = x;
	this.y = y;
	this.facing = facing;
	
	this.target = target;
	this.audioId = null;
	
	//Eyes.
	this.eyesOpened = false;
	this.eyeSprite = cc.Sprite.createWithSpriteFrameName('Eyes.0000.png');
	this.eyeAnimation = AnimationManager.create('Eyes', 0, 16, 24);
	
	this.eyeSprite.setZOrder(Constants.NPC.Z_ORDER + 1);
	
	this.spawnAnimation = AnimationManager.create('PeskyBox', 0, 18, 24);

	//Main animation.
	this.currentAnimation = cc.Sprite.createWithSpriteFrameName('PeskyBox.0000.png');
	this.currentAnimation.setZOrder(Constants.NPC.Z_ORDER);
	
	var that = this;
	
	this.callback = cc.CallFunc.create(function(node){
								//Trigger eye animation.
								that.eyeSprite.runAction(that.eyeAnimation);
								
								
								
								Client.game.layer.addChild(that.eyeSprite);
								that.eyesOpened = true;
							}, this.currentAnimation);
	
	this.currentAnimation.runAction(cc.Sequence.create(this.spawnAnimation, 
													   this.callback));
	
	Client.game.layer.addChild(this.currentAnimation);
	
	//Start effects.
	AudioManager.playEffect(Constants.Sound.File.PeskyBox.SPAWN, false);
	this.audioId = AudioManager.playEffect(Constants.Sound.File.Common.FLOATING, true);
};

PeskyBox.prototype.render = function(){
	Client.game.camera.project(this.currentAnimation, this.x, this.y);
	
	if(this.eyesOpened)
	{
		var relX = 0;
		var relY = 0;
	
		if(this.target)
		{
			var deltaX = this.target.x - this.x;
			var deltaY = this.target.y - this.y;
		
			var hypo = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
			var cos = deltaX/hypo;
			var sin = deltaY/hypo;
			
			relX = cos*Constants.NPC.PeskyBox.EYE_RADIUS;
			relY = sin*Constants.NPC.PeskyBox.EYE_RADIUS;
		}
	
		Client.game.camera.project(this.eyeSprite, this.x + relX, this.y + relY);
	}
};

PeskyBox.prototype.update = function(dt){
	
};

PeskyBox.prototype.explode = function(){
	Client.game.layer.removeChild(this.currentAnimation);
	Client.game.layer.removeChild(this.eyeSprite);
	
	AudioManager.stopEffect(this.audioId);
	this.audioId = null;
	
	AudioManager.playEffect(Constants.Sound.File.PeskyBox.DISAPPEARING, false);
	
	EffectManager.create(Enum.Effect.Type.PESKY_BOX_DISAPPEARING, this.x, this.y);
};

PeskyBox.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
};

PeskyBox.prototype.fromServer = function(remoteNpc){
	
	this.facing = remoteNpc.facing;
	this.setPosition(remoteNpc.x, remoteNpc.y);
};