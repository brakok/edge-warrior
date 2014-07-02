
cd.Server.NpcManager = function(game){
	this.currentGame = game;
};

cd.Server.NpcManager.prototype.add = function(npc){
	
	npc.id = this.currentGame.npcSequence;
	this.currentGame.npcSequence++;
	
	this.currentGame.npcs.push(npc);
	
	var data = {
		id: npc.id,
		type: npc.type,
		x: npc.x,
		y: npc.y,
		facing: npc.facing
	};
	
	switch(npc.type){
		case Enum.NPC.Type.PESKY_BOX:
			data.target = npc.target.color;
			break;
	}
	
	io.sockets.in(this.currentGame.id).emit(Constants.Message.NEW_NPC, data);
};