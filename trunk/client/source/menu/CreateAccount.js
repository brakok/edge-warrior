
var CreateAccount = cc.LayerColor.extend({
	init: function(width, height)
	{
		
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(255, 255, 255, 0), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));

		this._zOrder = Constants.Menu.CreateAccount.Z_INDEX;
		
		//Create background.
		this.background = cc.Sprite.create(assetsMenuDir + 'account_background.png');
		this.background.setPosition(new cc.Point(this.width*0.5, this.height*0.5));
		this.background._zOrder = Constants.Menu.BACKGROUND_Z_INDEX;
		
		this.addChild(this.background);

		//Seek create account div (created in html file).
		this.div = document.getElementById('account');
		this.placeHTML();
		
		this.lblTitle = cc.LabelTTF.create("Create an account", Constants.Font.NAME, Constants.Font.BIGSIZE);
		this.lblTitle.setPosition(new cc.Point(this.width*0.4, this.height*0.64));
		
		//Menu creation.
		this.txtUsername = document.getElementById('accountUsername');
		this.txtEmail = document.getElementById('accountEmail');
		this.txtPassword = document.getElementById('accountPassword');
		this.txtConfirmation = document.getElementById('accountConfirmation');
		
		this.cmdCreate = new cc.MenuItemFont.create("CREATE", this.create, this);
		this.cmdBack = new cc.MenuItemFont.create("BACK", this.back, this);
		
		this.cmdCreate.setPosition(new cc.Point(this.width*0.55, this.height*0.3));
		this.cmdBack.setPosition(new cc.Point(this.width*0.62, this.height*0.3));
		
		this.menu = new cc.Menu.create(this.cmdCreate, this.cmdBack);
		this.menu.setPosition(new cc.Point(0,0));

		this.addChild(this.lblTitle);
		this.addChild(this.menu);
	},
	onEntering: function(){
		this.div.style.display = 'block'; 
	},
	onLeaving: function(){
		this.div.style.display = 'none';
		this.reset();
	},
	create: function(){
		console.log('create');
	},
	back: function(){
		MenuScreens.switchTo(MenuScreens.login);
	},
	reset: function(){
		this.txtUsername.value = '';
		this.txtEmail.value = '';
		this.txtPassword.value = '';
		this.txtConfirmation.value = '';
	},
	resize: function(){
		this.width = Options.resolution.width;
		this.height = Options.resolution.height;
	
		this.placeHTML();
	},
	placeHTML: function(){
		var scaleFactor = cc.Director.getInstance().getContentScaleFactor();

		this.div.style.left = this.width*0.18 + 'px';
		this.div.style.top = this.height*0.39 + 'px';
	}
});

CreateAccount.create = function(width, height){
	
	var layer = new CreateAccount();
	layer.init(width, height);
	
	return layer;
};