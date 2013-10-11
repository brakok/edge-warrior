
var KeysScreen = cc.LayerColor.extend({
	init: function(width, height, parent){
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(0, 0, 0, 255), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));
		
		this._zOrder = Constants.Menu.OptionsScreen.Z_INDEX;
		
		this.keyForm = new KeyForm();
		this.keyForm.setPosition(300, 200);
		
		this.parent = parent;
		
		//Menu creation.
		this.cmdSave = new cc.MenuItemFont.create("Save", this.save, this);
		this.cmdReset = new cc.MenuItemFont.create("Reset", this.reset, this);
		this.cmdBack = new cc.MenuItemFont.create("Back", this.back, this);
		
		this.cmdSave.setPosition(new cc.Point(100, 100));
		this.cmdReset.setPosition(new cc.Point(250, 100));
		this.cmdBack.setPosition(new cc.Point(400, 100));
		
		this.menu = new cc.Menu.create(this.cmdSave, this.cmdReset, this.cmdBack);
		this.menu.setPosition(new cc.Point(0,0));

		//Add elements.
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
	
		this.keyForm.setPosition(300, 200);
	}
});

KeysScreen.create = function(width, height, parent){
	
	var layer = new KeysScreen();
	layer.init(width, height, parent);
	
	return layer;
};