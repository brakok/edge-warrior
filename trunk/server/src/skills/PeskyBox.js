
SkillInfo.PeskyBox = {
	COUNT: 1,
	TRIGGER: Enum.Block.Skill.Trigger.ON_LANDING,
	SELF_DESTROY: false,
	USE_LAUNCH_TIMER: false,
	TARGET_WITH_BLOCK: true,
	exec:  function(block){
		if(block.skill.count > 0)
		{	
			var targetBlock = block.currentGame.blocks[block.linkedBlockId];
			var targetPlayer = null;
			
			if(targetBlock && targetBlock.ownerId != block.ownerId)
				targetPlayer = block.currentGame.players[targetBlock.ownerId];
			
			//If no target found, randomize.
			if(!targetPlayer)
			{
				var enemies = [];
				for(var i in block.currentGame.players)
					if(i != block.ownerId)
						enemies.push(block.currentGame.players[i]);
						
				if(enemies.length > 0)
					targetPlayer = enemies[Math.floor(Math.random()*enemies.length)];
			}
			
			if(targetPlayer && !targetPlayer.hasWon)
				block.currentGame.managers.NpcManager.add(new PeskyBox(block.currentGame.npcSequence,
																	   block.x,
																	   block.y - Constants.NPC.PeskyBox.HEIGHT*0.5,
																	   Constants.NPC.PeskyBox.WIDTH,
																	   Constants.NPC.PeskyBox.HEIGHT,
																	   Constants.NPC.PeskyBox.SPEED + Constants.NPC.PeskyBox.SPEED_STEP*block.skill.power,
																	   Constants.NPC.PeskyBox.DURATION + Constants.NPC.PeskyBox.DURATION_STEP*block.skill.power,
																	   Constants.NPC.PeskyBox.FLEE_TIMER - Constants.NPC.PeskyBox.FLEE_STEP*block.skill.power,
																	   Constants.NPC.PeskyBox.PUSH_X + Constants.NPC.PeskyBox.PUSH_X_STEP*block.skill.power,
																	   Constants.NPC.PeskyBox.PUSH_Y + Constants.NPC.PeskyBox.PUSH_Y_STEP*block.skill.power,
																	   targetPlayer,																	   
																	   block.currentGame));
		}
		
		block.skill.count--;
		block.mustTrigger = false;
	}
};