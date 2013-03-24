var Player = function (x, y) {

    cc.SpriteFrameCache.getInstance().addSpriteFrames("placeholders/player_run.plist", "placeholders/player_run.png");
	this.currentFrame = cc.Sprite.createWithSpriteFrameName("player_run_01.png");
	this.currentFrame.setPosition(new cc.Point(x, y));
	
	console.log(this.currentFrame);
}