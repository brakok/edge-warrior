
var Missile = function(x, y, stats){

	this.x = x;
	this.y = y;
	this.velocity = {x:0, y:0};
	
	this.speed = stats.speed;
	this.direction = stats.direction;
	
	this.body = new chipmunk.Body(Infinity, Infinity);
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
	
	//Assign custom data to body.
	this.body.userdata = {
		type: UserDataType.RAYBALL,
		object: this
	};
	
	//Create a shape associated with the body.
	this.shape = Game.space.addShape(chipmunk.BoxShape(this.body, stats.width, stats.height));
	this.shape.setCollisionType(CollisionType.DEATH_ZONE);
	this.shape.sensor = true;
};

Missile.prototype.update = function(){
	//TODO.
};

