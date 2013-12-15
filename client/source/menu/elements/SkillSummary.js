
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
	this.skill = skill;
	
	if(this.label != null)
		this.layer.removeChild(this.label);
	
	this.label = cc.LabelTTF.create(this.skill.description, Constants.Font.NAME, Constants.Font.SIZE, new cc.Size(this.width, this.height));
	this.label.setColor(new cc.Color3B(0,0,0));
	this.label.setPosition(new cc.Point(this.x, this.y));
	
	this.layer.addChild(this.label);
};

SkillSummary.prototype.reset = function(){
	
	this.skill = null;
	
	if(this.label != null)
		this.layer.removeChild(this.label);
	
	this.label = null;
};