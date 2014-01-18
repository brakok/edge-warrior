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
		
		this.cmdConnect.setPosition(new cc.Point(this.width*0.5, this.height*0.25));
		this.cmdCreate.setPosition(new cc.Point(this.width*0.5, (this.height*0.25)-50));
		
		this.menu = new cc.Menu.create(this.cmdConnect, this.cmdCreate);
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

		if(!this.isAuthenticating)
		{
			//Raise error if someone tried too many times to log in.
			if(this.connectionAttempts > 3)
			{
				HtmlHelper.showError('Too many connection attempts.');
				return;
			}
		
			this.isAuthenticating = true;
			this.connectionAttempts++;
			
			//Authentication.
			if(Client.authenticate(this.txtUsername.value, this.txtPassword.value))
			{
				this.connectionAttempts = 0;
				MenuScreens.switchTo(MenuScreens.mainMenu);
			}
			else
				HtmlHelper.showError('Invalid username/password.');
				
			this.isAuthenticating = false;
		}
	},
	createAccount: function(){
		MenuScreens.switchTo(MenuScreens.createAccount);
	},
	resize: function(){
		this.width = Options.resolution.width;
		this.height = Options.resolution.height;
	
		this.placeHTML();
	},
	placeHTML: function(){
		var scaleFactor = cc.Director.getInstance().getContentScaleFactor();

		this.loginDiv.style.left = (this.width*0.5-(HtmlHelper.computeWidth(this.loginDiv)*0.5)) + 'px';
		this.loginDiv.style.top = (this.height*0.75-(100*scaleFactor)) + 'px';
	}
});

Login.create = function(width, height){
	
	var layer = new Login();
	layer.init(width, height);
	
	return layer;
};