//Game container server-side.
var Game = {
	id: 1,
	players: [],
	blocks: [],
	blockSequence: 0,
	goal: null,
	intervalId: null,
	winner: null,
	winningPhaseTimer: WinningGoal.TIMER,
	spawnX: 100,
	spawnY: 100,
	width: 1200,
	height: 800,
	connectedPlayers: 0,
	connectingPlayers:0,
	maxPlayers: 2,
	keys: [],
	state: false,
	space: null,
	createWorld: function() {
	
		if(this.space == null || this.space == 'undefined')
		{
			this.space = new chipmunk.Space();
			this.space.gravity = new chipmunk.Vect(0, PhysicConstants.GRAVITY);
			
			//Add goal listener.
			this.space.addCollisionHandler(CollisionType.WINNING_GOAL, 
										   CollisionType.PLAYER, 
										   function(arbiter, space){ GoalListener.begin(arbiter, space);}, 
										   null, 
										   null, 
										   null);
			
			//Add ground sensor callback.
			this.space.addCollisionHandler(CollisionType.GROUND_SENSOR, 
										   CollisionType.STATIC, 
										   function(arbiter, space){ GroundListener.begin(arbiter, space);}, 
										   null, 
										   null, 
										   function(arbiter, space){GroundListener.separate(arbiter, space);});
						
			//Add block listener callback.
			this.space.addCollisionHandler(CollisionType.BLOCK, 
										   CollisionType.STATIC, 
										   function(arbiter, space){ BlockListener.begin(arbiter, space);}, 
										   null, 
										   null, 
										   function(arbiter, space){BlockListener.separate(arbiter, space);});
			this.space.addCollisionHandler(CollisionType.BLOCK, 
										   CollisionType.BLOCK, 
										   function(arbiter, space){ BlockListener.begin(arbiter, space); }, 
										   null, 
										   null, 
										   function(arbiter, space){BlockListener.separate(arbiter, space);});
			this.space.addCollisionHandler(CollisionType.BLOCK, 
										   CollisionType.PLAYER, 
										   function(arbiter, space){ BlockListener.begin(arbiter, space); }, 
										   null, 
										   null, 
										   function(arbiter, space){BlockListener.separate(arbiter, space);});

			//Add drop zone listener callback.
			this.space.addCollisionHandler(CollisionType.DROP_SENSOR, 
										   CollisionType.STATIC, 
										   function(arbiter, space){ DropListener.begin(arbiter, space);}, 
										   null, 
										   null, 
										   function(arbiter, space){DropListener.separate(arbiter, space);});
			
			//Force bodies to sleep when idle after 0.2 second.
			this.space.sleepTimeThreshold = 0.2;
			this.space.collisionBias = 0;
			
			//Create floor and walls.
			var ground = new chipmunk.SegmentShape(this.space.staticBody,
													new chipmunk.Vect(0, 0),
													new chipmunk.Vect(this.width, 0),
													10);
			
			var leftWall = new chipmunk.SegmentShape(this.space.staticBody,
													new chipmunk.Vect(0, 0),
													new chipmunk.Vect(0, this.height*3),
													1);
													
			var rightWall = new chipmunk.SegmentShape(this.space.staticBody,
														new chipmunk.Vect(this.width, 0),
														new chipmunk.Vect(this.width, this.height*3),
														1);																
			
			//Set friction on ground.
			ground.setFriction(PhysicConstants.FRICTION);
			
			this.space.addShape(ground);
			this.space.addShape(leftWall);
			this.space.addShape(rightWall);			
				
			//Init players' bodies.
			for(var i in this.players)
				this.players[i].initBody();
				
			//Add the goal. TODO: Random between multiples goals.
			this.goal = new FloatingBall(this.width*0.5, this.height - WinningGoal.OFFSET_Y);
		}
	},
	update: function() {
		//When world's ready...
		if(this.ready)
		{	
			for(var i in this.players)
				this.players[i].update();

			if(this.space != null)
				this.space.step(PhysicConstants.TIME_STEP);
				
			for(var i in this.blocks)
			{
				if(this.blocks[i] != null)
					this.blocks[i].update();
			}
			
			if(Overlord.killedList != null && !Overlord.hasActiveSpawnBlock)
				Overlord.launch(BlockType.SPAWN);
				
			//Reduce winning phase timer when there's a winner.
			if(this.winner != null)
			{
				if(this.winningPhaseTimer > 0)
					this.winningPhaseTimer -= PhysicConstants.TIME_STEP*0.5;
			}
			
			//Winner!
			if(this.winningPhaseTimer <= 0)
			{
				var survivors = 0;
			
				//Count and kill survivors.
				for(var i in this.players)
				{
					if(this.players[i].isAlive && i != this.winner.id)
					{
						this.players[i].die();
						survivors++;
					}
				}
				
				var data = {
					winner: this.winner.toClient(),
					succeed: (survivors == 0)
				};
				
				io.sockets.in(this.id).emit(Message.WIN, data);
				clearInterval(this.intervalId);
			}
		}
	},
	push: function(inputs, id){
		this.players[id].keys = inputs;
	},
	pull: function(id){
		
		var enemies = [];
		
		for(var i in this.players)
		{
			if(i != id && this.players[i].isAlive)
				enemies.push(this.players[i].toClient());
		}
		
		var blocks = [];
		for(var i in this.blocks)
		{
			if(this.blocks[i] != null)
				blocks.push(this.blocks[i].toClient());
		}
		
		return {
			player: this.players[id].toClient(),
			enemies: enemies,
			goal: this.goal.toClient(),
			blocks: blocks
		};
	},
	launch: function(){
		//17 milliseconds = 60 FPS
		this.intervalId = setInterval(function(){Game.update()}, 8);
	}
};