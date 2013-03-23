var World = new function() {
	this.players = new Array();
	this.blocks = new Array();
	
	this.addPlayer = function (player){
		this.players[this.players.length] = player;
	};
	
	this.addBlock = function (block){
		this.blocks[this.blocks.length] = block;
	};
};