
var Overlord = {
	hasActiveSpawnBlock: false,
	killedList: null,
	assignKill: function(killed){
		var killerIndex = Math.round((Math.random()*(Game.connectedPlayers-1))-0.5);
		var otherPlayers = [];
		
		for(var i in Game.players)
		{
			if(Game.players[i].id != killed.id)
				otherPlayers.push(Game.players[i]);
		}
		
		//Keep track of killed victims.
		var tmpKilledList = (!otherPlayers[killerIndex].isAlive ? killed.killedList : null);
		
		//Assign the kill.
		otherPlayers[killerIndex].kill(killed, Enum.Block.Type.NEUTRAL);
		
		if(tmpKilledList != null)
		{
			otherPlayers[killerIndex].killedList = [];
			otherPlayers[killerIndex].killedList.push(killed.id);
			
			killed.killedList = tmpKilledList;
		}
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
		
		if(this.killedList == null)
			this.killedList = [];
		
		//Assign killed id to list.
		this.killedList.push(killed.id);
		
		//Steal killed's list.
		if(killed.killedList != null)
		{
			for(var i in killed.killedList)
				this.killedList.push(killed.killedList[i]);
				
			killed.killedList = null;
		}
		
		//Force player to die.
		killed.toBeDestroy = true;
	}
};