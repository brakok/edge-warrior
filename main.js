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
	ctor:function(scene){
		this._super();
		this.startScene = scene;
		cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
		cc.setup(this.config['tag']);
		cc.Loader.getInstance().onloading = function () {
			cc.Loader.shareLoaderScene().draw();
		};
		cc.Loader.getInstance().onload = function (){
			cc.AppController.shareAppController().didFinishLaunchingWithOptions();
		};
		cc.Loader.getInstance().preload([]);
	},
	applicationDidFinishLaunching: function (){
		var director = cc.Director.getInstance();
		director.setDisplayStats(this.config['showFPS']);
		director.setAnimationInterval(1.0/this.config['frameRate']);
		director.runWithScene(new this.startScene());
		
		return true;
	}
});

var myApp = new cocosApp(gameScene);
