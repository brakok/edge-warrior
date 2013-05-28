var Game = cc.Layer.extend({
	init: function ()
	{
		this._super();
			
		//Create color of the layer.
		var s = cc.Director.getInstance().getWinSize();
		var playGroundLayer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), s.width, s.height);
		playGroundLayer.setAnchorPoint(new cc.Point(0.5,0.5));	
		
		//Load spritesheets and other graphical stuffs.
		AnimationManager.init();
		
		var hud = HUD.create(s.width, s.height);
		var endScreen = EndScreen.create(s.width, s.height);
		
		//Init world.
		Client.init(playGroundLayer, hud, endScreen);
		
		//Set the game layer (middle ground).
		this.addChild(playGroundLayer);
		this.addChild(hud);
		this.addChild(endScreen);
		
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

		if(Client.currentState == Enum.Game.State.PLAYING)
		{
			Client.update(dt);
		}
	}
});

var GameScene = cc.Scene.extend({
	onEnter: function (){
		this._super();
		var layer = new Game();
		layer.init();
		this.addChild(layer);
	}
});