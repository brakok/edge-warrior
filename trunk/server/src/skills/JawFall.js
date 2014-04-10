
SkillInfo.JawFall = {
	COUNT: 1,
	TRIGGER: Enum.Block.Skill.Trigger.ON_LAUNCHING,
	SELF_DESTROY: false,
	USE_LAUNCH_TIMER: true,
	TARGET_WITH_BLOCK: false,
	exec: function(block){
	
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
	}
};