var Keys = function(keys){

	if(keys == null)
	{
		this.RIGHT = cc.KEY.d;
		this.LEFT = cc.KEY.a;
		this.JUMP = cc.KEY.space;
		this.KILL = cc.KEY.q;
		this.OPT1 = cc.KEY.z;
		this.OPT2 = cc.KEY.x;
		this.PAUSE = cc.KEY.p;
		
		//To buy skills.
		this.SKILL1 = cc.KEY['1'];
		this.SKILL2 = cc.KEY['2'];
		this.SKILL3 = cc.KEY['3'];
		this.SKILL4 = cc.KEY['4'];
		this.TOGGLE_BUY_MODE = cc.KEY.c;
		
	}
	else
	{
		this.RIGHT = keys.RIGHT;
		this.LEFT = keys.LEFT;
		this.JUMP = keys.JUMP;
		this.KILL = keys.KILL;
		this.OPT1 = keys.OPT1;
		this.OPT2 = keys.OPT2;
		this.PAUSE = keys.PAUSE;
		
		//To buy skills.
		this.SKILL1 = keys.SKILL1;
		this.SKILL2 = keys.SKILL2;
		this.SKILL3 = keys.SKILL3;
		this.SKILL4 = keys.SKILL4;
		this.TOGGLE_BUY_MODE = keys.TOGGLE_BUY_MODE;
	}
};

Keys.prototype.reset = function(){
	this.RIGHT = cc.KEY.d;
	this.LEFT = cc.KEY.a;
	this.JUMP = cc.KEY.space;
	this.KILL = cc.KEY.q;
	this.OPT1 = cc.KEY.z;
	this.OPT2 = cc.KEY.x;
	this.PAUSE = cc.KEY.p;
	
	this.SKILL1 = cc.KEY['1'];
	this.SKILL2 = cc.KEY['2'];
	this.SKILL3 = cc.KEY['3'];
	this.SKILL4 = cc.KEY['4'];
	this.TOGGLE_BUY_MODE = cc.KEY.c;
};

var Options = new function(){
		
	this.loaded = false;
	this.fullscreen = false;
	
	this.keys = new Keys();
	this.buyMode = Enum.SkillStore.Mode.POWER;
	
	this.resolution = {
		width: 1024,
		height: 768
	};
	
	this.viewport = {
		width: 1024,
		height: 768
	};
	
	this.callbackCounter = 0;
	
	var that = this;
	
	//Save new keys.
	this.saveKeys = function(keys){
		this.keys = keys;
			
		chrome.storage.sync.set({'keys': keys});
	};
	
	//Save new resolution.
	this.saveResolution = function(resolution){
		this.resolution = resolution;
		
		if(!this.fullscreen)
		{
			this.viewport.width = resolution.width;
			this.viewport.height = resolution.height;
		}
		
		chrome.storage.sync.set({'resolution' : resolution});
	};
	
	//Resize window.
	this.resizeWindow = function(){

		//Resize canvas to new resolution.
		var xScale = this.resolution.width / cc.originalCanvasSize.width;
        var yScale = this.resolution.height / cc.originalCanvasSize.height;
		
		if (xScale > yScale)
            xScale = yScale;
		
        cc.canvas.width = cc.originalCanvasSize.width * xScale;
        cc.canvas.height = cc.originalCanvasSize.height * xScale;
		
		this.viewport.width = this.resolution.width = cc.canvas.width;
		this.viewport.height = this.resolution.height = cc.canvas.height;
		
		var parentDiv = document.getElementById("Cocos2dGameContainer");
        if (parentDiv) {
            parentDiv.style.width = cc.canvas.width + "px";
            parentDiv.style.height = cc.canvas.height + "px";
        }
		
		cc.renderContext.translate(0, cc.canvas.height);
		cc.renderContext.scale(xScale, xScale);
		
        cc.Director.getInstance().setContentScaleFactor(xScale);
		
		//Resize menus.
		window.resizeTo(cc.canvas.width, cc.canvas.height + 50);
		document.getElementsByTagName('body')[0].style.font = "normal " + Constants.Font.SIZE*xScale + "px " + Constants.Font.NAME;
		
		setTimeout(function(){
			MenuScreens.resize();
		}, 100);
	};
	
	this.init = function(){

		cc._fontSize = Constants.Font.SIZE;
		cc._fontName = Constants.Font.NAME;
	
		//Get stored data.
		chrome.storage.sync.get('keys', function(data){
			that.callbackCounter++;
			if(data.keys != null)
				that.keys = new Keys(data.keys);

			that.apply();
		});
		
		chrome.storage.sync.get('resolution', function(data){
		
			that.callbackCounter++;
			if(data.resolution != null)
				that.resolution = data.resolution;
				
			that.apply();
		});
	};
	
	//Apply when all callback has been called.
	this.apply = function(){

		if(this.callbackCounter >= 2)
		{
			this.resizeWindow();
			this.loaded = true;
		}
	};
};