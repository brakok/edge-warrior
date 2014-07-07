

var ServerList = cc.LayerColor.extend({
	init: function(width, height){
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(255, 255, 255, 255), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));

		this._zOrder = Constants.Menu.ServerList.Z_INDEX;
		
		//Create background.
		this.background = cc.Sprite.create(assetsMenuDir + 'lobby_background.png');
		this.background.setPosition(new cc.Point(this.width*0.5, this.height*0.5));
		this.background._zOrder = Constants.Menu.BACKGROUND_Z_INDEX;
		
		//Get server list table.
		this.list = new LobbyList('serverList', this);
		this.placeHTML();
		
		//Menu creation.	
		this.cmdJoin = new cc.MenuItemFont.create("JOIN", this.join, this);
		this.cmdRandom = new cc.MenuItemFont.create("RANDOM", this.random, this);
		this.cmdRefresh = new cc.MenuItemFont.create("REFRESH", this.refresh, this);
		this.cmdBack = new cc.MenuItemFont.create("BACK", this.back, this);
		
		this.cmdJoin.setPosition(new cc.Point(this.width*0.6, this.height*0.05));
		this.cmdRandom.setPosition(new cc.Point(this.width*0.7, this.height*0.05));
		this.cmdRefresh.setPosition(new cc.Point(this.width*0.8, this.height*0.05));
		this.cmdBack.setPosition(new cc.Point(this.width*0.9, this.height*0.05));
		
		this.menu = new cc.Menu.create(this.cmdJoin, this.cmdRandom, this.cmdRefresh, this.cmdBack);
		this.menu.setPosition(new cc.Point(0,0));

		//Add elements.
		this.addChild(this.background);
		this.addChild(this.menu);
	},
	onEntering: function(){
		Client.search();
		this.list.setVisible(true);
	},
	onLeaving: function(){
		this.list.selectedValue = null;
		this.list.setVisible(false);
		this.list.clear();
	},
	join: function(){
		if(this.list.selectedValue != null)
			Client.joinLobby(this.list.lobbies[this.list.selectedValue].address);
		else
		{
			AudioManager.playEffect(Constants.Menu.ACTION_EFFECT);
			HtmlHelper.showError('No lobby selected.');
		}
	},
	random: function(){
		
		var lobby = this.list.random();
		
		if(lobby != null)
			Client.joinLobby(lobby.address);
		else
		{
			AudioManager.playEffect(Constants.Menu.ACTION_EFFECT);
			HtmlHelper.showError('No lobby selected.');
		}
	},
	back: function(){
		MenuScreens.switchTo(MenuScreens.mainMenu);
	},
	refresh: function(){
		AudioManager.playEffect(Constants.Menu.ACTION_EFFECT);
		
		Client.search();
	},
	resize: function(){
		this.width = Options.viewport.width;
		this.height = Options.viewport.height;
	
		this.placeHTML();
	},
	placeHTML: function(){
		this.list.setPosition(this.width*0.2, this.height*0.1);
	}
});

ServerList.create = function(width, height){
	
	var layer = new ServerList();
	layer.init(width, height);
	
	return layer;
};