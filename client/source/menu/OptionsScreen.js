

var OptionsScreen = cc.LayerColor.extend({
	init: function(width, height, backAction){
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(0, 0, 0, 255), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));
		
		this._zOrder = Constants.Menu.OptionsScreen.Z_INDEX;
		
		//Create background.
		this.background = cc.Sprite.create(assetsMenuDir + 'options_background.png');
		this.background.setPosition(new cc.Point(this.width*0.5, this.height*0.5));
		this.background._zOrder = Constants.Menu.BACKGROUND_Z_INDEX;
				
		//Create main layer.
		this.home = cc.LayerColor.create(new cc.Color4B(255, 255, 255, 0), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));
		
		//Sub-menus.
		this.submenus = {
			keysScreen: KeysScreen.create(width, height, this),
			videoScreen: VideoScreen.create(width, height, this)
		};
		
		//Menu creation.
		this.cmdKeys = new cc.MenuItemFont.create("KEYS", this.toKeys, this);
		this.cmdVideo = new cc.MenuItemFont.create("VIDEO", this.toVideo, this);
		this.cmdBack = new cc.MenuItemFont.create("BACK", backAction);
		
		this.cmdKeys.setPosition(new cc.Point(this.width*0.38, this.height*0.58));
		this.cmdVideo.setPosition(new cc.Point(this.width*0.6, this.height*0.41));
		this.cmdBack.setPosition(new cc.Point(this.width*0.83, this.height*0.2));
		
		this.menu = new cc.Menu.create(this.cmdKeys, this.cmdVideo, this.cmdBack);
		this.menu.setPosition(new cc.Point(0,0));
		this.menu.setColor(new cc.Color3B(0,0,0));

		//Add elements.
		this.home.addChild(this.background);
		this.home.addChild(this.menu);
		this.addChild(this.home);
		
		this.currentScreen = this.home;
	},
	onEntering: function(){

	},
	onLeaving: function(){
		this.submenus.keysScreen.onLeaving();
		this.submenus.videoScreen.onLeaving();
		
		this.switchTo(this.home);
	},
	switchTo: function(menu){
	
		if(this.currentScreen != null)
		{
			if(this.currentScreen.onLeaving != null && this.currentScreen.onLeaving != 'undefined')
				this.currentScreen.onLeaving();
			
			this.removeChild(this.currentScreen);
		}
			
		this.addChild(menu);
		this.currentScreen = menu;
		
		if(this.currentScreen.onEntering != null && this.currentScreen.onEntering != 'undefined')
			this.currentScreen.onEntering();
		
	},
	toKeys: function(){
		this.switchTo(this.submenus.keysScreen);
	},
	toVideo: function(){
		this.switchTo(this.submenus.videoScreen);
	},
	resize: function(){
		this.submenus.keysScreen.resize();
		this.submenus.videoScreen.resize();
	}
});

OptionsScreen.create = function(width, height, backAction){
	
	var layer = new OptionsScreen();
	layer.init(width, height, backAction);
	
	return layer;
};