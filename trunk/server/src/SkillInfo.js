
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
		}
		
		if(tmpSkill)
		{
			skill.count = tmpSkill.COUNT;
			skill.trigger = tmpSkill.TRIGGER;
			skill.selfDestroy = tmpSkill.SELF_DESTROY;
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
		}			
	},
	FirePulse: {
		COUNT: 1,
		TRIGGER: Enum.Block.Skill.Trigger.ON_LANDING,
		SELF_DESTROY: true
	},
	JawFall: {
		COUNT: 1,
		TRIGGER: Enum.Block.Skill.Trigger.ON_LAUNCHING,
		SELF_DESTROY: false
	}
};