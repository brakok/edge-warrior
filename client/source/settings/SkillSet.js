
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
		this.one = skillSet.one;
		this.two = skillSet.two;
		this.three = skillSet.three;
		this.four = skillSet.four;
	}
};

SkillSet.prototype.reset = function(){
	this.one = null;
	this.two = null;
	this.three = null;
	this.four = null;
};