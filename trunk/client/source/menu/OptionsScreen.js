

var OptionsScreen = cc.LayerColor.extend({
	init: function(width, height, backAction){
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(0, 0, 0, 255), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));
		
		this._zOrder = Constants.OptionsScreen.Z_INDEX;
				
		//Create main layer.
		this.home = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));
		
		//Sub-menus.
		this.submenus = {
			keysScreen: KeysScreen.create(width, height, this)
		};
		
		//Menu creation.
		this.cmdKeys = new cc.MenuItemFont.create("Keys", this.toKeys, this);
		this.cmdScreen = new cc.MenuItemFont.create("Resolution", this.toResolution, this);
		this.cmdBack = new cc.MenuItemFont.create("Back", backAction);
		
		this.cmdKeys.setPosition(new cc.Point(width*0.5, (height*0.5)+50));
		this.cmdScreen.setPosition(new cc.Point(width*0.5, height*0.5));
		this.cmdBack.setPosition(new cc.Point(width*0.5, (height*0.5)-50));
		
		this.menu = new cc.Menu.create(this.cmdKeys, this.cmdScreen, this.cmdBack);
		this.menu.setPosition(new cc.Point(0,0));

		//Add elements.
		this.home.addChild(this.menu);
		this.addChild(this.home);
		
		this.currentScreen = this.home;
	},
	onEntering: function(){

	},
	onLeaving: function(){

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
	toResolution: function(){
	
	}
});

OptionsScreen.create = function(width, height, backAction){
	
	var layer = new OptionsScreen();
	layer.init(width, height, backAction);
	
	return layer;
};