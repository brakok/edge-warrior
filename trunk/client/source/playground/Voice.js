
//File used and number of samples.
var Voice = function(type, colorText, number){

	this.type = type;
	
	this.file = null;
	
	switch(this.type){
		case Enum.Voice.Type.IDLE:
			this.file = colorText + Constants.Sound.File.Player.IDLE;
			break;
		case Enum.Voice.Type.JUMP:
			this.file = colorText + Constants.Sound.File.Player.JUMP;
			break;
		case Enum.Voice.Type.KILL:
			this.file = colorText + Constants.Sound.File.Player.KILL;
			break;
	};
	
	
	this.number = number;
};

//Randomize between available samples.
Voice.prototype.getRandomVoice = function(){

	if(this.number > 1)
	{
		var sampleIndex = Math.round((this.number + 0.5)*Math.random());
		
		if(sampleIndex < 1)
			sampleIndex = 1;
		
		return this.file + (sampleIndex < 10 ? '0' + sampleIndex : sampleIndex);
	}
	else
		return this.file;
};