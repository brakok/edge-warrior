var Player = function (x, y, color) {
	this.color = color;
	
	this.currentBlock = BlockType.NEUTRAL;
	this.nextBlock = BlockType.COLORED;
	
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

Player.prototype.getPosition = function(){
	return this.currentAnimation.getPosition();
};

Player.prototype.setPosition = function(x, y){
	this.currentAnimation.setPosition(new cc.Point(x, y));
};

Player.prototype.fromServer = function(data){
	this.setPosition(data.x, data.y);
};