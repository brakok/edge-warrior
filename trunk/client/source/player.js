var Player = function (x, y, color) {
	this.color = color;
	
	this.currentBlock = BlockType.NEUTRAL;
	this.nextBlock = BlockType.COLORED;
	this.givenBlock = null;
	
	this.blockTypeAvailable = [];
	this.blockTypeAvailable[0] = new BlockOption(BlockType.COLORED, 25, 100);
	
	this.blockStorage = {
		option1: null,
		option2: null
	};
	
    cc.SpriteFrameCache.getInstance().addSpriteFrames("placeholders/player_run.plist", "placeholders/player_run.png");	
	this.currentAnimation = cc.Sprite.createWithSpriteFrameName("player_run_01.png");
	this.currentAnimation.setPosition(new cc.Point(x, y));
		
	//Running cycle.
	var animFrames = [];
	var str = "";
	for (var i = 1; i < 9; i++) {
		str = "player_run_" + (i < 10 ? ("0" + i) : i) + ".png";
		var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
		animFrames.push(frame);
	}
	
	//Creation of the running cycle (placeholder)
	var animation = cc.Animation.create(animFrames, 0.3);
	this.runningAnimation = cc.Animate.create(animation);
	
	this.currentAnimation.runAction(cc.RepeatForever.create(this.runningAnimation));
}

//Add a block as the current block from an extern source.
Player.prototype.addNextBlock = function(blockType){
	console.log(blockType);
	this.givenBlock = blockType;
	Client.hud.setBlocks(new Block(0,0, this.givenBlock, this.color), new Block(0,0, this.currentBlock, this.color));
};

//Ask player to randomize next block in the list.
Player.prototype.pushNextBlock = function(){
	
	if(this.givenBlock == null)
	{
		this.currentBlock = this.nextBlock;
			
		var rnd = Math.round(Math.random()*100);
		var found = false;
		
		//Loop through block types available to the player to initiate next command.
		for(var i in this.blockTypeAvailable)
		{
			if(rnd >= this.blockTypeAvailable[i].min && this.blockTypeAvailable[i].max >= rnd)
			{
				this.nextBlock = this.blockTypeAvailable[i].type;
				found = true;
			}
		}
		
		//Neutral if not found.
		if(!found)
			this.nextBlock = BlockType.NEUTRAL;
	}
	else
		this.givenBlock = null;

	//Push the new block to the HUD.
	Client.hud.pushBlock(new Block(0,0,this.nextBlock, this.color));
};

Player.prototype.getPosition = function(){
	return this.currentAnimation.getPosition();
};

Player.prototype.setPosition = function(x, y){
	this.currentAnimation.setPosition(new cc.Point(x, y));
};

Player.prototype.fromServer = function(data){
	this.setPosition(data.x, data.y);
};

Player.prototype.die = function() {
	Client.layer.removeChild(this.currentAnimation);
};

