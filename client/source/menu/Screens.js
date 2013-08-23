
var MenuScreens = new function(){

	this.login = null;
	this.mainMenu = null;
	this.lobbyScreen = null;
	this.serverList = null;
	
	this.init = function(width, height){

		this.login = Login.create(width, height);
		this.mainMenu = MainMenu.create(width, height);
		this.lobbyScreen = LobbyScreen.create(width, height);
		this.serverList = ServerList.create(width, height);
	};
	
	this.switchTo = function(menu){
		myApp.MenuScene.menu.switchTo(menu);
	};
};