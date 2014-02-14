
var ParticleManager = {
	emitters: [],
	create: function(type, x, y, layer){
		
		var emitter = null;
		
		switch(type){
			case Enum.Particles.SMOKE:
				emitter = new ParticleEmitter(20, x, y, 3, 0, 0, 0, 0, 0, 0.75, 0, 45, 0, 5, 0, assetsParticles + 'smoke.png', layer);
				break;
		}
		
		if(emitter)
			this.emitters.push(emitter);
		
		return emitter;
	},
	update: function(dt){
		
		for(var i = 0; i < this.emitters.length; ++i){
		
			if(!this.emitters[i].hasStopped || this.emitters[i].getParticleCount() > 0)
				this.emitters[i].update(dt);
			else
			{
				this.emitters[i].trash();
				this.emitters.splice(i, 1);
			}
		}
	}
};