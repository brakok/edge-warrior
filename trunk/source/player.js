var Player = function (x, y, color) {
	this.color = color;
	
    cc.SpriteFrameCache.getInstance().addSpriteFrames("placeholders/player_run.plist", "placeholders/player_run.png");
	this.runningCycle = cc.Sprite.createWithSpriteFrameName("player_run_01.png");
	this.runningCycle.setPosition(new cc.Point(x, y));
		
	//Running cycle.
	var animFrames = [];
	var str = "";
	for (var i = 1; i < 9; i++) {
		str = "player_run_" + (i < 10 ? ("0" + i) : i) + ".png";
		var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
		animFrames.push(frame);
	}
		
	var animation = cc.Animation.create(animFrames, 0.3);
	var animate = cc.Animate.create(animation);
	this.runningCycle.runAction(cc.RepeatForever.create(animate));
	
	
	this.update = function(){

		var nextX = 0;
	
		if(GameContainer.keys[cc.KEY.a])
		{
			nextX -= 5;
		}
			
		if(GameContainer.keys[cc.KEY.d])
		{
			nextX += 5;
		}
		
		if(nextX != 0)
		{
			var pos = this.runningCycle.getPosition();
			this.runningCycle.setPosition(new cc.Point(pos.x + nextX, pos.y));
		}
			
			
	}
}