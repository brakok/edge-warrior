var Player = function (x, y, color) {
	this.color = color;
	
	this.currentBlock = Enum.Block.Type.NEUTRAL;
	this.nextBlock = Enum.Block.Type.COLORED;
	this.givenBlock = null;
	
	this.isAlive = true;
	this.hasWon = false;
	
	this.blockTypeAvailable = [];
	this.blockTypeAvailable.push(new BlockOption(Enum.Block.Type.NEUTRAL, Constants.Block.Percent.STARTING_NEUTRAL));
	
	this.blockStorage = {
		option1: null,
		option2: null
	};
}

//Change percent on a specific option. Negative percent lowers actual one.
Player.prototype.changePercent = function(blockType, percent){

	for(var i in this.blockTypeAvailable)
	{
		if(this.blockTypeAvailable[i].type == blockType)
			this.blockTypeAvailable[i].percent += percent;
	}
};

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
			this.nextBlock = Enum.Block.Type.COLORED;
	}
	else
		this.givenBlock = null;

	//Push the new block to the HUD.
	Client.hud.inventory.pushBlock(new Block(0,0,this.nextBlock, this.color));
};

Player.prototype.init = function(){

	this.facing = Enum.Facing.LEFT;
	
	var colorText = 'yellow';
	
	
	switch(this.color)
	{
		case Enum.Color.RED:
			colorText = 'red';
			break;
		case Enum.Color.BLUE:
			colorText = 'blue';
			break;
		case Enum.Color.WHITE:
			//colorText = 'white';
			break;
	}
	
	//Set current animation to idle.
	this.currentAnimationType = Enum.Anim.Type.IDLE;	
	this.currentAction = Enum.Action.Type.STANDING;

	//Base frame.
	this.currentAnimation = cc.Sprite.createWithSpriteFrameName(colorText + '_idle.0000.png');
	this.setPosition(this.x, this.y);
			
	//Creation of the animations.
	this.idleAnimation = AnimationManager.create(colorText + '_idle', 0, 24, 24);
	this.runningAnimation = AnimationManager.create(colorText + '_running', 24, 48, 24);
	this.jumpingAnimation = AnimationManager.create(colorText + '_jumping', 49, 60, 24);
	
	//Starting animation is idle.
	this.currentAnimation.runAction(cc.RepeatForever.create(this.idleAnimation));
	Client.layer.addChild(this.currentAnimation);
};

Player.prototype.getPosition = function(){
	return this.currentAnimation.getPosition();
};

Player.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
};

Player.prototype.update = function(){
	Client.camera.project(this.currentAnimation, this.x, this.y, 0.5, 0.5);
};

Player.prototype.execute = function(action){

	//Assign good animation to the right action.
	switch(action)
	{
		case Enum.Action.Type.STANDING:
			this.swapAnimation(Enum.Anim.Type.IDLE);
			break;
		case Enum.Action.Type.RUNNING:
			this.swapAnimation(Enum.Anim.Type.RUNNING);
			break;
		case Enum.Action.Type.JUMPING:
			this.swapAnimation(Enum.Anim.Type.JUMPING);
			break;
		case Enum.Action.Type.DOUBLE_JUMPING:
			this.swapAnimation(Enum.Anim.Type.JUMPING);
			
			//Trigger double jump effect.
			EffectManager.create(Enum.Effect.Type.DOUBLE_JUMP, this.x, this.y - Constants.Effect.DoubleJump.OFFSET);
			break;
		case Enum.Action.Type.FALLING:
			this.swapAnimation(Enum.Anim.Type.FALLING);
			break;
	}
	
	this.currentAction = action;
};

Player.prototype.fromServer = function(data){
	this.setPosition(data.x, data.y);
			
	if(data.facing != this.facing)
	{
		this.facing = data.facing;
		this.turn();
	}
};

Player.prototype.die = function() {
	Client.layer.removeChild(this.currentAnimation);
	
	//Create an animation for the dying player.
	EffectManager.create(Enum.Effect.Type.PLAYER_DEATH, this.x, this.y);
	AudioManager.playSound(Constants.Sound.File.Player.DEATH);
	
	this.isAlive = false;
};

Player.prototype.win = function(){
	Client.layer.removeChild(this.currentAnimation);
	this.hasWon = true;
};

Player.prototype.turn = function(){
	//Flip the sprite to current direction.
	this.currentAnimation.setFlipX(this.facing == Enum.Facing.RIGHT);
};

Player.prototype.spawn = function(x, y){
	this.setPosition(x, y);
	Client.layer.addChild(this.currentAnimation);
	this.isAlive = true;
};

Player.prototype.swapAnimation = function(newAnim){
	
	if(newAnim == this.currentAnimationType && newAnim != Enum.Anim.Type.JUMPING)
		return;
			
	this.currentAnimationType = newAnim;
	Client.layer.removeChild(this.currentAnimation);
	
	switch(newAnim)
	{
		case Enum.Anim.Type.IDLE:
			this.currentAnimation.runAction(cc.RepeatForever.create(this.idleAnimation));
			break;
		case Enum.Anim.Type.RUNNING:
			this.currentAnimation.runAction(cc.RepeatForever.create(this.runningAnimation));
			break;
		case Enum.Anim.Type.JUMPING:
			this.currentAnimation.runAction(this.jumpingAnimation);
			break;
		case Enum.Anim.Type.FALLING:
			this.currentAnimation.runAction(this.jumpingAnimation);
			break;
	}

	Client.layer.addChild(this.currentAnimation);
};

