//Server version of the block.
var Block = function(id, x, y, type, color){
	
	this.id = id;
	this.linkedBlockId = null;
	
	this.width = BlockConstants.WIDTH;
	this.height = BlockConstants.HEIGHT;
	this.landed = false;
	
	this.x = x;
	this.y = y;
	this.type = type;
	this.color = color;
	
	//Needed to indicate during update if state is changed. Cannot be done during a space step (callback).
	this.toggleState = false;
	this.isStatic = false;
	this.toBeDestroy = false;
	this.destroyCause = null;
	
	this.state = BlockState.DYNAMIC;
		
	//Body creation (when not static).
	this.body = Game.space.addBody(new chipmunk.Body(PhysicConstants.MASS_BLOCK, Infinity));
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
						
	//Assign custom data to body.
	this.body.userdata = {
		type: UserDataType.BLOCK,
		object: this
	};
			
	//Create a shape associated with the body.
	this.shape = Game.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.shape.setCollisionType(CollisionType.STATIC);
	this.shape.setFriction(1);
	
	//Sensor allowing shape to be defined as block, because listener overrides collision behavior.
	this.blockSensor = Game.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.blockSensor.setCollisionType(CollisionType.BLOCK);
	this.blockSensor.sensor = true;

};

Block.prototype.markToDestroy = function(cause){
	this.toBeDestroy = true;
	this.destroyCause = cause;
};

Block.prototype.launch = function(){
	this.landed = false;
	this.body.setVel(new chipmunk.Vect(0, BlockConstants.LAUNCHING_SPEED));
};

Block.prototype.active = function(flag){
	
	if(flag)
	{
		//Block become dynamic.
		if(this.state != BlockState.DYNAMIC)
		{
			this.landed = false;
			this.state = BlockState.DYNAMIC;
			
			this.body.nodeIdleTime = 0;
			this.body.setMass(PhysicConstants.MASS_BLOCK);
			Game.space.addBody(this.body);
		}
	}
	else
	{
		//Block become static.
		if(this.state != BlockState.STATIC)
		{
			this.state = BlockState.STATIC;
			
			Game.space.removeBody(this.body);
			this.body.nodeIdleTime = Infinity;
			this.body.setMass(PhysicConstants.MASS_BLOCK_STATIC);
		}
	}
};

Block.prototype.update = function(){
	
	if(this.toBeDestroy)
		this.explode(this.destroyCause);
	else{
		//Activate or desactivate a block to become static or dynamic.
		if(this.toggleState && (this.state == BlockState.STATIC || this.body.isSleeping()))
		{
			this.active(!this.isStatic);
			this.toggleState = false;
		}	
	}	
};

Block.prototype.toClient = function(){
	return {
		id: this.id,
		x: this.body.getPos().x,
		y: this.body.getPos().y,
		type: this.type,
		color: this.color
	};
};

Block.prototype.explode = function(cause){
	
	var data = {
		cause: cause,
		id: this.id
	};
	
	//Strange behavior when trying to remove a static shape. Works fine when reactivate first.
	this.active(true);
	Game.space.removeShape(this.blockSensor);
	Game.space.removeShape(this.shape);
	Game.space.removeBody(this.body);

	//Unreference from game's blocks list.
	for(var i in Game.blocks)
	{
		if(Game.blocks[i] != null && Game.blocks[i].id == this.id)
			Game.blocks[i] = null;
	}
	
	io.sockets.in(Game.id).emit(Message.DELETE_BLOCK, data);
};