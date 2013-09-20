(function(){
	var canvas = document.getElementById('gameCanvas');
	canvas.width = 1920;
	canvas.height = 1280;
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
				
		cc.Loader.getInstance().onloading = function () {
			cc.LoaderScene.getInstance().draw();
		};
		
		cc.Loader.getInstance().onload = function (){
			cc.AppController.shareAppController().didFinishLaunchingWithOptions();
		};
		cc.Loader.getInstance().preload(assets);
	},
	applicationDidFinishLaunching: function (){
		
		Options.init();
		
		this.MenuScene = new MenuScene();
		this.GameScene = new GameScene();
		
		//Load spritesheets and other graphical stuffs.
		AnimationManager.init();
		
		var director = cc.Director.getInstance();
		director.setDisplayStats(this.config['showFPS']);
		director.setAnimationInterval(1.0/this.config['frameRate']);
		director.runWithScene(this.MenuScene);

		return true;
	}
});

//Launch the first scene.
var myApp = new cocosApp();