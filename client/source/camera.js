var Camera = function(x, y, vpWidth, vpHeight, zoom){	this.x = x;	this.y = y;		this.viewport = {		width: vpWidth,		height: vpHeight	};		this.zoom = zoom;		this.lookAt(x, y);};Camera.prototype.lookAt = function(x, y){	this.x = x;	this.y = y;};Camera.prototype.project = function(sprite, x, y){		var factorX = Client.mapSize.width/this.viewport.width;	var factorY = Client.mapSize.height/this.viewport.height;			x = (x - (this.x - this.viewport.width*0.5))*factorX;	y = (y - (this.y - this.viewport.height*0.5))*factorY;		sprite.setPosition(new cc.Point(x, y));};