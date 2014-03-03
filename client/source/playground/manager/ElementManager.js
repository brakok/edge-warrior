
//Manage all effects.
var ElementManager = {
	currentElements: [],
	launch: function(element){
		
		this.currentElements.push(element);
		element.init();
	},
	update: function(dt){
		
		for(var i = 0; i < this.currentElements.length; ++i)
		{
			if(this.currentElements[i] != null)
				if(!this.currentElements[i].hasEnded)
					this.currentElements[i].update(dt);
				else
					this.currentElements.splice(i, 1);
		}
	}
};

