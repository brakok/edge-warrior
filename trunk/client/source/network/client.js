//Possible game states.
var GameState = {
	PLAYING: 0
};

//Enum of possible colors.
var Color = {
	RED: 0,
	BLUE: 1,
	YELLOW: 2,
	WHITE: 3,
	GREEN: 4,
	ORANGE: 5,
	PURPLE: 6,
	BLACK: 7
};

var BlockDestructionType = {
	COLOR_CONTACT: 0
};

var BlockType = {
	NEUTRAL: 0,
	COLORED: 1,
	SPAWN: 2,
	SKILLED: 3
};

//Object containing network information.
var Client = new function(){

	//Members.
	this.keys = [];
	this.enemies = [];
	this.blocks = [];
	this.player = null;
	this.currentState = GameState.PLAYING;
	this.needPush = false;
	
	//Init keys.
	this.keys[cc.KEY.d] = false;
	this.keys[cc.KEY.a] = false;
	this.keys[cc.KEY.space] = false;
	
	this.blockTypeAvailable = [];
	this.blockTypeAvailable[0] = new BlockOption(BlockType.COLORED, 25, 100);
	
	//Initialize the game client.
	this.init = function (layer, hud) {
	
		this.layer = layer;
		this.hud = hud;
		
		this.ready = false;
		
		//Creating client and connecting to server.
		this.connect();
	};
	
	//Add elements on layer.
	this.initLayers = function(){
	
		this.layer.addChild(this.player.currentAnimation);
		
		for(var i in this.enemies)
			this.layer.addChild(this.enemies[i].currentAnimation);
				
		//Set first blocks to the HUD.
		this.hud.setBlocks(new Block(0,0, this.player.currentBlock, this.player.color), new Block(0,0, this.player.nextBlock, this.player.color));
		
		this.ready = true;
	};
	
	//Randomize next block and emit the command related to the current block.
	this.randomBlock = function(){
		
		this.player.currentBlock = this.player.nextBlock;
		
		var rnd = Math.round(Math.random()*100);
		var found = false;
		
		//Loop through block types available to the player to initiate next command.
		for(var i in this.blockTypeAvailable)
		{
			if(rnd >= this.blockTypeAvailable[i].min && this.blockTypeAvailable[i].max >= rnd)
			{
				this.player.nextBlock = this.blockTypeAvailable[i].type;
				found = true;
			}
		}
		
		//Neutral if not found.
		if(!found)
			this.player.nextBlock = BlockType.NEUTRAL;

		this.hud.pushBlock(new Block(0,0,this.player.nextBlock, this.player.color));
		this.socket.emit('nextBlock', this.player.currentBlock);
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
		
		var socket = io.connect('http://localhost:80');
		
		//Init.
		socket.on('init', function (data) {
			console.log('Initialize');				
			
			//Server positioning and giving color to player.
			Client.player = new Player(data.player.x, data.player.y, data.player.color);	

			for(var i in data.enemies)
			{
				Client.enemies.push(new Player(data.enemies[i].x,
											   data.enemies[i].y,
											   data.enemies[i].color));
			}

			socket.emit('connected');
		});
		
		//Incoming enemy.
		socket.on('newPlayer', function(data){
			console.log('New player...');
			
			Client.enemies.push(new Player(data.x,
										   data.y,
										   data.color));
		});
		
		socket.on('launch', function(){
			console.log('Launching!');
			//Add received elements to the layer (render).
			Client.initLayers();
		});
		
		socket.on('newBlock', function(block){
			//Add a new block.
			Client.addNewBlock(block); 
		});
		
		socket.on('deleteBlock', function(data){
			//Delete a block.
			Client.deleteBlock(data.id, data.cause);
		});
		
		//Pulling info from server.
		socket.on('pull', function (data){	
			Client.updateFromServer(data.player, data.enemies, data.blocks);
		});
		
		//Ask for next block.
		socket.on('nextBlock', function(data){
			Client.randomBlock();
		});
		
		//Received dead people information.
		socket.on('playerKilled', function(killed){
			Client.kill(killed);
		});
		
		//Received information to build spawn block.
		socket.on('spawnBlock', function(killed){
		
		});
				
		//Once defined, preserved the socket.
		this.socket = socket;
	};
	
	//Kill a player and remove it from the layer.
	this.kill = function(killed){
	
		var playerKilled = null;
		
		if(killed.color == this.player.color)
			playerKilled = this.player;
		else
			for(var i in this.enemies)
				if(this.enemies[i].color == killed.color)
					playerKilled = this.enemies[i];
		
		this.layer.removeChild(playerKilled.currentAnimation);
	};
	
	//Update positions from server ones.
	this.updateFromServer = function(remotePlayer, remoteEnemies, remoteBlocks){
		
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
			this.blocks[remoteBlockId] = null;
		}
	};
	
	//Pushing info to server.
	this.push = function(){
		
		var inputs = {
			right: this.keys[cc.KEY.d],
			left: this.keys[cc.KEY.a],
			jump: this.keys[cc.KEY.space]
		};
	
		//Send key pressed to server.
		this.socket.emit('push', inputs);
		this.needPush = false;
	};
	
	//Pulling info from server.
	this.pull = function(){
		this.socket.emit('pull');
	};
};