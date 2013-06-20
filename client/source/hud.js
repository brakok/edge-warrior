//HUD needs to be add to the GameScene.
var HUD = cc.LayerColor.extend({
	inventory: null,
	killCommand: null,
	init: function(width, height){
	
		this._super(new cc.Color4B(0, 0, 0, 0), width,height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));
		
		//Add the inventory.
		this.inventory = new Inventory(125, 75, width, this);
		
		//Add the kill command beside the inventory.
		this.killCommand = new KillCommand(270, 65, width, this);
		this._zOrder = Constants.HUD.Z_INDEX;
	},
	update: function(dt){
		this.killCommand.update(dt);
	}
});

HUD.create = function(width, height) {

	var hud = new HUD();
	hud.init(width, height);
	
	return hud;
};