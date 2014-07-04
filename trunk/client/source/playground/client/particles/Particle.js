
var Particle = function(x, y, emitter){
	
	this.x = x + Math.random()*emitter.variation.x*(Math.random() < 0.5 ? -1 : 1);
	this.y = y + Math.random()*emitter.variation.y*(Math.random() < 0.5 ? -1 : 1);
	this.speed = {
		x: emitter.speed.x + Math.random()*emitter.variation.speed.x*(Math.random() < 0.5 ? -1 : 1),
		y: emitter.speed.y + Math.random()*emitter.variation.speed.y*(Math.random() < 0.5 ? -1 : 1),
		rotation: emitter.speed.rotation + Math.random()*emitter.variation.speed.rotation*(Math.random() < 0.5 ? -1 : 1)
	};

	this.angle = 0;
	this.mustBeDestroyed = false;
	
	//Life.
	this.originalLife = this.life = emitter.life + Math.random()*emitter.variation.life*(Math.random() < 0.5 ? -1 : 1);
	
	//Size.
	this.startSize = emitter.startSize + Math.random()*emitter.variation.startSize*(Math.random() < 0.5 ? -1 : 1);
	this.endSize = emitter.endSize + Math.random()*emitter.variation.endSize*(Math.random() < 0.5 ? -1 : 1);
	
	//Set sprite size.
	this.sprite = cc.Sprite.create(emitter.spritePath);	
	this.sprite._zOrder = emitter.zOrder;

	this.layer = emitter.layer;
	this.layer.addChild(this.sprite);
	
	this.emitter = emitter;
};

Particle.prototype.render = function(){
	var scaleX = 1;
	var scaleY = 1;

	//Calculate new size for particle.
	if(this.startSize != this.endSize)
	{
		var width = this.endSize + (this.life/this.originalLife*(this.startSize - this.endSize));
		var height = this.sprite.getTextureRect().height*(width/this.sprite.getTextureRect().width);
		
		scaleX = width/this.sprite.getTextureRect().width;
		scaleY = height/this.sprite.getTextureRect().height;
	}
	
	Client.game.camera.project(this.sprite, this.x + (this.emitter.isRelative ? this.emitter.x : 0), this.y + (this.emitter.isRelative ? this.emitter.y : 0), scaleX, scaleY);
};

Particle.prototype.update = function(dt){
	
	if(this.life < 0)
	{
		this.mustBeDestroyed = true;
		this.layer.removeChild(this.sprite);
		return;
	}
	
	//Add speed.
	if(this.speed.x != 0)
		this.x += this.speed.x;
	if(this.speed.y != 0)
		this.y += this.speed.y;
	if(this.speed.rotation != 0)
		this.angle += this.speed.rotation;
		
	this.sprite.setRotation(this.angle);
	this.sprite.setOpacity(this.life/this.originalLife*255);
	this.life -= dt;
};