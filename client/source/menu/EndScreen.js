
//Splash screen at end of a round.
var EndScreen = cc.LayerColor.extend({
	init: function(width, height){
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(255, 255, 255, 255), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));
		
		this._zOrder = Constants.Menu.EndScreen.Z_INDEX;
		
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
	addWinner: function(winner, succeed, survivors){
	
		//Create winner label.
		var label = cc.LabelTTF.create(winner.username + ' wins', Constants.Font.NAME, Constants.Font.BIGSIZE);
		label.setPosition(new cc.Point(this.width*0.5,this.height*0.8));
		label.setColor(new cc.Color3B(255,255,255));
				
		this.addChild(label);
		
		//Add bonus info if no survivor.
		if(succeed)
		{
			var succeedLabel = cc.LabelTTF.create('LUDICROUS', Constants.Font.NAME, Constants.Font.BIGSIZE - 20);
			succeedLabel.setPosition(new cc.Point(this.width*0.5,this.height*0.75));
			succeedLabel.setColor(new cc.Color3B(75,0,25));
			
			this.addChild(succeedLabel);
		}
		
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
		}
		
		//Add label for fallen players.
		var players = [];
		
		if(!Client.game.player.hasWon)
			players.push(Client.game.player);
		
		for(var i in Client.game.enemies)
			if(!Client.game.enemies[i].hasWon)
				players.push(Client.game.enemies[i]);
		
		var fallensY = [this.height*0.06, this.height*0.1, this.height*0.04];
		var fallenCount = 0;
		
		for(var i in players)
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
				fallenCount++;
			}
		}
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