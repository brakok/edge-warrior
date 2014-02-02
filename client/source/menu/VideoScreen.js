
var VideoScreen = cc.LayerColor.extend({
	init: function(width, height, parent){
		this.width = width;
		this.height = height;
		this.parent = parent;
	
		this.originalResolution = null;
		this.originalFullscreen = false;
	
		//Layer creation.
		this._super(new cc.Color4B(0, 0, 0, 255), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));
		
		this._zOrder = Constants.Menu.OptionsScreen.Z_INDEX;
		
		//Create background.
		this.background = cc.Sprite.create(assetsMenuDir + 'options_submenu_background.png');
		this.background.setPosition(new cc.Point(this.width*0.5, this.height*0.5));
		this.background._zOrder = Constants.Menu.BACKGROUND_Z_INDEX;
		
		this.div = document.getElementById('video');
		var privateSelect = this.select = document.getElementById('resolution');
		var privateCheckbox = this.chkFullscreen = document.getElementById('fullscreen');		
		
		function changeResolution(){
		
			var values = null;

			if(privateSelect.value != null && privateSelect.value != '')
				values = privateSelect.value.split("x");
				
			var res = {
				width: values != null ? values[0] : Options.resolution.width,
				height: values != null ? values[1] : Options.resolution.height,
				isFullscreen: privateCheckbox.checked
			};
			
			Options.setResolution(res);
			
			if(Options.resolution.isFullscreen)
				Options.enterFullscreen();
			else
				Options.exitFullscreen();
				
			Options.resizeWindow();
		}
		
		//Bind onchange event to resize on resolution selection.
		this.select.onchange = changeResolution;
		
		//Toggle fullscreen.
		this.chkFullscreen.onclick = changeResolution;
		
		this.placeHTML();
		
		//Menu creation.
		this.cmdSave = new cc.MenuItemFont.create("SAVE", this.save, this);
		this.cmdBack = new cc.MenuItemFont.create("CANCEL", this.cancel, this);
		
		this.cmdSave.setPosition(new cc.Point(this.width*0.7, this.height*0.05));
		this.cmdBack.setPosition(new cc.Point(this.width*0.8, this.height*0.05));
		
		this.menu = new cc.Menu.create(this.cmdSave, this.cmdBack);
		this.menu.setPosition(new cc.Point(0,0));

		//Add elements.
		this.addChild(this.background);
		this.addChild(this.menu);
	},
	onEntering: function(){
	
		this.select.value = Options.resolution.width + 'x' + Options.resolution.height;
		this.div.style.display = "block";
		
		this.chkFullscreen.checked = Options.resolution.isFullscreen;
		
		//Set original resolution.
		this.originalResolution = {
			width: Options.resolution.width,
			height: Options.resolution.height,
			isFullscreen: Options.resolution.isFullscreen
		};
	},
	onLeaving: function(){
		this.div.style.display = "none";
	},
	save: function(){	
		Options.saveResolution();
		
		this.back();
	},
	cancel: function(){
	
		if(!this.originalResolution.isFullscreen && Options.resolution.isFullscreen)
			Options.exitFullscreen();
		else if(this.originalResolution.isFullscreen && !Options.resolution.isFullscreen)
			Options.enterFullscreen();
	
		Options.setResolution(this.originalResolution);
		Options.resizeWindow();
		
		this.back();
	},
	back: function(){
		this.parent.switchTo(this.parent.home);
	},
	resize: function(){
		this.placeHTML();
	},
	placeHTML: function(){
		
		this.div.style.left = Options.viewport.width*0.35 + 'px';
		this.div.style.top = Options.viewport.height*0.25 + 'px';
	}
});

VideoScreen.create = function(width, height, parent){
	
	var layer = new VideoScreen();
	layer.init(width, height, parent);
	
	return layer;
};