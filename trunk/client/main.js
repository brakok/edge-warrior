(function(){
	var canvas = document.getElementById('gameCanvas');
	canvas.width = Constants.Video.Canvas.ORIGINAL_WIDTH;
	canvas.height = Constants.Video.Canvas.ORIGINAL_HEIGHT;
	
	var cmdExit = document.getElementById('cmdExit');
	cmdExit.onclick = function(){
		chrome.app.window.current().close();
	};
})();

//Cocos2d configuration and instanciation.
var cocosApp = cc.Application.extend({
	config:document.ccConfig,
	ctor:function(){
		this._super();
						
		//Open socket toward server.
		Client.connectToNetwork();
		
		cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
		cc.setup(this.config['tag']);
		
		//Init audio engine.
		cc.AudioEngine.getInstance().init("wav,mp3,ogg");
		cc.AudioEngine.getInstance().setEffectsVolume(Constants.Sound.Effect.VOLUME);
		cc.AudioEngine.getInstance().setMusicVolume(Constants.Sound.Music.VOLUME);
				
		cc.AppController.shareAppController().didFinishLaunchingWithOptions();
	},
	applicationDidFinishLaunching: function (){
		
		this.MenuScene = new MenuScene();
		this.GameScene = new GameScene();

		var director = cc.Director.getInstance();
		director.setDisplayStats(this.config['showFPS']);
		director.setAnimationInterval(1.0/this.config['frameRate']);
		
		cc.Loader.preload(assets, function(){
		
			//Load spritesheets and other graphical stuffs.
			AnimationManager.init();
			director.runWithScene(this.MenuScene);
			Options.init();
		}, this);
		
		return true;
	}
});

//Launch the first scene.
var myApp = new cocosApp();