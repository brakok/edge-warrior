
var ChargingDot = function(x, y, speed, spritePath, radius, radiusVar, radiusToEnd, scale, layer){

	this.finalX = x;
	this.finalY = y;

	var rndRadius = radius + Math.random()*radiusVar;
	this.degree = Math.random()*Math.PI*2;

	this.sin = Math.sin(this.degree);
	this.cos = Math.cos(this.degree);
	
	this.x = x + this.cos*rndRadius;
	this.y = y + this.sin*rndRadius;
	
	this.radius = rndRadius;
	this.radiusToEnd = radiusToEnd;
	this.scale = scale;
	this.displayScale = scale + Math.random();
	
	this.speed = {
		x: speed*scale*this.cos,
		y: speed*scale*this.sin
	};
	
	this.layer = layer;
	
	this.sprite = cc.Sprite.create(spritePath);
	this.isAlive = true;
	
	this.layer.addChild(this.sprite);
};

ChargingDot.prototype.end = function(){
	this.layer.removeChild(this.sprite);
};

ChargingDot.prototype.update = function(){
	
	this.x -= this.speed.x;
	this.y -= this.speed.y;
	
	var delta = Math.sqrt(Math.pow(this.x - this.finalX, 2) + Math.pow(this.y - this.finalY, 2));
	
	var opacity = delta < this.radiusToEnd ? 0 : ((this.radiusToEnd - delta)/(this.radiusToEnd - this.radius))*255;
	this.sprite.setOpacity(opacity);
	
	if(delta <= this.radiusToEnd)
		this.isAlive = false;
	
	Client.game.camera.project(this.sprite, this.x, this.y, this.displayScale, this.displayScale);
};