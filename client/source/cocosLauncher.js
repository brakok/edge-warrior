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
				  'source/menu/elements/Slot.js',
				  'source/menu/elements/ColorBox.js',
				  'source/menu/elements/CheckBox.js',
				  'source/menu/elements/LobbyList.js',
				  'source/playground/BlockOption.js',
				  'source/playground/Camera.js',
				  'source/network/client.js',
				  'source/playground/Block.js',
				  'source/playground/Player.js',
				  'source/playground/world/Wall.js',
				  'source/playground/world/Floor.js',
				  'source/playground/winnerGoal/FloatingBall.js',
				  'source/layer/GameScene.js',
				  'source/layer/MenuScene.js',
				  'source/menu/Screens.js',
				  'source/menu/LobbyScreen.js',
				  'source/menu/Login.js',
				  'source/menu/MainMenu.js',
				  'source/menu/ServerList.js',
				  'source/Resources.js',
				  'source/playground/Game.js',
				  'source/playground/hud/Inventory.js',
				  'source/playground/manager/AnimationManager.js',
				  'source/playground/manager/AudioManager.js',
				  'source/playground/hud/KillCommand.js',
				  'source/playground/Missile.js',
				  'source/playground/Spike.js',
				  'source/playground/manager/EffectManager.js',
				  'source/playground/Effect.js',
				  'source/playground/world/BlackBox.js',
				  'source/playground/LightBall.js',
				  'source/playground/Voice.js',
				  'source/setup/GameSettings.js',
				  'source/playground/hud/Hud.js',
				  'source/layer/EndScreen.js',
				  'source/playground/world/Background.js']
	};
	
	//Add event that load everything needed by Cocos2d.
	window.addEventListener('DOMContentLoaded', function (){
		var script = doc.createElement('script');
		script.src = config.engineDir + 'platform/jsloader.js';
		doc.body.appendChild(script);
		script.id = 'cocos2d-html5';	

		document.ccConfig = config;
	});
})();