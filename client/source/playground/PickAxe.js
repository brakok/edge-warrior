
var PickAxe = function(x, y){
	this.x = x;
	this.y = y;

	this.currentAnimation = null;	
	this.audioId = null;
	this.init();	
};

PickAxe.prototype.init = function(){

	this.currentAnimation = cc.Sprite.createWithSpriteFrameName('Fireball.0000.png');
	var anim = AnimationManager.create('Fireball', 0, 3, 24);
	this.currentAnimation.runAction(cc.RepeatForever.create(anim));
	
	this.audioId = AudioManager.playEffect(Constants.Sound.File.Common.FIRE, true);
	
	this.setPosition(this.x, this.y);
	
	this.currentAnimation._zOrder = Constants.DeathZone.PickAxe.Z_INDEX;
	Client.game.layer.addChild(this.currentAnimation);
};

PickAxe.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
};

PickAxe.prototype.update = function(){
	Client.game.camera.project(this.currentAnimation, this.x, this.y);
};

PickAxe.prototype.fromServer = function(remote){	
	this.setPosition(remote.x, remote.y);
};

PickAxe.prototype.explode = function(){

	if(this.currentAnimation != null)
		Client.game.layer.removeChild(this.currentAnimation);
		
	if(this.audioId != null)
	{
		AudioManager.stopEffect(this.audioId);
		this.audioId = null;
	}
};