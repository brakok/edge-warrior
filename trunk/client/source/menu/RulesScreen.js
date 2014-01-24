
var RulesScreen = cc.LayerColor.extend({
	init: function(width, height){
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(0, 0, 0, 255), this.width, this.height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));

		this._zOrder = Constants.Menu.RulesScreen.Z_INDEX;
		
		//Create background.
		this.background = cc.Sprite.create(assetsMenuDir + 'rules_background.png');
		this.background.setPosition(new cc.Point(this.width*0.5, this.height*0.5));
		this.background._zOrder = Constants.Menu.BACKGROUND_Z_INDEX;
		
		//Title
		this.lblTitle = cc.LabelTTF.create("Rules", Constants.Font.NAME, Constants.Font.BIGSIZE);
		this.lblTitle.setPosition(new cc.Point(this.width*0.1, this.height*0.9));
		
		//Textes.
		this.lblColorContact = cc.LabelTTF.create("3 or more colored blocks in contact vanish", Constants.Font.NAME, Constants.Font.SIZE, cc.size(900, 100), cc.TEXT_ALIGNMENT_LEFT);
		this.lblComplementaryContact = cc.LabelTTF.create("Two complementary blocks in contact vanish too (ex: one red + one green = vanish)", Constants.Font.NAME, Constants.Font.SIZE, cc.size(900, 100), cc.TEXT_ALIGNMENT_LEFT);
		this.lblUnits = cc.LabelTTF.create("A colored block generates units as long as it exists. A complementary one removes units.", Constants.Font.NAME, Constants.Font.SIZE, cc.size(1000, 100), cc.TEXT_ALIGNMENT_LEFT);
		this.lblSpawn = cc.LabelTTF.create("A player killing another one will gain a spawn block that allows him to spawn his victim wherever he wants. Work as well for multiple kills.", Constants.Font.NAME, Constants.Font.SIZE, cc.size(670, 300), cc.TEXT_ALIGNMENT_LEFT);
		this.lblKillComand = cc.LabelTTF.create("Not moving allows a player to kill himself (if stucked or anything else) with the kill command. If the kill command button is pressed, the kill is given randomly, but if the button is hold, the kill goes to the overlord who will respawn the player randomly.", Constants.Font.NAME, Constants.Font.SIZE, cc.size(700, 500), cc.TEXT_ALIGNMENT_LEFT);
		this.lblBuyMode = cc.LabelTTF.create("When buying skills during a match, one may boost the power of a bought skill when buying in Power Mode or boost his percent of apparition when buying in Quantity Mode.", Constants.Font.NAME, Constants.Font.SIZE, cc.size(400, 600), cc.TEXT_ALIGNMENT_LEFT);
		this.lblSkillStore = cc.LabelTTF.create("The skill store, which is at the left bottom corner of the HUD, shows which skills are available for the current match. You may change them in the Skills menu. Use the buy keys to buy them.", Constants.Font.NAME, Constants.Font.SIZE, cc.size(400, 600), cc.TEXT_ALIGNMENT_LEFT);
		
		var color = new cc.Color3B(155,155,155);
		
		//Color.
		this.lblColorContact.setColor(color);
		this.lblComplementaryContact.setColor(color);
		this.lblUnits.setColor(color);
		this.lblSpawn.setColor(color);
		this.lblKillComand.setColor(color);
		this.lblBuyMode.setColor(color);
		this.lblSkillStore.setColor(color);
		
		//Position.
		this.lblColorContact.setPosition(new cc.Point(this.width*0.75, this.height*0.9));
		this.lblComplementaryContact.setPosition(new cc.Point(this.width*0.75, this.height*0.86));
		this.lblUnits.setPosition(new cc.Point(this.width*0.33, this.height*0.66));
		this.lblSpawn.setPosition(new cc.Point(this.width*0.5, this.height*0.47));
		this.lblKillComand.setPosition(new cc.Point(this.width*0.75, 0));
		this.lblBuyMode.setPosition(new cc.Point(this.width*0.12, 0));
		this.lblSkillStore.setPosition(new cc.Point(this.width*0.37, this.height*0.05));
		
		//Menu creation.
		this.cmdBack = new cc.MenuItemFont.create("BACK", this.back, this);
		this.cmdBack.setPosition(new cc.Point(this.width*0.9, this.height*0.03));
		
		this.menu = new cc.Menu.create(this.cmdBack);
		this.menu.setPosition(new cc.Point(0,0));

		//Add elements.
		this.addChild(this.background);
		this.addChild(this.menu);
		
		this.addChild(this.lblTitle);
		this.addChild(this.lblColorContact);
		this.addChild(this.lblComplementaryContact);
		this.addChild(this.lblUnits);
		this.addChild(this.lblSpawn);
		this.addChild(this.lblKillComand);
		this.addChild(this.lblBuyMode);
		this.addChild(this.lblSkillStore);
	},
	back: function(){
		MenuScreens.switchTo(MenuScreens.mainMenu);
	}
});

RulesScreen.create = function(width, height){
	
	var layer = new RulesScreen();
	layer.init(width, height);
	
	return layer;
};