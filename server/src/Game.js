//Game container server-side.
var Game = function(settings){
	
	//Members
	this.id = settings.id;
	this.players = [];
	this.blocks = [];
	this.deathZones = [];
	this.npcs = [];
	this.triggers = [];
	
	//Create delta.
	this.previousTime = new Date();
	this.dt = 0;
	
	this.playerInfos = settings.players;
	
	//Sequences.
	this.blockSequence = 0;
	this.deathZoneSequence = 0;
	this.npcSequence = 0;
	this.triggerSequence = 0;
	
	this.goal = null;
	this.intervalId = null;
	this.winner = null;
	this.winningPhaseTimer = Constants.WinningGoal.PHASE_TIME;
	
	this.spawnY = Constants.Player.INITIAL_SPAWN_Y;
	
	//World information.
	this.width = settings.width;
	this.height = settings.height;
	this.worldType = settings.worldType;
	
	this.goalStartPosition = null;
	
	//Special case when winning goals are too far.
	switch(this.worldType){
		case Enum.World.Type.CHURCH:
			this.goalStartPosition = this.height + Constants.World.Church.GOAL_OFFSET_Y;
			break;
		default:
			this.goalStartPosition = this.height + Constants.World.Common.GOAL_OFFSET_Y;
			break;
	}
	
	this.connectedPlayers = 0;
	this.connectingPlayers = 0;
	
	this.maxPlayers = settings.maxPlayers;
	this.state = false;
	this.space = null;
	
	this.unitTimer = Constants.Game.UNIT_TIMER;
	
	//Create listeners.
	this.listeners = new Listeners(this);
	
	//Managers.
	this.managers = new Managers(this);
	
	//Create Overlord.
	this.overlord = new Overlord(this);
};

Game.prototype.createWorld = function(){

	if(this.space == null || this.space == 'undefined')
	{
		var currentListeners = this.listeners;
	
		this.space = new chipmunk.Space();
		this.space.gravity = new chipmunk.Vect(0, Constants.Physic.GRAVITY);
		
		//Add goal listener.
		this.space.addCollisionHandler(Enum.Collision.Type.WINNING_GOAL, 
									   Enum.Collision.Type.PLAYER, 
									   function(arbiter, space){ currentListeners.GoalListener.begin(arbiter, space);}, 
									   null, 
									   null, 
									   null);
		
		//Add death zone listener.
		this.space.addCollisionHandler(Enum.Collision.Type.DEATH_ZONE, 
									   Enum.Collision.Type.PLAYER, 
									   function(arbiter, space){ currentListeners.DeathZoneListener.begin(arbiter, space);}, 
									   null, 
									   null, 
									   null);
									   
		this.space.addCollisionHandler(Enum.Collision.Type.DEATH_ZONE, 
									   Enum.Collision.Type.BLOCK, 
									   function(arbiter, space){ currentListeners.DeathZoneListener.begin(arbiter, space);}, 
									   null, 
									   null, 
									   null);
									   
		this.space.addCollisionHandler(Enum.Collision.Type.DEATH_ZONE, 
									   Enum.Collision.Type.STATIC, 
									   function(arbiter, space){ currentListeners.DeathZoneListener.begin(arbiter, space);}, 
									   null, 
									   null, 
									   null);
		
		//Add npc listener.
		this.space.addCollisionHandler(Enum.Collision.Type.NPC, 
									   Enum.Collision.Type.PLAYER, 
									   function(arbiter, space){ currentListeners.NpcListener.begin(arbiter, space);}, 
									   null, 
									   null, 
									   function(arbiter, space){ currentListeners.NpcListener.separate(arbiter, space);});
									   
		//Add trigger listener.
		this.space.addCollisionHandler(Enum.Collision.Type.TRIGGER, 
									   Enum.Collision.Type.PLAYER, 
									   function(arbiter, space){ currentListeners.TriggerListener.begin(arbiter, space);}, 
									   null, 
									   null, 
									   function(arbiter, space){ currentListeners.TriggerListener.separate(arbiter, space);});
									   
		this.space.addCollisionHandler(Enum.Collision.Type.TRIGGER, 
									   Enum.Collision.Type.BLOCK, 
									   function(arbiter, space){ currentListeners.TriggerListener.begin(arbiter, space);}, 
									   null, 
									   null, 
									   function(arbiter, space){ currentListeners.TriggerListener.separate(arbiter, space);});
		
		//Add ground sensor callback.
		this.space.addCollisionHandler(Enum.Collision.Type.GROUND_SENSOR, 
									   Enum.Collision.Type.STATIC, 
									   function(arbiter, space){ currentListeners.GroundListener.begin(arbiter, space);}, 
									   null, 
									   null, 
									   function(arbiter, space){ currentListeners.GroundListener.separate(arbiter, space);});
									   
		this.space.addCollisionHandler(Enum.Collision.Type.GROUND_SENSOR, 
									   Enum.Collision.Type.PLAYER, 
									   function(arbiter, space){ currentListeners.GroundListener.begin(arbiter, space);}, 
									   null, 
									   null, 
									   function(arbiter, space){ currentListeners.GroundListener.separate(arbiter, space);});
					
		//Add block listener callback.
		this.space.addCollisionHandler(Enum.Collision.Type.BLOCK, 
									   Enum.Collision.Type.STATIC, 
									   function(arbiter, space){ currentListeners.BlockListener.begin(arbiter, space);}, 
									   null, 
									   null, 
									   null);
		this.space.addCollisionHandler(Enum.Collision.Type.BLOCK, 
									   Enum.Collision.Type.BLOCK, 
									   function(arbiter, space){ currentListeners.BlockListener.begin(arbiter, space); }, 
									   null, 
									   null, 
									   null);
		this.space.addCollisionHandler(Enum.Collision.Type.BLOCK, 
									   Enum.Collision.Type.PLAYER, 
									   function(arbiter, space){ currentListeners.BlockListener.begin(arbiter, space); }, 
									   null, 
									   null, 
									   null);

		//Add drop zone listener callback.
		this.space.addCollisionHandler(Enum.Collision.Type.DROP_SENSOR, 
									   Enum.Collision.Type.STATIC, 
									   function(arbiter, space){ currentListeners.DropListener.begin(arbiter, space);}, 
									   null, 
									   null, 
									   function(arbiter, space){ currentListeners.DropListener.separate(arbiter, space);});
		
		//Force bodies to sleep when idle after 0.075 second.
		this.space.sleepTimeThreshold = Constants.Physic.SLEEP_TIME_THRESHOLD;
		this.space.collisionBias = 0;
		
		//Create floor and walls.
		var ground = new chipmunk.SegmentShape(this.space.staticBody,
												new chipmunk.Vect(0, 0),
												new chipmunk.Vect(this.width, 0),
												10);
		
		var leftWall = new chipmunk.SegmentShape(this.space.staticBody,
												new chipmunk.Vect(-5, 0),
												new chipmunk.Vect(0, this.height*3),
												10);
												
		var rightWall = new chipmunk.SegmentShape(this.space.staticBody,
													new chipmunk.Vect(this.width + 5, 0),
													new chipmunk.Vect(this.width, this.height*3),
													10);																
		
		//Set friction on ground.
		ground.setFriction(Constants.Physic.FRICTION);
		
		this.space.addShape(ground);
		this.space.addShape(leftWall);
		this.space.addShape(rightWall);			
			
		//Init players' bodies.
		for(var i in this.players)
			this.players[i].initBody();
			
		//Add the goal. TODO: Random between multiples goals.
		this.goal = new FloatingBall(this.width*0.5, this.goalStartPosition, this);
	}
};

Game.prototype.update = function(){

	//Get delta.
	var currentTime = new Date();
	this.dt = (currentTime - this.previousTime)*0.001;
	this.previousTime = currentTime;

	//When world's ready...
	if(this.ready)
	{
		for(var i in this.players)
			this.players[i].update();

		//Reduce to one step for better performance instead of multiple fixed time steps.
		if(this.space != null)
			this.space.step(Constants.Physic.TIME_STEP);
			
		//Update Triggers.
		for(var i in this.triggers)
			if(this.triggers[i] != null)
			{
				if(this.triggers[i].stillExists)
					this.triggers[i].update();
				else
				{
					this.triggers[i].explode();
					delete this.triggers[i];
				}
			}
			
		//Update NPCs.
		for(var i in this.npcs)
			if(this.npcs[i] != null)
			{
				if(this.npcs[i].stillExists)
					this.npcs[i].update();
				else
				{
					this.npcs[i].explode();
					delete this.npcs[i];
				}
			}
			
		//Update blocks.
		for(var i in this.blocks)
		{
			if(this.blocks[i] != null)
				if(!this.blocks[i].toBeDestroy)
					this.blocks[i].update(this.dt);
				else
				{
					this.blocks[i].explode(this.blocks[i].destroyCause);
					delete this.blocks[i];
				}
		}
		
		//Check if Overlord needs to use a spawn block.
		var overlordGotKills = false;
		var allPlayersDead = true;
		
		for(var i in this.players)
			if(this.players[i].isAlive)
			{
				allPlayersDead = false;
				break;
			}
		
		//If all players are dead, send to overlord.
		if(allPlayersDead)
		{
			for(var i in this.players)
				this.players[i].killerId = null;
			
			overlordGotKills = true;
		}
		
		//If someone is dead, but has no killer, spawn from overlord.
		if(!overlordGotKills)
			for(var i in this.players)
				if(!this.players[i].isAlive && this.players[i].killerId == null)
				{
					overlordGotKills = true;
					break;
				}
		
		if(overlordGotKills && !this.overlord.hasActiveSpawnBlock)
			this.overlord.launch(Enum.Block.Type.SPAWN);
			
		//Update DeathZones.
		for(var i in this.deathZones)
			if(this.deathZones[i] != null)
			{
				if(this.deathZones[i].stillExists)
					this.deathZones[i].update();
				else
				{
					this.deathZones[i].explode();
					delete this.deathZones[i];
					
				}
			}
				
		//Reduce winning phase timer when there's a winner.
		if(this.winner != null)
		{
			var hasSurvivors = false;
			for(var i in this.players)
			{	
				if(i != this.winner.id && this.players[i].isAlive)
					hasSurvivors = true;
			}
			
			//Stop countdown if there's no more survivor.
			if(!hasSurvivors)
				this.winningPhaseTimer = 0;
		
			if(this.winningPhaseTimer > 0)
				this.winningPhaseTimer -= this.dt;
		}
		else
		{
			//Process units.
			if(this.unitTimer <= 0)
			{
				io.sockets.in(this.id).emit(Constants.Message.PROCESS_UNITS);
				this.unitTimer = Constants.Game.UNIT_TIMER;
			}
			else
				this.unitTimer -= this.dt
		}
		
		//Winner!
		if(this.winningPhaseTimer <= 0)
			this.end();
		
		//Send data to clients.
		this.pull();
	}
};

Game.prototype.electWinner = function(winner){
	this.winner = winner;
	this.winner.hasWon = true;
};

Game.prototype.end = function(){
	var survivors = [];
	var playerCount = 0;
	
	//Count and kill survivors.
	for(var i in this.players)
	{
		playerCount++;
		
		if(i != this.winner.id)
		{
			Account.lose(this.players[i].username);
		
			if(this.players[i].isAlive)
			{
				this.players[i].die();
				survivors.push(this.players[i].toClient());
			}
		}
	}

	//Calculate new scores.
	var winnerScore = playerCount-1 + (survivors.length < 1 ? Math.floor(playerCount*0.5) : 0);
	Account.win(this.winner.username, winnerScore);
	
	var scores = {};
	
	for(var i in this.players)
	{
		if(i != this.winner.id)
			scores[this.players[i].username] = -1;
		else
			scores[this.players[i].username] = winnerScore;
	}
	
	var data = {
		winner: this.winner.toClient(),
		succeed: (survivors.length == 0),
		survivors: survivors,
		scores: scores
	};

	io.sockets.in(this.id).emit(Constants.Message.WIN, data);
	clearInterval(this.intervalId);
};

//Interrupt game to be removed.
Game.prototype.trash = function(){
	clearInterval(this.intervalId);
};

Game.prototype.push = function(inputs, id){
	this.players[id].keys = inputs;
};


Game.prototype.pull = function(){
		
	var players = [];
	
	//Players.
	for(var i in this.players)
		if(this.players[i].isAlive)
			players.push(this.players[i].toClient());
	
	//Blocks.
	var blocks = [];
	for(var i in this.blocks)
		if(this.blocks[i] != null)
			blocks.push(this.blocks[i].toClient());
		
	//Death zones.
	var deathZones = [];
	for(var i in this.deathZones)
		if(this.deathZones[i] != null)
			deathZones.push(this.deathZones[i].toClient());

	//NPCs.
	var npcs = [];
	for(var i in this.npcs)
		if(this.npcs[i] != null)
			npcs.push(this.npcs[i].toClient());
	
	//Triggers.
	var triggers = [];
	for(var i in this.triggers)
		if(this.triggers[i] != null)
			triggers.push(this.triggers[i].toClient());
	
	var data = {
		players: players,
		goal: this.goal.toClient(),
		blocks: blocks,
		deathZones: deathZones,
		npcs: npcs,
		triggers: triggers
	};
	
	//Send message to all players.
	io.sockets.in(this.id).emit(Constants.Message.PULL, data);
};

Game.prototype.launch = function(){

	var GameInstance = this;
	var updateFunc = function(){
		GameInstance.update();
	};

	//17 milliseconds = 60 FPS
	this.intervalId = setInterval(updateFunc, 17);
};