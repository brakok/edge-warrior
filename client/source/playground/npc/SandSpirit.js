
var SandSpirit = function(x, y, facing){
	this.x = x;
	this.y = y;
	this.facing = facing;

	this.audioId = null;
	
	this.spawnAnimation = AnimationManager.create('PeskyBox', 0, 18, 24);

	//Main animation.
	this.currentAnimation = cc.Sprite.createWithSpriteFrameName('PeskyBox.0000.png');
	this.currentAnimation.setZOrder(Constants.NPC.Z_ORDER);
	
	this.currentAnimation.runAction(cc.Sequence.create(this.spawnAnimation));
	
	Client.game.layer.addChild(this.currentAnimation);
	
	Smoothering.init(this, this.x, this.y);
	
	//Start effects.
	AudioManager.playEffect(Constants.Sound.File.PeskyBox.SPAWN, false);
	this.audioId = AudioManager.playEffect(Constants.Sound.File.Common.FLOATING, true);
};

SandSpirit.prototype.render = function(){
	Client.game.camera.project(this.currentAnimation, this.x, this.y);
};

SandSpirit.prototype.update = function(dt){
	//Update position.
	var newPos = Smoothering.pop(this);
	
	if(newPos.x != this.x || newPos.y != this.y)
		this.setPosition(newPos.x, newPos.y);
};

SandSpirit.prototype.explode = function(){
	Client.game.layer.removeChild(this.currentAnimation);
	
	AudioManager.stopEffect(this.audioId);
	this.audioId = null;
	
	AudioManager.playEffect(Constants.Sound.File.PeskyBox.DISAPPEARING, false);
	EffectManager.create(Enum.Effect.Type.PESKY_BOX_DISAPPEARING, this.x, this.y);
};

SandSpirit.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
};

SandSpirit.prototype.fromServer = function(remoteNpc){
	this.facing = remoteNpc.facing;
	Smoothering.push(this, remoteNpc.x, remoteNpc.y);
};