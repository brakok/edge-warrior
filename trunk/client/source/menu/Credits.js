

var Credits = cc.LayerColor.extend({
	init: function(width, height){
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(0, 0, 0, 255), this.width, this.height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));

		this._zOrder = Constants.Menu.Credits.Z_INDEX;
		
		//Create background.
		this.background = cc.Sprite.create(assetsMenuDir + 'credit_background.png');
		this.background.setPosition(new cc.Point(this.width*0.5, this.height*0.5));
		this.background._zOrder = Constants.Menu.BACKGROUND_Z_INDEX;
				
		//Textes.
		this.lblTitle = cc.LabelTTF.create("Credits", Constants.Font.NAME, Constants.Font.BIGSIZE);
		this.lblTitle.setPosition(new cc.Point(this.width*0.5, this.height*0.9));
		
		//Section titles.
		this.lblCreator = cc.LabelTTF.create("Creator", Constants.Font.NAME, Constants.Font.MIDSIZE);
		this.lblVoice = cc.LabelTTF.create("Voices", Constants.Font.NAME, Constants.Font.MIDSIZE);
		this.lblMusic = cc.LabelTTF.create("Music", Constants.Font.NAME, Constants.Font.MIDSIZE);
		this.lblArts = cc.LabelTTF.create("Arts", Constants.Font.NAME, Constants.Font.MIDSIZE);
		this.lblSpecial = cc.LabelTTF.create("Special thanks", Constants.Font.NAME, Constants.Font.MIDSIZE);
		
		this.lblCreator.setPosition(new cc.Point(this.width*0.2, this.height*0.88));
		this.lblVoice.setPosition(new cc.Point(this.width*0.85, this.height*0.82));
		this.lblMusic.setPosition(new cc.Point(this.width*0.22, this.height*0.41));
		this.lblArts.setPosition(new cc.Point(this.width*0.46, this.height*0.65));
		this.lblSpecial.setPosition(new cc.Point(this.width*0.66, this.height*0.4));
		
		//People names.
		this.lblPascalTL01 = cc.LabelTTF.create("Pascal Thibault-Larouche", Constants.Font.NAME, Constants.Font.SIZE);
		
		//Artist.
		this.lblSimonD01 = cc.LabelTTF.create("Simon Des Rosiers", Constants.Font.NAME, Constants.Font.SIZE);
		this.lblPascalTL03 = cc.LabelTTF.create("Pascal Thibault-Larouche", Constants.Font.NAME, Constants.Font.SIZE);
		
		//Voices.
		this.lblPascalTL02 = cc.LabelTTF.create("Pascal Thibault-Larouche", Constants.Font.NAME, Constants.Font.SIZE);
		this.lblSimonD02 = cc.LabelTTF.create("Simon Des Rosiers", Constants.Font.NAME, Constants.Font.SIZE);
		this.lblAchrafL = cc.LabelTTF.create("Achraf Loudiy", Constants.Font.NAME, Constants.Font.SIZE);
		
		//Music.
		this.lblGuillaumeC = cc.LabelTTF.create("Guillaume Coguiec", Constants.Font.NAME, Constants.Font.SIZE);
		
		//Special thanks.
		this.lblAudreyL = cc.LabelTTF.create("Audrey Laganière", Constants.Font.NAME, Constants.Font.SIZE);
		this.lblSamuelB = cc.LabelTTF.create("Samuel Béland", Constants.Font.NAME, Constants.Font.SIZE);
		this.lblCiao = cc.LabelTTF.create("Ciao", Constants.Font.NAME, Constants.Font.SIZE);
		
		var color = new cc.Color3B(100,100,100);
		
		this.lblPascalTL01.setColor(color);
		this.lblPascalTL02.setColor(color);
		this.lblPascalTL03.setColor(color);
		this.lblSimonD01.setColor(color);
		this.lblSimonD02.setColor(color);
		this.lblAchrafL.setColor(color);
		this.lblGuillaumeC.setColor(color);
		this.lblAudreyL.setColor(color);
		this.lblSamuelB.setColor(color);
		this.lblCiao.setColor(color);
		
		this.lblPascalTL01.setPosition(new cc.Point(this.width*0.23,this.height*0.75));
		this.lblPascalTL02.setPosition(new cc.Point(this.width*0.79,this.height*0.7));
		this.lblPascalTL03.setPosition(new cc.Point(this.width*0.49,this.height*0.58));
		this.lblSimonD01.setPosition(new cc.Point(this.width*0.53,this.height*0.53));
		this.lblSimonD02.setPosition(new cc.Point(this.width*0.74,this.height*0.65));
		this.lblAchrafL.setPosition(new cc.Point(this.width*0.8,this.height*0.6));
		this.lblGuillaumeC.setPosition(new cc.Point(this.width*0.26,this.height*0.3));
		this.lblAudreyL.setPosition(new cc.Point(this.width*0.63,this.height*0.27));
		this.lblSamuelB.setPosition(new cc.Point(this.width*0.68,this.height*0.21));
		this.lblCiao.setPosition(new cc.Point(this.width*0.62,this.height*0.15));
		
		//Menu creation.
		this.cmdBack = new cc.MenuItemFont.create("BACK", this.back, this);
		this.cmdBack.setPosition(new cc.Point(this.width*0.9, this.height*0.05));
		
		this.menu = new cc.Menu.create(this.cmdBack);
		this.menu.setPosition(new cc.Point(0,0));

		//Add elements.
		this.addChild(this.background);
		this.addChild(this.menu);
		
		//Title.
		this.addChild(this.lblTitle);
		
		//Sections.
		this.addChild(this.lblCreator);
		this.addChild(this.lblVoice);
		this.addChild(this.lblMusic);
		this.addChild(this.lblArts);
		this.addChild(this.lblSpecial);
		
		//Names.
		this.addChild(this.lblPascalTL01);
		this.addChild(this.lblPascalTL02);
		this.addChild(this.lblPascalTL03);
		this.addChild(this.lblSimonD01);
		this.addChild(this.lblSimonD02);
		this.addChild(this.lblAchrafL);
		this.addChild(this.lblGuillaumeC);
		this.addChild(this.lblAudreyL);
		this.addChild(this.lblSamuelB);
		this.addChild(this.lblCiao);
	},
	back: function(){
		MenuScreens.switchTo(MenuScreens.mainMenu);
	}
});

Credits.create = function(width, height){
	
	var layer = new Credits();
	layer.init(width, height);
	
	return layer;
};