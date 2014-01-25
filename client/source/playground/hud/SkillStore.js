var SkillStore = function(x, y, layer){

	this.currentUnits = 0;

	this.layer = layer;
	this.x = x;
	this.y = y;

	//Load locks.
	this.lock1 = cc.Sprite.create(assetsHudDir + 'skill_locked.png');
	this.lock1.setPosition(new cc.Point(this.x + Constants.HUD.SkillStore.Skills.One.OFFSET_X,  this.y + Constants.HUD.SkillStore.Skills.One.OFFSET_Y));
	
	this.lock2 = cc.Sprite.create(assetsHudDir + 'skill_locked.png');
	this.lock2.setPosition(new cc.Point(this.x + Constants.HUD.SkillStore.Skills.Two.OFFSET_X,  this.y + Constants.HUD.SkillStore.Skills.Two.OFFSET_Y));
	
	this.lock3 = cc.Sprite.create(assetsHudDir + 'skill_locked.png');
	this.lock3.setPosition(new cc.Point(this.x + Constants.HUD.SkillStore.Skills.Three.OFFSET_X,  this.y + Constants.HUD.SkillStore.Skills.Three.OFFSET_Y));
	
	this.lock4 = cc.Sprite.create(assetsHudDir + 'skill_locked.png');
	this.lock4.setPosition(new cc.Point(this.x + Constants.HUD.SkillStore.Skills.Four.OFFSET_X,  this.y + Constants.HUD.SkillStore.Skills.Four.OFFSET_Y));
	
	this.isLocked1 = false;
	this.isLocked2 = false;
	this.isLocked3 = false;
	this.isLocked4 = false;
	
	//Load fieldset.
	this.fieldset = cc.Sprite.create(assetsHudDir + 'skill_fieldset.png');
	this.modeSprite = null;
	
	this.unitLabel = cc.LabelTTF.create("0", Constants.Font.NAME, Constants.Font.SIZE, cc.size(150, 20), cc.TEXT_ALIGNMENT_RIGHT);
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

	if(this.currentUnits == units)
		return;

	//Refresh units number.
	this.refreshUnit(units);

	//Lock/unlock skills.
	this.lockSkills();
};

SkillStore.prototype.lockSkills = function(){

	if(Options.skillSet.one)
	{
		//Lock.
		if(!this.isLocked1 && this.currentUnits < Options.skillSet.one.cost)
		{
			this.layer.addChild(this.lock1);
			this.isLocked1 = true;
		}
		
		//Unlock.
		if(this.isLocked1 && this.currentUnits >= Options.skillSet.one.cost)
		{
			this.layer.removeChild(this.lock1);
			this.isLocked1 = false;
		}
			
	}
		
	if(Options.skillSet.two)
	{
		//Lock.
		if(!this.isLocked2 && this.currentUnits < Options.skillSet.two.cost)
		{
			this.layer.addChild(this.lock2);
			this.isLocked2 = true;
		}
		
		//Unlock.
		if(this.isLocked2 && this.currentUnits >= Options.skillSet.two.cost)
		{
			this.layer.removeChild(this.lock2);
			this.isLocked2 = false;
		}
	}
		
	if(Options.skillSet.three)
	{
		//Lock.
		if(!this.isLocked3 && this.currentUnits < Options.skillSet.three.cost)
		{
			this.layer.addChild(this.lock3);
			this.isLocked3 = true;
		}
		
		//Unlock.
		if(this.isLocked3 && this.currentUnits >= Options.skillSet.three.cost)
		{
			this.layer.removeChild(this.lock3);
			this.isLocked3 = false;
		}
	}
		
	if(Options.skillSet.four)
	{
		//Lock.
		if(!this.isLocked4 && this.currentUnits < Options.skillSet.four.cost)
		{
			this.layer.addChild(this.lock4);
			this.isLocked4 = true;
		}
		
		//Unlock.
		if(this.isLocked4 && this.currentUnits >= Options.skillSet.four.cost)
		{
			this.layer.removeChild(this.lock4);
			this.isLocked4 = false;
		}
	}

};

SkillStore.prototype.refreshUnit = function(units){
	
	this.currentUnits = units;
	
	this.layer.removeChild(this.unitLabel);
	
	this.unitLabel = cc.LabelTTF.create(units, Constants.Font.NAME, Constants.Font.SIZE, cc.size(150, 20), cc.TEXT_ALIGNMENT_RIGHT);
	this.unitLabel.setPosition(new cc.Point(this.x + Constants.HUD.SkillStore.Units.OFFSET_X, this.y + Constants.HUD.SkillStore.Units.OFFSET_Y));
	this.unitLabel.setColor(new cc.Color3B(50,50,50));
	
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