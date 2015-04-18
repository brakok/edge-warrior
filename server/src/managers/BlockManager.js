
var BlockManager = function(game){
	this.currentGame = game;
};

BlockManager.prototype.launch = function(block){
			
	block.id = this.currentGame.blockSequence;
	this.currentGame.blockSequence++;
	
	this.currentGame.blocks.push(block);
	block.launch();
	
	//Emit the new block to all players.
	io.sockets.in(this.currentGame.id).emit(Constants.Message.NEW_BLOCK, block.toClient());
};