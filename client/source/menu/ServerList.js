

var ServerList = cc.LayerColor.extend({
	init: function(width, height){
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(0, 0, 0, 255), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));

		this._zOrder = Constants.Menu.ServerList.Z_INDEX;
		
		//Get server list table.
		this.list = new LobbyList('serverList');
		this.list.setPosition(200, 100);
		
		//Menu creation.	
		this.cmdJoin = new cc.MenuItemFont.create("Join", this.join, this);
		this.cmdRandom = new cc.MenuItemFont.create("Random", this.random, this);
		this.cmdRefresh = new cc.MenuItemFont.create("Resfresh", this.refresh, this);
		this.cmdBack = new cc.MenuItemFont.create("Back", this.back, this);
		
		this.cmdJoin.setPosition(new cc.Point(100, 50));
		this.cmdRandom.setPosition(new cc.Point(250, 50));
		this.cmdRefresh.setPosition(new cc.Point(400, 50));
		this.cmdBack.setPosition(new cc.Point(550, 50));
		
		this.menu = new cc.Menu.create(this.cmdJoin, this.cmdRandom, this.cmdRefresh, this.cmdBack);
		this.menu.setPosition(new cc.Point(0,0));

		//Add elements.
		this.addChild(this.menu);
	},
	onEntering: function(){
		Client.search();
		this.list.setVisible(true);
	},
	onLeaving: function(){
		this.list.setVisible(false);
	},
	join: function(){
		if(this.list.selectedValue != null)
			Client.joinLobby(this.list.selectedValue);
	},
	random: function(){
		
		var lobby = this.list.random();
		
		if(lobby != null)
			Client.joinLobby(lobby.id);
	},
	back: function(){
		MenuScreens.switchTo(MenuScreens.mainMenu);
	},
	refresh: function(){
		Client.search();
	},
	resize: function(){
		this.width = Options.resolution.width;
		this.height = Options.resolution.height;
	
		this.list.setPosition(200, 100);
	}
});

ServerList.create = function(width, height){
	
	var layer = new ServerList();
	layer.init(width, height);
	
	return layer;
};