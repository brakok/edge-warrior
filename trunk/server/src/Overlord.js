
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
		otherPlayers[killerIndex].kill(killed, BlockType.NEUTRAL);
		
		if(tmpKilledList != null)
		{
			otherPlayers[killerIndex].killedList = [];
			otherPlayers[killerIndex].killedList.push(killed.id);
			
			killed.killedList = tmpKilledList;
		}
	},
	kill: function(killed){
		
		//Spawn block falls from the sky.
		if(!this.hasActiveSpawnBlock)
		{
			var spawnY = Game.height + 100;
			var spawnX = BlockConstants.WIDTH*0.5 + (Math.random()*(Game.width-BlockConstants.WIDTH));
			
			//Create a block and launch it.
			var block = new Block(Game.blockSequence, 
								  spawnX, 
								  spawnY, 
								  BlockType.SPAWN, 
								  null,
								  null);
			
			Game.blocks.push(block);
			block.launch();
			
			Game.blockSequence++;	
			io.sockets.in(Game.id).emit(Message.NEW_BLOCK, block.toClient());
		}
		
		if(this.killedList == null)
			this.killedList = [];
		
		//Assign killed id to list.
		this.killedList.push(killed.id);
		
		//Force player to die.
		killed.die();
	}
};