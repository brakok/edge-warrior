
var VideoScreen = cc.LayerColor.extend({
	init: function(width, height, parent){
		this.width = width;
		this.height = height;
		this.parent = parent;
	
		//Layer creation.
		this._super(new cc.Color4B(0, 0, 0, 255), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));
		
		this._zOrder = Constants.Menu.OptionsScreen.Z_INDEX;
		
		//Create background.
		this.background = cc.Sprite.create(assetsMenuDir + 'options_submenu_background.png');
		this.background.setPosition(new cc.Point(this.width*0.5, this.height*0.5));
		this.background._zOrder = Constants.Menu.BACKGROUND_Z_INDEX;
		
		this.div = document.getElementById('video');
		this.select = document.getElementById('resolution');
		
		this.placeHTML();
		
		//Menu creation.
		this.cmdSave = new cc.MenuItemFont.create("SAVE", this.save, this);
		this.cmdBack = new cc.MenuItemFont.create("BACK", this.back, this);
		
		this.cmdSave.setPosition(new cc.Point(this.width*0.7, this.height*0.1));
		this.cmdBack.setPosition(new cc.Point(this.width*0.8, this.height*0.1));
		
		this.menu = new cc.Menu.create(this.cmdSave, this.cmdBack);
		this.menu.setPosition(new cc.Point(0,0));

		//Add elements.
		this.addChild(this.background);
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
	
		this.placeHTML();
	},
	placeHTML: function(){
	
		var scaleFactor = cc.Director.getInstance().getContentScaleFactor();
		
		this.div.style.left = this.width*0.35 + 'px';
		this.div.style.top = this.height*0.35 + 'px';
	}
});

VideoScreen.create = function(width, height, parent){
	
	var layer = new VideoScreen();
	layer.init(width, height, parent);
	
	return layer;
};