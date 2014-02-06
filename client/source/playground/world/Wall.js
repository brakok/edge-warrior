var Wall = function(facing, x, y, height, hasCorner, info){
	
		this.info = info;
		
		this.hasCorner = hasCorner;
		this.height = height;
		this.facing = facing;
		
		this.fragments = [];
		
		var wallFragments = [];
		var imgName = null;
		var cornerImgName = null;
		
		var mustFlip = this.facing == Enum.Direction.LEFT;
		var firstSegment = cc.Sprite.create(this.info.SPRITE_PATH);
		
		this.x = x - (firstSegment.getTextureRect().width*0.5*(mustFlip ? -1 : 1));
		this.y = y;
		
		var textHeight = firstSegment.getTextureRect().height;
		var numOfFragment = height/textHeight;
		
		var stepY = textHeight;
		var tmpY = this.y - this.height*0.5 + stepY*0.5;
		var zOrder = Constants.World.Wall.Z_INDEX;
		
		//Add a corner at the bottom of the wall.
		if(this.hasCorner)
		{
			var corner = cc.Sprite.create(this.info.CORNER_SPRITE_PATH);
			corner.setPosition(new cc.Point(this.x, tmpY - stepY));
			corner.setFlippedX(mustFlip);
			corner._zOrder = zOrder;
			
			this.fragments.push({
				sprite: corner,
				y: tmpY - stepY
			});
		}
		
		//Add the first segment.
		firstSegment.setFlippedX(mustFlip);
		firstSegment.setPosition(new cc.Point(this.x, tmpY));
		firstSegment._zOrder = zOrder;
		
		this.fragments.push({
			sprite: firstSegment,
			y: tmpY
		});
		
		//Add other fragments to the wall.
		for(var i = 0; i < numOfFragment; i++)
		{
			tmpY += stepY;
			
			var segment = cc.Sprite.create(info.SPRITE_PATH);
			segment.setPosition(new cc.Point(this.x, tmpY));
			segment.setFlippedX(mustFlip);
			segment._zOrder = zOrder;
			
			this.fragments.push({
				sprite: segment,
				y: tmpY
			});
		}
};

Wall.prototype.load = function(layer){

	for(var i in this.fragments)
		layer.addChild(this.fragments[i].sprite);
};

Wall.prototype.update = function(){
	
	//Project fragments.
	for(var i in this.fragments)
		Client.game.camera.project(this.fragments[i].sprite, this.x, this.fragments[i].y);	
};