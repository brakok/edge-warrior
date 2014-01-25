
var SkillItem = function(x, y, skill, parent){

	this.x = x;
	this.y = y;
	
	//Lock infos.
	this.isLocked = false;
	
	this.imgLock = cc.Sprite.create(assetsHudDir + 'skill_locked.png');
	this.imgLock.setPosition(new cc.Point(this.x,  this.y));
	
	this.parent = parent;

	//Bound skill.
	this.skill = skill;
	
	//Units infos.
	this.costLabel = cc.LabelTTF.create(this.skill.cost, Constants.Font.NAME, Constants.Font.SMALLSIZE);
	this.costLabel.setPosition(new cc.Point(this.x, this.y - 5));
	this.costLabel.setColor(new cc.Color3B(50,50,50));
	
	//Rendered skill.
	this.skillDescription = new SkillDescription(this.skill.type);
	this.skillDescription.load(this.x, 
							   this.y,
							   Constants.HUD.SkillStore.Skills.SCALE_X,
							   Constants.HUD.SkillStore.Skills.SCALE_Y,
							   this.parent.layer);
};

SkillItem.prototype.update = function(){

	//Lock.
	if(!this.isLocked && this.parent.currentUnits < this.skill.cost)
	{
		this.parent.layer.addChild(this.imgLock);	
		
		//Show cost.
		this.costLabel.setString(this.skill.cost);
		this.parent.layer.addChild(this.costLabel);
		
		this.isLocked = true;
	}
	
	//Unlock.
	if(this.isLocked && this.parent.currentUnits >= this.skill.cost)
	{
		this.parent.layer.removeChild(this.imgLock);
		this.parent.layer.removeChild(this.costLabel);
		this.isLocked = false;
	}
};