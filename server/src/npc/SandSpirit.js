
var SandSpirit = function(x, y, width, height, speedX, speedY, duration, game){
	
	this.id = -1;
	this.x = x;
	this.y = y;
	
	this.width = width;
	this.height = height;
	
	this.duration = duration;
	
	this.speed = {
		x: speedX,
		y: speedY
	};
	
	this.velocity = {
		x: 0,
		y: 0
	};
	
	this.facing = Enum.Facing.LEFT;
	this.type = Enum.NPC.Type.SAND_SPIRIT;
	
	this.velocity = {
		x: 0,
		y: 0
	};
	
	this.stillExists = true;
	
	this.hasReached = false;
	
	this.target = null;
	this.currentGame = game;
	
	//Create body.
	this.body = new chipmunk.Body(Infinity, Infinity);
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
	
	//Assign custom data to body.
	this.body.userdata = {
		type: Enum.UserData.Type.SAND_SPIRIT,
		object: this
	};
	
	//Create a shape associated with the body.
	this.shape = this.currentGame.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.shape.setCollisionType(Enum.Collision.Type.NPC);
	this.shape.sensor = true;
};

SandSpirit.prototype.toClient = function(){

	return {
		id: this.id,
		x: this.x,
		y: this.y,
		facing: this.facing
	};
};

//Called when contact begins.
SandSpirit.prototype.onBegin = function(player){

	if(!this.hasReached)
	{
		this.target = player;
		player.changeMass(Constants.NPC.SandSpirit.MASS_FACTOR);
		
		this.hasReached = true;
	}
};

//Called when contact ends.
SandSpirit.prototype.onEnd = function(player){

};

SandSpirit.prototype.update = function(){
			
	//If target reached, give spirit target position.
	if(this.hasReached)
	{
		this.x = this.target.x;
		this.y = this.target.y;
	
		this.facing = this.x < this.target.x ? Enum.Facing.RIGHT : Enum.Facing.LEFT;
	
		this.body.setPos(new chipmunk.Vect(this.x, this.y));
	
		this.duration -= this.currentGame.dt;
		
		if(this.duration <= 0 || this.target.isRemoved)
			this.stillExists = false;
			
		return;
	}
	else 
	{
		var minY = null;
		this.target = null;
	
		//Find target.
		for(var i in this.currentGame.players)
		{
			if((minY == null || minY > this.currentGame.players[i].y) && this.y <= this.currentGame.players[i].y)
			{
				this.target = this.currentGame.players[i];
				minY = this.target.y;
			}
		}
	
		//If no target found, spirit disappears.
		if(!this.target)
		{
			this.stillExists = false;
			return;
		}
	
		//Move toward target.
		if(this.target && !this.target.isRemoved)
		{
			var dtX = Math.abs(this.target.x - this.x);
			var factor = dtX/Constants.NPC.SandSpirit.SLOWDOWN_DISTANCE_FACTOR;
			
			if(factor > 1)
				factor = 1;

			this.velocity.x += this.speed.x*factor*(this.target.x < this.x ? -1 : 1);
		}
	}
	
	this.facing = this.x < this.target.x ? Enum.Facing.RIGHT : Enum.Facing.LEFT;
	
	this.velocity.x *= Constants.NPC.SandSpirit.FRICTION_FACTOR;
	
	//Set new position.
	this.x += this.velocity.x;
	this.y += this.speed.y;
	
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
};

SandSpirit.prototype.explode = function(){

	if(this.target)
		this.target.changeMass(1/Constants.NPC.SandSpirit.MASS_FACTOR);

	//Remove physical presence.
	this.currentGame.space.removeShape(this.shape);
			
	var data = {
		id: this.id
	};
	
	//Send info to client.
	this.stillExists = false;
	io.sockets.in(this.currentGame.id).emit(Constants.Message.DELETE_NPC, data);
};