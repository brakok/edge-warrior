
WorldInfo.Alien = function(width, height, game){
	
	this.type = Enum.World.Type.ALIEN;
	
	this.width = width;
	this.height = height;
	this.currentGame = game;
	
	this.goalStartPosition = (this.height + Constants.World.Alien.GOAL_OFFSET_Y)*(1 - (Constants.Game.MAX_PLAYERS - this.currentGame.maxPlayers)*Constants.WinningGoal.LOWER_GOAL_FACTOR);
	this.spawnZones = [];
	
		//Event infos.
	this.eventTimer = Constants.World.Alien.Event.TIMER_MIN + Math.random()*Constants.World.Alien.Event.TIMER_RANGE + Constants.Warmup.PHASE_TIME;
	this.eyesTimer = Constants.World.Alien.Event.EYES_TIMER;
	this.eventRunning = false;
};

WorldInfo.Alien.prototype.load = function(){
	
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


WorldInfo.Alien.prototype.update = function(){

	this.eventTimer -= this.currentGame.dt;
	
	if(this.eventRunning)
		this.eyesTimer -= this.currentGame.dt;
	
	//Trigger gazing eyes event.
	if(this.eventTimer <= 0)
	{
		this.triggerEvent();
		
		//Send eyes instruction.
		var data = {
			x: this.width*0.5,
			y: this.width*0.5,
			type: Enum.Element.Type.ALIEN_EYES,
			duration: Constants.World.Alien.Event.EYES_TIMER
		};
		
		io.sockets.in(this.currentGame.id).emit(Constants.Message.NEW_ELEMENT, data);
		
		this.eventTimer = Constants.World.Alien.Event.TIMER_MIN + Math.random()*Constants.World.Alien.Event.TIMER_RANGE + Constants.World.Alien.Event.EYES_TIMER;
		this.eyesTimer = Constants.World.Alien.Event.EYES_TIMER;
	}
	
	//Trigger stun from eyes.
	if(this.eventRunning && this.eyesTimer <= 0)
	{
		for(var i in this.currentGame.players)
		{
			var vel = this.currentGame.players[i].body.getVel();
			var dt = Math.sqrt(Math.pow(vel.x, 2) + Math.pow(vel.y, 2));
			
			if(dt > Constants.World.Alien.Event.ALLOWED_SPEED)
			{
				this.currentGame.players[i].stuckTimer = Constants.World.Alien.Event.STUCK_DURATION;
			
				//Send stuck effect.
				var data = {
					x: this.currentGame.players[i].x,
					y: this.currentGame.players[i].y,
					type: Enum.Element.Type.STUCK,
					duration: Constants.World.Alien.Event.STUCK_DURATION
				};
				
				io.sockets.in(this.currentGame.id).emit(Constants.Message.NEW_ELEMENT, data);
			}
		}
		
		this.eventRunning = false;
	}
};

WorldInfo.Alien.prototype.triggerEvent = function(){
	this.eventRunning = true;
};