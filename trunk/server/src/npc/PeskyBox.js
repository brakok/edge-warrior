
var PeskyBox = function(x, y, width, height, speed, duration, maxFleeTime, pushX, pushY, target, game){
	
	this.id = -1;
	this.x = x;
	this.y = y;
	
	this.pushX = pushX;
	this.pushY = pushY;
	
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

	this.stillExists = true;
	
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

//Called when contact begins.
PeskyBox.prototype.onBegin = function(player){

	if(player.id == this.target.id)
	{
		player.body.setVel(new chipmunk.Vect(0,0));
		
		var impulseX = this.pushX*Math.sin(Math.PI*2*Math.random());
		var impulseY = Math.abs(this.pushY*Math.random())*-1;

		player.body.applyImpulse(new chipmunk.Vect(impulseX, impulseY), new chipmunk.Vect(0,0));
		this.fleeTimer = 999999;
	}
};

//Called when contact ends.
PeskyBox.prototype.onEnd = function(player){
	if(player.id == this.target.id)
		this.fleeTimer = this.maxFleeTime;
};

PeskyBox.prototype.update = function(){
	
	if(this.target && !this.target.isRemoved)
	{
		var nextX = 0;
		var nextY = 0;
	
		//Flee after touch.
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
	}	
	else
	{
		this.velocity.x *= Constants.NPC.PeskyBox.FRICTION_FACTOR;
		this.velocity.y *= Constants.NPC.PeskyBox.FRICTION_FACTOR;
	}
	
	this.velocity.x *= Constants.NPC.PeskyBox.FRICTION_FACTOR;
	this.velocity.y *= Constants.NPC.PeskyBox.FRICTION_FACTOR;
	
	var pos = this.body.getPos();
	this.body.setPos(new chipmunk.Vect(pos.x + this.velocity.x, pos.y + this.velocity.y));
	pos = this.body.getPos();
	
	this.x = pos.x;
	this.y = pos.y;
			
	this.duration -= this.currentGame.dt;
	
	if(this.duration <= 0)
		this.stillExists = false;
};

PeskyBox.prototype.explode = function(){

	//Remove physical presence.
	this.currentGame.space.removeShape(this.shape);
			
	var data = {
		id: this.id
	};
	
	//Send info to client.
	this.stillExists = false;
	io.sockets.in(this.currentGame.id).emit(Constants.Message.DELETE_NPC, data);
};