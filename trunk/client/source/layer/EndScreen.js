
//Splash screen at end of a round.
var EndScreen = cc.LayerColor.extend({
	init: function(width, height){
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(0, 0, 0, 0), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));
		
		this._zOrder = Constants.EndScreen.Z_INDEX;
	},
	addWinner: function(winner, succeed){
	
		//Get right color text.
		var colorText = '';
		switch(winner.color)
		{
			case Enum.Color.RED:
				colorText = 'Red';
				break;
			case Enum.Color.BLUE:
				colorText = 'Blue';
				break;
			case Enum.Color.YELLOW:
				colorText = 'Yellow';
				break;
			case Enum.Color.WHITE:
				colorText = 'White';
				break;
		}

		var succeedLabel = (succeed ? '+' : '');
		
		//Create winner label.
		var label = cc.LabelTTF.create(colorText + ' wins' + succeedLabel, 'Arial', 60);
		label.setPosition(new cc.Point(this.width*0.5,this.height*0.5));
		label.setColor(new cc.Color3B(255,255,255));
		
		this.addChild(label);
	}
});

EndScreen.create = function(width, height) {

	var screen = new EndScreen();
	
	//Infront of everything.
	screen.init(width, height);
	
	return screen;
};