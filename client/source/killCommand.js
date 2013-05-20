
//Animation shown in HUD for the kill command.
var KillCommand = function(offset, y, screenWidth, layer){
		this.x = screenWidth - offset;
		this.y = y;
		this.layer = layer;
		
		this.mustAppear = false;
		this.alphaStep = 255/(Constants.KillCommand.Time.FIRST_STEP - Constants.KillCommand.Time.APPARITION);
		this.firstStepTimer = 0;
		
		//Load plist and animation sheets.
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsHudDir + 'killCommand.plist', 
														  assetsHudDir + 'killCommand.png');
				
		this.currentAnimation = cc.Sprite.createWithSpriteFrameName('killCommand.0000.png');
		this.currentAnimation.setPosition(new cc.Point(this.x, this.y))
		
		var toDieFrames = [];
		var str = "";
		for (var i = 0; i < 120; i++) {
		
			str = "killCommand." + (i < 10 ? ('000' + i) : ( i < 100 ? ('00' + i) : ('0' + i))) + ".png";
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
			toDieFrames.push(frame);
		}
		
		//Creation of the animation.
		var animation = cc.Animation.create(toDieFrames, 0.042);
		this.animToDie = cc.Animate.create(animation);
		
		this.animToDie._animation._loops = 0;
		this.currentAnimation._opacity = 0;
		
		this.currentAnimation.runAction(this.animToDie);
				
		this.layer.addChild(this.currentAnimation);
};

//Start anim related to specified step.
KillCommand.prototype.start = function(stepReached){
	this.layer.removeChild(this.currentAnimation);
	
	switch(stepReached)
	{
		case Enum.StepReached.STANDING:
			this.animToDie._animation._loops = 0;
			
			this.mustAppear = true;
			this.currentAnimation.runAction(this.animToDie);
			break;
		case Enum.StepReached.PLAYER:
			this.animToDie._animation._loops = 1;
			this.currentAnimation.runAction(this.animToDie);
			break;
	}
	
	this.layer.addChild(this.currentAnimation);
};

KillCommand.prototype.update = function(dt){

	if(!this.mustAppear || this.currentAnimation._opacity == 255)
		return;
		
	this.firstStepTimer += dt;
	
	//Appear only if in apparition phase.
	if(this.firstStepTimer >= Constants.KillCommand.Time.FIRST_STEP)
	{
		var tmpAlpha = this.currentAnimation._opacity;
		tmpAlpha += this.alphaStep*dt;
		
		if(tmpAlpha > 255)
			this.currentAnimation._opacity = 255;
		else
			this.currentAnimation._opacity += this.alphaStep*dt;
	}
};

//Reset anim.
KillCommand.prototype.reset = function(){
			
	this.layer.removeChild(this.currentAnimation);
	
	this.animToDie._animation._loops = 0;
	
	//Reset opcaity to 0.
	this.currentAnimation._opacity = 0;
	this.firstStepTimer = 0;
	this.mustAppear = false;
	
	this.currentAnimation.runAction(this.animToDie);
	
	this.layer.addChild(this.currentAnimation);
};