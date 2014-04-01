
var SkillInfo = {
	load: function(skill){
		
		var tmpSkill = null;
		
		switch(skill.type){
			case Enum.Block.Skill.FIRE_PULSE:
				tmpSkill = this.FirePulse;
				break;
			case Enum.Block.Skill.JAW_FALL:
				tmpSkill = this.JawFall;
				break;
			case Enum.Block.Skill.ECLIPSE:
				tmpSkill = this.Eclipse;
				break;
			case Enum.Block.Skill.PESKY_BOX:
				tmpSkill = this.PeskyBox;
				break;
		}
		
		if(tmpSkill)
		{
			skill.count = tmpSkill.COUNT;
			skill.trigger = tmpSkill.TRIGGER;
			skill.selfDestroy = tmpSkill.SELF_DESTROY;
			skill.useLaunchTimer = tmpSkill.USE_LAUNCH_TIMER;
			skill.targetWithBlock = tmpSkill.TARGET_WITH_BLOCK;
		}
		
		return skill;
	},
	exec: function(block){
	
		switch(block.skill.type)
		{
			case Enum.Block.Skill.FIRE_PULSE:

				if(block.landingTimer <= 0 && block.skill.count > 0)
				{
					//Launch one fireball for both sides.
					block.currentGame.managers.DeathZoneManager.launch(new Missile(block.currentGame.deathZoneSequence,
																				  block.ownerId,
																				  null,
																				  block.x,
																				  block.y, 
																				  Enum.DeathZone.Type.FIREBALL,
																				  {
																					direction: Enum.Direction.LEFT,
																					power: block.skill.power
																				  },
																				  block.currentGame));
					
					block.currentGame.managers.DeathZoneManager.launch(new Missile(block.currentGame.deathZoneSequence,
																				  block.ownerId,
																				  null,
																				  block.x, 
																				  block.y, 
																				  Enum.DeathZone.Type.FIREBALL,
																				  {
																					direction: Enum.Direction.RIGHT,
																					power: block.skill.power
																				  },
																				  block.currentGame));
				
					block.skill.count--;
					block.mustTrigger = false;
					block.explode(Enum.Block.Destruction.COLOR_CONTACT);
				}
				
				break;
			case Enum.Block.Skill.JAW_FALL:
			
				//Add jaw to falling block.
				if(block.skill.count > 0)
					block.currentGame.managers.DeathZoneManager.launch(new Jaw(block.currentGame.deathZoneSequence, 
																			   block, 
																			   0, 
																			   (Constants.Block.HEIGHT*0.5 + Constants.DeathZone.Jaw.HEIGHT*0.5)*-1, 
																			   Constants.DeathZone.Jaw.INITIAL_COUNT + Constants.DeathZone.Jaw.STEP*block.skill.power, 
																			   Constants.DeathZone.Jaw.WIDTH, 
																			   Constants.DeathZone.Jaw.HEIGHT, 
																			   block.currentGame));
			
				block.skill.count--;
				block.mustTrigger = false;
				break;
			case Enum.Block.Skill.ECLIPSE:
			
				//Send client info to create an eclipse.
				if(block.skill.count > 0)
				{
					var owner = null;
					
					for(var i in block.currentGame.players)
						if(i == block.ownerId)
						{
							owner = block.currentGame.players[i];
							break;
						}

					if(owner)
					{
						var data = {
							username: owner.username,
							power: block.skill.power,
							x: block.x,
							y: block.y,
							type: Enum.Element.Type.ECLIPSE
						};
						
						io.sockets.in(block.currentGame.id).emit(Constants.Message.NEW_ELEMENT, data);
					}
				}
				
				block.skill.count--;
				block.mustTrigger = false;
				break;
			case Enum.Block.Skill.PESKY_BOX:
			
				if(block.skill.count > 0)
				{
					var targetBlock = block.currentGame.blocks[block.linkedBlockId];
					var targetPlayer = null;
					
					if(targetBlock)
						targetPlayer = block.currentGame.players[targetBlock.ownerId];
					
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
				break;
		}			
	},
	FirePulse: {
		COUNT: 1,
		TRIGGER: Enum.Block.Skill.Trigger.ON_LANDING,
		SELF_DESTROY: true,
		USE_LAUNCH_TIMER: false,
		TARGET_WITH_BLOCK: false
	},
	JawFall: {
		COUNT: 1,
		TRIGGER: Enum.Block.Skill.Trigger.ON_LAUNCHING,
		SELF_DESTROY: false,
		USE_LAUNCH_TIMER: true,
		TARGET_WITH_BLOCK: false
	},
	Eclipse: {
		COUNT: 1,
		TRIGGER: Enum.Block.Skill.Trigger.ON_LANDING,
		SELF_DESTROY: false,
		USE_LAUNCH_TIMER: false,
		TARGET_WITH_BLOCK: false
	},
	PeskyBox: {
		COUNT: 1,
		TRIGGER: Enum.Block.Skill.Trigger.ON_LANDING,
		SELF_DESTROY: false,
		USE_LAUNCH_TIMER: false,
		TARGET_WITH_BLOCK: true
	}
};