
var Missile = function(id, x, y, type, stats, game){
	
	this.currentGame = game;
	
	this.stillExists = true;
	this.id = id;

	this.x = x;
	this.y = y;
	this.velocity = {x:0, y:0};
	
	this.width = null;
	this.height = null;
	
	this.type = type;
	this.stats = stats;
	
	this.body = new chipmunk.Body(Infinity, Infinity);
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
	
	var userDataType = null;
	
	//Find good type for association.
	switch(this.type)
	{
		case Enum.DeathZone.Type.FIREBALL:
			userDataType = Enum.UserData.Type.FIREBALL;
			
			this.stats.distance = Constants.DeathZone.Fireball.DISTANCE_MIN + (Constants.DeathZone.Fireball.DISTANCE_MIN*this.stats.power);
			this.stats.speed = Constants.DeathZone.Fireball.SPEED_MIN + (Constants.DeathZone.Fireball.SPEED_STEP*this.stats.power);
			
			this.originalX = this.x;
			this.originalY = this.y;
			
			this.width = Constants.DeathZone.Fireball.WIDTH;
			this.height = Constants.DeathZone.Fireball.HEIGHT;
			
			break;
	}
	
	//Assign custom data to body.
	this.body.userdata = {
		type: userDataType,
		object: this
	};
	
	//Create a shape associated with the body.
	this.shape = this.currentGame.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.shape.setCollisionType(Enum.Collision.Type.DEATH_ZONE);
	this.shape.sensor = true;
};

Missile.prototype.move = function(){
	
	var distX = (this.x + this.velocity.x - this.originalX);
	var distY = (this.y + this.velocity.y - this.originalY);
	
	//Travel maximum possible distance.
	if((distX*distX)+(distY*distY) < this.stats.distance*this.stats.distance)
	{
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	}
	else
	{
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

		this.x = this.originalX + this.stats.distance*Math.sin(degree);
		this.y = this.originalY + this.stats.distance*Math.cos(degree);
	}

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
	this.currentGame.space.removeShape(this.shape);
		
	//Remove from game.
	for(var i in this.currentGame.deathZones)
		if(this.currentGame.deathZones[i] != null && this.currentGame.deathZones[i].id == this.id)
			delete this.currentGame.deathZones[i];
	
	var data = {
		id: this.id
	};
	
	//Send info to client.
	this.stillExists = false;
	io.sockets.in(this.currentGame.id).emit(Constants.Message.DELETE_DEATHZONE, data);
};

Missile.prototype.update = function(){

	var distX = (this.x - this.originalX);
	var distY = (this.y - this.originalY);
				
	//If distance has been reached or surpassed, missile is deleted.
	if((distX*distX)+(distY*distY) >= this.stats.distance*this.stats.distance)
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

