
var Spike = function(x, y, type){
	this.x = x;
	this.y = y;
	this.type = type
	
	switch(this.type){
		case Enum.DeathZone.Type.ENERGY_SPIKE:
			this.sprite = cc.Sprite.create(assestsPlaceHolderDir + 'energy_spike.png');
			break;
	}
	
	this.sprite.setPosition(new cc.Point(this.x, this.y));	
	this.sprite._zOrder = 998;
};

Spike.prototype.fromServer = function(remoteSpike){

	this.x = remoteSpike.x;
	this.y = remoteSpike.y;
	
	this.sprite.setPosition(new cc.Point(this.x, this.y));
};

Spike.prototype.explode = function(){
	Client.layer.removeChild(this.sprite);
};