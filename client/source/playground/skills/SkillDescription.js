
var SkillDescription = function(type){
	this.type = type;
	this.x = null;
	this.y = null;
	
	this.scale = {
		x: null,
		y: null
	};
	
	//Used when selected.
	this.background = cc.Sprite.create(assetsMenuDir + 'skill_selected.png');
	this.background.setScale(Constants.Menu.SkillScreen.SkillList.SCALE_X, Constants.Menu.SkillScreen.SkillList.SCALE_Y);
	
	this.selected = false;
	
	this.layer = null;
	this.callback = null;
	
	this.description = null;
	this.sprite = null;
	this.menu = null;
	
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
			
			//Buying infos.
			this.cost = Constants.Block.Skill.FirePulse.COST;
			this.costStep = Constants.Block.Skill.FirePulse.COST_STEP;
			this.percent.start = Constants.Block.Skill.FirePulse.PERCENT_START;
			this.percent.step = Constants.Block.Skill.FirePulse.PERCENT_STEP;
			
			break;
	}
};

SkillDescription.prototype.load = function(x, y, scaleX, scaleY, layer, callback){

	this.x = x;
	this.y = y;
	
	this.scale = {
		x: scaleX,
		y: scaleY
	};
	
	this.layer = layer;
	this.callback = callback;
	
	if(this.callback == null)
	{
		//Create right image.
		switch(this.type){
			case Enum.Block.Skill.FIRE_PULSE:
				this.sprite = cc.Sprite.create(assetsSkillDir + 'firePulse.png');				
				break;
		}
	}
	else
	{
		//Create right image.
		switch(this.type){
			case Enum.Block.Skill.FIRE_PULSE:
				this.sprite = new cc.MenuItemImage.create(assetsSkillDir + 'firePulse.png',
														  assetsSkillDir + 'firePulse.png',
														  this.callback,
														  this)				
				break;
		}
	}
	
	this.sprite.setPosition(new cc.Point(this.x, this.y));
	this.sprite.setScale(this.scale.x, this.scale.y);
	
	if(this.callback == null)
		this.layer.addChild(this.sprite);
	else
	{
		this.menu = new cc.Menu.create(this.sprite);
		this.menu.setPosition(new cc.Point(0,0));
		
		this.layer.addChild(this.menu);
	}
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
	
	if(this.callback == null)
		this.layer.addChild(this.sprite);
	else
		this.layer.addChild(this.menu);
};

SkillDescription.prototype.remove = function(){

	if(this.callback == null)
		this.layer.removeChild(this.sprite);
	else
		this.layer.removeChild(this.menu);
};

//Return list of all skills.
SkillDescription.loadAll = function(){
	var list = [];
	
	list.push(new SkillDescription(Enum.Block.Skill.FIRE_PULSE));
	
	return list;
};