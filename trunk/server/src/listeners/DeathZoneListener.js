
//Mortal things listener.
var DeathZoneListener = function(game){
	this.currentGame = game;
};

DeathZoneListener.prototype.begin = function(arbiter, space){
	
	var player = null;
	var block = null;
	var deathZone = null;
	var deathZoneType = null;
	
	if(arbiter.body_a.userdata != null)
	{
		if(arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_a.userdata.object;
		else if(arbiter.body_a.userdata.type == Enum.UserData.Type.BLOCK)
			block = arbiter.body_a.userdata.object;
		else	
		{
			deathZone = arbiter.body_a.userdata.object;
			deathZoneType = arbiter.body_a.userdata.type;
		}
	}	
	if(arbiter.body_b.userdata != null)
	{
		if(arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_b.userdata.object;
		else if(arbiter.body_b.userdata.type == Enum.UserData.Type.BLOCK)
			block = arbiter.body_b.userdata.object;
		else	
		{
			deathZone = arbiter.body_b.userdata.object;
			deathZoneType = arbiter.body_b.userdata.type;
		}
	}	
	
	//Must be enabled to continue.
	if(deathZone != null && deathZone.userdata != null && !deathZone.userdata.object.enabled)
		return;
	
	if(player != null)
	{
		if(deathZone != null)
		{
			//Find killing player.
			var killingPlayer = null;
			
			for(var i in this.currentGame.players)
				if(this.currentGame.players[i].id == deathZone.ownerId)
				{
					killingPlayer = this.currentGame.players[i];
					break;
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
	{
		block.markToDestroy(Enum.Block.Destruction.CRUSHED);
		
		if(deathZone && deathZoneType){
		
			switch(deathZoneType){
				case Enum.UserData.Type.JAW:
					//Jaw can only destroy a limited number of blocks.
					deathZone.count--;
					
					if(deathZone.count == 0)
					{
						deathZone.enabled = false;
						deathZone.stillExists = false;
					}
					
					break;
			}
		}
	}
};