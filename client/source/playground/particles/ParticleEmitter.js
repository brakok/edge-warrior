
//EmitRate = how many for one second.
var ParticleEmitter = function(emitRate, x, y, varX, varY, speedX, speedY, varSpeedX, varSpeedY, life, varLife, startSize, varStartSize, endSize, varEndSize, rotationSpeed, varRotationSpeed, zOrder, spritePath, layer, emitterLife, isRelative){

	this.emitRate = 1/emitRate;
	this.toBeDestroyed = false;
	this.isRunning = false;
	
	this.isRelative = isRelative == null ? false : isRelative;
	
	this.x = x;
	this.y = y;
	this.speed = {
		x: speedX,
		y: speedY,
		rotation: rotationSpeed
	};
	
	this.particles = [];
	this.timeElapsed = 0;
	this.nextStep = 0;
	
	this.zOrder = zOrder;
	this.life = life;
	this.startSize = startSize;
	this.endSize = endSize;	
	this.spritePath = spritePath;
	this.layer = layer;
	
	this.emitterLife = emitterLife;
	
	this.variation = {
		x: varX,
		y: varY,
		speed: {
			x: varSpeedX,
			y: varSpeedY,
			rotation: varRotationSpeed
		},
		life: varLife,
		startSize: varStartSize,
		endSize: varEndSize
	};
};

ParticleEmitter.prototype.stop = function(mustTrash){
	this.isRunning = false;
	
	if(mustTrash == null || mustTrash)
		this.trash();
};

ParticleEmitter.prototype.run = function(){
	this.isRunning = true;
};

ParticleEmitter.prototype.trash = function(){
	this.toBeDestroyed = true;
};

ParticleEmitter.prototype.getParticleCount = function(){
	return this.particles.length;
};

ParticleEmitter.prototype.render = function(){

	for(var i = 0; i < this.particles.length; ++i)
		if(this.particles[i] != null)
			this.particles[i].render();		
};

ParticleEmitter.prototype.update = function(dt){
		
	if(this.isRunning || this.getParticleCount() > 0)
	{
		//Check emitter life.
		if(this.emitterLife != null && this.isRunning)
		{
			this.emitterLife -= dt;
			
			if(this.emitterLife <= 0)
				this.stop();
		}
		
		this.timeElapsed += dt;
		
		//Create a new particle if step is reached.
		if(this.nextStep < this.timeElapsed && this.isRunning)
		{
			var x = this.isRelative ? 0 : this.x;
			var y = this.isRelative ? 0 : this.y;
		
			this.particles.push(new Particle(x, y, this));
			this.nextStep = Math.floor(this.timeElapsed/this.emitRate)*this.emitRate + this.emitRate;
		}
		
		//Update particles.
		for(var i = 0; i < this.particles.length; ++i){
		
			if(this.particles[i].mustBeDestroyed)
				this.particles.splice(i, 1);
			else
				this.particles[i].update(dt);		
		}
	}
};