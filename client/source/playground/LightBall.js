
var LightBall = function(x, y){

	this.x = x;
	this.y = y;
	
	this.orbitTime = 0;
	
	this.init();
};

LightBall.prototype.init = function(){
	//Create lightball art.
	this.sprite = cc.Sprite.create(assetsEffectDir + 'lightBall.png');
	this.sprite.setPosition(new cc.Point(this.x, this.y));
	
	this.sprite._zOrder = Constants.Effect.LightBall.Z_INDEX;
	
	Client.game.layer.addChild(this.sprite);
};

LightBall.prototype.explode = function(){
	Client.game.layer.removeChild(this.sprite);
	
	EffectManager.create(Enum.Effect.Type.SPARK, this.x, this.y);
};

LightBall.prototype.render = function(){
	//Create some movement for the floating light ball.	
	var tmpY = this.y + (Math.sin(this.orbitTime)*Constants.Effect.LightBall.ORBIT_RADIUS);
	Client.game.camera.project(this.sprite, this.x, tmpY);
};

LightBall.prototype.update = function(dt){

	this.orbitTime += dt*Constants.Effect.LightBall.ORBIT_SPEED;
		
	if(this.orbitTime > 360)
		this.orbitTime = 0;
};