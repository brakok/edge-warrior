var Camera = function(x, y, zoom, zoomFactor, speedX, speedY, speedZoom){	this.x = x;	this.y = y;			this.speed = {		x: speedX,		y: speedY,		zoom: speedZoom	};		this.focus = {		x: this.x,		y: this.y	};		this.zoomFactor = zoomFactor;	this.zoom = zoom;		//Use targeted zoom to smoother zoom.	this.targetedZoom = zoom;		this.lookAt(x, y);};Camera.prototype.lookAt = function(x, y){	this.focus.x = x;	this.focus.y = y;};Camera.prototype.update = function(){	//Update zoom.	if(this.speed.zoom != null && this.zoom != this.targetedZoom)	{		var diff = this.targetedZoom -this.zoom;		var calculatedSpeedZoom = this.speed.zoom*diff*diff*diff;				if(Math.abs(this.zoom - this.targetedZoom) > Math.abs(calculatedSpeedZoom))			this.zoom += calculatedSpeedZoom;		else			this.zoom = this.targetedZoom;	}	if(this.speed.x == null && this.speed.y == null)	{		this.x = this.focus.x;		this.y = this.focus.y;				return;	}	//Translate X.	if(this.x != this.focus.x)	{		var diff = this.focus.x - this.x;				var calculatedSpeedX = this.speed.x*diff*diff*diff;				if(Math.abs(this.x - this.focus.x) > calculatedSpeedX)			this.x += calculatedSpeedX;		else			this.x = this.focus.x;	}		//Translate Y.	if(this.y != this.focus.y)	{		var diff = this.focus.y - this.y;		var calculatedSpeedY = this.speed.y*diff*diff*(diff < 0 ? -1 : 1);						if(Math.abs(this.y - this.focus.y) > calculatedSpeedY)			this.y += calculatedSpeedY;		else			this.y = this.focus.y;	}};Camera.prototype.project = function(sprite, x, y, scaleX, scaleY){				var zoom = this.zoom*this.zoomFactor;	var contentScaleFactor = 1/cc.Director.getInstance().getContentScaleFactor();		//Position.	var factorX = Options.resolution.width/Options.viewport.width;	var factorY = Options.resolution.height/Options.viewport.height;	var tmpX = (x*zoom - this.x*zoom + Options.viewport.width*0.5*contentScaleFactor)*factorX;	var tmpY = (y*zoom - this.y*zoom + Options.viewport.height*0.5*contentScaleFactor)*factorY;				sprite.setPosition(new cc.Point(tmpX, tmpY));		//Scale.	var tmpScaleX = factorX*zoom;	var tmpScaleY = factorY*zoom;		if(scaleX != null)		tmpScaleX *= scaleX;	if(scaleY != null)		tmpScaleY *= scaleY;		sprite.setScale(tmpScaleX, tmpScaleY);};