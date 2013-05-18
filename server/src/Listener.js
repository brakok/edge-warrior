//Mortal things listener.
var DeathZoneListener = {
	begin: function(arbiter, space){
	
		var player = null;
		var block = null;
		
		if(arbiter.body_a.userdata != null)
		{
			if(arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
				player = arbiter.body_a.userdata.object;
			if(arbiter.body_a.userdata.type == Enum.UserData.Type.BLOCK)
				block = arbiter.body_a.userdata.object;
		}	
		if(arbiter.body_b.userdata != null)
		{
			if(arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
				player = arbiter.body_b.userdata.object;
			if(arbiter.body_b.userdata.type == Enum.UserData.Type.BLOCK)
				block = arbiter.body_b.userdata.object;
		}	
		
		if(player != null)
			player.toBeDestroy = true;
		if(block != null)
			block.markToDestroy(Enum.Block.Destruction.CRUSHED);
	}
};


//Goal listener.
var GoalListener = {
	begin: function(arbiter, space){
		var player = null;
		
		if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_a.userdata.object;

		if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_b.userdata.object;
			
		if(Game.winner == null)
			Game.electWinner(player);
		else
			player.toBeDestroy = true;
	}
};


//Drop listener.
var DropListener = {
	begin: function(arbiter, space){
		var player = null;
		
		if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_a.userdata.object;

		if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_b.userdata.object;
		
		if(player != null){
			player.obstruction++;
		}
	},
	separate: function(arbiter, space){
		var player = null;
		
		if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_a.userdata.object;

		if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_b.userdata.object;
		
		if(player != null){
			player.obstruction--;
		}
	}
};

//Ground listener.
var GroundListener = {
	begin: function(arbiter, space){
			
		var player = null;
		
		if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_a.userdata.object;

		if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_b.userdata.object;
		
		if(player != null){
			player.groundContact++;
		}
	},
	separate: function(arbiter, space){

		var player = null;
		
		if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_a.userdata.object;

		if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_b.userdata.object;
			
		if(player != null){
			player.groundContact--;
			return;
		}
	}
};

//Block listener.
var BlockListener = {
	begin: function(arbiter, space){
		
		var block1 = null;
		var block2 = null;
				
		if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.BLOCK)
			block1 = arbiter.body_a.userdata.object;

		if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.BLOCK)
			block2 = arbiter.body_b.userdata.object;

		//Special process for collision with two blocks.
		if(block1 != null && block2 != null)
		{	
			if(block1.type == Enum.Block.Type.COLORED && block2.type == Enum.Block.Type.COLORED
			&& block1.color == block2.color && block1.color < Enum.Color.GREEN)
			{			
				//If blocks are touching a third one, destroy them all.
				if((block1.linkedBlockId != null && block1.linkedBlockId != block2.id) 
					|| (block2.linkedBlockId != null && block2.linkedBlockId != block1.id))
				{
					block1.markToDestroy(Enum.Block.Destruction.COLOR_CONTACT);
					block2.markToDestroy(Enum.Block.Destruction.COLOR_CONTACT);
					
					//Destroy linked leaves.
					if(block1.linkedBlockId != null)
						this.destroyLeaves(block1.linkedBlockId, block1.id);
					if(block2.linkedBlockId != null)
						this.destroyLeaves(block2.linkedBlockId, block2.id);
									
					block1 = null;
					block2 = null;
				}
				else
				{
					block1.linkedBlockId = block2.id;
					block2.linkedBlockId = block1.id;
				}
			}
			else if(block1.type == Enum.Block.Type.COLORED && block2.type == Enum.Block.Type.COLORED 
					&& Math.abs(block1.color - block2.color) == 4)
			{
				//Destroy complementary blocks on contact.
				block1.markToDestroy(Enum.Block.Destruction.COLOR_CONTACT);
				block2.markToDestroy(Enum.Block.Destruction.COLOR_CONTACT);
				
				block1 = null;
				block2 = null;
			}
		}
		
		//Treament for player within contact.
		var player = null;
		
		if(block1 == null && arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_a.userdata.object;

		if(block2 == null && arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_b.userdata.object;
			
		//Trigger spawn.
		if(block1 != null && player == null && block1.type == Enum.Block.Type.SPAWN)
			block1.mustTrigger = true;
		if(block2 != null && player == null && block2.type == Enum.Block.Type.SPAWN)
			block2.mustTrigger = true;
		
		if(player != null)
		{		
			var killingBlock = (block1 != null ? block1 : block2);
			if(killingBlock != null && !killingBlock.landed && killingBlock.ownerId != player.id)
			{
				if(killingBlock.ownerId == null)
				{
					Overlord.kill(player, killingBlock.type);
				}
				else
				{
					//Find killing player.
					var killingPlayer = null;
					
					for(var i in Game.players)
					{
						if(Game.players[i].color == killingBlock.color)
							killingPlayer = Game.players[i];
					}

					//If found, mark the player to be inserted in the next update in the killer blocks list.
					if(killingPlayer != null)
						killingPlayer.kill(player, killingBlock.type);
				}
			}
			
			block1 = null;
			block2 = null;
		}
			
		//Check if blocks land.
		if(block1 != null && !block1.isStatic)
		{
			//State can't be changed during callback.
			block1.toggleState = true;
			block1.isStatic = true;
			block1.landed = true;
		}	
		if(block2 != null && !block2.isStatic)
		{
			block2.toggleState = true;
			block2.isStatic = true;
			block2.landed = true;
		}
	},
	separate: function(arbiter, space){
		
	},
	destroyLeaves: function(blockId, previousId){
		
		var block = Game.blocks[blockId];
		
		if(block != null)
		{
			block.markToDestroy(Enum.Block.Destruction.COLOR_CONTACT);
			
			if(block.linkedBlockId != null && block.linkedBlockId != previousId)
				this.destroyLeaves(block.linkedBlockId, blockId);
		}
	}
};