//Server version of the block.
var Block = function(id, x, y, type, color, ownerId, game, skill){
	
	this.currentGame = game;
	
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
	this.skill = (type == Enum.Block.Type.SKILLED ? skill : null);
	
	//Set skill information.
	if(this.skill != null)
	{
		switch(this.skill.type){
			case Enum.Block.Skill.FIRE_PULSE:
				this.skill.count = 1;
				this.skill.trigger = Enum.Block.Skill.Trigger.ON_LANDING;
				this.skill.selfDestroy = true;
				break;
		}
	}
	
	this.color = color;
	
	this.mustTrigger = false;
	this.justLanded = false;
	
	//Needed to indicate, during update, if state is changed. Cannot be done during a space step (callback).
	this.toggleState = false;
	this.isStatic = false;
	this.toBeDestroy = false;
	this.destroyCause = null;
	
	this.state = Enum.Block.State.DYNAMIC;
		
	//Body creation (when not static).
	this.body = this.currentGame.space.addBody(new chipmunk.Body(Constants.Physic.MASS_BLOCK, Infinity));
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
						
	//Assign custom data to body.
	this.body.userdata = {
		type: Enum.UserData.Type.BLOCK,
		object: this
	};
			
	//Create a shape associated with the body.
	this.shape = this.currentGame.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.shape.setCollisionType(Enum.Collision.Type.STATIC);
	this.shape.setFriction(1);
	
	//Sensor allowing shape to be defined as block, because listener overrides collision behavior.
	this.blockSensor = this.currentGame.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
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
			this.currentGame.space.addBody(this.body);
		}
	}
	else
	{
		//Block become static.
		if(this.state != Enum.Block.State.STATIC)
		{
			this.state = Enum.Block.State.STATIC;
			
			this.landed = true;
			this.currentGame.space.removeBody(this.body);
			this.body.nodeIdleTime = Infinity;
			this.body.setMass(Constants.Physic.MASS_BLOCK_STATIC);
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
		
		if(this.stillExist)
		{
			//Check if it just landed to tell client to activate animation.
			if(this.justLanded && (this.skill == null || !this.skill.selfDestroy))
			{
				var data = {
					action: Enum.Action.Type.LANDING,
					id: this.id
				};
			
				io.sockets.in(this.currentGame.id).emit(Constants.Message.BLOCK_ACTION, data);
				this.justLanded = false;
			}
		
			//Activate or desactivate a block to become static or dynamic.
			if(this.toggleState && (this.state == Enum.Block.State.STATIC || this.body.isSleeping()))
			{
				this.active(!this.isStatic);
				this.toggleState = false;
			}	
			
			this.x = this.body.getPos().x;
			this.y = this.body.getPos().y;
		}
	}
};

Block.prototype.toClient = function(){
	return {
		id: this.id,
		x: this.body.getPos().x,
		y: this.body.getPos().y,
		type: this.type,
		skill: this.skill,
		color: this.color
	};
};

Block.prototype.trigger = function(){

	if(this.stillExist)
	{
		if(this.type == Enum.Block.Type.SPAWN)
		{
			this.spawn();
			this.mustTrigger = false;
		}
		else if(this.type == Enum.Block.Type.SKILLED)
		{
			//All repertoried skills.
			switch(this.skill.type)
			{
				case Enum.Block.Skill.FIRE_PULSE:

					if(this.landed && this.skill.count > 0)
					{
						//Launch one fireball for both sides.
						this.currentGame.managers.DeathZoneManager.launch(new Missile(this.currentGame.deathZoneSequence,
																					  null,
																					  this.x,
																					  this.y, 
																					  Enum.DeathZone.Type.FIREBALL,
																					  {
																						direction: Enum.Direction.LEFT,
																						power: this.skill.power
																					  },
																					  this.currentGame));
						
						this.currentGame.managers.DeathZoneManager.launch(new Missile(this.currentGame.deathZoneSequence,
																					  null,
																					  this.x, 
																					  this.y, 
																					  Enum.DeathZone.Type.FIREBALL,
																					  {
																						direction: Enum.Direction.RIGHT,
																						power: this.skill.power
																					  },
																					  this.currentGame));
					
						this.skill.count--;
						this.mustTrigger = false;
					}
					
					break;
			}
		}
	}
	
};

Block.prototype.spawn = function(){

	var killerId = this.ownerId;
	var posY = Constants.Player.HEIGHT;
	
	//Respawn dead players.
	for(var i in this.currentGame.players)
	{
		var factor = Math.PI*(Math.random()*2);
		
		var launchPowerX = Constants.Block.SPAWN_MAXLAUNCHING_X*Math.sin(factor);
		var launchPowerY = Math.abs(Constants.Block.SPAWN_MAXLAUNCHING_Y*Math.cos(factor));
		
		//Prevent block to spawn player on the world edges.
		if((this.body.getPos().x < Constants.Spawn.Limit.OFFSET && launchPowerX < 0)
		|| (this.body.getPos().x > this.currentGame.width - Constants.Spawn.Limit.OFFSET && launchPowerX > 0))
			launchPowerX *= -1;
	
		if(!this.currentGame.players[i].isAlive && this.currentGame.players[i].killerId == killerId)
		{
			//Spawn the player.
			this.currentGame.players[i].spawn(this.body.getPos().x +(launchPowerX*0.1), this.body.getPos().y + posY);
			
			//Launch the player to random position.
			this.currentGame.players[i].body.setVel(new chipmunk.Vect(0,0));
			this.currentGame.players[i].body.applyImpulse(new chipmunk.Vect(launchPowerX, launchPowerY), new chipmunk.Vect(0,0));
		}
	}
	
	//Check if spawn block is overlord's one.
	if(this.ownerId == null)
		this.currentGame.overlord.hasActiveSpawnBlock = false;
	
	this.explode(Enum.Block.Destruction.SPAWN);
};

Block.prototype.explode = function(cause){
	
	var data = {
		cause: cause,
		id: this.id
	};
	
	//Strange behavior when trying to remove a static shape. Works fine when reactivated first.
	this.active(true);
	this.currentGame.space.removeShape(this.blockSensor);
	this.currentGame.space.removeShape(this.shape);
	this.currentGame.space.removeBody(this.body);

	//Unreference from game's blocks list.
	for(var i in this.currentGame.blocks)
	{
		if(this.currentGame.blocks[i] != null && this.currentGame.blocks[i].id == this.id)
			delete this.currentGame.blocks[i];
	}
	
	this.stillExist = false;
	this.toBeDestroy = false;
	
	io.sockets.in(this.currentGame.id).emit(Constants.Message.DELETE_BLOCK, data);
};