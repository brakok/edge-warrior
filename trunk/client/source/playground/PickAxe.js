
var PickAxe = function(x, y){
	this.x = x;
	this.y = y;
	
	this.facing = Enum.Facing.RIGHT;
	
	this.currentAnimation = null;	
	this.audioId = null;
	this.init();	
};

PickAxe.prototype.init = function(){

	this.currentAnimation = cc.Sprite.createWithSpriteFrameName('PickAxe.0000.png');
	var anim = AnimationManager.create('PickAxe', 0, 7, 24);
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

	var tmpFacing = this.facing;

	if(this.x < remote.x && this.facing == Enum.Facing.LEFT)
		this.facing = Enum.Facing.RIGHT;
	else if (this.x > remote.x && this.facing == Enum.Facing.RIGHT)
		this.facing = Enum.Facing.LEFT;

	if(tmpFacing != this.facing)
		this.currentAnimation.setFlippedX(this.facing == Enum.Facing.LEFT);
		
	this.setPosition(remote.x, remote.y);
};

PickAxe.prototype.explode = function(){

	if(this.currentAnimation != null)
	{
		Client.game.layer.removeChild(this.currentAnimation);
	
		//Ending effect.
		EffectManager.create(Enum.Effect.Type.PICK_AXE_DISAPPEARING, this.x, this.y);
	}
		
	if(this.audioId != null)
	{
		AudioManager.stopEffect(this.audioId);
		this.audioId = null;
	}
};