var Block = function (x, y, type, color) {
	
	this.x = x;
	this.y = y;
	
	this.type = type;
	this.color = color;
	
	//Create sprite associated.
	if(this.type == Enum.Block.Type.COLORED && this.color != null)
		this.sprite = cc.Sprite.create(assetsBlockDir + 'block_' + this.color + '.png');
	else if(this.type == Enum.Block.Type.SPAWN)
		this.sprite = cc.Sprite.create(assetsBlockDir + 'block_spawn.png');
	else
		this.sprite = cc.Sprite.create(assetsBlockDir + 'block.png');
		
	this.setPosition(this.x, this.y);
}

Block.prototype.init = function(){
	Client.layer.addChild(this.sprite);
};

Block.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
};

Block.prototype.execute = function(type){

	switch(type){
		case Enum.Action.Type.LANDING:
			this.land();
			break;
	}
};

Block.prototype.land = function(){
	console.log('ici');
};

Block.prototype.update = function(){
	Client.camera.project(this.sprite, this.x, this.y);
};

Block.prototype.swapColor = function(color){
	Client.layer.removeChild(this.sprite);
	this.sprite = cc.Sprite.create(assetsBlockDir + 'block_' + color + '.png');
	Client.layer.addChild(this.sprite);
	
	this.color = color;
	this.setPosition(this.x, this.y);
};

Block.prototype.explode = function(cause){
	Client.layer.removeChild(this.sprite);
};

//Update block information from server.
Block.prototype.fromServer = function(data){

	this.type = data.type;
	
	//If color has changed, swap color.
	if(this.color != data.color)
		this.swapColor(data.color);
	
	this.setPosition(data.x, data.y);
};
