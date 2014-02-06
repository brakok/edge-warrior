var Floor = function(x, y, width, hasCorner, info){
	
	this.width = width;
	this.hasCorner = hasCorner;
	this.info = info;
		
	this.fragments = [];
	var imgName = null;
	var cornerImgName = null;
		
	var firstSegment = cc.Sprite.create(this.info.SPRITE_PATH);
	var numOfFragment = (width/firstSegment.getTextureRect().width)-1; //Remove last corner.
	
	this.x = x;
	this.y = y - (firstSegment.getTextureRect().height*0.5);
	
	var stepX = firstSegment.getTextureRect().width;
	var tmpX = this.x - this.width*0.5 + stepX*0.5;
	var zOrder = Constants.World.Floor.Z_INDEX;
	
	//Add a corner at the bottom of the wall.
	if(hasCorner)
	{
		var corner = cc.Sprite.create(this.info.CORNER_SPRITE_PATH);
		corner.setPosition(new cc.Point(this.x, tmpX - stepX));
		corner._zOrder = zOrder;
		
		//Left corner.
		this.fragments.push({
			sprite: corner,
			x: tmpX - stepX
		});
		
		corner = cc.Sprite.create(this.info.CORNER_SPRITE_PATH);
		corner.setPosition(new cc.Point(this.x, tmpX + stepX*numOfFragment));
		corner.setFlippedX(true);
		
		//Right corner.
		this.fragments.push({
			sprite: corner,
			x: tmpX + stepX*numOfFragment
		});
	}
	
	//Add first segment.
	firstSegment.setPosition(new cc.Point(tmpX, this.y));
	firstSegment._zOrder = zOrder;
	
	this.fragments.push({
		sprite: firstSegment,
		x: tmpX
	});
	
	//Add other fragments to the floor.
	for(var i = 0; i < numOfFragment; i++)
	{
		tmpX += stepX;
		
		var segment = cc.Sprite.create(this.info.SPRITE_PATH);
		segment.setPosition(new cc.Point(tmpX, this.y));
		segment._zOrder = zOrder;
		
		this.fragments.push({
			sprite: segment,
			x: tmpX
		});
	}
};

Floor.prototype.load = function(layer){

	//Add floor to layer.
	for(var i in this.fragments)
		layer.addChild(this.fragments[i].sprite);
};

Floor.prototype.update = function(){

	//Project fragments.
	for(var i in this.fragments)
		Client.game.camera.project(this.fragments[i].sprite, this.fragments[i].x, this.y);	
};