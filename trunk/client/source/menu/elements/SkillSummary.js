
var SkillSummary = function(x, y, width, height, layer){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.layer = layer;
	
	this.label = null;
	this.skill = null;
};

SkillSummary.prototype.load = function(skill){

	this.reset();
	this.skill = skill;

	this.title = cc.LabelTTF.create(this.skill.title, Constants.Font.NAME, Constants.Font.MIDSIZE, cc.size(this.width, 60), cc.TEXT_ALIGNMENT_LEFT);
	this.title.setColor(new cc.Color3B(0,0,0));
	this.title.setPosition(new cc.Point(this.x, this.y + this.height*0.5 + 35));
	
	this.label = cc.LabelTTF.create(this.skill.description, Constants.Font.NAME, Constants.Font.SIZE, cc.size(this.width, this.height), cc.TEXT_ALIGNMENT_LEFT);
	this.label.setColor(new cc.Color3B(0,0,0));
	this.label.setPosition(new cc.Point(this.x, this.y));
	
	this.layer.addChild(this.title);
	this.layer.addChild(this.label);
};

SkillSummary.prototype.reset = function(){
	
	this.skill = null;
	
	if(this.label != null)
	{
		this.layer.removeChild(this.label);
		this.layer.removeChild(this.title);
	}
	
	this.label = null;
};