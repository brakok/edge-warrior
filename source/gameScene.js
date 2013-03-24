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
		
		
		GameContainer.init(playGroundLayer);
		
		playGroundLayer.addChild(helloLabel);
		
		//Set the game layer (middle ground).
		this.addChild(playGroundLayer);
		
		this.setKeyboardEnabled(true);
		this.schedule(function(){
			GameContainer.update();
		});
		
		return this;
	},
	onKeyDown: function(e){
		GameContainer.keys[e] = true;
	},
	onKeyUp: function(e){
		GameContainer.keys[e] = false;
	},
	update: function(dt){

		if(GameContainer.currentState == GameState.PLAYING)
		{
			GameContainer.update(dt);
		}
	}
});

var GameScene = cc.Scene.extend({
	onEnter: function (){
		this._super();
		var layer = new Game();
		layer.init();
		console.log(layer);
		this.addChild(layer);
	}
});