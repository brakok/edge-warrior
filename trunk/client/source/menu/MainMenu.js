
var MainMenu = cc.LayerColor.extend({
	init: function(width, height){
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(0, 0, 0, 255), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));

		this._zOrder = Constants.Menu.MainMenu.Z_INDEX;
		
		//Create background.
		this.background = cc.Sprite.create(assetsMenuDir + 'main_background.png');
		this.background.setPosition(new cc.Point(this.width*0.5, this.height*0.5));
		this.background._zOrder = Constants.Menu.BACKGROUND_Z_INDEX;

		//Menu creation.	
		this.cmdCreate = new cc.MenuItemFont.create("CREATE", this.create, this);
		this.cmdJoin = new cc.MenuItemFont.create("JOIN", this.join, this);
		this.cmdOptions = new cc.MenuItemFont.create("OPTIONS", this.toOptions, this);
		this.cmdSkill = new cc.MenuItemFont.create("SKILLS", this.toSkills, this);
		this.cmdCredits = new cc.MenuItemFont.create("CREDITS", this.toCredits, this);
		this.cmdRules = new cc.MenuItemFont.create("RULES", this.toRules, this);
		
		this.cmdCreate.setPosition(new cc.Point(this.width*0.47, this.height*0.72));
		this.cmdJoin.setPosition(new cc.Point(this.width*0.27, this.height*0.49));
		this.cmdOptions.setPosition(new cc.Point(this.width*0.78, this.height*0.45));
		this.cmdSkill.setPosition(new cc.Point(this.width*0.64, this.height*0.56));
		this.cmdCredits.setPosition(new cc.Point(this.width*0.82, this.height*0.05));
		this.cmdRules.setPosition(new cc.Point(this.width*0.68, this.height*0.25));
		
		//Main menu.
		this.menu = new cc.Menu.create(this.cmdCreate, this.cmdJoin, this.cmdOptions, this.cmdSkill);
		this.menu.setPosition(new cc.Point(0,0));
		this.menu.setColor(new cc.Color3B(0,0,0));
		
		//White menu.
		this.whiteMenu = new cc.Menu.create(this.cmdCredits, this.cmdRules);
		this.whiteMenu.setPosition(new cc.Point(0,0));		
		
		this.cmdLogout = new cc.MenuItemFont.create("LOGOUT", this.logout, this);
		this.cmdLogout.setPosition(new cc.Point(this.width*0.1, this.height*0.87));
		
		//Common command.
		this.commonMenu = new cc.Menu.create(this.cmdLogout);
		this.commonMenu.setPosition(new cc.Point(0,0));

		this.addChild(this.background);
		this.addChild(this.menu);
		this.addChild(this.whiteMenu);
		this.addChild(this.commonMenu);
	},
	create: function(){
		Client.createLobby();
		MenuScreens.switchTo(MenuScreens.lobbyScreen);
	},
	join: function(){
		MenuScreens.switchTo(MenuScreens.serverList);
	},
	logout: function(){
		Client.logout();
	},
	toOptions: function(){
		MenuScreens.switchTo(MenuScreens.optionsScreen);
	},
	toCredits: function(){
		MenuScreens.switchTo(MenuScreens.credits);
	},
	toRules: function(){
		MenuScreens.switchTo(MenuScreens.rulesScreen);
	},
	toSkills: function(){
		MenuScreens.switchTo(MenuScreens.skillScreen);
	}
});

MainMenu.create = function(width, height){
	
	var layer = new MainMenu();
	layer.init(width, height);
	
	return layer;
};