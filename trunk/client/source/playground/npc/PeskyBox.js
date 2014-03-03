
var PeskyBox = function(x, y, facing){
	this.x = x;
	this.y = y;
	this.facing = facing;
	
	this.sprite = cc.Sprite.create(assestsPlaceHolderDir + 'ray_ball.png');
	this.sprite.setZOrder(Constants.NPC.Z_ORDER);
	
	Client.game.layer.addChild(this.sprite);
};

PeskyBox.prototype.update = function(dt){
	Client.game.camera.project(this.sprite, this.x, this.y);
};

PeskyBox.prototype.explode = function(){
	Client.game.layer.removeChild(this.sprite);
};

PeskyBox.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
};

PeskyBox.prototype.fromServer = function(remoteNpc){
	
	this.facing = remoteNpc.facing;
	this.setPosition(data.x, data.y);
};