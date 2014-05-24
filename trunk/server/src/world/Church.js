
WorldInfo.Church = function(width, height, game){
	
	this.type = Enum.World.Type.CHURCH;
	
	this.width = width;
	this.height = height;
	this.currentGame = game;
	
	this.goalStartPosition = (this.height + Constants.World.Church.GOAL_OFFSET_Y)*(1 - (Constants.Game.MAX_PLAYERS - this.currentGame.maxPlayers)*Constants.WinningGoal.LOWER_GOAL_FACTOR);
	this.spawnZones = [];

	//Event infos.
	this.eventTimer = Constants.World.Church.EVENT_TIMER_MIN + Math.random()*Constants.World.Church.EVENT_TIMER_RANGE + Constants.Warmup.PHASE_TIME;
};

WorldInfo.Church.prototype.load = function(){
	
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

WorldInfo.Church.prototype.update = function(){

	this.eventTimer -= this.currentGame.dt;
	
	if(this.eventTimer <= 0)
	{
		this.triggerEvent();
		this.eventTimer = Constants.World.Church.EVENT_TIMER_MIN + Math.random()*Constants.World.Church.EVENT_TIMER_RANGE;
	}
};

WorldInfo.Church.prototype.triggerEvent = function(){
	
	//Create a gravity beam.
	this.currentGame.managers.TriggerManager.add(new GravityBeam(Constants.Trigger.GravityBeam.WIDTH*0.5 + (Math.random()*this.currentGame.world.width - Constants.Trigger.GravityBeam.WIDTH), 
															     Constants.Trigger.GravityBeam.HEIGHT*0.5, 
																 Constants.Trigger.GravityBeam.WIDTH,
																 Constants.Trigger.GravityBeam.HEIGHT,
																 Constants.Trigger.GravityBeam.DURATION,
																 Constants.Trigger.GravityBeam.MAX_LIFT_HEIGHT,
																 Constants.Trigger.GravityBeam.TIME_ALLOWED,
																 Constants.Trigger.GravityBeam.IMPULSE,
																 this.currentGame));
	
};