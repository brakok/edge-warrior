
var ParticleManager = {
	emitters: [],
	create: function(type, x, y, layer, life){
		
		var emitter = null;
		
		switch(type){
			case Enum.Particles.SMOKE:
				emitter = new ParticleEmitter(15, x, y, 3, 0, 0, 0, 0, 0, 0.75, 0, 45, 0, 5, 0, 0, 0, Constants.Particles.Z_ORDER, assetsParticles + 'smoke.png', layer, life);
				break;
			case Enum.Particles.SAND:
				emitter = new ParticleEmitter(35, x, y + 20, 40, 30, 0, -5, 1, 1, 1.5, 0.75, 70, 10, 180, 20, 0, 1, Constants.NPC.Z_ORDER + 1, assetsParticles + 'sand.png', layer, life);
				break;
			case Enum.Particles.LIL_BEAM:
				emitter = new ParticleEmitter(25, x, y, 35, 690, 0, 0, 0, 0, 0.35, 0.15, 6, 3, 6, 3, 0, 0, Constants.Trigger.Z_ORDER + 1, assetsParticles + 'lilBeam.png', layer, life);
				break;
			case Enum.Particles.STUCK:
				emitter = new ParticleEmitter(10, x - 18, y, 5, 20, 1.5, 0, 0.25, 0, 0.5, 0.1, 40, 5, 40, 5, 0, 0, Constants.Player.Z_ORDER + 1, assetsParticles + 'stuck.png', layer, life);
				break;
		}
		
		if(emitter)
			this.emitters.push(emitter);
		
		return emitter;
	},
	update: function(dt){
		
		for(var i = 0; i < this.emitters.length; ++i){
		
			if(this.emitters[i].isRunning || this.emitters[i].getParticleCount() > 0)
				this.emitters[i].update(dt);
			else if(this.emitters[i].toBeDestroyed)
				this.emitters.splice(i, 1);
		}
	},
	render: function(){
	
		for(var i = 0; i < this.emitters.length; ++i)
			if(this.emitters[i] != null)
				this.emitters[i].render();

	}
};