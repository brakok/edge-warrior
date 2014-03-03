
var Managers = function(game){
	this.currentGame = game;

	this.BlockManager = new BlockManager(this.currentGame);
	this.DeathZoneManager = new DeathZoneManager(this.currentGame);
	this.NpcManager = new NpcManager(this.currentGame);
};