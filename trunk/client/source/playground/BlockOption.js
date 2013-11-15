var BlockOption = function(type, percent, skillType, skillPower){
	this.type = type;
	
	if(this.type == Enum.Block.Type.SKILLED)
		this.skill = {
			type: skillType,
			power: skillPower
		};
	else
		this.skill = null;
	
	this.percent = percent;
};