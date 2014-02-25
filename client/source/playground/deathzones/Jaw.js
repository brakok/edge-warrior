
var Jaw = function(x, y){
	
	this.x = x;
	this.y = y;

	this.init();
};

Jaw.prototype.init = function(){

	this.currentAnimation = cc.Sprite.createWithSpriteFrameName('Jaw.0000.png');
	var anim = AnimationManager.create('Jaw', 0, 6, 24);
	this.currentAnimation.runAction(cc.RepeatForever.create(anim));
	
	this.currentAnimation._zOrder = Constants.DeathZone.Jaw.Z_INDEX;
	
	Client.game.layer.addChild(this.currentAnimation);
};

Jaw.prototype.setPosition = function(x, y){

	this.x = x;
	this.y = y;
};

Jaw.prototype.fromServer = function(remoteJaw){	
	this.setPosition(remoteJaw.x, remoteJaw.y);
};

Jaw.prototype.explode = function(){
	Client.game.layer.removeChild(this.currentAnimation);
};

Jaw.prototype.update = function(){
	Client.game.camera.project(this.currentAnimation, this.x, this.y);
};