//Login UI.
var Login = cc.LayerColor.extend({
	init: function(width, height)
	{		
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(255, 255, 255, 0), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));

		this._zOrder = Constants.Menu.Login.Z_INDEX;
		
		this.isAuthenticating = false;
		this.connectionAttempts = 0;
		
		//Create background.
		this.background = cc.Sprite.create(assetsMenuDir + 'login_background.png');
		this.background.setPosition(new cc.Point(this.width*0.5, this.height*0.5));
		this.background._zOrder = Constants.Menu.BACKGROUND_Z_INDEX;
		
		this.addChild(this.background);

		//Seek login div (created in html file).
		this.loginDiv = document.getElementById('login');
		this.placeHTML();
		
		//Menu creation.
		this.txtUsername = document.getElementById('username');
		this.txtPassword = document.getElementById('password');
		
		this.cmdConnect = new cc.MenuItemFont.create("CONNECT", this.connect, this);
		this.cmdCreate = new cc.MenuItemFont.create("CREATE NEW ACCOUNT", this.createAccount, this);
		this.cmdResetPassword = new cc.MenuItemFont.create("FORGOTTEN PASSWORD", this.resetPassword, this); 
		
		this.cmdConnect.setPosition(new cc.Point(this.width*0.5, this.height*0.32));
		this.cmdCreate.setPosition(new cc.Point(this.width*0.5, this.height*0.27));
		this.cmdResetPassword.setPosition(new cc.Point(this.width*0.5, this.height*0.22));
		
		this.menu = new cc.Menu.create(this.cmdConnect, this.cmdCreate, this.cmdResetPassword);
		this.menu.setColor(new cc.Color3B(0,0,0));
		this.menu.setPosition(new cc.Point(0,0));

		this.addChild(this.menu);
	},
	onEntering: function(){
		this.loginDiv.style.display = 'block'; 
	},
	onLeaving: function(){
		this.loginDiv.style.display = 'none';
		this.txtUsername.value = '';
		this.txtPassword.value = '';
	},
	connect: function(){

		if(this.txtUsername.value == null || this.txtUsername.value == '' || this.txtPassword.value == null || this.txtPassword.value == '')
		{
			AudioManager.playEffect(Constants.Menu.ACTION_EFFECT);
			
			HtmlHelper.showError('Username/password are required.');
			return;
		}
	
		if(!this.isAuthenticating)
		{
			//Raise error if someone tried too many times to log in.
			if(this.connectionAttempts > 3)
			{
				AudioManager.playEffect(Constants.Menu.ACTION_EFFECT);
				HtmlHelper.showError('Too many connection attempts.');
				return;
			}
		
			this.isAuthenticating = true;
			this.connectionAttempts++;
			
			//Authentication.
			Client.authenticate(new Profile(this.txtUsername.value, null, this.txtPassword.value, null));
		}
	},
	result: function(errors){
		
		this.isAuthenticating = false;
		
		//Fail
		if(errors && errors.length > 0)
		{
			AudioManager.playEffect(Constants.Menu.ACTION_EFFECT);
			
			for(var i = 0; i < errors.length; ++i)
				HtmlHelper.showError(errors[i]);
				
			return;
		}
		
		//Succeed
		this.connectionAttempts = 0;
		Client.username = this.txtUsername.value;
		
		MenuScreens.switchTo(MenuScreens.mainMenu);
	},
	createAccount: function(){
		MenuScreens.switchTo(MenuScreens.createAccount);
	},
	resetPassword: function(){
		MenuScreens.switchTo(MenuScreens.resetPassword);
	},
	resize: function(){
		this.width = Options.resolution.width;
		this.height = Options.resolution.height;
	
		this.placeHTML();
	},
	placeHTML: function(){
		this.loginDiv.style.left = (this.width*0.5-(HtmlHelper.computeWidth(this.loginDiv)*0.5)) + 'px';
		this.loginDiv.style.top = this.height*0.55 + 'px';
	}
});

Login.create = function(width, height){
	
	var layer = new Login();
	layer.init(width, height);
	
	return layer;
};