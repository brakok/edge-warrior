
//EmitRate = how many for one second.
var ParticleEmitter = function(emitRate, x, y, varX, varY, speedX, speedY, varSpeedX, varSpeedY, life, varLife, startSize, varStartSize, endSize, varEndSize, spritePath, layer){

	this.emitRate = 1/emitRate;
	this.hasStopped = false;
	this.toBeDestroyed = false;
	this.isRunning = false;
	
	this.x = x;
	this.y = y;
	this.speed = {
		x: speedX,
		y: speedY
	};
	
	this.particles = [];
	this.timeElapsed = 0;
	this.nextStep = 0;
	
	this.life = life;
	this.startSize = startSize;
	this.endSize = endSize;
	this.spritePath = spritePath;
	this.layer = layer;
	
	this.variation = {
		x: varX,
		y: varY,
		speed: {
			x: varSpeedX,
			y: varSpeedY
		},
		life: varLife,
		startSize: varStartSize,
		endSize: varEndSize
	};
};

ParticleEmitter.prototype.stop = function(){
	this.hasStopped = true;
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

ParticleEmitter.prototype.update = function(dt){
		
	if(this.isRunning)
	{
		this.timeElapsed += dt;
		
		//Create a new particle if step is reached.
		if(this.nextStep < this.timeElapsed && !this.hasStopped)
		{
			this.particles.push(new Particle(this.x, this.y, this));
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