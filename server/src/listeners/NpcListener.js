
var NpcListener = function(game){
	this.currentGame = game;
};

NpcListener.prototype.begin = function(arbiter, space){
	
	var player = null;
	var npc = null;
	var block = null;
	
	if(arbiter.body_a.userdata != null)
	{
		if(arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_a.userdata.object;
		else if(arbiter.body_a.userdata.type == Enum.UserData.Type.BLOCK)
			block = arbiter.body_a.userdata.object;
		else	
			npc = arbiter.body_a.userdata.object;
	}	
	
	if(arbiter.body_b.userdata != null)
	{
		if(arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_b.userdata.object;
		else if(arbiter.body_b.userdata.type == Enum.UserData.Type.BLOCK)
			block = arbiter.body_b.userdata.object;
		else	
			npc = arbiter.body_b.userdata.object;
	}
	
	if(player != null)
	{
		if(npc != null){
			switch(npc.type){
				case Enum.NPC.Type.PESKY_BOX:
					player.body.setVel(new chipmunk.Vect(0,0));
					break;
			}
		}
	}
};