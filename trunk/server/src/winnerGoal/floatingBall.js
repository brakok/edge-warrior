var FloatingBall = function(x, y){	this.x = x;	this.y = y;		this.velocity = 0;	this.orbitTime = 0;		this.cooldown = 0;	this.jumpPressed = false;		this.type = Enum.WinningGoal.Type.FLOATING_BALL;		this.spikeStats = {		speed: Constants.DeathZone.EnergySpike.SPEED,		direction: Enum.Direction.UP,		type: Enum.DeathZone.Type.ENERGY_SPIKE,		distance: this.y	};		//Make a static body.	this.body = new chipmunk.Body(Infinity, Infinity);	this.body.setPos(new chipmunk.Vect(this.x, this.y));		//Assign custom data to body.	this.body.userdata = {		type: Enum.UserData.Type.WINNING_GOAL,		object: this	};		//Create a shape associated with the body.	this.shape = Game.space.addShape(chipmunk.BoxShape(this.body, Constants.WinningGoal.FloatingBall.WIDTH, Constants.WinningGoal.FloatingBall.HEIGHT));	this.shape.setCollisionType(Enum.Collision.Type.WINNING_GOAL);	this.shape.sensor = true;};FloatingBall.prototype.update = function(inputs){		var nextX = 0;		if(inputs.right)		nextX += Constants.WinningGoal.FloatingBall.SPEED;	if(inputs.left)		nextX -= Constants.WinningGoal.FloatingBall.SPEED;			if(nextX != 0)	{		//Turn.		if((nextX > 0 && this.velocity < 0) ||(nextX < 0 && this.velocity > 0))			this.velocity *= 0.95;					this.velocity += nextX;	}	else	{		if(this.velocity != 0)		{			//Artificial friction.			if(Math.abs(this.velocity) < Constants.WinningGoal.FloatingBall.SPEED*0.25)				this.velocity = 0;			else				this.velocity *= Constants.WinningGoal.FloatingBall.FRICTION_FACTOR;		}	}		//Trigger action on jump command.	if(inputs.jump && this.cooldown <= 0 && !this.jumpPressed)	{		this.launch();		this.cooldown = Constants.DeathZone.EnergySpike.COOLDOWN;		this.jumpPressed = true;	}	if(!inputs.jump && this.jumpPressed)		this.jumpPressed = false;			if(this.cooldown > 0)		this.cooldown -= Constants.Physic.TIME_STEP*0.5;		//Velocity can't be higher than max speed.	if(this.velocity < -(Constants.WinningGoal.FloatingBall.MAX_SPEED))		this.velocity = -(Constants.WinningGoal.FloatingBall.MAX_SPEED);	if(this.velocity > Constants.WinningGoal.FloatingBall.MAX_SPEED)		this.velocity = Constants.WinningGoal.FloatingBall.MAX_SPEED;		//Calculate ball's orbit.	this.orbitTime += Constants.WinningGoal.FloatingBall.ORBIT_SPEED;	var nextY = Math.sin(this.orbitTime)*Constants.WinningGoal.FloatingBall.ORBIT_RADIUS;		if(this.orbitTime >= 360)		this.orbitTime = 0;		this.translate(this.velocity, nextY);};FloatingBall.prototype.launch = function(){	DeathZoneManager.launch(new Spike(Game.deathZoneSequence,									  this.x, 									  0, 									  Constants.DeathZone.EnergySpike.WIDTH, 									  this.y, 									  Game.winner.id,									  this.spikeStats));		io.sockets.in(Game.id).emit(Constants.Message.GOAL_ACTION, Enum.Action.Type.SUMMONING);};FloatingBall.prototype.translate = function(velX, velY) {	this.x += velX;	var tmpY = this.y + velY;		if(this.x > Game.width - Constants.WinningGoal.FloatingBall.WIDTH*0.5)	{		this.x = Game.width - Constants.WinningGoal.FloatingBall.WIDTH*0.5;		this.velocity = 0;	}	else if(this.x < Constants.WinningGoal.FloatingBall.WIDTH*0.5)	{		this.x = Constants.WinningGoal.FloatingBall.WIDTH*0.5;		this.velocity = 0;	}			this.body.setPos(new chipmunk.Vect(this.x, tmpY));};FloatingBall.prototype.getPosition = function(){	return this.body.getPos();};FloatingBall.prototype.toClient = function(){	return {		x: this.getPosition().x,		y: this.getPosition().y	};};