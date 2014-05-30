
//Splash screen at end of a round.
var EndScreen = cc.LayerColor.extend({
	init: function(width, height){
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(255, 255, 255, 255), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));
		
		this._zOrder = Constants.Menu.EndScreen.Z_INDEX;
		
		this.succeedLabel = null;
		this.winnerScoreLabel = null;
		this.scoreLabels = [];
		
		//Create background.
		this.background = cc.Sprite.create(assetsMenuDir + 'end_screen_background.png');
		this.background.setPosition(new cc.Point(this.width*0.5, this.height*0.5));
		this.background._zOrder = Constants.Menu.BACKGROUND_Z_INDEX;
		
		//Menu creation.
		this.cmdDisconnect = new cc.MenuItemFont.create("DISCONNECT", this.disconnect, this);
		this.cmdDisconnect.setPosition(new cc.Point(this.width*0.9, this.height*0.05));
		
		this.menu = new cc.Menu.create(this.cmdDisconnect);
		this.menu.setPosition(new cc.Point(0,0));
		
		this.addChild(this.background);
		this.addChild(this.menu);
	},
	addWinner: function(winner, data){
		
		var succeed = data.succeed;
		var survivors = data.survivors;
		var scores = data.scores;
		
		//Create winner label.
		var label = cc.LabelTTF.create(winner.username + ' wins', Constants.Font.NAME, Constants.Font.BIGSIZE);
		label.setPosition(new cc.Point(this.width*0.5,this.height*0.82));
		label.setColor(new cc.Color3B(255,255,255));
				
		this.addChild(label);
		
		//Add bonus info if no survivor.
		if(succeed)
			this.succeedLabel = new AppearingLabel(this.width*0.5, 
												   this.height*0.76, 
												   'LUDICROUS', 
												   new cc.Color3B(95,0,45), 
												   1, 
												   Constants.Menu.EndScreen.APPEAR_TIME, 
												   Constants.Font.BIGSIZE*6, 
												   Constants.Font.BIGSIZE - 10, 
												   this);
		
		var winnerScore = null;
		
		for(var i in scores)
			if(i == winner.username)
				winnerScore = scores[i];
		
		//Show newly gained score for winner.
		if(winnerScore != null)
			this.winnerScoreLabel = new AppearingLabel(this.width*0.58, 
													   this.height*0.86, 
													   '+' + winnerScore, 
													   new cc.Color3B(250,220,110), 
													   2, 
													   Constants.Menu.EndScreen.APPEAR_TIME,
													   Constants.Font.MIDSIZE*6,
													   Constants.Font.MIDSIZE,
													   this);
		
		var survivorsY = [this.height*0.5, this.height*0.4, this.height*0.47];
		
		var playersAlive = [];
		playersAlive.push(winner);
		
		//Add survivor labels.
		for(var i = 0; i < survivors.length; i++)
		{
			var survivor = Client.game.getPlayer(survivors[i].color);
		
			var survivorLabel = cc.LabelTTF.create(survivor.username, Constants.Font.NAME, Constants.Font.MIDSIZE);
			survivorLabel.setPosition(new cc.Point(this.width*(0.4 + i*0.1),survivorsY[i]));
			survivorLabel.setColor(new cc.Color3B(0,0,0));
			
			playersAlive.push(survivor);
			this.addChild(survivorLabel);
			
			//Add minus effect.
			var score = null;
			for(var j in scores)
				if(j == survivor.username)
					this.scoreLabels.push(new FallingLabel(this.width*(0.4 + i*0.1), 
														   survivorsY[i],
														   '' + scores[j], 
														   new cc.Color3B(176, 14, 84), 
														   3 + Math.random()*0.5, 
														   Constants.Font.MIDSIZE, 
														   0, 
														   Constants.Menu.EndScreen.SCORE_VEL_Y, 
														   Constants.Menu.EndScreen.SCORE_VAR_VEL_X, 
														   Constants.Menu.EndScreen.SCORE_VAR_VEL_Y, 
														   this));
		}
		
		//Add label for fallen players.
		var players = [];
		
		if(!Client.game.player.hasWon)
			players.push(Client.game.player);
		
		for(var i = 0; i < Client.game.enemies.length; i++)
			if(!Client.game.enemies[i].hasWon)
				players.push(Client.game.enemies[i]);
		
		var fallensY = [this.height*0.06, this.height*0.1, this.height*0.04];
		var fallenCount = 0;
		
		for(var i = 0; i < players.length; i++)
		{
			var isAlive = false;
			
			for(var j = 0; j < playersAlive.length; j++)
				if(playersAlive[j].color == players[i].color)
				{
					isAlive = true;
					break;
				}
			
			if(!isAlive)
			{
				var fallenLabel = cc.LabelTTF.create(players[i].username, Constants.Font.NAME, Constants.Font.MIDSIZE);
				fallenLabel.setPosition(new cc.Point(this.width*(0.15 + fallenCount*0.15),fallensY[fallenCount]));
				fallenLabel.setColor(new cc.Color3B(255,255,255));
				
				this.addChild(fallenLabel);	

				//Add minus effect.
				var score = null;
				for(var j in scores)
					if(j == players[i].username)
						this.scoreLabels.push(new FallingLabel(this.width*(0.15 + fallenCount*0.15), 
															   fallensY[fallenCount],
															   '' + scores[j], 
															   new cc.Color3B(185, 73, 121), 
															   3 + Math.random()*0.5, 
															   Constants.Font.MIDSIZE, 
															   0, 
															   Constants.Menu.EndScreen.SCORE_VEL_Y, 
															   Constants.Menu.EndScreen.SCORE_VAR_VEL_X, 
															   Constants.Menu.EndScreen.SCORE_VAR_VEL_Y, 
															   this));
															   
				fallenCount++;
			}
		}

		//Start label animations if player entered that screen before a winner had been elected.
		this.startAnimation();
	},
	startAnimation: function(){
	
		if(this.succeedLabel)
			this.succeedLabel.start();
				
		if(this.winnerScoreLabel)
			this.winnerScoreLabel.start();
			
		for(var i = 0; i < this.scoreLabels.length; i++)
			this.scoreLabels[i].start();
			
		//Reset labels.
		this.succeedLabel = null;
		this.winnerScoreLabel = null;
		this.scoreLabels = [];
	},
	disconnect: function(){
		AudioManager.playEffect(Constants.Menu.ACTION_EFFECT);
		Client.disconnect();
	}
});

EndScreen.create = function(width, height) {

	var screen = new EndScreen();
	
	//Infront of everything.
	screen.init(width, height);
	
	return screen;
};