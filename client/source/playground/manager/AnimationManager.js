
var AnimationManager = {
	init: function(){

		//Load spritesheets.
		//Winner goal.
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsWinningGoalDir + 'floatingBall_idle.plist', 
														  assetsWinningGoalDir + 'floatingBall_idle.png');
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsWinningGoalDir + 'floatingBall_action.plist', 
														  assetsWinningGoalDir + 'floatingBall_action.png');
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsWinningGoalDir + 'floatingBall_attract.plist', 
														  assetsWinningGoalDir + 'floatingBall_attract.png');
														  
		//Energy spike.
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsEffectDir + 'EnergySpike_tentacle.plist', 
														  assetsEffectDir + 'EnergySpike_tentacle.png');
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsEffectDir + 'EnergySpike_twisted.plist', 
														  assetsEffectDir + 'EnergySpike_twisted.png');
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsEffectDir + 'EnergySpike_transform.plist', 
														  assetsEffectDir + 'EnergySpike_transform.png');
															  
		//Fireball.
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsEffectDir + 'Fireball.plist', 
														  assetsEffectDir + 'Fireball.png');
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsEffectDir + 'Fireball_explosion.plist', 
														  assetsEffectDir + 'Fireball_explosion.png');
		
		//Jaw
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsEffectDir + 'Jaw.plist', 
														  assetsEffectDir + 'Jaw.png');
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsEffectDir + 'JawDisappearing.plist', 
														  assetsEffectDir + 'JawDisappearing.png');												  

		//NPC
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsNpcDir + 'PeskyBox.plist', 
														  assetsNpcDir + 'PeskyBox.png');
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsNpcDir + 'PeskyBoxDisappearing.plist', 
														  assetsNpcDir + 'PeskyBoxDisappearing.png');
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsNpcDir + 'Eyes.plist', 
														  assetsNpcDir + 'Eyes.png');
														  
		//Triggers
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsTriggerDir + 'Deflector_spawn.plist', 
														  assetsTriggerDir + 'Deflector_spawn.png');
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsTriggerDir + 'Deflector_idle.plist', 
														  assetsTriggerDir + 'Deflector_idle.png');
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsTriggerDir + 'Deflector_disappearing.plist', 
														  assetsTriggerDir + 'Deflector_disappearing.png');
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsTriggerDir + 'TimeZone_spawn.plist', 
														  assetsTriggerDir + 'TimeZone_spawn.png');
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsTriggerDir + 'TimeZone_disappearing.plist', 
														  assetsTriggerDir + 'TimeZone_disappearing.png');
		
		//Effects.
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsEffectDir + 'Bounce.plist', 
														  assetsEffectDir + 'Bounce.png');
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsEffectDir + 'PlayerDeath.plist', 
														  assetsEffectDir + 'PlayerDeath.png');
		
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsEffectDir + 'BlockLanding.plist', 
														  assetsEffectDir + 'BlockLanding.png');
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsEffectDir + 'BlockDisappearing.plist', 
														  assetsEffectDir + 'BlockDisappearing.png');
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsEffectDir + 'SwapColor.plist', 
														  assetsEffectDir + 'SwapColor.png');
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsEffectDir + 'DoubleJump.plist', 
														  assetsEffectDir + 'DoubleJump.png');
		
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsEffectDir + 'Spark.plist', 
														  assetsEffectDir + 'Spark.png');
		
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsEffectDir + 'spawn_unleashed.plist', 
														  assetsEffectDir + 'spawn_unleashed.png');
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsEffectDir + 'FirePulse_explosion.plist', 
														  assetsEffectDir + 'FirePulse_explosion.png');
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsEffectDir + 'PickAxeDisappearing.plist', 
														  assetsEffectDir + 'PickAxeDisappearing.png');
														  
		//Player.
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsPlayerDir + 'yellow_idle.plist', 
														  assetsPlayerDir + 'yellow_idle.png');	
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsPlayerDir + 'yellow_running.plist', 
														  assetsPlayerDir + 'yellow_running.png');
		
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsPlayerDir + 'yellow_jumping.plist', 
														  assetsPlayerDir + 'yellow_jumping.png');
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsPlayerDir + 'red_idle.plist', 
														  assetsPlayerDir + 'red_idle.png');	
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsPlayerDir + 'red_running.plist', 
														  assetsPlayerDir + 'red_running.png');
		
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsPlayerDir + 'red_jumping.plist', 
														  assetsPlayerDir + 'red_jumping.png');
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsPlayerDir + 'blue_idle.plist', 
														  assetsPlayerDir + 'blue_idle.png');	
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsPlayerDir + 'blue_running.plist', 
														  assetsPlayerDir + 'blue_running.png');
		
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsPlayerDir + 'blue_jumping.plist', 
														  assetsPlayerDir + 'blue_jumping.png');
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsPlayerDir + 'white_idle.plist', 
														  assetsPlayerDir + 'white_idle.png');
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsPlayerDir + 'white_running.plist', 
														  assetsPlayerDir + 'white_running.png');
														  
		cc.SpriteFrameCache.getInstance().addSpriteFrames(assetsPlayerDir + 'white_jumping.plist', 
														  assetsPlayerDir + 'white_jumping.png');
														  
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