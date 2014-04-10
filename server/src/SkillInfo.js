
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
			skill.exec = tmpSkill.exec;
			skill.selfDestroy = tmpSkill.SELF_DESTROY;
			skill.useLaunchTimer = tmpSkill.USE_LAUNCH_TIMER;
			skill.targetWithBlock = tmpSkill.TARGET_WITH_BLOCK;
		}
		
		return skill;
	}
};