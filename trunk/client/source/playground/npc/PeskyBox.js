
var PeskyBox = function(x, y, facing, target){
	this.x = x;
	this.y = y;
	this.facing = facing;
	
	this.target = target;
	
	this.spawnAnimation = AnimationManager.create('PeskyBox', 0, 18, 24);

	this.currentAnimation = cc.Sprite.createWithSpriteFrameName('PeskyBox.0000.png');
	this.currentAnimation.setZOrder(Constants.NPC.Z_ORDER);
	
	this.currentAnimation.runAction(this.spawnAnimation);
	Client.game.layer.addChild(this.currentAnimation);
};

PeskyBox.prototype.update = function(dt){
	Client.game.camera.project(this.currentAnimation, this.x, this.y);
};

PeskyBox.prototype.explode = function(){
	Client.game.layer.removeChild(this.currentAnimation);
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