//Resize canvas to fit whole window.
(function () {

	var w = window,
		d = document,
		e = d.documentElement,
		g = d.getElementsByTagName('body')[0],
		x = w.innerWidth || e.clientWidth || g.clientWidth,
		y = w.innerHeight|| e.clientHeight|| g.clientHeight;
		
	document.getElementById('gameCanvas').width = x;
	document.getElementById('gameCanvas').height = y - 25; //25 = Top offset due to top-right action.
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
	
		this.MenuScene = new MenuScene();
		this.GameScene = new GameScene();
	
		var director = cc.Director.getInstance();
		director.setDisplayStats(this.config['showFPS']);
		director.setAnimationInterval(1.0/this.config['frameRate']);
		director.runWithScene(this.MenuScene);
		
		return true;
	}
});

//Launch the first scene.
var myApp = new cocosApp();