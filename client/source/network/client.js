//Object containing network information.
var Client = new function(){

	//Members.
	this.keys = [];
	this.enemies = [];
	this.blocks = [];
	this.player = null;
	this.currentState = GameState.PLAYING;
	this.needPush = false;
	this.goal = null;
	
	//Init keys.
	this.keys[cc.KEY.d] = false;
	this.keys[cc.KEY.a] = false;
	this.keys[cc.KEY.space] = false;
	this.keys[cc.KEY.q] = false;
	
	//Initialize the game client.
	this.init = function (layer, hud, endScreen) {
	
		this.layer = layer;
		this.hud = hud;
		this.endScreen = endScreen;
		
		this.ready = false;
		
		//Creating client and connecting to server.
		this.connect();
	};
	
	//Add elements on layer.
	this.initLayers = function(){
	
		this.layer.addChild(this.player.currentAnimation);
		
		for(var i in this.enemies)
			this.layer.addChild(this.enemies[i].currentAnimation);
				
		this.layer.addChild(this.goal.sprite);
		
		//Set first blocks to the HUD.
		this.hud.inventory.setBlocks(new Block(0,0, this.player.currentBlock, this.player.color), new Block(0,0, this.player.nextBlock, this.player.color));
		
		this.ready = true;
	};
	
	//Randomize next block and emit the command related to the current block.
	this.randomBlock = function(){
		
		//Ask player to create the next block and send the new one to the server.
		this.player.pushNextBlock();
		this.socket.emit(Message.NEXT_BLOCK, this.player.currentBlock);
	};
	
	//Update elements contained in the container.
	this.update = function (){
		
		//Update info from the server.
		if(this.ready)
		{
			this.push();
			this.pull();
		}
	};
		
	//Connect to server.
	this.connect = function(){
		this.ready = false;
		
		var socket = io.connect(Network.ADDRESS);
		
		//Init.
		socket.on(Message.INIT, function (data) {
			console.log('Initialize');				
			
			//Server positioning and giving color to player.
			Client.player = new Player(data.player.x, data.player.y, data.player.color);	

			for(var i in data.enemies)
			{
				Client.enemies.push(new Player(data.enemies[i].x,
											   data.enemies[i].y,
											   data.enemies[i].color));
			}

			socket.emit(Message.CONNECTED);
		});
		
		//Incoming enemy.
		socket.on(Message.NEW_PLAYER, function(data){
			console.log('New player...');
			
			Client.enemies.push(new Player(data.x,
										   data.y,
										   data.color));
		});
		
		socket.on(Message.LAUNCH, function(goalData){
			console.log('Launching!');
			
			//Add goal.
			Client.goal = new FloatingBall(goalData.x, goalData.y);
			
			//Add received elements to the layer (render).
			Client.initLayers();
			
			//Lower neutral by quantity of enemies.
			Client.player.changePercent(BlockType.NEUTRAL, -Percent.LOST_FOREACH_ENEMY*Client.enemies.length);
		});
		
		socket.on(Message.NEW_BLOCK, function(block){
			//Add a new block.
			Client.addNewBlock(block); 
		});
		
		socket.on(Message.DELETE_BLOCK, function(data){
			//Delete a block.
			Client.deleteBlock(data.id, data.cause);
		});
		
		//Pulling info from server.
		socket.on(Message.PULL, function (data){	
			Client.updateFromServer(data.player, data.enemies, data.blocks, data.goal);
		});
		
		//Ask for next block.
		socket.on(Message.NEXT_BLOCK, function(data){
			Client.randomBlock();
		});
		
		//Received dead people information.
		socket.on(Message.PLAYER_KILLED, function(killed){
			Client.kill(killed);
		});
		
		//Received information to build spawn block.
		socket.on(Message.SEND_BLOCK, function(blockType){
			Client.player.addNextBlock(blockType);
		});
		
		socket.on(Message.PLAYER_SPAWNED, function(remotePlayer){
			Client.spawnPlayer(remotePlayer);
		});
		
		socket.on(Message.KILL_COMMAND, function(stepReached){
			Client.changeStep(stepReached);
		});
		
		socket.on(Message.WIN, function(data){
			Client.end(data);
		});
		
		socket.on(Message.AT_GOAL, function(winner){
			Client.electWinner(winner);
		});
				
		//Once defined, preserved the socket.
		this.socket = socket;
	};
	
	this.electWinner = function(winner){
		
		if(winner.color == this.player.color)
			this.player.win();
		else
			for(var i in this.enemies)
				if(this.enemies[i].color == winner.color)
					this.enemies[i].win();
	};
	
	//End of the round. Show splash screen of victorious.
	this.end = function(data){
		this.hud._zOrder = -1000;
		this.endScreen.addWinner(data.winner, data.succeed);
	};
	
	//Used to know kill command current step.
	this.changeStep = function(stepReached){
	
		if(stepReached == StepReached.NONE)
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
	
	//Update positions from server ones.
	this.updateFromServer = function(remotePlayer, remoteEnemies, remoteBlocks, remoteGoal){
		
		//Update player.
		this.player.fromServer(remotePlayer);
		
		//Update enemies.
		for(var i in this.enemies)
			for(var j in remoteEnemies)
				if(this.enemies[i].color == remoteEnemies[j].color)
					this.enemies[i].fromServer(remoteEnemies[j]);
			
		//Update blocks.
		for(var i in remoteBlocks)
			if(this.blocks[remoteBlocks[i].id] != null)
				this.blocks[remoteBlocks[i].id].fromServer(remoteBlocks[i]);
			
		//Update goal.
		this.goal.fromServer(remoteGoal);
	};
	
	//Spawn player.
	this.spawnPlayer = function(remotePlayer){
		
		if(remotePlayer.color == this.player.color)
			this.player.spawn(remotePlayer.x, remotePlayer.y);
		else
			for(var i in this.enemies)
				if(this.enemies[i].color == remotePlayer.color)
					this.enemies[i].spawn(remotePlayer.x, remotePlayer.y);
	};
	
	//Add a new block from the server.
	this.addNewBlock = function(remoteBlock){
		this.blocks[remoteBlock.id] = new Block(remoteBlock.x, remoteBlock.y, remoteBlock.type, remoteBlock.color);
		this.layer.addChild(this.blocks[remoteBlock.id].sprite);
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
		this.socket.emit(Message.PUSH, inputs);
		this.needPush = false;
	};
	
	//Pulling info from server.
	this.pull = function(){
		this.socket.emit(Message.PULL);
	};
};