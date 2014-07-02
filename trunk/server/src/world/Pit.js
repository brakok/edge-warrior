
cd.Server.WorldInfo.Pit = function(width, height, game){
	
	this.type = Enum.World.Type.PIT;
	
	this.width = width;
	this.height = height;
	this.currentGame = game;
	
	this.goalStartPosition = (this.height + Constants.World.Pit.GOAL_OFFSET_Y)*(1 - (Constants.Game.MAX_PLAYERS - this.currentGame.maxPlayers)*Constants.WinningGoal.LOWER_GOAL_FACTOR);
	this.spawnZones = [];
	
	//Event infos.
	this.eventTimer = Constants.World.Pit.Event.TIMER_MIN + Math.random()*Constants.World.Pit.Event.TIMER_RANGE + Constants.Warmup.PHASE_TIME;
};

cd.Server.WorldInfo.Pit.prototype.load = function(){
	
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

cd.Server.WorldInfo.Pit.prototype.update = function(){
	
	this.eventTimer -= this.currentGame.dt;
	
	if(this.eventTimer <= 0)
	{
		this.triggerEvent();
		this.eventTimer = Constants.World.Pit.Event.TIMER_MIN + Math.random()*Constants.World.Pit.Event.TIMER_RANGE;
	}
};

cd.Server.WorldInfo.Pit.prototype.triggerEvent = function(){
	
	//Release a sand spirit.
	this.currentGame.managers.NpcManager.add(new cd.Server.SandSpirit(Math.random()*this.width,
																	   -Constants.NPC.SandSpirit.HEIGHT*2,
																	   Constants.NPC.SandSpirit.WIDTH,
																	   Constants.NPC.SandSpirit.HEIGHT,
																	   Constants.NPC.SandSpirit.SPEED_X,
																	   Constants.NPC.SandSpirit.SPEED_Y,
																	   Constants.NPC.SandSpirit.DURATION,																   
																	   this.currentGame));
};