
var BlockManager = {
	launch: function(block){
			
		Game.blocks.push(block);
		block.launch();
		
		Game.blockSequence++;		
		
		//Emit the new block to all players.
		io.sockets.in(Game.id).emit(Constants.Message.NEW_BLOCK, block.toClient());
	}
};