
//Drop listener.
cd.Server.DropListener = function(game){
	this.currentGame = game;
};

cd.Server.DropListener.prototype.begin = function(arbiter, space){
	var player = null;
	
	if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
		player = arbiter.body_a.userdata.object;

	if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
		player = arbiter.body_b.userdata.object;
	
	if(player != null)
		player.obstruction++;
};
		
cd.Server.DropListener.prototype.separate = function(arbiter, space){
	var player = null;
	
	if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
		player = arbiter.body_a.userdata.object;

	if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
		player = arbiter.body_b.userdata.object;
	
	if(player != null)
		player.obstruction--;
};