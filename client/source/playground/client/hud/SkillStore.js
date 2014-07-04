var SkillStore = function(x, y, layer){

	this.currentUnits = 0;

	this.layer = layer;
	this.x = x;
	this.y = y;

	this.hasFreeBlock = true;
	this.needUpdate = false;
	
	//Load locks.
	this.skillItem1 = null;
	this.skillItem2 = null;
	this.skillItem3 = null;
	this.skillItem4 = null;
	
	//Load fieldset.
	this.fieldset = cc.Sprite.create(assetsHudDir + 'skill_fieldset.png');
	this.modeSprite = null;
	
	this.unitLabel = cc.LabelTTF.create("0", Constants.Font.NAME, Constants.Font.SIZE, cc.size(150, 40), cc.TEXT_ALIGNMENT_RIGHT);
	this.unitLabel.setPosition(new cc.Point(this.x + Constants.HUD.SkillStore.Units.OFFSET_X, this.y + Constants.HUD.SkillStore.Units.OFFSET_Y));
	this.unitLabel.setColor(new cc.Color3B(50,50,50));
	
	this.unitTitle = cc.LabelTTF.create("UNITS", Constants.Font.NAME, Constants.Font.SMALLSIZE);
	this.unitTitle.setPosition(new cc.Point(this.x + Constants.HUD.SkillStore.Units.Title.OFFSET_X, this.y + Constants.HUD.SkillStore.Units.Title.OFFSET_Y));
	
	//Set the fieldset in the right corner.
	this.fieldset.setPosition(new cc.Point(this.x, this.y));	
	this.layer.addChild(this.fieldset);
	
	this.setModeSprite();
	this.setSkillSprites();
	this.lockSkills();
	
	this.layer.addChild(this.unitLabel);
	this.layer.addChild(this.unitTitle);
};

SkillStore.prototype.update = function(units){

	if(this.currentUnits == units && !this.needUpdate)
		return;

	//Refresh units number.
	this.refreshUnit(units);

	//Lock/unlock skills.
	this.lockSkills();
	
	if(this.needUpdate)
		this.needUpdate = false;
};

SkillStore.prototype.lockSkills = function(){

	if(Options.skillSet.one)
		this.skillItem1.update();
		
	if(Options.skillSet.two)
		this.skillItem2.update();
		
	if(Options.skillSet.three)
		this.skillItem3.update();
		
	if(Options.skillSet.four)
		this.skillItem4.update();
};

SkillStore.prototype.refreshUnit = function(units){
	
	this.currentUnits = units;
	
	this.unitLabel.setString(units);		
};

SkillStore.prototype.setModeSprite = function(){
	
	if(this.modeSprite != null)
		this.layer.removeChild(this.modeSprite);
	
	switch(Options.buyMode)	{
		case Enum.SkillStore.Mode.POWER:
			this.modeSprite = cc.Sprite.create(assetsHudDir + 'power.png');
			break;
		case Enum.SkillStore.Mode.QUANTITY:
			this.modeSprite = cc.Sprite.create(assetsHudDir + 'quantity.png');
			break;
	}
		
	this.modeSprite.setPosition(new cc.Point(this.x + Constants.HUD.SkillStore.Mode.OFFSET_X, this.y + Constants.HUD.SkillStore.Mode.OFFSET_Y));
	this.layer.addChild(this.modeSprite);
};

SkillStore.prototype.setSkillSprites = function(){
	
	if(Options.skillSet.one)
		this.skillItem1 = new SkillItem(this.x + Constants.HUD.SkillStore.Skills.One.OFFSET_X, 
										this.y + Constants.HUD.SkillStore.Skills.One.OFFSET_Y,
										Options.skillSet.one,
										this);
		
	if(Options.skillSet.two)
		this.skillItem2 = new SkillItem(this.x + Constants.HUD.SkillStore.Skills.Two.OFFSET_X, 
										this.y + Constants.HUD.SkillStore.Skills.Two.OFFSET_Y,
										Options.skillSet.two,
										this);
		
	if(Options.skillSet.three)
		this.skillItem3 = new SkillItem(this.x + Constants.HUD.SkillStore.Skills.Three.OFFSET_X, 
										this.y + Constants.HUD.SkillStore.Skills.Three.OFFSET_Y,
										Options.skillSet.three,
										this);
		
	if(Options.skillSet.four)
		this.skillItem4 = new SkillItem(this.x + Constants.HUD.SkillStore.Skills.Four.OFFSET_X, 
										this.y + Constants.HUD.SkillStore.Skills.Four.OFFSET_Y,
										Options.skillSet.four,
										this);
	
};

SkillStore.prototype.changeBuyMode = function(){
	
	switch(Options.buyMode)	{
		case Enum.SkillStore.Mode.POWER:
			Options.buyMode = Enum.SkillStore.Mode.QUANTITY;
			break;
		case Enum.SkillStore.Mode.QUANTITY:
			Options.buyMode = Enum.SkillStore.Mode.POWER;
			break;
	}
	
	this.setModeSprite();
};