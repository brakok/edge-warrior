
var MenuScreens = new function(){

	this.login = null;
	this.mainMenu = null;
	this.lobbyScreen = null;
	this.serverList = null;
		
	this.init = function(width, height){

		if(this.login == null)
		{
			this.login = Login.create(width, height);
			this.mainMenu = MainMenu.create(width, height);
			this.lobbyScreen = LobbyScreen.create(width, height);
			this.serverList = ServerList.create(width, height);
			this.optionsScreen = OptionsScreen.create(width, height, function() { myApp.MenuScene.menu.switchTo(MenuScreens.mainMenu); });
		}
	};
	
	this.switchTo = function(menu){
		myApp.MenuScene.menu.switchTo(menu);
	};
};