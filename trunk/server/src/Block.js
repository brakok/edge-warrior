//Server version of the block.
var Block = function(id, x, y, type, color, ownerId){
	
	this.id = id;
	this.linkedBlockId = null;
	this.ownerId = ownerId;
	
	this.width = Constants.Block.WIDTH;
	this.height = Constants.Block.HEIGHT;
	this.landed = false;
	this.stillExist = true;
	
	this.x = x;
	this.y = y;
	this.type = type;
	this.color = color;
	
	this.mustTrigger = false;
	
	//Needed to indicate, during update, if state is changed. Cannot be done during a space step (callback).
	this.toggleState = false;
	this.isStatic = false;
	this.toBeDestroy = false;
	this.destroyCause = null;
	
	this.state = Enum.Block.State.DYNAMIC;
		
	//Body creation (when not static).
	this.body = Game.space.addBody(new chipmunk.Body(Constants.Physic.MASS_BLOCK, Infinity));
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
						
	//Assign custom data to body.
	this.body.userdata = {
		type: Enum.UserData.Type.BLOCK,
		object: this
	};
			
	//Create a shape associated with the body.
	this.shape = Game.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.shape.setCollisionType(Enum.Collision.Type.STATIC);
	this.shape.setFriction(1);
	
	//Sensor allowing shape to be defined as block, because listener overrides collision behavior.
	this.blockSensor = Game.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.blockSensor.setCollisionType(Enum.Collision.Type.BLOCK);
	this.blockSensor.sensor = true;
};

Block.prototype.markToDestroy = function(cause){
	this.toBeDestroy = true;
	this.destroyCause = cause;
};

Block.prototype.launch = function(){
	this.landed = false;
	this.body.setVel(new chipmunk.Vect(0, Constants.Block.LAUNCHING_SPEED));
};

Block.prototype.active = function(flag){
	
	if(flag)
	{
		//Block become dynamic.
		if(this.state != Enum.Block.State.DYNAMIC)
		{
			this.landed = false;
			this.state = Enum.Block.State.DYNAMIC;
			
			this.body.nodeIdleTime = 0;
			this.body.setMass(Constants.Physic.MASS_BLOCK);
			Game.space.addBody(this.body);
		}
	}
	else
	{
		//Block become static.
		if(this.state != Enum.Block.State.STATIC)
		{
			this.state = Enum.Block.State.STATIC;
			
			Game.space.removeBody(this.body);
			this.body.nodeIdleTime = Infinity;
			this.body.setMass(Constants.Physic.MASS_BLOCK_STATIC);
			
			var data = {
				action: Enum.Action.Type.LANDING,
				id: this.id
			};
			
			io.sockets.in(Game.id).emit(Constants.Message.BLOCK_ACTION, data);
		}
	}
};

Block.prototype.update = function(){
	
	if(this.toBeDestroy)
		this.explode(this.destroyCause);
	else{	
		//Trigger effect (can't during space step).
		if(this.mustTrigger)
			this.trigger();
	
		this.mustTrigger = false;
		
		if(this.stillExist)
		{
			//Activate or desactivate a block to become static or dynamic.
			if(this.toggleState && (this.state == Enum.Block.State.STATIC || this.body.isSleeping()))
			{
				this.active(!this.isStatic);
				this.toggleState = false;
			}	
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

Block.prototype.trigger = function(){

	if(this.stillExist)
	{
		if(this.type == Enum.Block.Type.SPAWN)
			this.spawn();
	}
	
};

Block.prototype.spawn = function(){

	var killerId = this.ownerId;
	var posY = Constants.Player.HEIGHT;
	
	//Respawn dead players.
	for(var i in Game.players)
	{
		var factor = Math.PI*(Math.random()*2);
		
		var launchPowerX = Constants.Block.SPAWN_MAXLAUNCHING_X*Math.sin(factor);
		var launchPowerY = Math.abs(Constants.Block.SPAWN_MAXLAUNCHING_Y*Math.cos(factor));
		
		//Prevent block to spawn player on the world edges.
		if((this.body.getPos().x < Constants.Spawn.Limit.OFFSET && launchPowerX < 0)
		|| (this.body.getPos().x > Game.width - Constants.Spawn.Limit.OFFSET && launchPowerX > 0))
			launchPowerX *= -1;
	
		if(!Game.players[i].isAlive && Game.players[i].killerId == killerId)
		{
			//Spawn the player.
			Game.players[i].spawn(this.body.getPos().x +(launchPowerX*0.1), this.body.getPos().y + posY);
			
			//Launch the player to random position.
			Game.players[i].body.setVel(new chipmunk.Vect(0,0));
			Game.players[i].body.applyImpulse(new chipmunk.Vect(launchPowerX, launchPowerY), new chipmunk.Vect(0,0));
		}
	}
	
	//Check if spawn block is overlord's one.
	if(this.ownerId == null)
		Overlord.hasActiveSpawnBlock = false;
	
	this.explode(Enum.Block.Destruction.SPAWN);
};

Block.prototype.explode = function(cause){
	
	var data = {
		cause: cause,
		id: this.id
	};
	
	//Strange behavior when trying to remove a static shape. Works fine when reactivated first.
	this.active(true);
	Game.space.removeShape(this.blockSensor);
	Game.space.removeShape(this.shape);
	Game.space.removeBody(this.body);

	//Unreference from game's blocks list.
	for(var i in Game.blocks)
	{
		if(Game.blocks[i] != null && Game.blocks[i].id == this.id)
			delete Game.blocks[i];
	}
	
	this.stillExist = false;
	this.toBeDestroy = false;
	
	io.sockets.in(Game.id).emit(Constants.Message.DELETE_BLOCK, data);
};