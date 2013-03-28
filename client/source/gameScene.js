var Game = cc.Layer.extend({
	init: function ()
	{
		this._super();
				
		//Create color of the layer.
		var s = cc.Director.getInstance().getWinSize();
		var playGroundLayer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), s.width, s.height);
		playGroundLayer.setAnchorPoint(new cc.Point(0.5,0.5));
		
		var helloLabel = cc.LabelTTF.create('Hello world!', 'Arial', 30);
		helloLabel.setPosition(new cc.Point(s.width/2, s.height/2));
		helloLabel.setColor(new cc.Color3B(255,0,0));
		var rotationAmount = 0;
		var scale = 1;
		
		helloLabel.schedule(function (){
			this.setRotation(rotationAmount++);
			if(rotationAmount > 360)
				rotationAmount = 0;
				
			this.setScale(scale);
			scale += 0.05;
			
			if(scale > 10)
				scale = 1;
		});
					
		//Init world.
		Client.init(playGroundLayer);
		
		playGroundLayer.addChild(helloLabel);
		
		//Set the game layer (middle ground).
		this.addChild(playGroundLayer);
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

		if(Client.currentState == GameState.PLAYING)
		{
			Client.update();
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