
var Menu = cc.Layer.extend({
	init: function(){
		this._super();
		
		this.currentScreen = null;
		
		//Screens creation.
		var s = cc.Director.getInstance().getWinSize();
		
		this.screens = {
			login: Login.create(s.width, s.height),
			mainMenu: MainMenu.create(s.width, s.height)
		};
		
		//Switch to another screen.
		this.switchTo(this.screens.login);
		
		this.setKeyboardEnabled(true);
		
		return this;
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
	onKeyDown: function(e){
		if(this.currentScreen != null && this.currentScreen.onKeyDown != null && this.currentScreen.onKeyDown != 'undefined')
			this.currentScreen.onKeyDown(e);
	},
	onKeyUp: function(e){
		if(this.currentScreen != null && this.currentScreen.onKeyDown != null && this.currentScreen.onKeyDown != 'undefined')
			this.currentScreen.onKeyUp(e);
	}
});

var MenuScene = cc.Scene.extend({
	onEnter: function (){
		this._super();
		
		this.menu = new Menu();
		this.menu.init();
		
		this.addChild(this.menu);
	}
});