

var ChangePassword = cc.LayerColor.extend({
	init: function(width, height)
	{
		
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(255, 255, 255, 0), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));

		this._zOrder = Constants.Menu.ChangePassword.Z_INDEX;
		
		this.isChangingPassword = false;
		
		//Create background.
		this.background = cc.Sprite.create(assetsMenuDir + 'account_background.png');
		this.background.setPosition(new cc.Point(this.width*0.5, this.height*0.5));
		this.background._zOrder = Constants.Menu.BACKGROUND_Z_INDEX;
		
		this.addChild(this.background);

		//Seek create account div (created in html file).
		this.div = document.getElementById('changepassword');
		this.placeHTML();
		
		this.lblTitle = cc.LabelTTF.create("Change password", Constants.Font.NAME, Constants.Font.BIGSIZE);
		this.lblTitle.setPosition(new cc.Point(this.width*0.4, this.height*0.64));
		
		//Menu creation.
		this.txtOldPassword = document.getElementById('oldPassword');
		this.txtNewPassword = document.getElementById('newPassword');
		this.txtConfirmation = document.getElementById('newPasswordConfirmation');
		
		this.cmdChange = new cc.MenuItemFont.create("CHANGE", this.change, this);
		this.cmdBack = new cc.MenuItemFont.create("BACK", this.back, this);
		
		this.cmdChange.setPosition(new cc.Point(this.width*0.53, this.height*0.32));
		this.cmdBack.setPosition(new cc.Point(this.width*0.6, this.height*0.32));
		
		this.menu = new cc.Menu.create(this.cmdChange, this.cmdBack);
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
	change: function(){
		
		if(!this.isChangingPassword)
		{
			this.isChangingPassword = true;

			//Create account.
			if(!Client.changePassword(this.txtOldPassword.value, this.txtNewPassword.value, this.txtConfirmation.value))
				this.isChangingPassword = false;
		}
	},
	back: function(){
		MenuScreens.switchTo(MenuScreens.mainMenu);
	},
	result: function(errorMsg){
		
		if(!errorMsg || errorMsg.length == 0)
		{
			MenuScreens.switchTo(MenuScreens.mainMenu);
			HtmlHelper.showMessage('Password changed.');
		}
		else
		{
			for(var i = 0; i < errorMsg.length; ++i)
				HtmlHelper.showError(errorMsg[i]);
		}
		
		this.isChangingPassword = false;
	},
	reset: function(){
		this.txtOldPassword.value = '';
		this.txtNewPassword.value = '';
		this.txtConfirmation.value = '';
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

ChangePassword.create = function(width, height){
	
	var layer = new ChangePassword();
	layer.init(width, height);
	
	return layer;
};