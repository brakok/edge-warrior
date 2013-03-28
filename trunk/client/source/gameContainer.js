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

//Object containing all game related objects (in this case, blocks and players).
var GameContainer = new function() {
	
	//Members.
	this.keys = new Array();
	this.players = new Array();
	this.blocks = new Array();
	this.you = null;
	this.currentState = GameState.PLAYING;
	
	//Initialize the Game container.
	this.init = function (layer) {
		
		this.layer = layer;
		this.ready = false;
		
		//Creating client and connecting to server.
		this.client = new Client();
		this.client.connect();
				
		this.addBlock(new Block(100, 100, Color.RED));
	};
	
	this.initLayer = function(){
		this.layer.addChild(GameContainer.blocks[0].sprite);
		this.layer.addChild(GameContainer.you.currentAnimation);
		this.layer.addChild(GameContainer.players[0].currentAnimation);
		
		this.ready = true;
	};
	
	this.addPlayer = function (player){
		this.players.push(player);
	};
	
	this.addBlock = function (block){
		this.blocks.push(block);
	};
	
	//Update elements contained in the container.
	this.update = function (){

		if(this.you != null && this.you != 'undefined')
			this.you.update();
		
		//Update info from the server.
		if(this.ready)
		{
			this.client.push();
			this.client.pull();
		}

		for(var i in this.players)
		{
			//TODO: Update from server.
			//this.players[i].update();
		}
	};
};