var Block = function (x, y, type, color) {
	
	this.type = type;
	this.color = color;
	
	//Create sprite associated.
	if(type != BlockType.NEUTRAL && color != null)
		this.sprite = cc.Sprite.create('placeholders/block_' + color + '.png');
	else
		this.sprite = cc.Sprite.create('placeholders/block.png');
	
	this.sprite.setPosition(new cc.Point(x, y));	
	this.sprite.setScale(2, 0.5);
	
	this.setPosition = function(x, y){
		this.sprite.setPosition(new cc.Point(x, y));
	};
	
	//Update block information from server.
	this.fromServer = function(data){

		this.x = data.x;
		this.y = data.y;
		this.type = data.type;
		this.color = data.color;
		
		this.setPosition(data.x, data.y);
	};
}
