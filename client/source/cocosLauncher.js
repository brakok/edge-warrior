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
		appFiles:['source/network/socket.io.js',
				  'source/blockOption.js',
				  'source/network/client.js',
				  'source/block.js',
				  'source/player.js',
				  'source/gameScene.js',
				  'source/Resources.js',
				  'source/hud.js']
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