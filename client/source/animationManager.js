
var AnimationManager = {
	init: function(){

		//Load spritesheets.
		//Winner goal.
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsWinningGoalDir + 'floatingBall_idle.plist', 
														  assetsWinningGoalDir + 'floatingBall_idle.png');
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsWinningGoalDir + 'floatingBall_action.plist', 
														  assetsWinningGoalDir + 'floatingBall_action.png');
														  
		//Energy spike.
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsEffectDir + 'EnergySpike_tentacle.plist', 
														  assetsEffectDir + 'EnergySpike_tentacle.png');
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsEffectDir + 'EnergySpike_twisted.plist', 
														  assetsEffectDir + 'EnergySpike_twisted.png');
															  
		//Player.
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsPlayerDir + 'yellow_idle.plist', 
														  assetsPlayerDir + 'yellow_idle.png');	
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsPlayerDir + 'yellow_running.plist', 
														  assetsPlayerDir + 'yellow_running.png');
		
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsPlayerDir + 'yellow_jumping.plist', 
														  assetsPlayerDir + 'yellow_jumping.png');
														  
		//Kill command.
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsHudDir + 'killCommand.plist', 
														  assetsHudDir + 'killCommand.png');
	},
	create: function(spriteName, start, end, fps){
			
		//Idle.
		var animFrames = [];
		var str = '';
		for (var i = start; i < end; i++) {
			str = spriteName + '.' + (i < 10 ? ('000' + i) : ( i < 100 ? ('00' + i) : ('0' + i))) + '.png';
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
			animFrames.push(frame);
		}
		
		//Creation of the idle animation.
		var animation = cc.Animation.create(animFrames, 1/fps);
		return cc.Animate.create(animation);
	}	
};