
var SkillDescription = function(type){
	this.type = type;
	this.x = null;
	this.y = null;
	
	this.scale = {
		x: null,
		y: null
	};
	
	//Used to display.
	this.level = 0;
	
	//Used when selected.
	this.background = cc.Sprite.create(assetsMenuDir + 'skill_selected.png');
	this.background.setScale(Constants.Menu.SkillScreen.SkillList.SCALE_X, Constants.Menu.SkillScreen.SkillList.SCALE_Y);
	
	this.selected = false;
	
	this.layer = null;
	
	this.description = null;
	this.sprite = null;
	
	this.cost = null;
	this.percent = {
		start: null,
		step: null
	};
	
	this.title = null;
	this.init();
};

SkillDescription.prototype.init = function(){

	switch(this.type){
		case Enum.Block.Skill.FIRE_PULSE:
		
			this.sprite = cc.Sprite.create(assetsSkillDir + 'firePulse.png');
			this.title = SkillText.FirePulse.TITLE;
			this.description = SkillText.FirePulse.DESCRIPTION;
			
			this.power = -1;
			
			//Buying infos.
			this.cost = Constants.Block.Skill.FirePulse.COST;
			this.costStep = Constants.Block.Skill.FirePulse.COST_STEP;
			this.percent.start = Constants.Block.Skill.FirePulse.PERCENT_START;
			this.percent.step = Constants.Block.Skill.FirePulse.PERCENT_STEP;
			
			break;
	}
};

SkillDescription.prototype.load = function(x, y, scaleX, scaleY, layer){

	this.x = x;
	this.y = y;
	
	this.scale = {
		x: scaleX,
		y: scaleY
	};
	
	this.layer = layer;
	
	//Create right image.
	switch(this.type){
		case Enum.Block.Skill.FIRE_PULSE:
			this.sprite = cc.Sprite.create(assetsSkillDir + 'firePulse.png');				
			break;
	}
	
	this.sprite.setPosition(new cc.Point(this.x, this.y));
	this.sprite.setScale(this.scale.x, this.scale.y);
	
	this.layer.addChild(this.sprite);
};

SkillDescription.prototype.unselect = function(){
	this.selected = false;
	this.layer.removeChild(this.background);
};

SkillDescription.prototype.select = function(){
	this.selected = true;
	
	if(this.x != null && this.y != null) 
		this.background.setPosition(new cc.Point(this.x, this.y));
		
	this.remove();
	this.layer.addChild(this.background);
	
	this.layer.addChild(this.sprite);
};

SkillDescription.prototype.remove = function(){

	this.layer.removeChild(this.sprite);
};

//Return list of all skills.
SkillDescription.loadAll = function(){
	var list = [];
	
	list.push(new SkillDescription(Enum.Block.Skill.FIRE_PULSE));
	
	return list;
};