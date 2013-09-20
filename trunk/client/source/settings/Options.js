
var Options = new function(){
		
	this.loaded = false;
	this.fullscreen = false;
	
	this.keys = {
		RIGHT: cc.KEY.d,
		LEFT: cc.KEY.a,
		JUMP: cc.KEY.space,
		KILL: cc.KEY.q,
		OPT1: cc.KEY.z,
		OPT2: cc.KEY.x,
		PAUSE: cc.KEY.p,
		reset: function(){
			this.RIGHT = cc.KEY.d;
			this.LEFT = cc.KEY.a;
			this.JUMP = cc.KEY.space;
			this.KILL = cc.KEY.q;
			this.OPT1 = cc.KEY.z;
			this.OPT2 = cc.KEY.x;
			this.PAUSE = cc.KEY.p;
		}
	};
	
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
		
		this.viewport.width = cc.canvas.width;
		this.viewport.height = cc.canvas.height;
		
		var parentDiv = document.getElementById("Cocos2dGameContainer");
        if (parentDiv) {
            parentDiv.style.width = cc.canvas.width + "px";
            parentDiv.style.height = cc.canvas.height + "px";
        }
		
		cc.renderContext.translate(0, cc.canvas.height);
		cc.renderContext.scale(xScale, xScale);
		
        cc.Director.getInstance().setContentScaleFactor(xScale);
		
		//Resize menus.
		MenuScreens.resize();
		window.resizeTo(this.resolution.width, cc.canvas.height + 50);
	};
	
	this.init = function(){
	
		//Get stored data.
		chrome.storage.sync.get('keys', function(data){
			that.callbackCounter++;
			if(data.keys != null)
				that.keys = data.keys;
				
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