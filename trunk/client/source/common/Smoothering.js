//Smooth move from server.
var Smoothering = new function(){
	
	//Init smoothering for specified instance.
	this.init = function(instance, x, y){
		instance.smoothPos = [];
		instance.smoothPos.push({ x: x, y: y, fracture: false, original: true});
		this.needFracture = true;
	};
	
	//Push new position in array.
	this.push = function(instance, x, y){
				
		//Do not add same position.
		if(instance.smoothPos.length > 0 && instance.smoothPos[instance.smoothPos.length-1].x == x && instance.smoothPos[instance.smoothPos.length-1].y == y)
			return;
		
		instance.smoothPos.push({x : x, y: y, fracture: this.needFracture, original: true});
		this.needFracture = !this.needFracture;		
	};
	
	this.reset = function(instance, x, y){
	
		var newPos = instance.smoothPos[instance.smoothPos.length-1];
		
		if(x != null && y != null)
			newPos = {x: x, y: y, fracture: false, original: true};
	
		instance.smoothPos = [];
		instance.smoothPos.push(newPos);
	};
	
	//Get new position from array.
	this.pop = function(instance){

		if(instance.smoothPos.length < 2)
			return instance.smoothPos.length == 1 ? {x: instance.smoothPos[0].x, y: instance.smoothPos[0].y} : {x: 0, y: 0};
			
		//Get delta distance from first and next point in order to teleport or not.		
		var delta = Math.pow(instance.smoothPos[0].x - instance.smoothPos[instance.smoothPos.length-1].x, 2) + Math.pow(instance.smoothPos[0].y - instance.smoothPos[instance.smoothPos.length-1].y, 2);
		
		//Teleport if beyond allowed distance.
		if(delta >= Constants.Common.SMOOTH_DISTANCE)
		{			
			var newPos = {
				x: instance.smoothPos[instance.smoothPos.length-1].x, 
				y: instance.smoothPos[instance.smoothPos.length-1].y, 
				fracture: false,
				original: true
			};
			
			instance.smoothPos = [];
			instance.smoothPos.push(newPos);
		}

		var pos = {
			x: instance.smoothPos[0].x,
			y: instance.smoothPos[0].y
		};
		
		//Process fracture.
		for(var i = 0; i < instance.smoothPos.length; i++)
		{
			//Before.
			if(instance.smoothPos[i].fracture)
			{
				//Before.
				if(i > 0 && instance.smoothPos[i-1].original)
				{
					var tmpX = (instance.smoothPos[i-1].x + instance.smoothPos[i].x*2)/3;
					var tmpY = (instance.smoothPos[i-1].y + instance.smoothPos[i].y*2)/3;
				
					instance.smoothPos.splice(i-1, 0, {
						x: tmpX,
						y: tmpY,
						fracture: false,
						original: false
					});
				}
				
				//After.
				if(i+1 < instance.smoothPos.length && instance.smoothPos[i+1].original)
				{				
					var tmpX = (instance.smoothPos[i].x*2 + instance.smoothPos[i+1].x)/3;
					var tmpY = (instance.smoothPos[i].y*2 + instance.smoothPos[i+1].y)/3;
					
					instance.smoothPos[i].x = tmpX;
					instance.smoothPos[i].y = tmpY;
					instance.smoothPos[i].fracture = false;
					instance.smoothPos[i].original = false;
				}
				
			}
		}
			
		//Remove first entry.
		if(instance.smoothPos.length > 1)
			instance.smoothPos.splice(0,1);
			
		return pos;
	};
};