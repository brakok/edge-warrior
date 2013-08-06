
//Create all listeners for a specific game (context).
var Listeners = function(game){
	this.currentGame = game;
	
	//All listeners.
	this.DeathZoneListener = new DeathZoneListener(this.currentGame);
	this.GoalListener = new GoalListener(this.currentGame);
	this.DropListener = new DropListener(this.currentGame);
	this.GroundListener = new GroundListener(this.currentGame);
	this.BlockListener = new BlockListener(this.currentGame);
};