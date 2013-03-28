//Possible game states.
var GameState = {
	PLAYING: 0
};

//Enum of possible colors.
var Color = {
	RED: 'red',
	BLUE: 'blue',
	YELLOW: 'yellow',
	WHITE: 'white',
	GREEN: 'green',
	PURPLE: 'purple',
	ORANGE: 'orange',
	BLACK: 'black'
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
	
	//Initialize the game client.
	this.init = function (layer) {
	
		this.layer = layer;
		this.ready = false;
		
		//Creating client and connecting to server.
		this.connect();
	};
	
	this.initLayer = function(){
	
		this.layer.addChild(this.player.currentAnimation);
		
		for(var i in this.enemies)
		{
			console.log(this.enemies[i].currentAnimation);
			this.layer.addChild(this.enemies[i].currentAnimation);
		}
		
		this.ready = true;
	};
	
	//Update elements contained in the container.
	this.update = function (){

		if(this.player != null && this.player != 'undefined')
			this.player.update();
		
		//Update info from the server.
		if(this.ready)
		{
			if(this.needPush)
				this.push();
			
			this.pull();
		}

		for(var i in this.enemies)
		{
			//TODO: Update from server.
			//this.players[i].update();
		}
	};
		
	//Connect to server.
	this.connect = function(){
		this.ready = false;
		
		var socket = io.connect('http://localhost:80');
		socket.parent = this;
		
		//Init.
		socket.on('init', function (data) {
			console.log('Receiving initiation data...');				
				
			console.log(data);
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
			//Client.updateFromServer(data.player, data.enemies);
		});
		
		//Once defined, preserved the socket.
		this.socket = socket;
	};
	
	//Update positions from server ones.
	this.updateFromServer = function(player, enemies){
		this.player.fromServer(player);
		
		for(var i in this.enemies)
		{
			for(var i in enemies)
			{
				if(this.enemies[i].color == enemies[i].color)
				{
					this.enemies[i].fromServer(enemies);
				}
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

