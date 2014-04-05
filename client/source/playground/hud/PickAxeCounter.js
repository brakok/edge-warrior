
var PickAxeCounter = function(x, y, layer){
	
	this.x = x;
	this.y = y;

	this.layer = layer;
	
	this.sprites = [];
	this.pickAxeCount = 0;
};

PickAxeCounter.prototype.update = function(){
	
	if(Client.game.player.pickAxeCount == this.pickAxeCount)
		return;
	
	//Add pickaxes if there are not enough.
	if(Client.game.player.pickAxeCount > this.pickAxeCount)
	{
		for(var i = this.pickAxeCount; i < Client.game.player.pickAxeCount; ++i)
		{
			if(!this.sprites[i])
			{
				var sprite = cc.Sprite.create(assetsHudDir + 'pickaxe.png');
				sprite.setPosition(new cc.Point(this.x + Constants.HUD.PickAxe.OFFSET*i, this.y));
				sprite.setZOrder(Constants.HUD.PickAxe.Z_INDEX);
				this.sprites.push(sprite);
			}
			
			this.layer.addChild(this.sprites[i]);
		}
	}

	//Remove pickaxes if there are too many.
	if(Client.game.player.pickAxeCount < this.pickAxeCount)
		for(var i = Client.game.player.pickAxeCount; i < this.pickAxeCount; ++i)
			this.layer.removeChild(this.sprites[i]);
	
	this.pickAxeCount = Client.game.player.pickAxeCount;
};