//Manage all effects.
var EffectManager = {
	currentEffects: [],
	create: function(type, x, y, degree){
		
		var effect = new Effect(type, x, y, degree);
		this.currentEffects.push(effect);
		effect.launch();
	},
	update: function(){
		
		
		for(var i = 0; i < this.currentEffects.length; i++)
		{
			if(this.currentEffects[i] != null)
				if(!this.currentEffects[i].hasEnded)
					this.currentEffects[i].update();
				else
					this.currentEffects.splice(i, 1);
		}
	},
	render: function(){

		for(var i = 0; i < this.currentEffects.length; i++)
			if(this.currentEffects[i] != null)
				this.currentEffects[i].render();
	}
};

