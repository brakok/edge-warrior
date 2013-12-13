var SkillStore = function(x, y, layer){

	this.layer = layer;
	this.x = x;
	this.y = y;

	this.fieldset = cc.Sprite.create(assetsHudDir + 'skill_fieldset.png');
	this.modeSprite = null;
	
	//Set the fieldset in the right corner.
	this.fieldset.setPosition(new cc.Point(this.x, this.y));	
	this.layer.addChild(this.fieldset);
	
	this.setModeSprite();
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