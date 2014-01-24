
var CreateAccount = cc.LayerColor.extend({
	init: function(width, height)
	{
		
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(255, 255, 255, 0), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));

		this._zOrder = Constants.Menu.CreateAccount.Z_INDEX;
		
		this.isCreatingAccount = false;
		
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
		
		this.cmdCreate.setPosition(new cc.Point(this.width*0.53, this.height*0.32));
		this.cmdBack.setPosition(new cc.Point(this.width*0.6, this.height*0.32));
		
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
		
		if(!this.isCreatingAccount)
		{
			this.isCreatingAccount = true;
		
			var profile = new Profile(this.txtUsername.value, this.txtEmail.value, this.txtPassword.value, this.txtConfirmation.value);
			
			//Create account.
			var errors = Client.createAccount(profile);
			
			if(errors && errors.length > 0)
				this.result(errors);
		}
	},
	back: function(){
		MenuScreens.switchTo(MenuScreens.login);
	},
	result: function(errorMsg){
		
		if(!errorMsg || errorMsg.length == 0)
		{
			MenuScreens.switchTo(MenuScreens.login);
			HtmlHelper.showMessage('Account created.');
		}
		else
		{
			for(var i = 0; i < errorMsg.length; ++i)
				HtmlHelper.showError(errorMsg[i]);
		}
			
		this.isCreatingAccount = false;
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

		this.div.style.left = this.width*0.21 + 'px';
		this.div.style.top = this.height*0.43 + 'px';
	}
});

CreateAccount.create = function(width, height){
	
	var layer = new CreateAccount();
	layer.init(width, height);
	
	return layer;
};