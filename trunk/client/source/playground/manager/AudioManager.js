
//Manage sound (music/effects).
var AudioManager = {
	playSound: function(file){
	
		cc.AudioEngine.getInstance().playEffect(soundDir + file);
	},
	playMusic: function(type){
		cc.AudioEngine.getInstance().playBackgroundMusic("Resources/background",false);
	},
	stopMusic: function(){
		
		if(cc.AudioEngine.getInstance().isBackgroundMusicPlaying())
           cc.AudioEngine.getInstance().stopBackgroundMusic();
	}
};