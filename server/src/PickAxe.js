
//Considered as a deathzone, but only works on neutral and colored blocks.
var PickAxe = function(id, x, y, velX, velY, distance, width, height, game){

	this.id = id;
	this.currentGame = game;
	
	this.x = x;
	this.y = y;
	this.enabled = true;
	this.stillExists = true;
	
	this.type = Enum.DeathZone.Type.PICK_AXE;
	
	var velHypo = (Math.sqrt(Math.pow(velX,2)+Math.pow(velY,2)));
	this.finalX = this.x + (velY == 0 ? distance : velX/velHypo*distance);
	this.finalY = this.y + (velX == 0 ? distance : velY/velHypo*distance);
		
	this.velocity = {
		x: velX,
		y: velY
	};
	
	this.width = width;
	this.height = height;
	
	this.body = new chipmunk.Body(Infinity, Infinity);
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
		
	//Assign custom data to body.
	this.body.userdata = {
		type: Enum.UserData.Type.PICK_AXE,
		object: this
	};
	
	//Create a shape associated with the body.
	this.shape = this.currentGame.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.shape.setCollisionType(Enum.Collision.Type.DEATH_ZONE);
	this.shape.sensor = true;
};

PickAxe.prototype.toClient = function(){
	return {
		x: this.x,
		y: this.y,
		id: this.id
	};
};


PickAxe.prototype.explode = function(){

	//Remove physical presence.
	this.currentGame.space.removeShape(this.shape);
		
	var data = {
		id: this.id
	};
		
	//Remove from game.
	for(var i in this.currentGame.deathZones)
		if(this.currentGame.deathZones[i] != null && this.currentGame.deathZones[i].id == this.id)
			delete this.currentGame.deathZones[i];
	
	//Send info to client.
	this.stillExists = false;
	io.sockets.in(this.currentGame.id).emit(Constants.Message.DELETE_DEATHZONE, data);
};

PickAxe.prototype.update = function(){

	if(this.stillExists)
	{
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		
		if((this.velocity.x < 0 && this.x < this.finalX) || (this.velocity.x > 0 && this.x > this.finalX))
			this.x = this.finalX;

		if((this.velocity.y < 0 && this.y < this.finalY) || (this.velocity.y > 0 && this.y > this.finalY))
			this.y = this.finalY;
	
		this.body.setPos(new chipmunk.Vect(this.x, this.y));
		
		//Destroy pick axe if it reaches his maximum distance.
		if(this.x == this.finalX && this.y == this.finalY)
			this.stillExists = false;
	}
	else
		this.explode();
};