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
		this.killCommand = new KillCommand(280, 60, width, this);
	}
});

HUD.create = function(width, height) {

	var hud = new HUD();
	
	//Infront of everything.
	hud._zOrder = 1000;
	hud.init(width, height);
	
	return hud;
};