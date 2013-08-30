var GameLayer = cc.Layer.extend({
	init: function ()
	{
		this._super();
			
		//Create color of the layer.
		var s = cc.Director.getInstance().getWinSize();
		var playGroundLayer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 0), s.width, s.height);
		playGroundLayer.setAnchorPoint(new cc.Point(0.5,0.5));	
		
		//Load spritesheets and other graphical stuffs.
		AnimationManager.init();
		
		var hud = HUD.create(s.width, s.height);
		var endScreen = EndScreen.create(s.width, s.height);
		var pauseMenu = PauseMenu.create(s.width, s.height);
		
		//Create game.
		Client.game.init(s.width, s.height, playGroundLayer, hud, endScreen, pauseMenu);
		
		//Set the game layer (middle ground).
		this.addChild(playGroundLayer);
		this.addChild(hud);
		
		this.setKeyboardEnabled(true);
				
		//This should be automaticaly called, but it's not.
		this.schedule(function(dt){
			this.update(dt);
		});
		
		//Launch game when initiation ends.
		Client.game.launch();
		
		return this;
	},
	onKeyDown: function(e){
		Client.keys[e] = true;
	},
	onKeyUp: function(e){
		Client.keys[e] = false;
	},
	update: function(dt){

		if(Client.game.currentState == Enum.Game.State.PLAYING)
			Client.game.update(dt);
	}
});

var GameScene = cc.Scene.extend({
	onEnter: function (){
		this._super();
		this.layer = new GameLayer();
		this.layer.init();
		
		this.addChild(this.layer);
	}
});