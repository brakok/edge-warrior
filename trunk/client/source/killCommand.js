
//Animation shown in HUD for the kill command.
var KillCommand = function(offset, y, screenWidth, layer){
		this.x = screenWidth - offset;
		this.y = y;
		this.layer = layer;
		
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
		
		//Creation of the first step animation.
		var animation = cc.Animation.create(toDieFrames, 0.042);
		this.animToDie = cc.Animate.create(animation);
		
		var toBlockFrames = [];
		var str = '';
		for (var i = 120; i < 216; i++) {
			str = 'killCommand.' + '0' + i + '.png';
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
			toBlockFrames.push(frame);
		}
		
		//Creation of the second step animation. Must be hold for 5 seconds for all animation.
		animation = cc.Animation.create(toBlockFrames, 0.052);
		this.animToBlock = cc.Animate.create(animation);
		
		this.animToDie._animation._loops = 0;
		this.currentAnimation.runAction(this.animToDie);
		
		this.layer.addChild(this.currentAnimation);
};

//Start anim related to specified step.
KillCommand.prototype.start = function(stepReached){
	this.layer.removeChild(this.currentAnimation);
	
	switch(stepReached)
	{
		case StepReached.STANDING:
			this.animToDie._animation._loops = 1;
			this.currentAnimation.runAction(this.animToDie);
			break;
		case StepReached.PLAYER:
			this.currentAnimation.runAction(this.animToBlock);
			break;
	}
	
	this.layer.addChild(this.currentAnimation);
};

//Reset anim.
KillCommand.prototype.reset = function(){
			
	this.layer.removeChild(this.currentAnimation);
	
	this.animToDie._animation._loops = 0;
	this.currentAnimation.runAction(this.animToDie);
	
	this.layer.addChild(this.currentAnimation);
};