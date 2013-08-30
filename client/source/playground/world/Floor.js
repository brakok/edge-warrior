var Floor = function(x, y, width, hasCorner, type){
	
	this.x = x;
	this.y = y;
	
	this.width = width;
	this.hasCorner = hasCorner;
	
	this.type = type;
		
	this.fragments = [];
	var imgName = null;
	var cornerImgName = null;
	
	switch(this.type)
	{
		case Enum.World.Type.PIT:
			imgName = 'floor_pit.png';
			cornerImgName = 'corner_pit.png';
			break;
	}
	
	var firstSegment = cc.Sprite.create(assetsWorldDir + imgName);
	var numOfFragment = (width/firstSegment.getTexture().width)-1; //Remove last corner.
	
	var stepX = firstSegment.getTexture().width;
	var tmpX = this.x - this.width*0.5 + stepX*0.5;
	var zOrder = Constants.World.Floor.Z_INDEX;
	
	//Add a corner at the bottom of the wall.
	if(hasCorner)
	{
		var corner = cc.Sprite.create(assetsWorldDir + cornerImgName);
		corner.setPosition(new cc.Point(this.x, tmpX - stepX));
		corner._zOrder = zOrder;
		
		//Left corner.
		this.fragments.push({
			sprite: corner,
			x: tmpX - stepX
		});
		
		corner = cc.Sprite.create(assetsWorldDir + cornerImgName);
		corner.setPosition(new cc.Point(this.x, tmpX + stepX*numOfFragment));
		corner.setFlipX(true);
		
		//Right corner.
		this.fragments.push({
			sprite: corner,
			x: tmpX + stepX*numOfFragment
		});
	}
	
	//Add first segment.
	firstSegment.setPosition(new cc.Point(this.x, tmpX));
	firstSegment._zOrder = zOrder;
	
	this.fragments.push({
		sprite: firstSegment,
		x: tmpX
	});
	
	//Add other fragments to the wall.
	for(var i = 0; i < numOfFragment; i++)
	{
		tmpX += stepX;
		
		var segment = cc.Sprite.create(assetsWorldDir + imgName);
		segment.setPosition(new cc.Point(this.x, tmpX));
		segment._zOrder = zOrder;
		
		this.fragments.push({
			sprite: segment,
			x: tmpX
		});
	}
};

Floor.prototype.init = function(){

	//Add floor to layer.
	for(var i in this.fragments)
		Client.game.layer.addChild(this.fragments[i].sprite);
};

Floor.prototype.update = function(){

	//Project fragments.
	for(var i in this.fragments)
			Client.game.camera.project(this.fragments[i].sprite, this.fragments[i].x, this.y);	
};