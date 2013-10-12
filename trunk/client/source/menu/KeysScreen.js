
var KeysScreen = cc.LayerColor.extend({
	init: function(width, height, parent){
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(0, 0, 0, 255), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));
		
		this._zOrder = Constants.Menu.OptionsScreen.Z_INDEX;
		this.parent = parent;
		
		//Create background.
		this.background = cc.Sprite.create(assetsMenuDir + 'options_submenu_background.png');
		this.background.setPosition(new cc.Point(this.width*0.5, this.height*0.5));
		this.background._zOrder = Constants.Menu.BACKGROUND_Z_INDEX;
		
		this.keyForm = new KeyForm();
		this.placeHTML();
		
		//Menu creation.
		this.cmdSave = new cc.MenuItemFont.create("SAVE", this.save, this);
		this.cmdReset = new cc.MenuItemFont.create("RESET", this.reset, this);
		this.cmdBack = new cc.MenuItemFont.create("BACK", this.back, this);
		
		this.cmdSave.setPosition(new cc.Point(this.width*0.6, this.height*0.1));
		this.cmdReset.setPosition(new cc.Point(this.width*0.7, this.height*0.1));
		this.cmdBack.setPosition(new cc.Point(this.width*0.8, this.height*0.1));
		
		this.menu = new cc.Menu.create(this.cmdSave, this.cmdReset, this.cmdBack);
		this.menu.setPosition(new cc.Point(0,0));

		//Add elements.
		this.addChild(this.background);
		this.addChild(this.menu);
	},
	onEntering: function(){
		this.keyForm.init();
		this.keyForm.setVisible(true);
	},
	onLeaving: function(){
		this.keyForm.setVisible(false);
	},
	reset: function(){
		this.keyForm.reset();
	},
	save: function(){
		this.keyForm.save();
		this.back();
	},
	back: function(){
		this.parent.switchTo(this.parent.home);
	},
	resize: function(){
		this.width = Options.resolution.width;
		this.height = Options.resolution.height;
	
		this.placeHTML();
	},
	placeHTML: function(){
		this.keyForm.setPosition(this.width*0.3, this.height*0.25);
	}
});

KeysScreen.create = function(width, height, parent){
	
	var layer = new KeysScreen();
	layer.init(width, height, parent);
	
	return layer;
};