var Block = function (x, y, type, color) {
	
	this.x = x;
	this.y = y;
	
	this.type = type;
	this.color = color;
	
	//Create sprite associated.
	if(type == BlockType.COLORED && color != null)
		this.sprite = cc.Sprite.create(assetsBlockDir + 'block_' + color + '.png');
	else if(type == BlockType.SPAWN)
		this.sprite = cc.Sprite.create(assetsBlockDir + 'block_spawn.png');
	else
		this.sprite = cc.Sprite.create(assetsBlockDir + 'block.png');
	
	this.sprite.setPosition(new cc.Point(x, y));	
}

Block.prototype.setPosition = function(x, y){
	this.sprite.setPosition(new cc.Point(x, y));
};

Block.prototype.swapColor = function(color){
	Client.layer.removeChild(this.sprite);
	this.sprite = cc.Sprite.create(assetsBlockDir + 'block_' + color + '.png');
	Client.layer.addChild(this.sprite);
	
	this.color = color;
};

Block.prototype.explode = function(cause){
	Client.layer.removeChild(this.sprite);
};

//Update block information from server.
Block.prototype.fromServer = function(data){

	this.x = data.x;
	this.y = data.y;
	this.type = data.type;
	
	//If color has changed, swap color.
	if(this.color != data.color)
		this.swapColor(data.color);
	
	this.setPosition(data.x, data.y);
};
