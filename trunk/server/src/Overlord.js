
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
	
	var killerIndex = (otherPlayers.length == 1 ? 0 : Math.floor(Math.random()*otherPlayers.length));
			
	//Assign the kill.
	otherPlayers[killerIndex].kill(killed, Enum.Block.Type.NEUTRAL, (keepList == null || !keepList));
};

Overlord.prototype.launch = function(blockType){
		
	if(blockType == Enum.Block.Type.SPAWN)
	{
		//Spawn block falls from the sky.
		if(!this.hasActiveSpawnBlock)
		{
			var spawnY = this.currentGame.world.goalStartPosition + Constants.Game.OFFSET_Y_ALLOWED_FOR_PLAYERS;
			var spawnX = Constants.Block.WIDTH*0.75 + (Math.random()*(this.currentGame.world.width - Constants.Block.WIDTH*1.5));
			
			//Randomize into spawn zones if there's some.
			if(this.currentGame.world.spawnZones.length > 0)
			{
				var spawnZone = this.currentGame.world.spawnZones[Math.floor(Math.random()*this.currentGame.world.spawnZones.length)];
				
				spawnY = spawnZone.height*0.5 + spawnZone.y - Constants.Block.HEIGHT*0.5;
				spawnX = (spawnZone.x - spawnZone.width*0.75) + Constants.Block.WIDTH*0.5 + (Math.random()*(spawnZone.width - Constants.Block.WIDTH*1.5));
			}
			
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