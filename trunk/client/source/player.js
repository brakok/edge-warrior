var Player = function (x, y, color) {
	this.color = color;
	
	this.currentBlock = BlockType.NEUTRAL;
	this.nextBlock = BlockType.COLORED;
	this.givenBlock = null;
	
	this.blockTypeAvailable = [];
	this.blockTypeAvailable.push(new BlockOption(BlockType.NEUTRAL, 25));
	
	this.blockStorage = {
		option1: null,
		option2: null
	};
	
	this.facing = Facing.LEFT;
	
	var colorText = 'yellow';
	
	//Load plist and animation sheets.
    cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsPlayerDir + colorText + '_idle.plist', 
												      assetsPlayerDir + colorText + '_idle.png');	
													  
	cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsPlayerDir + colorText + '_running.plist', 
												      assetsPlayerDir + colorText + '_running.png');
	
	cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsPlayerDir + colorText + '_jumping.plist', 
												      assetsPlayerDir + colorText + '_jumping.png');
	
	//Set current animation to idle.
	this.currentAnimationType = AnimType.IDLE;	
	this.currentAction = ActionType.STANDING;
	
	//Base frame.
	this.currentAnimation = cc.Sprite.createWithSpriteFrameName(colorText + '_idle.0000.png');
	this.currentAnimation.setPosition(new cc.Point(x, y));
		
	//Idle.
	var idleAnimFrames = [];
	var str = "";
	for (var i = 0; i < 24; i++) {
		str = colorText + "_idle." + (i < 10 ? ("000" + i) : ('00' + i)) + ".png";
		var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
		idleAnimFrames.push(frame);
	}
	
	//Creation of the idle animation.
	var animation = cc.Animation.create(idleAnimFrames, 0.042);
	this.idleAnimation = cc.Animate.create(animation);
	
	//Running cycle.
	var runningAnimFrames = [];
	for (var i = 24; i < 48; i++) {
		str = colorText + "_running.00" + i + ".png";
		var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
		runningAnimFrames.push(frame);
	}
	
	//Creation of the running cycle.
	animation = cc.Animation.create(runningAnimFrames, 0.042);
	this.runningAnimation = cc.Animate.create(animation);
	
	//Jumping.
	var jumpingAnimFrames = [];
	for (var i = 49; i < 60; i++) {
		str = colorText + "_jumping.00" + i + ".png";
		var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
		jumpingAnimFrames.push(frame);
	}
	
	//Creation of the jumping animation.
	animation = cc.Animation.create(jumpingAnimFrames, 0.042);
	this.jumpingAnimation = cc.Animate.create(animation);
	
	//Starting animation is idle.
	this.currentAnimation.runAction(cc.RepeatForever.create(this.idleAnimation));
}

//Add a block as the current block from an extern source.
Player.prototype.addNextBlock = function(blockType){
	this.givenBlock = blockType;
	Client.hud.inventory.setBlocks(new Block(0,0, this.givenBlock, this.color), new Block(0,0, this.currentBlock, this.color));
};

//Ask player to randomize next block in the list.
Player.prototype.pushNextBlock = function(){
	
	if(this.givenBlock == null)
	{
		this.currentBlock = this.nextBlock;
			
		var rnd = Math.round(Math.random()*100);
		var found = false;
		var min = 0;
		
		var end = this.blockTypeAvailable.length;
		var i = 0;
		
		//Loop through block types available to the player to initiate next command.
		while(i < end && !found)
		{
			if(rnd <= (this.blockTypeAvailable[i].percent + min))
			{
				this.nextBlock = this.blockTypeAvailable[i].type;
				found = true;
			}
			
			min += this.blockTypeAvailable[i].percent;
			i++;
		}
		
		//Colored if not found.
		if(!found)
			this.nextBlock = BlockType.COLORED;
	}
	else
		this.givenBlock = null;

	//Push the new block to the HUD.
	Client.hud.inventory.pushBlock(new Block(0,0,this.nextBlock, this.color));
};

Player.prototype.getPosition = function(){
	return this.currentAnimation.getPosition();
};

Player.prototype.setPosition = function(x, y){
	this.currentAnimation.setPosition(new cc.Point(x, y));
};

Player.prototype.fromServer = function(data){
	this.setPosition(data.x, data.y);
		
	if(data.action != this.currentAction)
	{
		//Assign good animation to the right action.
		switch(data.action)
		{
			case ActionType.STANDING:
				this.swapAnimation(AnimType.IDLE);
				break;
			case ActionType.RUNNING:
				this.swapAnimation(AnimType.RUNNING);
				break;
			case ActionType.JUMPING:
			case ActionType.DOUBLE_JUMPING:
				this.swapAnimation(AnimType.JUMPING);
				break;
			case ActionType.FALLING:
				this.swapAnimation(AnimType.FALLING);
				break;
		}
		
		this.currentAction = data.action;
	}
	
	if(data.facing != this.facing)
	{
		this.facing = data.facing;
		this.turn();
	}
};

Player.prototype.die = function() {
	Client.layer.removeChild(this.currentAnimation);
};

Player.prototype.turn = function(){
	//Flip the sprite to current direction.
	this.currentAnimation.setFlipX(this.facing == Facing.RIGHT);
};

Player.prototype.spawn = function(x, y){
	this.setPosition(x, y);
	Client.layer.addChild(this.currentAnimation);
};

Player.prototype.swapAnimation = function(newAnim){
	
	if(newAnim == this.currentAnimationType && newAnim != AnimType.JUMPING)
		return;
			
	this.currentAnimationType = newAnim;
	Client.layer.removeChild(this.currentAnimation);
	
	switch(newAnim)
	{
		case AnimType.IDLE:
			this.currentAnimation.runAction(cc.RepeatForever.create(this.idleAnimation));
			break;
		case AnimType.RUNNING:
			this.currentAnimation.runAction(cc.RepeatForever.create(this.runningAnimation));
			break;
		case AnimType.JUMPING:
			this.currentAnimation.runAction(this.jumpingAnimation);
			break;
		case AnimType.FALLING:
			this.currentAnimation.runAction(this.jumpingAnimation);
			break;
	}

	Client.layer.addChild(this.currentAnimation);
};

