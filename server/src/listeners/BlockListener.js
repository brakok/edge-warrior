
//Block listener.
var BlockListener = function(game){
	this.currentGame = game;
};

BlockListener.prototype.begin = function(arbiter, space){
	
	var block1 = null;
	var block2 = null;
	
	if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.BLOCK)
		block1 = arbiter.body_a.userdata.object;

	if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.BLOCK)
		block2 = arbiter.body_b.userdata.object;
		
	//Resolve skill.
	if(block1 != null && block1.type == Enum.Block.Type.SKILLED && block1.skill != null)
		this.resolve(block1, arbiter.body_b.userdata);
		
	if(block2 != null && block2.type == Enum.Block.Type.SKILLED && block2.skill != null)
		this.resolve(block2, arbiter.body_a.userdata);

	//Special process for collision with two blocks.
	if(block1 != null && block2 != null)
	{	
		//Some skills need a target defined when touching a block.
		if(block1.skill && block1.skill.targetWithBlock)
			block1.linkedBlockId = block2.id;
		
		if(block2.skill && block2.skill.targetWithBlock)
			block2.linkedBlockId = block1.id;
	
		if(block1.type == Enum.Block.Type.COLORED && block2.type == Enum.Block.Type.COLORED
		&& block1.color == block2.color && block1.color < Enum.Color.GREEN)
		{			
			//Check if linked block has been destroyed first.
			if(block1.linkedBlockId != null && this.currentGame.blocks[block1.linkedBlockId] == null)
				block1.linkedBlockId = null;
			if(block2.linkedBlockId != null && this.currentGame.blocks[block2.linkedBlockId] == null)
				block2.linkedBlockId = null;
		
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
			
		if(killingBlock != null && !killingBlock.landed && (!killingBlock.owner || killingBlock.owner.id != player.id))
		{
			if(killingBlock.owner == null)
			{
				this.currentGame.overlord.kill(player, killingBlock.type);
			}
			else
			{
				//Mark the player to be inserted in the next update in the killer blocks list.
				killingBlock.owner.kill(player, killingBlock.type);
			}
		}
		
		block1 = null;
		block2 = null;
	}

	//Check if blocks land.
	if(block1 != null && !block1.isStatic && (block1.launchLandTimer  <= 0 || !block2))
	{
		//State can't be changed during callback.
		block1.toggleState = true;
		block1.isStatic = true;
		block1.justLanded = true;
		block1.landingTimer = Constants.Block.LANDING_TIMER;
	}
	
	if(block2 != null && !block2.isStatic && (block2.launchLandTimer  <= 0 || !block1))
	{
		block2.toggleState = true;
		block2.isStatic = true;
		block2.justLanded = true;
		block2.landingTimer = Constants.Block.LANDING_TIMER;
	}
};
	
BlockListener.prototype.resolve = function(skillBlock, otherUserdata){
	
	switch(skillBlock.skill.trigger){
		case Enum.Block.Skill.Trigger.ON_LANDING:
			
			if(otherUserdata != null && otherUserdata.type == Enum.UserData.Type.PLAYER)
				return;
				
			skillBlock.mustTrigger = true;
			
			break;
	}
};
	
BlockListener.prototype.destroyLeaves = function(blockId, previousId){
		
	var block = this.currentGame.blocks[blockId];
	
	if(block != null)
	{
		block.markToDestroy(Enum.Block.Destruction.COLOR_CONTACT);
		
		if(block.linkedBlockId != null && block.linkedBlockId != previousId)
			this.destroyLeaves(block.linkedBlockId, blockId);
	}
};