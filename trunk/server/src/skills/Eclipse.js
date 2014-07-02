cd.Server.SkillInfo.Eclipse = {
	COUNT: 1,
	TRIGGER: Enum.Block.Skill.Trigger.ON_LANDING,
	SELF_DESTROY: false,
	USE_LAUNCH_TIMER: false,
	TARGET_WITH_BLOCK: false,
	exec: function(block){
		//Send client info to create an eclipse.
		if(block.skill.count > 0)
		{
			if(block.owner)
			{
				var data = {
					username: block.owner.username,
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
	}
};