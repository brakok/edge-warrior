
//Manage sound (music/effects).
var AudioManager = {
	playEffect: function(file, mustLoop){
	
		cc.AudioEngine.getInstance().playEffect(soundDir + file, mustLoop);
	},
	stopEffect: function(file){
		cc.AudioEngine.getInstance().stopEffect(soundDir + file);
	},
	playMusic: function(file, mustLoop){
		cc.AudioEngine.getInstance().playMusic(soundDir + file, mustLoop);
	},
	stopMusic: function(){
		
		if(cc.AudioEngine.getInstance().isMusicPlaying())
           cc.AudioEngine.getInstance().stopMusic();
	}
};