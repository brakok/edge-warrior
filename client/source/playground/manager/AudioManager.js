
//Manage sound (music/effects).
var AudioManager = {
	playEffect: function(file, mustLoop){
	
		cc.AudioEngine.getInstance().playEffect(soundDir + file, mustLoop);
	},
	stopEffect: function(file){
		cc.AudioEngine.getInstance().stopEffect(soundDir + file);
	},
	playVoice: function(file, mustLoop){
		cc.AudioEngine.getInstance().playEffect(soundVoiceDir + file, mustLoop);
	},
	stopVoice: function(file){
		cc.AudioEngine.getInstance().stopEffect(soundVoiceDir + file);
	},
	playMusic: function(file, mustLoop){
		cc.AudioEngine.getInstance().playMusic(soundDir + file, mustLoop);
	},
	stopMusic: function(){
		
		if(cc.AudioEngine.getInstance().isMusicPlaying())
           cc.AudioEngine.getInstance().stopMusic();
	}
};