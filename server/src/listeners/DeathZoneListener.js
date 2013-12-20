
//Mortal things listener.
var DeathZoneListener = function(game){
	this.currentGame = game;
};

DeathZoneListener.prototype.begin = function(arbiter, space){
	
	var player = null;
	var block = null;
	var deathZone = null;
	
	if(arbiter.body_a.userdata != null)
	{
		if(arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_a.userdata.object;
		else if(arbiter.body_a.userdata.type == Enum.UserData.Type.BLOCK)
			block = arbiter.body_a.userdata.object;
		else	
			deathZone = arbiter.body_a.userdata.object;
	}	
	if(arbiter.body_b.userdata != null)
	{
		if(arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_b.userdata.object;
		else if(arbiter.body_b.userdata.type == Enum.UserData.Type.BLOCK)
			block = arbiter.body_b.userdata.object;
		else	
			deathZone = arbiter.body_b.userdata.object;
	}	
	
	if(player != null)
	{
		if(deathZone != null)
		{
			//Find killing player.
			var killingPlayer = null;
			
			for(var i in this.currentGame.players)
			{
				if(this.currentGame.players[i].id == deathZone.ownerId)
					killingPlayer = this.currentGame.players[i];
			}

			//If found, mark the player to be inserted in the next update in the killer blocks list.
			if(killingPlayer != null && killingPlayer.id != player.id)
				killingPlayer.kill(player, deathZone.stats.type);
			else
				player.toBeDestroy = true;
		}
		else
			player.toBeDestroy = true;
	}
	
	if(block != null && block.type != Enum.Block.Type.SPAWN && (deathZone == null || deathZone.blockId == null || deathZone.blockId != block.id))
		block.markToDestroy(Enum.Block.Destruction.CRUSHED);
};