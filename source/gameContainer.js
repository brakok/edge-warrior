
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
	
	this.keys = new Array();
	this.players = new Array();
	this.blocks = new Array();

	this.addPlayer = function (player){
		this.players.push(player);
	};
	
	this.addBlock = function (block){
		this.blocks.push(block);
	};
	
	//Update elements contained in the container.
	this.update = function (){

		for(var i in this.players)
		{
			this.players[i].update();
		}
	};
	
	//Initialize the Game container.
	this.init = function (layer) {
		
		this.currentState = GameState.PLAYING;
	
		this.addPlayer(new Player(200,200, Color.RED));
		this.addBlock(new Block(100, 100, Color.RED));
		
		layer.addChild(GameContainer.blocks[0].sprite);
		layer.addChild(GameContainer.players[0].runningCycle);
	};
};