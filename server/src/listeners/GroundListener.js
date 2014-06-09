
//Ground listener.
var GroundListener = function(game){
	this.currentGame = game;
};

GroundListener.prototype.begin = function(arbiter, space){

	var player = null;
	var sensorIsB = arbiter.b.sensor;
	
	if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
		player = arbiter.body_a.userdata.object;

	//Allow player to jump on other.
	if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER && (player == null || sensorIsB))
		player = arbiter.body_b.userdata.object;
	
	if(player != null)
	{
		//Increment player contact if both bodies are players.
		if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER && arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
			player.playerContact++;
		
		if((arbiter.body_a.userdata == null || arbiter.body_a.userdata.type != Enum.UserData.Type.PLAYER || arbiter.body_b.userdata == null || arbiter.body_b.userdata.type != Enum.UserData.Type.PLAYER) && player.noGroundTimer > 0)
			player.noGroundTimer = 0;
		
		if(player.noGroundTimer <= 0)
			player.groundContact++;
	}
};

GroundListener.prototype.separate = function(arbiter, space){
	var player = null;
	var sensorIsB = arbiter.b.sensor;
	
	if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
		player = arbiter.body_a.userdata.object;

	//Allow player to jump on other.
	if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER && (player == null || sensorIsB))
		player = arbiter.body_b.userdata.object;
	
	if(player != null)
	{
		//Decrement player contact if both bodies are players.
		if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER && arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
			player.playerContact--;
	
		if(player.noGroundTimer <= 0)
			player.groundContact--;	
	}
};