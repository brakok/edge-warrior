
var PeskyBox = function(id, x, y, width, height, speed, duration, maxFleeTime, target, game){
	
	this.id = id;
	this.x = x;
	this.y = y;
	
	this.width = width;
	this.height = height;
	
	this.duration = duration;
	
	this.facing = Enum.Facing.LEFT;
	this.type = Enum.NPC.Type.PESKY_BOX;
	
	this.velocity = {
		x: 0,
		y: 0
	};
	
	this.fleeTimer = 0;
	this.maxFleeTime = maxFleeTime;
	
	this.toBeDestroyed = false;
	
	this.speed = speed;
	
	this.target = target;
	this.currentGame = game;
	
	//Create body.
	this.body = new chipmunk.Body(Infinity, Infinity);
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
	
	//Assign custom data to body.
	this.body.userdata = {
		type: Enum.UserData.Type.PESKY_BOX,
		object: this
	};
	
	//Create a shape associated with the body.
	this.shape = this.currentGame.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.shape.setCollisionType(Enum.Collision.Type.NPC);
	this.shape.sensor = true;
};

PeskyBox.prototype.toClient = function(){

	return {
		id: this.id,
		x: this.x,
		y: this.y,
		facing: this.facing
	};
};

PeskyBox.prototype.update = function(){
	
	if(this.toBeDestroyed)
		this.explode();
	else
	{
		var nextX = 0;
		var nextY = 0;
	
		if(this.fleeTimer > 0)
		{
			nextX = this.speed * (this.x < this.target.x ? -1 : 1);
			nextY = this.speed * (this.y < this.target.y ? -1 : 1);
			
			this.fleeTimer -= this.currentGame.dt;
		}
		else
		{
			nextX = (this.target.x - this.x)/Constants.NPC.PeskyBox.SLOWDOWN_DISTANCE_FACTOR;
			nextY = (this.target.y - this.y)/Constants.NPC.PeskyBox.SLOWDOWN_DISTANCE_FACTOR;
			
			if(Math.abs(nextX) > this.speed)
				nextX = this.speed * (this.x < this.target.x ? 1 : -1);
				
			if(Math.abs(nextY) > this.speed)
				nextY = this.speed * (this.y < this.target.y ? 1 : -1);
		}
		
		this.velocity.x += nextX;
		this.velocity.y += nextY;
		
		this.velocity.x *= Constants.NPC.PeskyBox.FRICTION_FACTOR;
		this.velocity.y *= Constants.NPC.PeskyBox.FRICTION_FACTOR;
		
		var pos = this.body.getPos();
		this.body.setPos(new chipmunk.Vect(pos.x + this.velocity.x, pos.y + this.velocity.y));
		pos = this.body.getPos();
		
		this.x = pos.x;
		this.y = pos.y;
				
		this.duration -= this.currentGame.dt;
		
		if(this.duration <= 0)
			this.toBeDestroyed = true;
	}
	
};

PeskyBox.prototype.explode = function(){

	//Remove physical presence.
	this.currentGame.space.removeShape(this.shape);
		
	//Remove from game.
	for(var i in this.currentGame.npcs)
		if(this.currentGame.npcs[i] != null && this.currentGame.npcs[i].id == this.id)
			delete this.currentGame.npcs[i];
	
	var data = {
		id: this.id
	};
	
	//Send info to client.
	this.stillExists = false;
	io.sockets.in(this.currentGame.id).emit(Constants.Message.DELETE_NPC, data);
};