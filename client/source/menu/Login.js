//Login UI.
var Login = cc.LayerColor.extend({
	init: function(width, height)
	{
		
		this.width = width;
		this.height = height;
	
		this._super(new cc.Color4B(0, 0, 0, 255), width, height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));

		this._zOrder = Constants.Login.Z_INDEX;
		
		//Seek login div (created in html file).
		this.loginDiv = document.getElementById('login');
		this.loginDiv.style.left = (width*0.5-125) + 'px';
		this.loginDiv.style.top = (height*0.5-125) + 'px';
		
		//Menu creation.
		this.txtUsername = document.getElementById('username');
		this.txtPassword = document.getElementById('password');
		
		this.cmdConnect = new cc.MenuItemFont.create("Connect", this.connect, this);
		this.cmdCreate = new cc.MenuItemFont.create("Create new account", this.createAccount, this);
		
		this.cmdConnect.setPosition(new cc.Point(this.width*0.5, this.height*0.5));
		this.cmdCreate.setPosition(new cc.Point(this.width*0.5, (this.height*0.5)-50));
		
		this.menu = new cc.Menu.create(this.cmdConnect, this.cmdCreate);
		this.menu.setPosition(new cc.Point(0,0));

		this.addChild(this.menu);
	},
	onEntering: function(){
		this.loginDiv.style.display = 'block'; 
	},
	onLeaving: function(){
		this.loginDiv.style.display = 'none';
	},
	connect: function(){

		//Authentication.
		if(Client.authenticate(this.txtUsername.value, this.txtPassword.value))
			MenuScreens.switchTo(MenuScreens.mainMenu);
	},
	createAccount: function(){
		console.log('create');
	},
	resize: function(){
		this.width = Options.resolution.width;
		this.height = Options.resolution.height;
	
		this.loginDiv.style.left = (this.width*0.5-125) + 'px';
		this.loginDiv.style.top = (this.height*0.5-125) + 'px';
	}
});

Login.create = function(width, height){
	
	var layer = new Login();
	layer.init(width, height);
	
	return layer;
};