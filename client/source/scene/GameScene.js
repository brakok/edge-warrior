var GameLayer = cc.Layer.extend({
	init: function ()
	{
		this._super();
			
		//Create color of the layer.
		var s = cc.Director.getInstance().getWinSize();
		this.playGroundLayer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 0), s.width, s.height);
		this.playGroundLayer.setAnchorPoint(new cc.Point(0.5,0.5));	
		this.playGroundLayer.setZOrder(0);
		
		this.frontLayer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 0), s.width, s.height);
		this.frontLayer.setAnchorPoint(new cc.Point(0.5,0.5));	
		this.frontLayer.setZOrder(1);
		
		this.hud = HUD.create(s.width, s.height);
		this.endScreen = EndScreen.create(s.width, s.height);
		this.pauseMenu = PauseMenu.create(s.width, s.height);
		
		this.width = s.width;
		this.height = s.height;
				
		//Create loading screen for client if it doesn't exist yet.
		if(Client.loadingScreen == null)
			Client.loadingScreen = LoadingScreen.create(s.width, s.height);
		
		//Set the game layer (middle ground).
		this.addChild(this.playGroundLayer);
		this.addChild(this.frontLayer);
		this.addChild(this.hud);
		
		this.setKeyboardEnabled(true);
				
		//This should be automaticaly called, but it's not.
		this.schedule(function(dt){
			this.update(dt);
		});

		return this;
	},
	onKeyDown: function(e){
		Client.keys[e] = true;
	},
	onKeyUp: function(e){
		Client.keys[e] = false;
	},
	update: function(dt){

		if(Client.game != null && Client.game.ready)
			Client.game.update(dt);
	}
});

var GameScene = cc.Scene.extend({
	onEnter: function (){
		this._super();
		this.layer = new GameLayer();
		this.layer.init();
		
		this.addChild(this.layer);
		
		//Show loading screen.
		Client.startLoading();
	},
	onExit: function(){
		this.removeChild(this.layer);
	}
});