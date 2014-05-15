
//Smooth move from server.
var Smoothering = new function(){
	
	//Init smoothering for specified instance.
	this.init = function(instance, x, y){
		instance.smoothPos = [];
		instance.smoothPos.push({ x: x, y: y});
		instance.isSmoothering = true;
		instance.popLast = false;
	};
	
	//Push new position in array.
	this.push = function(instance, x, y){
		
		if(instance.smoothPos.length >= 3)
			instance.smoothPos.splice(2, 1);
		
		//Do not add same position.
		if(instance.smoothPos[instance.smoothPos.length-1].x == x && instance.smoothPos[instance.smoothPos.length-1].y == y)
			return;
		
		instance.smoothPos.push({x : x, y: y});
	};
	
	this.reset = function(instance, x, y){
	
		var newPos = instance.smoothPos[instance.smoothPos.length-1];
		
		if(x != null && y != null)
			newPos = {x: x, y: y};
	
		instance.smoothPos = [];
		instance.smoothPos.push(newPos);
	};
	
	//Get new position from array.
	this.pop = function(instance){

		//Not enough data to go further.
		if(instance.smoothPos.length < 2)
			return instance.smoothPos.length == 1 ? { x: instance.smoothPos[0].x, y: instance.smoothPos[0].y} : { x:0, y: 0};
		
		//Get delta distance from first and next point in order to teleport or not.		
		var delta = Math.pow(instance.smoothPos[0].x - instance.smoothPos[instance.smoothPos.length-1].x, 2) + Math.pow(instance.smoothPos[0].y - instance.smoothPos[instance.smoothPos.length-1].y, 2);
		
		//Teleport if beyond allowed distance.
		if(delta >= Constants.Common.SMOOTH_DISTANCE)
		{
			var newPos = {x: instance.smoothPos[instance.smoothPos.length-1].x, y: instance.smoothPos[instance.smoothPos.length-1].y};
			instance.smoothPos = [];
			instance.smoothPos.push(newPos);
			instance.popLast = false;
		}

		if(instance.smoothPos.length >= 3)
		{
			if(instance.isSmoothering)
			{
				instance.smoothPos[1].x = (instance.smoothPos[0].x + instance.smoothPos[1].x + instance.smoothPos[2].x)/3;
				instance.smoothPos[1].y = (instance.smoothPos[0].y + instance.smoothPos[1].y + instance.smoothPos[2].y)/3;
			}
			
			instance.isSmoothering = !instance.isSmoothering;
			
			instance.smoothPos[0].x = instance.smoothPos[1].x;
			instance.smoothPos[0].y = instance.smoothPos[1].y;
			
			instance.smoothPos[1].x = instance.smoothPos[instance.smoothPos.length - 1].x;
			instance.smoothPos[1].y = instance.smoothPos[instance.smoothPos.length - 1].y;
			instance.smoothPos.splice(2, 1);
			instance.popLast = false;
		}
		else if(instance.smoothPos.length == 2)
		{
			if(!instance.isSmoothering || instance.popLast)
			{
				instance.smoothPos[0].x = instance.smoothPos[1].x;
				instance.smoothPos[0].y = instance.smoothPos[1].y;
				
				instance.smoothPos.splice(1,1);
				instance.isSmoothering = true;
				instance.popLast = false;
			}
			else
				instance.popLast = true;
		}
			
		return {x: instance.smoothPos[0].x, y: instance.smoothPos[0].y};
	};
};