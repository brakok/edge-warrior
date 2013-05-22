
var Missile = function(id, x, y, width, height, stats){
	
	this.stillExists = true;
	this.id = id;

	this.x = x;
	this.y = y;
	this.velocity = {x:0, y:0};
	
	this.width = width;
	this.height = height;
	
	this.stats = stats;
	
	if(this.stats.distance != null)
	{
		this.originalX = this.x;
		this.originalY = this.y;
	}
	
	this.body = new chipmunk.Body(Infinity, Infinity);
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
	
	var userDataType = null;
	
	//Find good type for association.
	switch(this.stats.type)
	{
		case Enum.Missile.Type.RAYBALL:
			userDataType = Enum.UserData.Type.RAYBALL;
			break;
	}
	
	//Assign custom data to body.
	this.body.userdata = {
		type: userDataType,
		object: this
	};
	
	//Create a shape associated with the body.
	this.shape = Game.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.shape.setCollisionType(Enum.Collision.Type.DEATH_ZONE);
	this.shape.sensor = true;
};

Missile.prototype.move = function(){
	
	this.x += this.velocity.x;
	this.y += this.velocity.y;
	
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
};

Missile.prototype.toClient = function(){
	return {
		x: this.x,
		y: this.y,
		id: this.id
	};
};

Missile.prototype.explode = function(){

	//Remove physical presence.
	Game.space.removeShape(this.shape);
		
	//Remove from game.
	for(var i in Game.missiles)
		if(Game.missiles[i] != null && Game.missiles[i].id == this.id)
			delete Game.missiles[i];
	
	var data = {
		id: this.id
	};
	
	//Send info to client.
	this.stillExists = false;
	io.sockets.in(Game.id).emit(Constants.Message.DELETE_MISSILE, data);
};

Missile.prototype.update = function(){

	var distX = (this.x - this.originalX);
	var distY = (this.y - this.originalY);
				
	//If distance has been reached or surpassed, missile is deleted.
	if((distX*distX)+(distY*distY) > this.stats.distance*this.stats.distance)
		this.explode();
	
	if(this.stillExists)
	{
		var push = {x:0, y:0};
		var degree = 0;
		
		switch(this.stats.direction)
		{
			case Enum.Direction.UP:
				degree = 0;
				break;
			case Enum.Direction.LEFT:
				degree = 270;
				break;
			case Enum.Direction.DOWN:
				degree = 180;
				break;
			case Enum.Direction.RIGHT:
				degree = 90;
				break;
		}
		
		if(this.stats.acceleration != null)
		{
			var tmpVelY = this.velocity.y;
			var tmpVelX = this.velocity.x;
			
			tmpVelX += this.stats.acceleration.x;
			tmpVelY += this.stats.acceleration.y;
			
			if((tmpVelX*tmpVelX)+(tmpVelY*tmpVelY) > (this.stats.maxspeed*this.stats.maxspeed))
			{
				this.velocity.x = this.stats.maxspeed*Math.sin(degree);
				this.velocity.y = this.stats.maxspeed*Math.cos(degree);
			}
			else
			{
				this.velocity.x += this.stats.acceleration.x*Math.sin(degree);
				this.velocity.y += this.stats.acceleration.y*Math.cos(degree);
			}
		}
		else
		{
			this.velocity.x = this.stats.speed*Math.sin(degree);
			this.velocity.y = this.stats.speed*Math.cos(degree);
		}
			
		this.move();
	}
};

