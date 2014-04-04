
var PickAxeCounter = function(x, y, layer){
	
	this.x = x;
	this.y = y;

	this.layer = layer;
	
	this.label = cc.LabelTTF.create("0", Constants.Font.NAME, Constants.Font.SIZE, cc.size(40, 40), cc.TEXT_ALIGNMENT_RIGHT);
	this.sprite = cc.Sprite.create(assetsHudDir + 'pickaxe.png');
	
	this.label.setColor(new cc.Color3B(255,255,255));
	this.label.setPosition(new cc.Point(this.x, this.y));
	
	this.sprite.setPosition(new cc.Point(this.x + 45, this.y));
	this.sprite.setZOrder(Constants.HUD.PickAxe.Z_INDEX);
	
	this.pickAxeCount = 0;
	
	this.layer.addChild(this.label);
	this.layer.addChild(this.sprite);
};

PickAxeCounter.prototype.update = function(){
	
	if(Client.game.player.pickAxeCount == this.pickAxeCount)
		return;
		
	this.pickAxeCount = Client.game.player.pickAxeCount;
	this.label.setString(Client.game.player.pickAxeCount);
};