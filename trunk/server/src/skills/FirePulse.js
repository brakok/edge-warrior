SkillInfo.FirePulse = {
	COUNT: 1,
	TRIGGER: Enum.Block.Skill.Trigger.ON_LANDING,
	SELF_DESTROY: true,
	USE_LAUNCH_TIMER: false,
	TARGET_WITH_BLOCK: false,
	exec: function(block){

		if(block.landingTimer <= 0 && block.skill.count > 0)
		{
			//Launch one fireball for both sides.
			block.currentGame.managers.DeathZoneManager.launch(new Missile(block.currentGame.deathZoneSequence,
																		  block.ownerId,
																		  null,
																		  Enum.DeathZone.Type.FIREBALL,
																		  block.x,
																		  block.y, 
																		  Constants.DeathZone.Fireball.SPEED_MIN + Constants.DeathZone.Fireball.SPEED_STEP*block.skill.power,
																		  0,
																		  Constants.DeathZone.Fireball.DISTANCE_MIN + Constants.DeathZone.Fireball.DISTANCE_STEP*block.skill.power,
																		  Constants.DeathZone.Fireball.WIDTH,
																		  Constants.DeathZone.Fireball.HEIGHT,
																		  block.currentGame));
			
			block.currentGame.managers.DeathZoneManager.launch(new Missile(block.currentGame.deathZoneSequence,
																		  block.ownerId,
																		  null,
																		  Enum.DeathZone.Type.FIREBALL,
																		  block.x,
																		  block.y, 
																		  (Constants.DeathZone.Fireball.SPEED_MIN + Constants.DeathZone.Fireball.SPEED_STEP*block.skill.power)*-1,
																		  0,
																		  Constants.DeathZone.Fireball.DISTANCE_MIN + Constants.DeathZone.Fireball.DISTANCE_STEP*block.skill.power,
																		  Constants.DeathZone.Fireball.WIDTH,
																		  Constants.DeathZone.Fireball.HEIGHT,
																		  block.currentGame));
		
			block.skill.count--;
			block.mustTrigger = false;
			block.explode(Enum.Block.Destruction.COLOR_CONTACT);
		}
	}
};