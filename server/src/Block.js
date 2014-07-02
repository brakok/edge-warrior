//Server version of the block.
cd.Server.Block = function(x, y, type, color, owner, game, skill){
	
	this.currentGame = game;
	
	this.id = -1;
	this.linkedBlockId = null;
	this.owner = owner;
	
	this.width = Constants.Block.WIDTH;
	this.height = Constants.Block.HEIGHT;
	
	//Flag is true when block's body is sleeping.
	this.landed = false;
	//Flag is true when block's body encounters another block.
	this.justLanded = false;
	//Precision timer to trigger action shortly after the block just landed. Prevents to trigger action when bodies are collapsing.
	this.landingTimer = 0;
	
	this.stillExists = true;
	this.needPush = false;
	
	this.x = x;
	this.y = y;
	this.type = type;
	
	//Set skill information.
	this.skill = (type == Enum.Block.Type.SKILLED ? cd.Server.SkillInfo.load(skill) : null);	
	this.color = color;
	
	//Used to prevent a block from staying in a active state.
	this.safeLandTimer = Constants.Block.LAND_SAFE_TIMER;
	this.usedSafeTimer = true;
	
	this.launchLandTimer = (type == Enum.Block.Type.SKILLED && this.skill && this.skill.useLaunchTimer ? Constants.Block.LAUNCH_LAND_TIMER : 0);
	this.mustTrigger = false;

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

cd.Server.Block.prototype.markToDestroy = function(cause){
	this.toBeDestroy = true;
	this.destroyCause = cause;
};

cd.Server.Block.prototype.launch = function(){
	this.landed = false;
	this.body.setVel(new chipmunk.Vect(0, Constants.Block.LAUNCHING_SPEED));
	
	//Start skill if on launch.
	if(this.type == Enum.Block.Type.SKILLED && this.skill && this.skill.trigger == Enum.Block.Skill.Trigger.ON_LAUNCHING)
		this.trigger();
};

cd.Server.Block.prototype.active = function(flag){
	
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

cd.Server.Block.prototype.update = function(dt){
	
	if(this.stillExists && !this.landed){
	
		//Trigger effect (can't during space step).
		if(this.mustTrigger)
			this.trigger();
		
		//Reduce landing timer by delta.
		if(this.landingTimer > 0)
			this.landingTimer -= dt;
		
		if(this.launchLandTimer > 0)
		{
			this.body.setVel(new chipmunk.Vect(0, Constants.Block.LAUNCHING_SPEED));
			this.launchLandTimer -= dt;
		}
		
		//Prevent block from going faster than launching speed.
		if(this.body.getVel().y < Constants.Block.LAUNCHING_SPEED)
			this.body.setVel(new chipmunk.Vect(0, Constants.Block.LAUNCHING_SPEED));
	
		//Prevent a block from staying awake.
		if(this.justLanded || (!this.usedSafeTimer && !this.landed))
		{
			if(this.justLanded)
				this.usedSafeTimer = false;
	
			if(this.body.getVel().y < Constants.Block.LAUNCHING_SPEED*0.5)
			{
				this.usedSafeTimer = true;
				this.safeLandTimer = Constants.Block.LAND_SAFE_TIMER;
				this.isStatic = false;
			}
			else
			{
				this.safeLandTimer -= dt;
		
				if(this.safeLandTimer <= 0 && this.body.getVel().y > Constants.Block.LAUNCHING_SPEED*0.5)
				{
					this.active(false);
					this.usedSafeTimer = true;
				}
			}
		}
		
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
};

cd.Server.Block.prototype.toClient = function(){
	return {
		id: this.id,
		x: this.body.getPos().x,
		y: this.body.getPos().y,
		type: this.type,
		skill: this.skill,
		color: this.color
	};
};

//Trigger skill or effect.
cd.Server.Block.prototype.trigger = function(){

	if(this.stillExists)
	{
		if(this.type == Enum.Block.Type.SPAWN)
		{
			this.spawn();
			this.mustTrigger = false;
		}
		else if(this.type == Enum.Block.Type.SKILLED)
		{
			//Trigger skill.
			this.skill.exec(this);
		}
	}
	
};

//Spawn players.
cd.Server.Block.prototype.spawn = function(){

	var killerId = this.owner ? this.owner.id : null;
	var posY = Constants.Player.HEIGHT*0.75;
	var pos = this.body.getPos();
	
	//Respawn dead players.
	for(var i in this.currentGame.players)
	{
		if(!this.currentGame.players[i].isAlive && this.currentGame.players[i].killerId == killerId)
		{
			var factor = Math.PI*Math.random()*2;
			
			var launchPowerX = Constants.Spawn.MAXLAUNCHING_X*Math.sin(factor);
			var launchPowerY = Math.abs(Constants.Spawn.MAXLAUNCHING_Y*Math.cos(factor));
			
			
			//Prevent block to spawn player on the world edges.
			if((pos.x < Constants.Spawn.Limit.OFFSET && launchPowerX < 0)
			|| (pos.x > this.currentGame.world.width - Constants.Spawn.Limit.OFFSET && launchPowerX > 0))
				launchPowerX *= -1;
	
			var varX = launchPowerX*0.02;
			
			//If X variation is too far from middle...
			if(Math.abs(varX) >  Constants.Block.WIDTH*0.5 - Constants.Player.WIDTH*0.5)
				varX = (Constants.Block.WIDTH*0.5 - Constants.Player.WIDTH*0.5) * (launchPowerX < 0 ? -1 : 1);
		
			//Spawn the player.
			this.currentGame.players[i].spawn(pos.x + varX, pos.y + posY);
			
			//Launch the player to random position.
			this.currentGame.players[i].body.setVel(new chipmunk.Vect(0,0));
			this.currentGame.players[i].body.applyImpulse(new chipmunk.Vect(launchPowerX, launchPowerY), new chipmunk.Vect(0,0));
		}
		else if(this.currentGame.players[i].isAlive && this.currentGame.players[i].id == killerId)
		{
			var player = this.currentGame.players[i];
			var hypo = Math.sqrt(Math.pow(pos.x - player.x, 2) + Math.pow(pos.y - player.y, 2));
			
			//Prevent killer to get a double jump when releasing his victims.
			if(hypo < Constants.Spawn.Limit.ON_RELEASE)
				player.noGroundTimer = Constants.Spawn.NO_GROUND_FROM_PLAYER_TIMER;
		}
	}
	
	//Check if spawn block is overlord's one.
	if(this.owner == null)
		this.currentGame.overlord.hasActiveSpawnBlock = false;
	
	this.explode(Enum.Block.Destruction.SPAWN);
};

//Destroy block.
cd.Server.Block.prototype.explode = function(cause){
	
	var data = {
		cause: cause,
		id: this.id
	};
	
	//Strange behavior when trying to remove a static shape. Works fine when reactivated first.
	this.active(true);
	this.currentGame.space.removeShape(this.blockSensor);
	this.currentGame.space.removeShape(this.shape);
	this.currentGame.space.removeBody(this.body);
	
	this.stillExists = false;
	this.toBeDestroy = false;
	
	io.sockets.in(this.currentGame.id).emit(Constants.Message.DELETE_BLOCK, data);
};