(function(){
	var canvas = document.getElementById('gameCanvas');
	canvas.width = Constants.Video.Canvas.ORIGINAL_WIDTH;
	canvas.height = Constants.Video.Canvas.ORIGINAL_HEIGHT;
	
	var cmdExit = document.getElementById('cmdExit');
	cmdExit.onclick = function(){
		chrome.app.window.current().close();
	};
})();

requirejs.config({
    baseUrl: 'source'
});

var s = new P2PServer(Constants.Network.SERVER_UDP_PORT,Constants.Network.UDP_PORT, Constants.Network.SERVER_TCP_PORT);
s.register(function(socket){
	socket.on('test', function(data){
		console.log('test :');
		console.log(data);
	});
});

setTimeout(function(){
	var cs  = new P2PSocket(Constants.Network.UDP_PORT);
	cs.connect("127.0.0.1", Constants.Network.SERVER_UDP_PORT, Constants.Network.SERVER_TCP_PORT);
	

	setTimeout(function(){
		cs.emit('test', {bonjour: 1});
	}, 500);

	
}, 2000);

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