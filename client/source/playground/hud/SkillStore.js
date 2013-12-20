var SkillStore = function(x, y, layer){

	this.layer = layer;
	this.x = x;
	this.y = y;

	this.fieldset = cc.Sprite.create(assetsHudDir + 'skill_fieldset.png');
	this.modeSprite = null;
	
	this.unitLabel = cc.LabelTTF.create("0", Constants.Font.NAME, Constants.Font.SIZE);
	this.unitLabel.setPosition(new cc.Point(this.x - 100, this.y + 80));
	
	//Set the fieldset in the right corner.
	this.fieldset.setPosition(new cc.Point(this.x, this.y));	
	this.layer.addChild(this.fieldset);
	
	this.setModeSprite();
	this.setSkillSprites();
	this.layer.addChild(this.unitLabel);
};

SkillStore.prototype.refreshUnit = function(units){
	
	this.layer.removeChild(this.unitLabel);
	
	this.unitLabel = cc.LabelTTF.create(units, Constants.Font.NAME, Constants.Font.SIZE);
	this.unitLabel.setPosition(new cc.Point(this.x - 100, this.y + 80));
	
	this.layer.addChild(this.unitLabel);
	
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
	{
		var newSkill = new SkillDescription(Options.skillSet.one.type);
		newSkill.load(this.x + Constants.HUD.SkillStore.Skills.One.OFFSET_X, 
					  this.y + Constants.HUD.SkillStore.Skills.One.OFFSET_Y,
					  Constants.HUD.SkillStore.Skills.SCALE_X,
					  Constants.HUD.SkillStore.Skills.SCALE_Y,
					  this.layer);
								  
	}
		
	if(Options.skillSet.two)
	{
		var newSkill = new SkillDescription(Options.skillSet.two.type);
		newSkill.load(this.x + Constants.HUD.SkillStore.Skills.Two.OFFSET_X, 
					  this.y + Constants.HUD.SkillStore.Skills.Two.OFFSET_Y,
					  Constants.HUD.SkillStore.Skills.SCALE_X,
					  Constants.HUD.SkillStore.Skills.SCALE_Y,
					  this.layer);
	}
		
	if(Options.skillSet.three)
	{
		var newSkill = new SkillDescription(Options.skillSet.three.type);
		newSkill.load(this.x + Constants.HUD.SkillStore.Skills.Three.OFFSET_X, 
					  this.y + Constants.HUD.SkillStore.Skills.Three.OFFSET_Y,
					  Constants.HUD.SkillStore.Skills.SCALE_X,
					  Constants.HUD.SkillStore.Skills.SCALE_Y,
					  this.layer);
	}
		
	if(Options.skillSet.four)
	{
		var newSkill = new SkillDescription(Options.skillSet.four.type);
		newSkill.load(this.x + Constants.HUD.SkillStore.Skills.Four.OFFSET_X, 
					  this.y + Constants.HUD.SkillStore.Skills.Four.OFFSET_Y,
					  Constants.HUD.SkillStore.Skills.SCALE_X,
					  Constants.HUD.SkillStore.Skills.SCALE_Y,
					  this.layer);
	}
	
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