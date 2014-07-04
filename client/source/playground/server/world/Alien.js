
cd.Server.WorldInfo.Alien = function(width, height, game){
	
	this.type = Enum.World.Type.ALIEN;
	
	this.width = width;
	this.height = height;
	this.currentGame = game;
	
	this.goalStartPosition = (this.height + Constants.World.Alien.GOAL_OFFSET_Y)*(1 - (Constants.Game.MAX_PLAYERS - this.currentGame.maxPlayers)*Constants.WinningGoal.LOWER_GOAL_FACTOR);
	this.spawnZones = [];
	
		//Event infos.
	this.eventTimer = Constants.World.Alien.Event.TIMER_MIN + Math.random()*Constants.World.Alien.Event.TIMER_RANGE + Constants.Warmup.PHASE_TIME;
	this.eventRunning = false;
};

cd.Server.WorldInfo.Alien.prototype.load = function(){
	
	//Create floor and walls.
	var ground = new chipmunk.SegmentShape(this.currentGame.space.staticBody,
											new chipmunk.Vect(0, 0),
											new chipmunk.Vect(this.width, 0),
											10);
	
	var leftWall = new chipmunk.SegmentShape(this.currentGame.space.staticBody,
											new chipmunk.Vect(-5, 0),
											new chipmunk.Vect(-5, this.height*3),
											10);
											
	var rightWall = new chipmunk.SegmentShape(this.currentGame.space.staticBody,
												new chipmunk.Vect(this.width + 5, 0),
												new chipmunk.Vect(this.width + 5, this.height*3),
												10);																
	
	//Set friction on ground.
	ground.setFriction(Constants.Physic.FRICTION);
	
	this.currentGame.space.addShape(ground);
	this.currentGame.space.addShape(leftWall);
	this.currentGame.space.addShape(rightWall);	
};


cd.Server.WorldInfo.Alien.prototype.update = function(){

	this.eventTimer -= this.currentGame.dt;
	
	if(this.eventTimer <= 0)
	{
		this.triggerEvent();
		this.eventTimer = Constants.World.Alien.Event.TIMER_MIN + Math.random()*Constants.World.Alien.Event.TIMER_RANGE;
	}
};

cd.Server.WorldInfo.Alien.prototype.triggerEvent = function(){
	
	//Create two venom waves.
	this.currentGame.managers.TriggerManager.add(new cd.Server.VenomWave(0, 
																	   this.height, 
																	   Constants.Trigger.VenomWave.SPEED_X, 
																	   Constants.Trigger.VenomWave.SPEED_Y, 
																	   this.height, 
																	   Constants.Trigger.VenomWave.COOLDOWN, 
																	   Constants.Trigger.VenomWave.VAR_COOLDOWN,
																	   Constants.Trigger.VenomWave.VEL_MIN_X, 
																	   Constants.Trigger.VenomWave.VEL_RANGE_X, 
																	   Constants.Trigger.VenomWave.VEL_MIN_Y, 
																	   Constants.Trigger.VenomWave.VEL_RANGE_Y,
																	   Constants.Trigger.VenomWave.WIDTH, 
																	   Constants.Trigger.VenomWave.HEIGHT,
																	   this.currentGame));

	this.currentGame.managers.TriggerManager.add(new cd.Server.VenomWave(this.width, 
																	   this.height, 
																	   Constants.Trigger.VenomWave.SPEED_X, 
																	   Constants.Trigger.VenomWave.SPEED_Y, 
																	   this.height, 
																	   Constants.Trigger.VenomWave.COOLDOWN, 
																	   Constants.Trigger.VenomWave.VAR_COOLDOWN,
																	   -Constants.Trigger.VenomWave.VEL_MIN_X, 
																	   -Constants.Trigger.VenomWave.VEL_RANGE_X, 
																	   Constants.Trigger.VenomWave.VEL_MIN_Y, 
																	   Constants.Trigger.VenomWave.VEL_RANGE_Y,
																	   Constants.Trigger.VenomWave.WIDTH, 
																	   Constants.Trigger.VenomWave.HEIGHT,
																	   this.currentGame));
	
};