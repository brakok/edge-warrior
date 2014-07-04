
cd.Server.SkillInfo.Deflector = {
	COUNT: 1,
	TRIGGER: Enum.Block.Skill.Trigger.ON_LANDING,
	SELF_DESTROY: false,
	USE_LAUNCH_TIMER: false,
	TARGET_WITH_BLOCK: false,
	exec: function(block){
	
		//Add jaw to falling block.
		if(block.skill.count > 0)
			block.currentGame.managers.TriggerManager.add(new cd.Server.Deflector(block.x, 
																				   block.y + Constants.Trigger.Deflector.REL_Y, 
																				   Constants.Trigger.Deflector.DURATION + Constants.Trigger.Deflector.DURATION_STEP*block.skill.power, 
																				   Constants.Trigger.Deflector.PUSH + Constants.Trigger.Deflector.PUSH_STEP*block.skill.power, 
																				   Constants.Trigger.Deflector.WIDTH, 
																				   Constants.Trigger.Deflector.HEIGHT, 
																				   block.currentGame));

		block.skill.count--;
		block.mustTrigger = false;
	}
};