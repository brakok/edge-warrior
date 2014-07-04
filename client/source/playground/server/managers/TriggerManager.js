

cd.Server.TriggerManager = function(game){
	this.currentGame = game;
};

cd.Server.TriggerManager.prototype.add = function(trigger){
	
	//Assign id.
	trigger.id = this.currentGame.triggerSequence;
	this.currentGame.triggerSequence++;
	
	this.currentGame.triggers.push(trigger);
	
	var data = {
		id: trigger.id,
		type: trigger.type,
		x: trigger.x,
		y: trigger.y
	};
	
	if(trigger.sendVel != null && trigger.sendVel)
		data.vel = trigger.vel;
		
	io.sockets.in(this.currentGame.id).emit(Constants.Message.NEW_TRIGGER, data);
};