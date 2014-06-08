
SkillInfo.TimeZone = {
	COUNT: 1,
	TRIGGER: Enum.Block.Skill.Trigger.ON_LANDING,
	SELF_DESTROY: false,
	USE_LAUNCH_TIMER: false,
	TARGET_WITH_BLOCK: false,
	exec: function(block){
	
		//Create time zone on landing.
		if(block.skill.count > 0)
			block.currentGame.managers.TriggerManager.add(new TimeZone(block.x, 
																	   block.y, 
																	   block.id,
																	   block.owner.id,
																	   Constants.Trigger.TimeZone.DURATION + Constants.Trigger.TimeZone.DURATION_STEP*block.skill.power, 
																	   Constants.Trigger.TimeZone.WIDTH,
																	   Constants.Trigger.TimeZone.HEIGHT,
																	   block.currentGame));

		block.skill.count--;
		block.mustTrigger = false;
	}
};