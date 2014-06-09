
var Missile = function(owner, blockId, type, x, y, velX, velY, distance, width, height, game){
	
	this.currentGame = game;
	this.id = -1;

	this.owner = owner;
	this.blockId = blockId;
	
	this.type = type;
	
	this.x = x;
	this.y = y;
	
	this.width = width;
	this.height = height;
	
	this.distance = distance;
	
	//Compute finalX and finalY.
	var velHypo = (Math.sqrt(Math.pow(velX,2)+Math.pow(velY,2)));
	this.finalX = this.x + (velY == 0 ? (distance * (velX < 0 ? -1 : 1)) : velX/velHypo*distance);
	this.finalY = this.y + (velX == 0 ? (distance * (velY < 0 ? -1 : 1)) : velY/velHypo*distance);
	
	this.vel = {x:velX, y:velY};
	
	this.enabled = true;
	this.stillExists = true;
	
	this.body = new chipmunk.Body(Infinity, Infinity);
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
	
	var userDataType = null;
	
	//Find good type for association.
	switch(this.type)
	{
		case Enum.DeathZone.Type.FIREBALL:
			userDataType = Enum.UserData.Type.FIREBALL;			
			break;
		case Enum.DeathZone.Type.PICK_AXE:
			userDataType = Enum.UserData.Type.PICK_AXE;
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
			
	var data = {
		id: this.id
	};
	
	//Send info to client.
	this.stillExists = false;
	io.sockets.in(this.currentGame.id).emit(Constants.Message.DELETE_DEATHZONE, data);
};

Missile.prototype.update = function(){

	this.x += this.vel.x;
	this.y += this.vel.y;
	
	if((this.vel.x < 0 && this.x < this.finalX) || (this.vel.x > 0 && this.x > this.finalX))
		this.x = this.finalX;

	if((this.vel.y < 0 && this.y < this.finalY) || (this.vel.y > 0 && this.y > this.finalY))
		this.y = this.finalY;

	this.body.setPos(new chipmunk.Vect(this.x, this.y));
	
	//Destroyed if it reaches his maximum distance.
	if(this.x == this.finalX && this.y == this.finalY)
		this.stillExists = false;
};

