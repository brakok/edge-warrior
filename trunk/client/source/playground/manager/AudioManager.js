
//Manage sound (music/effects).
var AudioManager = {
	playEffect: function(file, mustLoop){
	
		return cc.AudioEngine.getInstance().playEffect(soundDir + file, mustLoop);
	},
	stopEffect: function(audioId){
		cc.AudioEngine.getInstance().stopEffect(audioId);
	},
	playVoice: function(file, mustLoop){
		return cc.AudioEngine.getInstance().playEffect(soundVoiceDir + file, mustLoop);
	},
	stopVoice: function(audioId){
		cc.AudioEngine.getInstance().stopEffect(audioId);
	},
	playMusic: function(file, mustLoop){
		cc.AudioEngine.getInstance().playMusic(soundDir + file, mustLoop);
	},
	stopMusic: function(){
		
		if(cc.AudioEngine.getInstance().isMusicPlaying())
           cc.AudioEngine.getInstance().stopMusic();
	},
	stopAllEffects: function(){
	
		try
		{
			cc.AudioEngine.getInstance().stopAllEffects();
		}
		catch(ex){}
	}
};