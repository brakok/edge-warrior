
var SkillSet = function(skillSet){

	if(skillSet == null)
	{
		this.one = null;
		this.two = null;
		this.three = null;
		this.four = null;
	}
	else
	{
		this.one = skillSet.one != null ? new SkillDescription(skillSet.one) : null;
		this.two = skillSet.two != null ? new SkillDescription(skillSet.two) : null;
		this.three = skillSet.three != null ? new SkillDescription(skillSet.three) : null;
		this.four = skillSet.four != null ? new SkillDescription(skillSet.four) : null;
	}
};

SkillSet.prototype.init = function(){
	
	if(this.one != null)
		this.one.init();
	if(this.two != null)
		this.two.init();
	if(this.three != null)
		this.three.init();
	if(this.four != null)
		this.four.init();
};

SkillSet.prototype.toSave = function(){

	return {
		one: this.one != null ? this.one.type : null,
		two: this.two != null ? this.two.type : null,
		three: this.three != null ? this.three.type : null,
		four: this.four != null ? this.four.type : null
	};
};

SkillSet.prototype.reset = function(){
	this.one = null;
	this.two = null;
	this.three = null;
	this.four = null;
};