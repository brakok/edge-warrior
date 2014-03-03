
var NpcManager = function(game){
	this.currentGame = game;
};

NpcManager.prototype.add = function(npc){
	
	this.currentGame.npcSequence++;
	this.currentGame.npcs.push(npc);
	
	var data = {
		id: npc.id,
		type: npc.type,
		x: npc.x,
		y: npc.y,
		facing: npc.facing
	};
	
	io.sockets.in(this.currentGame.id).emit(Constants.Message.NEW_NPC, data);
};