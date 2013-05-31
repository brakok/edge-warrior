var Camera = function(x, y, vpWidth, vpHeight, zoom){	this.x = x;	this.y = y;		this.viewport = {		width: vpWidth,		height: vpHeight	};		this.zoom = zoom;		this.lookAt(x, y);};Camera.prototype.lookAt = function(x, y){	this.x = x;	this.y = y;};Camera.prototype.project = function(sprite, x, y, scaleX, scaleY){		//Position.	var factorX = Client.width/this.viewport.width;	var factorY = Client.height/this.viewport.height;				x = (x*this.zoom - (this.x*this.zoom - this.viewport.width*0.5))*factorX;	y = (y*this.zoom - (this.y*this.zoom - this.viewport.height*0.5))*factorY;		sprite.setPosition(new cc.Point(x, y));		//Scale.		var tmpScaleX = factorX*this.zoom;	var tmpScaleY = factorY*this.zoom;		if(scaleX != null && scaleY != null)	{		tmpScaleX *= scaleX;		tmpScaleY *= scaleY;	}		sprite.setScale(tmpScaleX, tmpScaleY);};