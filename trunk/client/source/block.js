var Block = function (x, y, type, color) {
	
	this.x = x;
	this.y = y;
	
	this.scale = 1;
	
	this.type = type;
	this.color = color;
	
	//Create sprite associated.
	if(this.type == Enum.Block.Type.COLORED && this.color != null)
		this.sprite = cc.Sprite.create(assetsBlockDir + 'block_' + this.color + '.png');
	else if(this.type == Enum.Block.Type.SPAWN)
	{
		this.sprite = cc.Sprite.create(assetsBlockDir + 'block_spawn.png');
		
		//For a better quality, image is much bigger that the usual size.
		this.scale = 0.1;
	}
	else
		this.sprite = cc.Sprite.create(assetsBlockDir + 'block.png');
		
	this.setPosition(this.x, this.y);
	
	this.landingCountdown = 0;
	this.hasDoneLandingAnimation = true;
}

Block.prototype.init = function(){
	Client.layer.addChild(this.sprite);
};

Block.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
};

Block.prototype.execute = function(type){

	switch(type){
		case Enum.Action.Type.LANDING:
			this.land();
			break;
	}
};

Block.prototype.land = function(){
	
	//Indicate that the landing animation needs to be triggered in a few milliseconds (in order to be at the right place).
	this.hasDoneLandingAnimation = false;
	this.landingCountdown = Constants.Effect.BlockLanding.TIMER;
};

Block.prototype.update = function(dt){
	Client.camera.project(this.sprite, this.x, this.y, this.scale, this.scale);
	
	//Trigger landing animation if needed.
	if(!this.hasDoneLandingAnimation)
	{
		if(this.landingCountdown < 0)
		{
			this.hasDoneLandingAnimation = true;
			EffectManager.create(Enum.Effect.Type.BLOCK_LANDING, this.x, this.y - (this.sprite.getTexture().height*0.5 - Constants.Effect.BlockLanding.OFFSET));
		}
		else
			this.landingCountdown -= dt;
	}
};

Block.prototype.swapColor = function(color){
	Client.layer.removeChild(this.sprite);
	this.sprite = cc.Sprite.create(assetsBlockDir + 'block_' + color + '.png');
	Client.layer.addChild(this.sprite);
	
	//Trigger swap effect.
	EffectManager.create(Enum.Effect.Type.SWAP_COLOR, this.x, this.y);
	
	this.color = color;
	this.setPosition(this.x, this.y);
};

Block.prototype.explode = function(cause){
	Client.layer.removeChild(this.sprite);
	
	//Trigger right animation depending of destruction cause.
	switch(cause){
		case Enum.Block.Destruction.COLOR_CONTACT:
		case Enum.Block.Destruction.CRUSHED:
			EffectManager.create(Enum.Effect.Type.BLOCK_DISAPPEARING, this.x, this.y);
			break;
		case Enum.Block.Destruction.SPAWN:
			EffectManager.create(Enum.Effect.Type.SPAWN_UNLEASHED, this.x, this.y);
			break;
	}
};

//Update block information from server.
Block.prototype.fromServer = function(data){

	this.type = data.type;
	
	//If color has changed, swap color.
	if(this.color != data.color)
		this.swapColor(data.color);
	
	this.setPosition(data.x, data.y);
};
