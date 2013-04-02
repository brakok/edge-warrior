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
	PURPLE: 5,
	ORANGE: 6,
	BLACK: 7
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
	this.init = function (layer) {
	
		this.layer = layer;
		this.ready = false;
		
		//Creating client and connecting to server.
		this.connect();
	};
	
	//Add elements on layer.
	this.initLayer = function(){
	
		this.layer.addChild(this.player.currentAnimation);
		
		for(var i in this.enemies)
			this.layer.addChild(this.enemies[i].currentAnimation);
				
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
			Client.initLayer();
		});
		
		//Pulling info from server.
		socket.on('pull', function (data){	
			Client.updateFromServer(data.player, data.enemies, data.blocks);
		});
		
		socket.on('nextBlock', function(data){
			Client.randomBlock();
		});
				
		//Once defined, preserved the socket.
		this.socket = socket;
	};
	
	//Update positions from server ones.
	this.updateFromServer = function(remotePlayer, remoteEnemies, remoteBlocks){
		this.player.fromServer(remotePlayer);
		
		for(var i in this.enemies)
			for(var j in remoteEnemies)
				if(this.enemies[i].color == remoteEnemies[j].color)
					this.enemies[i].fromServer(remoteEnemies[j]);
			
		for(var i in remoteBlocks)
		{
			if(this.blocks[remoteBlocks[i].id] != null)
				this.blocks[remoteBlocks[i].id].fromServer(remoteBlocks[i]);
			else
			{
				this.blocks[remoteBlocks[i].id] = new Block(remoteBlocks[i].x, remoteBlocks[i].y, remoteBlocks[i].type, remoteBlocks[i].color);
				this.layer.addChild(this.blocks[remoteBlocks[i].id].sprite);
			}
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