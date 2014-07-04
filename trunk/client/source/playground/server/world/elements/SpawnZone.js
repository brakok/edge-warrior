
cd.Server.SpawnZone = function(x, y, width, height, game){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.currentGame = game;
};

cd.Server.SpawnZone.prototype.init = function(){

	this.body = new chipmunk.Body(Infinity, Infinity);
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
		
	//Assign custom data to body.
	this.body.userdata = {
		type: Enum.UserData.Type.SPAWN_ZONE,
		object: this
	};
	
	//Create a shape associated with the body.
	this.shape = this.currentGame.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.shape.setCollisionType(Enum.Collision.Type.SPAWN);
	this.shape.sensor = true;
};