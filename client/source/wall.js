var Wall = function(facing, x, y, height, hasCorner, type){
	
		this.x = x;
		this.y = y;
		this.type = type;
		
		this.hasCorner = hasCorner;
		this.height = height;
		this.facing = facing;
		
		this.fragments = [];
		
		var wallFragments = [];
		var imgName = null;
		var cornerImgName = null;
		
		switch(this.type)
		{
			case Enum.Wall.Type.PIT:
				imgName = 'wall_pit.png';
				cornerImgName = 'corner_pit.png';
				break;
		}
		
		var mustFlip = this.facing == Enum.Direction.LEFT;
		var firstSegment = cc.Sprite.create(assetsWorldDir + imgName);
		var numOfFragment = height/firstSegment.getTexture().height;
		
		var stepY = firstSegment.getTexture().height;
		var tmpY = this.y - this.height*0.5 + stepY*0.5;
		var zOrder = 45;
		
		//Add a corner at the bottom of the wall.
		if(this.hasCorner)
		{
			var corner = cc.Sprite.create(assetsWorldDir + cornerImgName);
			corner.setPosition(new cc.Point(this.x, tmpY - stepY));
			corner.setFlipX(mustFlip);
			corner._zOrder = zOrder;
			
			this.fragments.push({
				sprite: corner,
				y: tmpY - stepY
			});
		}
		
		//Add the first segment.
		firstSegment.setFlipX(mustFlip);
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
			
			var segment = cc.Sprite.create(assetsWorldDir + imgName);
			segment.setPosition(new cc.Point(this.x, tmpY));
			segment.setFlipX(mustFlip);
			segment._zOrder = zOrder;
			
			this.fragments.push({
				sprite: segment,
				y: tmpY
			});
		}
};

Wall.prototype.init = function(){

	for(var i in this.fragments)
		Client.layer.addChild(this.fragments[i].sprite);
};

Wall.prototype.update = function(){
	
	//Project fragments.
	for(var i in this.fragments)
		Client.camera.project(this.fragments[i].sprite, this.x, this.fragments[i].y);	
};