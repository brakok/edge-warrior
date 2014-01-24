
var ResetPassword = cc.LayerColor.extend({
	init: function(width, height)
	{
		
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(255, 255, 255, 0), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));

		this._zOrder = Constants.Menu.ResetPassword.Z_INDEX;
		
		this.isResettingPassword = false;
		
		//Create background.
		this.background = cc.Sprite.create(assetsMenuDir + 'account_background.png');
		this.background.setPosition(new cc.Point(this.width*0.5, this.height*0.5));
		this.background._zOrder = Constants.Menu.BACKGROUND_Z_INDEX;
		
		this.addChild(this.background);

		//Seek create account div (created in html file).
		this.div = document.getElementById('resetpassword');
		this.placeHTML();
		
		this.lblTitle = cc.LabelTTF.create("Reset password", Constants.Font.NAME, Constants.Font.BIGSIZE);
		this.lblTitle.setPosition(new cc.Point(this.width*0.4, this.height*0.64));
		
		//Menu creation.
		this.txtUsername = document.getElementById('resetUsername');
		this.txtEmail = document.getElementById('resetEmail');
		
		this.cmdReset = new cc.MenuItemFont.create("RESET", this.resetPassword, this);
		this.cmdBack = new cc.MenuItemFont.create("BACK", this.back, this);
		
		this.cmdReset.setPosition(new cc.Point(this.width*0.53, this.height*0.32));
		this.cmdBack.setPosition(new cc.Point(this.width*0.6, this.height*0.32));
		
		this.menu = new cc.Menu.create(this.cmdReset, this.cmdBack);
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
	resetPassword: function(){
		
		if(!this.isResettingPassword)
		{
			this.isResettingPassword = true;

			//Create account.
			if(!Client.resetPassword(this.txtUsername.value, this.txtEmail.value))
				this.isResettingPassword = false;
		}
	},
	back: function(){
		MenuScreens.switchTo(MenuScreens.login);
	},
	result: function(errorMsg){
		
		if(!errorMsg || errorMsg.length == 0)
		{
			MenuScreens.switchTo(MenuScreens.login);
			HtmlHelper.showMessage('Password changed.');
		}
		else
		{
			for(var i = 0; i < errorMsg.length; ++i)
				HtmlHelper.showError(errorMsg[i]);
		}
		
		this.isResettingPassword = false;
	},
	reset: function(){
		this.txtUsername.value = '';
		this.txtEmail.value = '';
	},
	resize: function(){
		this.width = Options.resolution.width;
		this.height = Options.resolution.height;
	
		this.placeHTML();
	},
	placeHTML: function(){
		var scaleFactor = cc.Director.getInstance().getContentScaleFactor();

		this.div.style.left = this.width*0.19 + 'px';
		this.div.style.top = this.height*0.47 + 'px';
	}
});

ResetPassword.create = function(width, height){
	
	var layer = new ResetPassword();
	layer.init(width, height);
	
	return layer;
};