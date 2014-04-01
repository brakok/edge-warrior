
var Menu = cc.Layer.extend({
	init: function(){
		this._super();
		
		this.currentScreen = null;
				
		var s = cc.Director.getInstance().getWinSize();			
		MenuScreens.init(s.width, s.height);

		//Create loading screen for client if it doesn't exist yet.
		if(Client.loadingScreen == null)
			Client.loadingScreen = LoadingScreen.create(s.width, s.height);
		
		//Switch to another screen.
		this.switchTo(Client.username == null ? MenuScreens.login : MenuScreens.mainMenu);
		
		this.setKeyboardEnabled(true);
		
		return this;
	},
	switchTo: function(menu){

		//Remove current menu.
		this.unload();
			
		this.addChild(menu);
		this.currentScreen = menu;
		
		if(this.currentScreen.onEntering != null && this.currentScreen.onEntering != 'undefined')
			this.currentScreen.onEntering();
	},
	onKeyDown: function(e){
		if(this.currentScreen != null && this.currentScreen.onKeyDown != null && this.currentScreen.onKeyDown != 'undefined')
		{
			if(e > 96 && e < 106)
				e -= 48;
		
			this.currentScreen.onKeyDown(e);	
		}
	},
	onKeyUp: function(e){
		if(this.currentScreen != null && this.currentScreen.onKeyDown != null && this.currentScreen.onKeyDown != 'undefined')
		{
			if(e > 96 && e < 106)
				e -= 48;
		
			this.currentScreen.onKeyUp(e);
		}
	},
	unload: function(){
	
		if(this.currentScreen != null)
		{
			if(this.currentScreen.onLeaving != null && this.currentScreen.onLeaving != 'undefined')
				this.currentScreen.onLeaving();
			
			this.removeChild(this.currentScreen);
			this.currentScreen = null;
		}
	}
});

var MenuScene = cc.Scene.extend({
	onEnter: function (){
		this._super();
		
		this.menu = new Menu();
		this.menu.init();
		
		this.addChild(this.menu);
		
		AudioManager.stopAllEffects();
		
		if(Options.resolution.isFullscreen)
		{
			//Show exit button.
			var exit = document.getElementById('exit');
			exit.style.display = 'block';
		}
	},
	onExit: function(){
		this.menu.unload();
		this.removeChild(this.menu);
		
		//Hide exit button.
		var exit = document.getElementById('exit');
		exit.style.display = 'none';
	}
});