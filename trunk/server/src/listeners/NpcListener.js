
cd.Server.NpcListener = function(game){
	this.currentGame = game;
};

cd.Server.NpcListener.prototype.begin = function(arbiter, space){
	
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
	
	//Trigger npc.
	if(player && npc && npc.onBegin)
		npc.onBegin(player);
};

cd.Server.NpcListener.prototype.separate = function(arbiter, space){
	
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

	//Trigger npc.
	if(player && npc && npc.onEnd)
		npc.onEnd(player);
};