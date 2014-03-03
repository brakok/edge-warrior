var Jaw = function(id, parent, x, y, count, width, height, game){		this.currentGame = game;		this.stillExists = true;			this.enabled = true;	this.parent = parent;	this.id = id;		this.blockId = this.parent.id;	this.ownerId = this.parent.ownerId;		this.type = Enum.DeathZone.Type.JAW;	this.count = count;			//Position relative to parent.	this.x = x;	this.y = y;	this.width = width;	this.height = height;		this.body = new chipmunk.Body(Infinity, Infinity);	this.body.setPos(new chipmunk.Vect(this.parent.x + this.x, this.parent.y + this.y));			//Assign custom data to body.	this.body.userdata = {		type: Enum.UserData.Type.JAW,		object: this	};		//Create a shape associated with the body.	this.shape = this.currentGame.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));	this.shape.setCollisionType(Enum.Collision.Type.DEATH_ZONE);	this.shape.sensor = true;};Jaw.prototype.toClient = function(){	return {		x: this.parent.x + this.x,		y: this.parent.y + this.y,		id: this.id	};};Jaw.prototype.explode = function(){	//Remove physical presence.	this.currentGame.space.removeShape(this.shape);			var data = {		id: this.id	};			//Remove from game.	for(var i in this.currentGame.deathZones)		if(this.currentGame.deathZones[i] != null && this.currentGame.deathZones[i].id == this.id)			delete this.currentGame.deathZones[i];		//Send info to client.	this.stillExists = false;	io.sockets.in(this.currentGame.id).emit(Constants.Message.DELETE_DEATHZONE, data);};Jaw.prototype.update = function(){	if(this.stillExists)	{		this.body.setPos(new chipmunk.Vect(this.parent.x + this.x, this.parent.y + this.y));				if(this.parent.isStatic)			this.explode();	}	else		this.explode();};