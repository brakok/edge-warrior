
var SandSpirit = function(x, y, facing){
	this.x = x;
	this.y = y;
	this.facing = facing;

	this.audioId = null;
	
	this.crawlingAnimation = AnimationManager.create('SandSpirit', 0, 24, 24);
	this.actionSprite = cc.Sprite.create(assetsNpcDir + 'SandSpirit_action.png');
	this.actionSprite.setZOrder(Constants.NPC.Z_ORDER);
	
	//Main animation.
	this.currentAnimation = cc.Sprite.createWithSpriteFrameName('SandSpirit.0000.png');
	this.currentAnimation.setZOrder(Constants.NPC.Z_ORDER);
	
	this.currentAnimation.runAction(cc.RepeatForever.create(this.crawlingAnimation));
	
	Client.game.layer.addChild(this.currentAnimation);
	
	Smoothering.init(this, this.x, this.y);
	
	//Start effects.
	AudioManager.playVoice(Constants.Sound.File.SandSpirit.SPAWN, false);
	this.audioId = AudioManager.playEffect(Constants.Sound.File.Common.SAND, true);
	
	this.trail = ParticleManager.create(Enum.Particles.SAND, this.x, this.y, Client.game.layer);
	this.trail.run();
};

SandSpirit.prototype.render = function(){
	Client.game.camera.project(this.currentAnimation, this.x, this.y);
};

SandSpirit.prototype.update = function(dt){
	//Update position.
	var newPos = Smoothering.pop(this);
	
	if(newPos.x != this.x || newPos.y != this.y)
	{
		this.setPosition(newPos.x, newPos.y);
		this.trail.x = newPos.x;
		this.trail.y = newPos.y;
	}
};

SandSpirit.prototype.execute = function(type){

	Client.game.layer.removeChild(this.currentAnimation);
	this.currentAnimation = this.actionSprite;
	Client.game.layer.addChild(this.currentAnimation);
};

SandSpirit.prototype.explode = function(){
	Client.game.layer.removeChild(this.currentAnimation);
	this.trail.stop();
	
	if(this.audioId != null)
	{
		AudioManager.stopEffect(this.audioId);
		this.audioId = null;
	}
	
	AudioManager.playVoice(Constants.Sound.File.SandSpirit.DISAPPEARING, false);
	EffectManager.create(Enum.Effect.Type.SAND_SPIRIT_DISAPPEARING, this.x, this.y - 30);
};

SandSpirit.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
};

SandSpirit.prototype.fromServer = function(remoteNpc){
	this.facing = remoteNpc.facing;
	Smoothering.push(this, remoteNpc.x, remoteNpc.y);
};