(function () {
	var doc = document;
	
	//Create Cocos2d confguration.
	var config = {
		COCOS2D_DEBUG:2,
		box2d:false,
		showFPS:true,
		frameRate:60,
		tag:'gameCanvas',
		engineDir:'source/lib/Cocos2d/cocos2d/',
		appFiles:['source/constants/Constant.js',
				  'source/constants/Enum.js',
				  'source/network/socket.io.js',
				  'source/common/HtmlHelper.js',
				  'source/Resources.js',
				  
				  'source/playground/Block.js',
				  'source/playground/Player.js',
				  'source/playground/world/Wall.js',
				  'source/playground/world/Floor.js',
				  'source/playground/winnerGoal/FloatingBall.js',
				  'source/playground/Eclipse.js',
				  
				  'source/playground/skills/SkillInfo.js',
				  'source/playground/skills/SkillDescription.js',
				  
				  'source/settings/GameSettings.js',
				  'source/settings/Keys.js',
				  'source/playground/skills/SkillSet.js',
				  'source/settings/Options.js',
				  'source/menu/elements/SkillList.js',
				  'source/menu/elements/SkillSummary.js',
				  'source/menu/elements/SkillSlot.js',
				  'source/menu/elements/Slot.js',
				  'source/menu/elements/ColorBox.js',
				  'source/menu/elements/CheckBox.js',
				  'source/menu/elements/LobbyList.js',
				  'source/menu/elements/KeyForm.js',
				  'source/menu/elements/KeyInput.js',
				  'source/playground/BlockOption.js',
				  'source/playground/Camera.js',
				  
				  'source/network/client.js',
				  'source/network/Profile.js',
				  
				  'source/scene/GameScene.js',
				  'source/scene/MenuScene.js',
				  'source/menu/MenuScreens.js',
				  'source/menu/LobbyScreen.js',
				  'source/menu/Credits.js',
				  'source/menu/RulesScreen.js',
				  'source/menu/Login.js',
				  'source/menu/ChangePassword.js',
				  'source/menu/ResetPassword.js',
				  'source/menu/CreateAccount.js',
				  'source/menu/MainMenu.js',
				  'source/menu/ServerList.js',
				  'source/menu/EndScreen.js',
				  'source/menu/PauseMenu.js',
				  'source/menu/OptionsScreen.js',
				  'source/menu/KeysScreen.js',
				  'source/menu/VideoScreen.js',
				  'source/menu/SkillScreen.js',
				  'source/menu/LoadingScreen.js',
				  
				  'source/playground/Game.js',
				  'source/playground/hud/Inventory.js',
				  'source/playground/manager/AnimationManager.js',
				  'source/playground/manager/AudioManager.js',
				  
				  'source/playground/hud/KillCommand.js',
				  'source/playground/hud/SkillStore.js',
				  'source/playground/hud/SkillItem.js',
				  
				  'source/playground/particles/Particle.js',
				  'source/playground/particles/ParticleEmitter.js',
				  
				  'source/playground/deathzones/Missile.js',
				  'source/playground/deathzones/Spike.js',
				  'source/playground/deathzones/Jaw.js',
				  
				  'source/playground/manager/EffectManager.js',
				  'source/playground/manager/ElementManager.js',
				  'source/playground/manager/ParticleManager.js',
				  'source/playground/Effect.js',
				  'source/playground/world/BlackBox.js',
				  'source/playground/world/World.js',
				  'source/playground/world/WorldInfo.js',
				  'source/playground/LightBall.js',
				  'source/playground/Voice.js',
				  'source/playground/hud/Hud.js',
				  'source/playground/world/Background.js']
	};
	
	//Add event that load everything needed by Cocos2d.
	window.addEventListener('DOMContentLoaded', function (){
		var script = doc.createElement('script');
		script.src = config.engineDir + 'jsloader.js';
		doc.body.appendChild(script);
		script.id = 'cocos2d-html5';	

		document.ccConfig = config;
	});
})();