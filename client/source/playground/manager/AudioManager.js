
//Manage sound (music/effects).
var AudioManager = {
	playSound: function(type){
	
		switch(type){
			case Enum.Sound.Block.LANDING :
				cc.AudioEngine.getInstance().playEffect(soundDir + 'block_land');
				break;
		}
		
	},
	playMusic: function(type){
		cc.AudioEngine.getInstance().playBackgroundMusic("Resources/background",false);
	},
	stopMusic: function(){
		
		if(cc.AudioEngine.getInstance().isBackgroundMusicPlaying())
           cc.AudioEngine.getInstance().stopBackgroundMusic();
	}
};