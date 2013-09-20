
var VideoScreen = cc.LayerColor.extend({
	init: function(width, height, parent){
		this.width = width;
		this.height = height;
		this.parent = parent;
	
		//Layer creation.
		this._super(new cc.Color4B(0, 0, 0, 255), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));
		
		this._zOrder = Constants.OptionsScreen.Z_INDEX;
		
		this.div = document.getElementById('video');
		this.select = document.getElementById('resolution');
		
		this.div.style.left = 100 + 'px';
		this.div.style.top = 100 + 'px';

		//Menu creation.
		this.cmdSave = new cc.MenuItemFont.create("Save", this.save, this);
		this.cmdBack = new cc.MenuItemFont.create("Back", this.back, this);
		
		this.cmdSave.setPosition(new cc.Point(100, 100));
		this.cmdBack.setPosition(new cc.Point(250, 100));
		
		this.menu = new cc.Menu.create(this.cmdSave, this.cmdBack);
		this.menu.setPosition(new cc.Point(0,0));

		//Add elements.
		this.addChild(this.menu);
	},
	onEntering: function(){
		this.select.value = Options.resolution.width + 'x' + Options.resolution.height;
		this.div.style.display = "block";
	},
	onLeaving: function(){
		this.div.style.display = "none";
	},
	save: function(){
		var values = this.select.value.split("x");
		var res = {
			width: values[0],
			height: values[1]
		};
	
		Options.saveResolution(res);
		Options.resizeWindow();
	},
	back: function(){
		this.parent.switchTo(this.parent.home);
	},
	resize: function(){
		this.width = Options.resolution.width;
		this.height = Options.resolution.height;
	
		this.div.style.left = 100 + 'px';
		this.div.style.top = 100 + 'px';
	}
});

VideoScreen.create = function(width, height, parent){
	
	var layer = new VideoScreen();
	layer.init(width, height, parent);
	
	return layer;
};