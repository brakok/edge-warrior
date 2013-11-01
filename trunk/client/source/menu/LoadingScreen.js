
var LoadingScreen = cc.LayerColor.extend({
	init: function(width, height){
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(255, 255, 255, 255), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));
		
		this._zOrder = Constants.Menu.LoadingScreen.Z_INDEX;
				
		//Add images.
		this.bigCircle = cc.Sprite.create(assetsMenuDir + 'color_circle.png');
		this.bigCircle.setPosition(new cc.Point(this.width*0.5, this.height*0.5));
		this.bigCircle._zOrder = Constants.Menu.LoadingScreen.BigCircle.Z_INDEX;
		this.bigCircle.setScale(Constants.Menu.LoadingScreen.BigCircle.SCALE);
		this.bigCircle.runAction(cc.RepeatForever.create(cc.RotateBy.create(1.0, Constants.Menu.LoadingScreen.BigCircle.DEGREE_BY_SECOND)));
		
		this.smallCircle = cc.Sprite.create(assetsMenuDir + 'color_circle.png');
		this.smallCircle.setPosition(new cc.Point(this.width*0.5, this.height*0.5));
		this.smallCircle._zOrder = Constants.Menu.LoadingScreen.SmallCircle.Z_INDEX;
		this.smallCircle.setScale(Constants.Menu.LoadingScreen.SmallCircle.SCALE);
		this.smallCircle.runAction(cc.RepeatForever.create(cc.RotateBy.create(1.0, Constants.Menu.LoadingScreen.SmallCircle.DEGREE_BY_SECOND)));
		
		//Add loading label.
		this.label = cc.LabelTTF.create('LOADING...', Constants.Font.NAME, Constants.Font.SIZE);
		this.label.setColor(new cc.Color3B(0,0,0));
		this.label.setPosition(new cc.Point(this.width*0.9, this.height*0.05));
		
		this.addChild(this.bigCircle);
		this.addChild(this.smallCircle);
		this.addChild(this.label);
	}
});
	
LoadingScreen.create = function(width, height) {

	var screen = new LoadingScreen();
	
	//Infront of everything.
	screen.init(width, height);
	
	return screen;
};