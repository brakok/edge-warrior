
var MainMenu = cc.LayerColor.extend({
	init: function(width, height){
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(0, 0, 0, 255), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));

		this._zOrder = Constants.MainMenu.Z_INDEX;

		//Menu creation.	
		this.cmdCreate = new cc.MenuItemFont.create("Create lobby", this.create, this);
		this.cmdJoin = new cc.MenuItemFont.create("Join lobby", this.join, this);
		this.cmdOptions = new cc.MenuItemFont.create("Options", this.toOptions, this);
		
		this.cmdCreate.setPosition(new cc.Point(this.width*0.5, this.height*0.5));
		this.cmdJoin.setPosition(new cc.Point(this.width*0.5, (this.height*0.5)-50));
		this.cmdOptions.setPosition(new cc.Point(this.width*0.5, (this.height*0.5)-100));
		
		this.menu = new cc.Menu.create(this.cmdCreate, this.cmdJoin, this.cmdOptions);
		this.menu.setPosition(new cc.Point(0,0));

		this.addChild(this.menu);
	},
	create: function(){
		Client.createLobby();
		MenuScreens.switchTo(MenuScreens.lobbyScreen);
	},
	join: function(){
		MenuScreens.switchTo(MenuScreens.serverList);
	},
	toOptions: function(){
		MenuScreens.switchTo(MenuScreens.optionsScreen);
	}
});

MainMenu.create = function(width, height){
	
	var layer = new MainMenu();
	layer.init(width, height);
	
	return layer;
};