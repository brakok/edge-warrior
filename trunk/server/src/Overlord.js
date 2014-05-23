
var Overlord = function(game){
	this.currentGame = game;
	this.hasActiveSpawnBlock = false;
};

Overlord.prototype.assignKill = function(killed, keepList){
	
	var otherPlayers = [];
	for(var i in this.currentGame.players)
	{
		if(this.currentGame.players[i].id != killed.id && this.currentGame.players[i].isAlive)
			otherPlayers.push(this.currentGame.players[i]);
	}
	
	if(otherPlayers.length == 0)
	{		
		this.kill(killed, null);
		return;
	}
	
	var killerIndex = (otherPlayers.length == 1 ? 0 : Math.round((Math.random()*(otherPlayers.length-1))-0.5));
			
	//Assign the kill.
	otherPlayers[killerIndex].kill(killed, Enum.Block.Type.NEUTRAL, (keepList == null || !keepList));
};

Overlord.prototype.launch = function(blockType){
		
	if(blockType == Enum.Block.Type.SPAWN)
	{
		//Spawn block falls from the sky.
		if(!this.hasActiveSpawnBlock)
		{
			var spawnY = this.currentGame.world.height + 100;
			var spawnX = Constants.Block.WIDTH*0.5 + (Math.random()*(this.currentGame.world.width-Constants.Block.WIDTH));
			
			//Create a block and launch it.
			this.currentGame.managers.BlockManager.launch(new Block(spawnX, 
																  spawnY, 
																  Enum.Block.Type.SPAWN, 
																  null,
																  null, 
																  this.currentGame));
			
			this.hasActiveSpawnBlock = true;
		}
	}
};

Overlord.prototype.kill = function(killed, cause){
		
	//Steal killed's list.
	for(var i in this.currentGame.players)
		if(this.currentGame.players[i].killerId == killed.id)
			this.currentGame.players[i].killerId = null;
	
	//Force player to die.
	killed.toBeDestroy = true;
};