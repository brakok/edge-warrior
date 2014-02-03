var Block = function (x, y, type, color, skill) {
	
	this.x = x;
	this.y = y;

	this.type = type;
	this.skill = (Enum.Block.Type.SKILLED ? skill : null);
	
	this.smoke = null;
	
	this.color = color;
	this.originalColor = color;
	
	this.updatedOnce = false;
	
	//Create sprite associated.
	if(this.type == Enum.Block.Type.COLORED && this.color != null)
		this.sprite = cc.Sprite.create(assetsBlockDir + 'block_' + this.color + '.png');
	else if(this.type == Enum.Block.Type.SPAWN)
		this.sprite = cc.Sprite.create(assetsBlockDir + 'block_spawn.png');
	else if(this.type == Enum.Block.Type.NEUTRAL)
		this.sprite = cc.Sprite.create(assetsBlockDir + 'block.png');
	else if(this.type == Enum.Block.Type.SKILLED)
	{
		//All repertoried skills.
		switch(this.skill.type){
			case Enum.Block.Skill.FIRE_PULSE:
				this.sprite = cc.Sprite.create(assetsBlockDir + 'block_firePulse.png');
				break;
		}
	}
	else
		this.sprite = cc.Sprite.create(assetsBlockDir + 'block.png');
		
	this.sprite._zOrder = Constants.Block.Z_ORDER;
		
	this.landingCountdown = 0;
	this.hasDoneLandingAnimation = true;
}

Block.prototype.init = function(){
	this.smoke = Smoke.create(this.x, this.y);
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
	
	//Trigger sound.
	AudioManager.playEffect(Constants.Sound.File.Block.LANDING, false);
	
	this.stopSmoke();
};

Block.prototype.update = function(dt){

	if(!this.updatedOnce)
	{
		if(this.smoke)
			Client.game.layer.addChild(this.smoke);
			
		Client.game.layer.addChild(this.sprite);
		
		this.updatedOnce = true;
	}

	if(this.smoke)
		Client.game.camera.project(this.smoke, this.x, this.y);


	Client.game.camera.project(this.sprite, this.x, this.y);
	
	//Trigger landing animation if needed.
	if(!this.hasDoneLandingAnimation)
	{
		if(this.landingCountdown < 0)
		{
			this.hasDoneLandingAnimation = true;
			
			//Create effect.
			EffectManager.create(Enum.Effect.Type.BLOCK_LANDING, this.x, this.y - (this.sprite.getTextureRect().height*0.5 - Constants.Effect.BlockLanding.OFFSET));
		}
		else
			this.landingCountdown -= dt;
	}
};

Block.prototype.swapColor = function(color){
	Client.game.layer.removeChild(this.sprite);
	this.sprite = cc.Sprite.create(assetsBlockDir + 'block_' + color + '.png');
	Client.game.layer.addChild(this.sprite);
	
	//Trigger swap effect.
	EffectManager.create(Enum.Effect.Type.SWAP_COLOR, this.x, this.y);
	AudioManager.playEffect(Constants.Sound.File.Block.SWAP_COLOR, false);
	
	this.color = color;
	this.setPosition(this.x, this.y);
};

Block.prototype.stopSmoke = function(){

	if(this.smoke){
		this.smoke.setSpeed(0);
		this.smoke.stopSystem();
	}
};

Block.prototype.explode = function(cause){
	Client.game.layer.removeChild(this.sprite);
	
	this.stopSmoke();
	
	if(this.type == Enum.Block.Type.SKILLED)
	{
		//All repertoried skills.
		switch(this.skill.type){
			case Enum.Block.Skill.FIRE_PULSE:
				EffectManager.create(Enum.Effect.Type.FIREPULSE_EXPLOSION, this.x, this.y);
				return;
		}
	}
	
	//Trigger right animation depending of destruction cause.
	switch(cause){
		case Enum.Block.Destruction.COLOR_CONTACT:
		case Enum.Block.Destruction.CRUSHED:
			EffectManager.create(Enum.Effect.Type.BLOCK_DISAPPEARING, this.x, this.y);
			
			//Trigger explosion sound.
			AudioManager.playEffect(Constants.Sound.File.Block.EXPLODE, false);
			break;
		case Enum.Block.Destruction.SPAWN:
			EffectManager.create(Enum.Effect.Type.SPAWN_UNLEASHED, this.x, this.y);
			
			//Trigger spawn sound.
			AudioManager.playEffect(Constants.Sound.File.Player.SPAWN, false);
			break;
	}
};

Block.prototype.toServer = function(){
	return {
		type: this.type,
		skill: this.skill
	};
};

//Update block information from server.
Block.prototype.fromServer = function(data){

	this.type = data.type;
	this.skill = data.skill;
	
	//If color has changed, swap color.
	if(this.color != data.color)
		this.swapColor(data.color);
	
	this.setPosition(data.x, data.y);
};
