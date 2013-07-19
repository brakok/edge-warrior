//Object containing network information.
var Client = new function(){

	//Members.
	this.keys = [];
	this.enemies = [];
	this.blocks = [];
	this.deathZones = {};
	
	this.player = null;
	this.currentState = Enum.Game.State.PLAYING;
	this.currentPhase = Enum.Game.Phase.PLAYING;
	
	this.needPush = false;
	this.goal = null;
	
	//Init keys.
	this.keys[cc.KEY.d] = false;
	this.keys[cc.KEY.a] = false;
	this.keys[cc.KEY.space] = false;
	this.keys[cc.KEY.q] = false;
	
	//This private variable is used in private function instead of 'this' to access public members in private stuff.
	var that = this;
	
	//Get right player for specified color.
	var getPlayer = function(color){
	
		if(that.player.color == color)
			return that.player;
		else
			for(var i in that.enemies)
				if(that.enemies[i].color == color)
					return that.enemies[i];
					
		return null;
	};
	
	//Initialize the game client. Get window information.
	this.init = function (width, height, layer, hud, endScreen) {
	
		this.width = width;
		this.height = height;
	
		this.layer = layer;
		this.hud = hud;
		this.endScreen = endScreen;
		
		this.ready = false;
		
		//Creating client and connecting to server.
		this.connect();
	};
	
	//Add elements on layer. Retrieve map width and map height from server.
	this.createWorld = function(mapWidth, mapHeight){
	
		this.mapSize = {
			width: mapWidth,
			height: mapHeight
		};
		
		//Create camera.
		this.camera = new Camera(this.width*0.5-(this.width*0.5-this.mapSize.width*0.5), 
								 this.height*0.5, 
								 this.width, 
								 this.height, 
								 this.width*0.9, 
								 this.height*0.9, 
								 1,
								 Constants.Camera.SPEED_X,
								 Constants.Camera.SPEED_Y,
								 Constants.Camera.SPEED_ZOOM);
		
		//Create walls and floor.
		this.floor = new Floor(this.mapSize.width*0.5, -40, this.mapSize.width, false, Enum.Wall.Type.PIT);
		this.leftWall = new Wall(Enum.Direction.RIGHT, -50, this.mapSize.height + 10, this.mapSize.height*2, true, Enum.Wall.Type.PIT);
		this.rightWall = new Wall(Enum.Direction.LEFT, this.mapSize.width + 50, this.mapSize.height + 10, this.mapSize.height*2, true, Enum.Wall.Type.PIT);

		//Black boxes are used to hide spikes when they raise from the ground.	
		this.blackBoxes = [];
		this.blackBoxes.push(new BlackBox(-this.mapSize.width*0.5-Constants.World.OFFSET, this.mapSize.height*0.5, this.mapSize.width, this.mapSize.height*3));
		this.blackBoxes.push(new BlackBox(this.mapSize.width*0.5, -this.mapSize.height*0.5, this.mapSize.width*3, this.mapSize.height));
		this.blackBoxes.push(new BlackBox(this.mapSize.width*1.5+Constants.World.OFFSET, this.mapSize.height*0.5, this.mapSize.width, this.mapSize.height*3));
		
		//Add background.
		this.background = new Background(this.mapSize.width*0.5, this.mapSize.height*0.5, this.mapSize.width, this.mapSize.height, Enum.World.Type.PIT);
		
		//Add walls to layer.
		this.leftWall.init();
		this.rightWall.init();
		this.floor.init();
		this.background.init();
	
		//Init dynamic elements.
		this.player.init();
		
		for(var i in this.enemies)
			this.enemies[i].init();
				
		this.goal.init();

		//Set first blocks to the HUD.
		this.hud.inventory.setBlocks(new Block(0,0, this.player.currentBlock, this.player.color), 
									 new Block(0,0, this.player.nextBlock, this.player.color));
		
		this.ready = true;
	};
	
	//Randomize next block and emit the command related to the current block.
	this.randomBlock = function(){
		
		//Ask player to create the next block and send the new one to the server.
		this.player.pushNextBlock();
		this.socket.emit(Constants.Message.NEXT_BLOCK, this.player.currentBlock);
	};
	
	//Update elements contained in the container.
	this.update = function (dt){
		
		//Update info from the server.
		if(this.ready)
		{
			//Send 
			this.push();
			
			this.hud.update(dt);
			
			//Position camera.
			this.moveCamera();
			this.camera.update();
			
			//Project static objects.
			this.projectWorld();
			
			//Update dynamic objects.
			this.player.update();
			
			for(var i in this.enemies)
				this.enemies[i].update();

			for(var i in this.blocks)
				this.blocks[i].update(dt);
			
			for(var i in this.deathZones)
				this.deathZones[i].update(dt);
				
			for(var i in this.blackBoxes)
				this.blackBoxes[i].update();
				
			this.goal.update();
			
			//Update all effects.
			EffectManager.update();
		}
	};
		
	//Connect to server.
	this.connect = function(){
		
		var socket = io.connect(Constants.Network.ADDRESS);
		
		//Init.
		socket.on(Constants.Message.INIT, function (data) {
			console.log('Initialize');				
			
			//Server positioning and giving color to player.
			Client.player = new Player(data.player.x, data.player.y, data.player.color);	

			for(var i in data.enemies)
			{
				Client.enemies.push(new Player(data.enemies[i].x,
											   data.enemies[i].y,
											   data.enemies[i].color));
			}

			socket.emit(Constants.Message.CONNECTED);
		});
		
		//Incoming enemy.
		socket.on(Constants.Message.NEW_PLAYER, function(data){
			console.log('New player...');
			
			Client.enemies.push(new Player(data.x,
										   data.y,
										   data.color));
		});
		
		socket.on(Constants.Message.LAUNCH, function(data){
			console.log('Launching!');
			
			//Add goal.
			switch(data.goal.type)
			{
				case Enum.WinningGoal.Type.FLOATING_BALL:
					Client.goal = new FloatingBall(data.goal.x, data.goal.y);
					break;
			}
			
			//Add received elements to the layer (render).
			Client.createWorld(data.width, data.height);
			
			//Lower neutral by quantity of enemies.
			Client.player.changePercent(Enum.Block.Type.NEUTRAL, -Constants.Block.Percent.LOST_FOREACH_ENEMY*Client.enemies.length);
		});
		
		socket.on(Constants.Message.NEW_BLOCK, function(block){
			//Add a new block.
			Client.addBlock(block); 
		});
		
		socket.on(Constants.Message.DELETE_BLOCK, function(data){
			//Delete a block.
			Client.deleteBlock(data.id, data.cause);
		});
		
		//Pulling info from server.
		socket.on(Constants.Message.PULL, function (data){	
			Client.updateFromServer(data.players, data.blocks, data.goal, data.deathZones);
		});
		
		//Ask for next block.
		socket.on(Constants.Message.NEXT_BLOCK, function(data){
			Client.randomBlock();
		});
		
		//Received dead people information.
		socket.on(Constants.Message.PLAYER_KILLED, function(killed){
			Client.kill(killed);
		});
		
		//Received information to build spawn block.
		socket.on(Constants.Message.SEND_BLOCK, function(blockType){
			Client.player.addNextBlock(blockType);
		});
		
		//Spawn player.
		socket.on(Constants.Message.PLAYER_SPAWNED, function(remotePlayer){
			Client.spawnPlayer(remotePlayer);
		});
		
		//Indicate at which step user is currently.
		socket.on(Constants.Message.KILL_COMMAND, function(stepReached){
			Client.changeStep(stepReached);
		});
		
		//On victory of any player.
		socket.on(Constants.Message.WIN, function(data){
			Client.end(data);
		});
		
		//Execute new action (goal).
		socket.on(Constants.Message.GOAL_ACTION, function(actionType){
			Client.goal.execute(actionType);
		});
		
		//Execute new action (player).
		socket.on(Constants.Message.PLAYER_ACTION, function(data){
			
			//Redirect action to right player.
			Client.redirectAction(data);
		});
		
		//When a player touches the goal.
		socket.on(Constants.Message.AT_GOAL, function(winner){
			Client.electWinner(winner);
		});
		
		//Delete a death zone.
		socket.on(Constants.Message.DELETE_DEATHZONE, function(data){
			Client.deleteDeathZone(data.id);
		});
		
		//Add a death zone.
		socket.on(Constants.Message.NEW_DEATHZONE, function(data){
			Client.addDeathZone(data);
		});
		
		//Execute new action for a specified block.
		socket.on(Constants.Message.BLOCK_ACTION, function(data){
			Client.blocks[data.id].execute(data.action);
		});
		
		//Once defined, preserved the socket.
		this.socket = socket;
	};
	
	//Redirect action to right player.
	this.redirectAction = function(data){
		
		var player = getPlayer(data.playerColor);
		player.execute(data.action);
	};
	
	//Set the new location and zoom of camera to catch all players.
	this.moveCamera = function(){
		
		var minX = this.player.x;
		var maxX = this.player.x;
		var minY = this.player.y;
		var maxY = this.player.y;
		
		var containedObjects = [];
		
		if(this.player.isAlive && !this.player.hasWon)
			containedObjects.push(this.player);
		
		for(var i in this.enemies)
			if(this.enemies[i].isAlive && !this.enemies[i].hasWon)
				containedObjects.push(this.enemies[i]);
				
		for(var i in this.blocks)
			if(this.blocks[i].type == Enum.Block.Type.SPAWN)
				containedObjects.push(this.blocks[i]);
			
		if(this.currentPhase == Enum.Game.Phase.WINNER)
			containedObjects.push(this.goal);
		
		//Get extremities.
		for(var i in containedObjects)
		{		
			if(containedObjects[i].x < minX)
				minX = containedObjects[i].x;
			if(containedObjects[i].x > maxX)
				maxX = containedObjects[i].x;
			if(containedObjects[i].y < minY)
				minY = containedObjects[i].y;
			if(containedObjects[i].y > maxY)
				maxY = containedObjects[i].y;
		}
		
		this.camera.lookAt((maxX + minX)*0.5, ((maxY + minY)*0.5)+Constants.Camera.HIGHER);		
		
		var maxDistanceX = maxX - minX;
		var maxDistanceY = maxY - minY;
		
		//Get ratio between viewport and distance of players.
		var ratioX = (maxDistanceX*Constants.Camera.CONTAINER_FACTOR_X)/this.camera.viewport.width;
		var ratioY = (maxDistanceY*Constants.Camera.CONTAINER_FACTOR_Y)/this.camera.viewport.height;
		
		//Get highest ratio.
		var zoomRatio = (ratioX > ratioY ? ratioX : ratioY);

		if(zoomRatio < 1)
			this.camera.targetedZoom = 1;
		else
			this.camera.targetedZoom = 1/zoomRatio;
	};
	
	//Trigger when someone touched the goal.
	this.electWinner = function(winner){
		
		var player = getPlayer(winner.color);
		player.win();
		
		this.currentPhase = Enum.Game.Phase.WINNER;
		this.goal.activate();
	};
	
	//End of the round. Show splash screen of victorious.
	this.end = function(data){
		this.hud._zOrder = Constants.HUD.ENDSCREEN_Z_INDEX;
		this.endScreen.addWinner(data.winner, data.succeed);
	};
	
	//Used to know kill command current step.
	this.changeStep = function(stepReached){
	
		if(stepReached == Enum.StepReached.NONE)
			this.hud.killCommand.reset();
		else
			this.hud.killCommand.start(stepReached);
	};
	
	//Kill a player and remove it from the layer.
	this.kill = function(killed){
		
		if(killed.color == this.player.color)
		{
			this.hud.killCommand.reset();
			this.player.die();
		}
		else
			for(var i in this.enemies)
				if(this.enemies[i].color == killed.color)
					this.enemies[i].die();
	};
			
	//Project walls and floor.
	this.projectWorld = function(){
	
		this.floor.update();
		this.leftWall.update();
		this.rightWall.update();
		this.background.update();
	};
	
	//Update positions from server ones.
	this.updateFromServer = function(remotePlayers, remoteBlocks, remoteGoal, remoteDeathZones){
		
		//Update players.
		for(var i in remotePlayers)
			getPlayer(remotePlayers[i].color).fromServer(remotePlayers[i]);
					
		//Update blocks.
		for(var i in remoteBlocks)
			if(this.blocks[remoteBlocks[i].id] != null)
				this.blocks[remoteBlocks[i].id].fromServer(remoteBlocks[i]);
			
		//Update missiles.
		for(var i in remoteDeathZones)
			if(this.deathZones[remoteDeathZones[i].id] != null)
				this.deathZones[remoteDeathZones[i].id].fromServer(remoteDeathZones[i]);							
			
		//Update goal.
		this.goal.fromServer(remoteGoal);
	};
	
	//Spawn player.
	this.spawnPlayer = function(remotePlayer){
		
		var player = getPlayer(remotePlayer.color);
		player.spawn(remotePlayer.x, remotePlayer.y);
	};
	
	//Add a new block from the server.
	this.addBlock = function(remoteBlock){
		this.blocks[remoteBlock.id] = new Block(remoteBlock.x, remoteBlock.y, remoteBlock.type, remoteBlock.color);
		this.blocks[remoteBlock.id].init();
	};
	
	//Add a new missile from the server.
	this.addDeathZone = function(remoteDeathZone){	
		
		var deathZone = null;

		switch(remoteDeathZone.type)
		{
			case Enum.DeathZone.Type.RAYBALL:
				deathZone = new Missile(remoteDeathZone.x, remoteDeathZone.y, remoteDeathZone.type);
				break;
			case Enum.DeathZone.Type.ENERGY_SPIKE:
				deathZone = new Spike(remoteDeathZone.x, remoteDeathZone.y, remoteDeathZone.type, remoteDeathZone.finalX, remoteDeathZone.finalY);
				break;
		}
		
		this.goal.swapAnimation(Enum.Anim.Type.GOAL_ACTION);
		this.deathZones[remoteDeathZone.id] = deathZone;
	};
	
	//Delete a missile.
	this.deleteDeathZone = function(remoteDeathZoneId){
	
		if(this.deathZones[remoteDeathZoneId] != null)
		{
			this.deathZones[remoteDeathZoneId].explode();
			delete this.deathZones[remoteDeathZoneId];
		}
	};
	
	//Delete a block.
	this.deleteBlock = function(remoteBlockId, cause){
	
		if(this.blocks[remoteBlockId] != null)
		{
			this.blocks[remoteBlockId].explode(cause);
			delete this.blocks[remoteBlockId];
		}
	};
	
	//Pushing info to server.
	this.push = function(){
		
		var inputs = {
			right: this.keys[cc.KEY.d],
			left: this.keys[cc.KEY.a],
			jump: this.keys[cc.KEY.space],
			kill: this.keys[cc.KEY.q]
		};
	
		//Send key pressed to server.
		this.socket.emit(Constants.Message.PUSH, inputs);
		this.needPush = false;
	};
	
	//Pulling info from server.
	this.pull = function(){
		this.socket.emit(Constants.Message.PULL);
	};
	
	
};