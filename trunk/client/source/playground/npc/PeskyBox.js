
var PeskyBox = function(x, y, facing, target){
	this.x = x;
	this.y = y;
	this.facing = facing;
	
	this.target = target;
	
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
	
	
	
	
	
	
};

PeskyBox.prototype.update = function(dt){
	Client.game.camera.project(this.currentAnimation, this.x, this.y);
	
	if(this.eyesOpened)
		Client.game.camera.project(this.eyeSprite, this.x, this.y);
};

PeskyBox.prototype.explode = function(){
	Client.game.layer.removeChild(this.currentAnimation);
	Client.game.layer.removeChild(this.eyeSprite);
	
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