
var Overlord = {
	hasActiveSpawnBlock: false,
	assignKill: function(killed, keepList){
	
		var otherPlayers = [];
		for(var i in Game.players)
		{
			if(Game.players[i].id != killed.id && Game.players[i].isAlive)
				otherPlayers.push(Game.players[i]);
		}
		
		if(otherPlayers.length == 0)
		{		
			this.kill(killed, null);
			return;
		}
		
		var killerIndex = (otherPlayers.length == 1 ? 0 : Math.round((Math.random()*(otherPlayers.length-1))-0.5));
				
		//Assign the kill.
		otherPlayers[killerIndex].kill(killed, Enum.Block.Type.NEUTRAL, (keepList == null || !keepList));
	},
	launch: function(blockType){
		
		if(blockType == Enum.Block.Type.SPAWN)
		{
			//Spawn block falls from the sky.
			if(!this.hasActiveSpawnBlock)
			{
				var spawnY = Game.height + 100;
				var spawnX = Constants.Block.WIDTH*0.5 + (Math.random()*(Game.width-Constants.Block.WIDTH));
				
				//Create a block and launch it.
				var block = new Block(Game.blockSequence, 
									  spawnX, 
									  spawnY, 
									  Enum.Block.Type.SPAWN, 
									  null,
									  null);
				
				Game.blocks.push(block);
				block.launch();
				
				Game.blockSequence++;	
				io.sockets.in(Game.id).emit(Constants.Message.NEW_BLOCK, block.toClient());
				
				this.hasActiveSpawnBlock = true;
			}
		}
	},
	kill: function(killed, cause){
		
		//Steal killed's list.
		for(var i in Game.players)
			if(Game.players[i].killerId == killed.id)
				Game.players[i].killerId = null;
		
		//Force player to die.
		killed.toBeDestroy = true;
	}
};