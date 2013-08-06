
//Goal listener.
var GoalListener = function(game){
	this.currentGame = game;
};

GoalListener.prototype.begin = function(arbiter, space){

	var player = null;
	
	if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
		player = arbiter.body_a.userdata.object;

	if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
		player = arbiter.body_b.userdata.object;
		
	if(this.currentGame.winner == null)
		this.currentGame.electWinner(player);
	else
		player.toBeDestroy = true;
};