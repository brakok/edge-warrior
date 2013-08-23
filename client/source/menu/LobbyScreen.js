

var LobbyScreen = cc.LayerColor.extend({
	init: function(width, height){
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(0, 0, 0, 255), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));

		this._zOrder = Constants.LobbyScreen.Z_INDEX;
		
		this.slots = [];
		
		//Add label indicating if lobby is online.
		this.lblOnline = cc.LabelTTF.create("Offline", Constants.Font.NAME, Constants.Font.SIZE);
		this.setOnline();
			
		this.lblOnline.setPosition(new cc.Point(this.width - 150, this.height - 100));
		
		//Menu creation.
		this.cmdLaunch = new cc.MenuItemFont.create("Launch", this.launch, this);
		this.cmdBack = new cc.MenuItemFont.create("Back", this.back, this);
		
		this.cmdLaunch.setPosition(new cc.Point(this.width - 100, 150));
		this.cmdBack.setPosition(new cc.Point(this.width - 100, 100));
		
		this.menu = new cc.Menu.create(this.cmdLaunch, this.cmdBack);
		this.menu.setPosition(new cc.Point(0,0));

		//Add elements.
		this.addChild(this.menu);
		this.addChild(this.lblOnline);
	},
	launch: function(){
		
	},
	onLeaving: function(){
		this.reset();
	},
	back: function(){
		Client.closeLobby();
		MenuScreens.switchTo(MenuScreens.mainMenu);
	},
	setOnline: function(){
		
		if(Client.currentGameId != null && Client.currentGameId > -1)
			this.lblOnline._string = "Online (" + Client.currentGameId + ")";
		else
			this.lblOnline._string = "Offline";
	},
	addSlot: function(username, color, ready){
		this.slots.push(new Slot(this, this.slots.length, 200, this.height - 200*(this.slots.length+1), username, color, ready));
	},
	removeSlot: function(username){
		
		var index = null;
		
		for(var i in this.slots)
			if(this.slots[i].username == username)
			{
				index = i;
				break;
			}
		
		if(index != null)
		{
			this.slots[i].close();
			this.slots.splice(index, 1);
		}
	},
	reset: function(){
	
		//Close slots.
		for(var i in this.slots)
		{
			this.slots[i].close();
			delete this.slots[i];
		}
		
		this.slots = [];
		
		this.lblOnline._string = "Offline";
	}
});

LobbyScreen.create = function(width, height){
	
	var layer = new LobbyScreen();
	layer.init(width, height);
	
	return layer;
};