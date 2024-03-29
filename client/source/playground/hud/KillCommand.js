
//Animation shown in HUD for the kill command.
var KillCommand = function(x, y, screenWidth, layer){
		this.x = x;
		this.y = y;
		this.layer = layer;
		
		this.mustAppear = false;
		this.alphaStep = 255/(Constants.HUD.Inventory.KillCommand.Time.FIRST_STEP - Constants.HUD.Inventory.KillCommand.Time.APPARITION);
		this.firstStepTimer = 0;
			
		//Base frame.
		this.currentAnimation = cc.Sprite.createWithSpriteFrameName('killCommand.0000.png');
		this.currentAnimation.setPosition(new cc.Point(this.x, this.y))
		
		//Animation creation.
		this.animToDie = AnimationManager.create('killCommand', 0, 120, 24);
		
		this.animToDie._animation.setLoops(0);
		this.currentAnimation.setOpacity(0);
		
		this.currentAnimation.runAction(this.animToDie);
				
		this.layer.addChild(this.currentAnimation);
};

//Start anim related to specified step.
KillCommand.prototype.start = function(stepReached){
	this.layer.removeChild(this.currentAnimation);
	
	switch(stepReached)
	{
		case Enum.StepReached.STANDING:
			this.animToDie._animation.setLoops(0);
			this.mustAppear = true;
			break;
		case Enum.StepReached.PLAYER:
			this.animToDie._animation.setLoops(1);
			this.currentAnimation.runAction(this.animToDie);
			break;
	}
	
	this.layer.addChild(this.currentAnimation);
};

KillCommand.prototype.update = function(dt){

	if(!this.mustAppear || this.currentAnimation.getOpacity() == 255)
		return;
		
	this.firstStepTimer += dt;
	
	//Appear only if in apparition phase.
	if(this.firstStepTimer >= Constants.HUD.Inventory.KillCommand.Time.APPARITION)
	{
		var tmpAlpha = this.currentAnimation.getOpacity();
		tmpAlpha += this.alphaStep*dt;
		
		if(tmpAlpha > 255)
			this.currentAnimation.setOpacity(255);
		else
			this.currentAnimation.setOpacity(this.currentAnimation.getOpacity() + this.alphaStep*dt);
	}

};

//Reset anim.
KillCommand.prototype.reset = function(){
			
	this.layer.removeChild(this.currentAnimation);
	
	this.animToDie._animation.setLoops(0);
	
	//Reset opcaity to 0.
	this.currentAnimation.setOpacity(0);
	this.firstStepTimer = 0;
	this.mustAppear = false;
	
	this.currentAnimation.runAction(this.animToDie);
	
	this.layer.addChild(this.currentAnimation);
};