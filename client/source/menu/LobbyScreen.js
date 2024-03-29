

var LobbyScreen = cc.LayerColor.extend({
	init: function(width, height){
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(255, 255, 255, 255), this.width, this.height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));

		this._zOrder = Constants.Menu.LobbyScreen.Z_INDEX;
				
		//Create background.
		this.background = cc.Sprite.create(assetsMenuDir + 'lobby_background.png');
		this.background.setPosition(new cc.Point(this.width*0.5, this.height*0.5));
		this.background._zOrder = Constants.Menu.BACKGROUND_Z_INDEX;
		
		this.slots = [];
		this.mayRename = false;
		this.startLaunching = null;
		
		//Add label indicating if lobby is online.
		this.lblOnline = cc.LabelTTF.create("Offline", Constants.Font.NAME, Constants.Font.SIZE);
		this.lblOnline.setColor(new cc.Color3B(0,0,0));
		this.setOnline();
			
		this.lblOnline.setPosition(new cc.Point(this.width - 150, this.height - 100));
		
		//HTML.
		this.div = document.getElementById('lobby');
		
		//Lobby name.
		this.txtName = document.getElementById('lobbyName');
		
		this.cmdRename = new cc.MenuItemFont.create("APPLY", this.rename, this);
		this.cmdRename.setPosition(new cc.Point(this.width*0.52, this.height*0.88));
		this.cmdRename.setVisible(false);

		this.renameMenu = new cc.Menu.create(this.cmdRename);
		this.renameMenu.setPosition(new cc.Point(0,0));
		this.renameMenu.setColor(new cc.Color3B(0,0,0));
		
		//Menu creation.
		this.cmdLaunch = new cc.MenuItemFont.create("LAUNCH", this.launch, this);
		this.cmdBack = new cc.MenuItemFont.create("BACK", this.back, this);
		
		this.cmdLaunch.setPosition(new cc.Point(this.width*0.8, this.height*0.05));
		this.cmdBack.setPosition(new cc.Point(this.width*0.9, this.height*0.05));
		
		//Only host may launch.
		this.cmdLaunch.setVisible(false);
		
		this.menu = new cc.Menu.create(this.cmdLaunch, this.cmdBack);
		this.menu.setPosition(new cc.Point(0,0));

		//Add elements.
		this.addChild(this.background);
		this.addChild(this.menu);
		this.addChild(this.renameMenu);
		this.addChild(this.lblOnline);
	},
	launch: function(){
				
		//Do not launch if there's not enough players.
		if(this.slots.length < 2)
		{
			HtmlHelper.showError('Need at least two players.');
			return;
		}
				
		if(this.startLaunching == null || new Date() - this.startLaunching > 3000)
		{
			this.startLaunching = new Date();
			
			AudioManager.playEffect(Constants.Menu.ACTION_EFFECT);
					
			for(var i = 0; i < this.slots.length; i++)
				if(!this.slots[i].isReady() || this.slots[i].getColor() == Enum.Slot.Color.UNASSIGNED)
				{
					HtmlHelper.showError('All players must have chosen a color and be marked has ready.');
					return;
				}
			
			//Randomize settings.
			var settings = WorldInfo.random();
			Client.startGame(settings);
		}
	},
	onEntering: function(){
		this.div.style.display = "block";
		
		Chat.clear();
		Chat.show();
		this.placeHTML();
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
		{
			this.lblOnline.setString("Online");
			
			if(Client.isHost)
			{
				this.cmdRename.setColor(new cc.Color3B(0,0,0));
				this.cmdLaunch.setVisible(true);
				this.txtName.readOnly = false;
				
				var that = this;
				
				this.txtName.onkeydown = function(){
					that.mayRename = true;
					that.cmdRename.setVisible(true);
				};
				
				this.txtName.onkeypress = function(){
					if(that.mayRename && event.keyCode == 13)
						that.rename();
				};
			}
		}
		else
			this.lblOnline.setString("Offline");
	},
	addSlot: function(username, color, ready){
		this.slots.push(new Slot(this, 
								 this.slots.length, 
								 this.width*0.15, 
								 this.height*(0.85 - 0.1*(this.slots.length+1)), 
								 username, 
								 color, 
								 ready));
	},
	removeSlot: function(username){
		
		var index = null;
		
		//Find slot index.
		for(var i = 0; i < this.slots.length; ++i)
			if(this.slots[i].username == username)
			{
				index = i;
				break;
			}
		
		//Remove.
		if(index != null)
		{
			this.slots[i].close();
			this.slots.splice(index, 1);
		}
		
		//Replace.
		for(var i = 0; i < this.slots.length; ++i)
			if(this.slots[i] != null)
				this.slots[i].setPosition(this.width*0.15, this.height*(0.85 - 0.1*(i+1)));
		
	},
	getSlot: function(username){
		
		var slot = null;
		for(var i in this.slots)
			if(this.slots[i].username == username)
			{
				slot = this.slots[i];
				break;
			}
			
		return slot;
	},
	reset: function(){
	
		//Close slots.
		for(var i in this.slots)
		{
			this.slots[i].close();
			delete this.slots[i];
		}
		
		this.slots = [];
		
		this.div.style.display = "none";
		this.lblOnline._string = "Offline";
				
		Chat.clear();
		Chat.hide();
		
		Client.isHost = false;
		this.cmdLaunch.setVisible(false);
		
		this.txtName.onkeydown = null;
		this.txtName.onkeypress = null;
		this.txtName.readOnly = true;
	},
	rename: function(){
	
		AudioManager.playEffect(Constants.Menu.ACTION_EFFECT);
	
		if(this.mayRename)
		{
			if(!this.txtName.value || this.txtName.value.length < 6)
			{
				HtmlHelper.showError('Lobby name must have at least 6 characters.');
				return;
			}
		
			this.pushUpdates();
			HtmlHelper.showMessage('Lobby has been renamed.');
			
			this.mayRename = false;
			this.cmdRename.setVisible(false);
		}
		
		this.cmdRename.setColor(new cc.Color3B(0,0,0));
	},
	pushUpdates: function(){
	
		Client.masterSocket.emit(Constants.Message.UPDATE_LOBBY, { name: this.txtName.value });
	},
	update: function(data){
		this.txtName.value = data.name;
	},
	resize: function(){
		this.placeHTML();
	},
	placeHTML: function(){
		this.div.style.left = Options.viewport.width*0.1 + 'px';
		this.div.style.top = Options.viewport.height*0.09 + 'px';
		
		//Only replace if not in-game.
		if(Client.game == null)
		{
			Chat.setColor('rgba(255,255,255,0)', 'rgba(0,0,0,1)');
			Chat.setPosition(Options.viewport.width * 0.65, Options.viewport.height * 0.2);
			Chat.setSize(30, 40);
		}
	}
});

LobbyScreen.create = function(width, height){
	
	var layer = new LobbyScreen();
	layer.init(width, height);
	
	return layer;
};