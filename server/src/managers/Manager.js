
cd.Server.Managers = function(game){
	this.currentGame = game;

	this.BlockManager = new cd.Server.BlockManager(this.currentGame);
	this.DeathZoneManager = new cd.Server.DeathZoneManager(this.currentGame);
	this.NpcManager = new cd.Server.NpcManager(this.currentGame);
	this.TriggerManager = new cd.Server.TriggerManager(this.currentGame);
};