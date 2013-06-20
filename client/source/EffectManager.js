//Manage all effects.
var EffectManager = {
	currentEffects: [],
	create: function(type, x, y){
		
		var effect = new Effect(type, x, y);
		this.currentEffects.push(effect);
		effect.launch();
	},
	update: function(){
		
		for(var i in this.currentEffects)
		{
			if(this.currentEffects[i] != null)
				if(!this.currentEffects[i].hasEnded)
					this.currentEffects[i].update();
				else
					delete this.currentEffects[i];
		}
	}
};

