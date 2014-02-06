
var ParticleManager = {
	systems: [],
	create: function(type, x, y, width, layer){
		
		var system = null;
		
		switch(type){
			case Enum.Particles.SMOKE:
				system = Smoke.create(x, y, width, layer);
				break;
		}
		
		if(system)
			this.systems.push(system);
		
		return system;
	},
	update: function(){
		
		for(var i in this.systems){
		
			if(this.systems[i] != null && (!this.systems[i].hasStopped || this.systems[i].getParticleCount() > 0))
				Client.game.camera.project(this.systems[i], this.systems[i].x, this.systems[i].y);
			else if(this.systems[i] == null)
				delete this.systems[i];
			else if(this.systems[i].getParticleCount() == 0)
			{
				this.systems[i].unload();
				delete this.systems[i];
			}
		}
	}
};