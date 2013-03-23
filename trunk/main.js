/*
document.oncontextmenu = function() {
    return false;
}
*/

(function () {
	var doc = document;
	var coco = {
		COCOS2D_DEBUG:2,
		box2d:false,
		showFPS:true,
		frameRate:60,
		tag:'gameCanvas',
		engineDir:'source/lib/Cocos2d/cocos2d/',
		appFiles:['source/block.js',
				  'source/player.js']
	};
	
	window.addEventListener('DOMContentLoaded', function (){
		var script = doc.createElement('script');
		script.src = coco.engineDir + 'platform/jsloader.js';
		doc.body.appendChild(script);

		document.ccConfig = coco;
		
		script.id = 'cocos2d-html5';
	});
})();