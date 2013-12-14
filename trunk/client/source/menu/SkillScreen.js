var SkillScreen = cc.LayerColor.extend({
	init: function(width, height){
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(255, 255, 255, 255), this.width, this.height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));

		this._zOrder = Constants.Menu.SkillScreen.Z_INDEX;
		
		this.skillSlots = [];

		//Create background.
		this.background = cc.Sprite.create(assetsMenuDir + 'skill_background.png');
		this.background.setPosition(new cc.Point(this.width*0.5, this.height*0.5));
		this.background._zOrder = Constants.Menu.BACKGROUND_Z_INDEX;
				
		//Menu creation.
		this.cmdSave = new cc.MenuItemFont.create("SAVE", this.save, this);
		this.cmdReset = new cc.MenuItemFont.create("RESET", this.reset, this);
		this.cmdBack = new cc.MenuItemFont.create("BACK", this.back, this);
		
		this.cmdSave.setPosition(new cc.Point(this.width*0.7, this.height*0.05));
		this.cmdReset.setPosition(new cc.Point(this.width*0.8, this.height*0.05));
		this.cmdBack.setPosition(new cc.Point(this.width*0.9, this.height*0.05));
		
		this.menu = new cc.Menu.create(this.cmdSave, this.cmdReset, this.cmdBack);
		this.menu.setPosition(new cc.Point(0,0));
		this.menu.setColor(new cc.Color3B(0,0,0));

		//Add elements.
		this.addChild(this.background);
		this.addChild(this.menu);
		
		//Add four skill slots for skill set.
		for(var i = 1; i <= 4; i++)
			this.skillSlots.push(new SkillSlot(this.width*0.1, this.height*(1+Constants.Menu.SkillScreen.SkillSlot.STEP_Y*i), i, this));
	},
	onEntering: function(){

	},
	onLeaving: function(){

	},
	back: function(){
		MenuScreens.switchTo(MenuScreens.mainMenu);
	},
	reset: function(){
		this.unselectSlots();
		Options.skillSet.reset();
	},
	save: function(){
		Options.saveSkillSet(Options.skillSet);
		this.back();
	},
	unselectSlots: function(){
		
		for(var i = 0; i < 4; i++)
			if(this.skillSlots[i].selected)
				this.skillSlots[i].unselect();
	}
});

SkillScreen.create = function(width, height){
	
	var layer = new SkillScreen();
	layer.init(width, height);
	
	return layer;
};