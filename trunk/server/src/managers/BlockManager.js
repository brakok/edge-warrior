
var BlockManager = function(game){
	this.currentGame = game;
};

BlockManager.prototype.launch = function(block){
			
	this.currentGame.blocks.push(block);
	block.launch();
	
	this.currentGame.blockSequence++;		
	
	//Emit the new block to all players.
	io.sockets.in(this.currentGame.id).emit(Constants.Message.NEW_BLOCK, block.toClient());
};