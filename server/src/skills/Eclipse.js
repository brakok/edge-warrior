SkillInfo.Eclipse = {
	COUNT: 1,
	TRIGGER: Enum.Block.Skill.Trigger.ON_LANDING,
	SELF_DESTROY: false,
	USE_LAUNCH_TIMER: false,
	TARGET_WITH_BLOCK: false,
	exec: function(block){
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
	}
};