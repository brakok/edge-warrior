
var KeysScreen = cc.LayerColor.extend({
	init: function(width, height, parent){
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(0, 0, 0, 255), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));
		
		this._zOrder = Constants.OptionsScreen.Z_INDEX;
		
		this.keyForm = new KeyForm();
		this.keyForm.setPosition(300, 200);
		
		//Menu creation.
		this.cmdSave = new cc.MenuItemFont.create("Keys", this.save, this);
		this.cmdBack = new cc.MenuItemFont.create("Back", this.back, this);
		
		this.cmdSave.setPosition(new cc.Point(100, 100));
		this.cmdBack.setPosition(new cc.Point(250, 100));
		
		this.menu = new cc.Menu.create(this.cmdSave, this.cmdBack);
		this.menu.setPosition(new cc.Point(0,0));

		//Add elements.
		this.addChild(this.menu);
	},
	onEntering: function(){
		this.keyForm.setVisible(true);
	},
	onLeaving: function(){
		this.keyForm.setVisible(false);
	},
	save: function(){
		this.keyForm.save();
	},
	back: function(){
		parent.switchTo(parent.home);
	}
});

KeysScreen.create = function(width, height, parent){
	
	var layer = new KeysScreen();
	layer.init(width, height, parent);
	
	return layer;
};