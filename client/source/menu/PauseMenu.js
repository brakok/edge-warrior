
var PauseMenu = cc.LayerColor.extend({
	init: function(width, height){
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(0, 0, 0, 255), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));
		
		//Create another layer. Used to close menu wherever player is.
		this.home = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));
		
		this._zOrder = Constants.PauseMenu.Z_INDEX;
		
		//Set options' screen.
		this.optionsScreen = OptionsScreen.create(width, height, function(){ Client.game.pauseMenu.switchTo(Client.game.pauseMenu.home);});

		//Menu creation.
		this.cmdOptions = new cc.MenuItemFont.create("Options", this.toOptions, this);
		this.cmdDisconnect = new cc.MenuItemFont.create("Disconnect", this.disconnect, this);
		this.cmdClose = new cc.MenuItemFont.create("Close", this.close, this);
		
		this.cmdOptions.setPosition(new cc.Point(width*0.5, (height*0.5)+50));
		this.cmdDisconnect.setPosition(new cc.Point(width*0.5, height*0.5));
		this.cmdClose.setPosition(new cc.Point(width*0.5, (height*0.5)-50));
		
		this.menu = new cc.Menu.create(this.cmdOptions, this.cmdDisconnect, this.cmdClose);
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
	toOptions: function(){
		this.switchTo(this.optionsScreen);
	},
	disconnect: function(){
		Client.disconnect();
	},
	close: function(){
		this.reset();
		Client.game.unpause();
	},
	reset: function(){
		this.switchTo(this.home);
	}
});

PauseMenu.create = function(width, height){
	
	var layer = new PauseMenu();
	layer.init(width, height);
	
	return layer;
};