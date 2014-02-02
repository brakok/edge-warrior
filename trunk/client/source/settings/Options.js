
var Options = new function(){
		
	this.loaded = false;
	this.fullscreen = false;
	
	this.keys = new Keys();
	this.skillSet = new SkillSet();
	
	//Resolution policy.
	this.policy = new cc.ResolutionPolicy(cc.ContainerStrategy.PROPORTION_TO_FRAME, cc.ContentStrategy.NO_BORDER);
	
	this.buyMode = Enum.SkillStore.Mode.POWER;
	
	this.resolution = {
		width: Constants.Video.ORIGINAL_WIDTH,
		height: Constants.Video.ORIGINAL_HEIGHT,
		isFullscreen: false
	};
	
	this.viewport = {
		width: Constants.Video.ORIGINAL_WIDTH,
		height: Constants.Video.ORIGINAL_HEIGHT
	};
	
	this.callbackCounter = 0;
	
	var that = this;
		
	//Get skill.
	this.getSkill = function(number){
		
		var skill = null;
		
		switch(number){
			case 1:
				skill = this.skillSet.one;
				break;
			case 2:
				skill = this.skillSet.two;
				break;
			case 3:
				skill = this.skillSet.three;
				break;
			case 4:
				skill = this.skillSet.four;
				break;
		}
		
		return skill;
	};
	
	//Set skill.
	this.setSkill = function(number, skill){
				
		switch(number){
			case 1:
				this.skillSet.one = skill;
				break;
			case 2:
				this.skillSet.two = skill;
				break;
			case 3:
				this.skillSet.three = skill;
				break;
			case 4:
				this.skillSet.four = skill;
				break;
		}
	};
	
	//Save new keys.
	this.saveKeys = function(keys){
		this.keys = keys;
			
		chrome.storage.sync.set({'keys': keys});
	};
	
	//Save new skill set.
	this.saveSkillSet = function(skillSet){
		this.skillSet = skillSet;
				
		var skillTypes = this.skillSet.toSave();
				
		chrome.storage.sync.set({'skillSet': skillTypes});
	};
	
	//Set resolution.
	this.setResolution = function(resolution){
		this.resolution.width = resolution.width;
		this.resolution.height = resolution.height;
		this.resolution.isFullscreen = resolution.isFullscreen;
		
		this.viewport.width = resolution.width;
		this.viewport.height = resolution.height;
	};
	
	//Save new resolution.
	this.saveResolution = function(){
		var resolution = this.resolution;		
		chrome.storage.sync.set({'resolution' : resolution});
	};
	
	//Enter fullscreen.
	this.enterFullscreen = function(){
	
		chrome.app.window.current().fullscreen();
		
		if(!Client.game)
		{
			//Show exit button.
			var exit = document.getElementById('exit');
			exit.style.display = 'block';
		}
	};
	
	//Exit fullscreen.
	this.exitFullscreen = function(){
	
		chrome.app.window.current().restore();
		
		//Show exit button.
		var exit = document.getElementById('exit');
		exit.style.display = 'none';
	};
	
	//Resize window.
	this.resizeWindow = function(){
		
		if(this.resolution.width > screen.availWidth)
			this.resolution.width = screen.availWidth;
			
		if(this.resolution.height > screen.availHeight)
			this.resolution.height = screen.availHeight;
		
		//Resize menus.
		window.resizeTo(this.resolution.width, this.resolution.height);
	};
	
	function resize(){
		cc.EGLView.getInstance().setDesignResolutionSize(that.resolution.width, that.resolution.height, that.policy);
			
		var frameSize = cc.EGLView.getInstance().getFrameSize();
		that.viewport.width = that.resolution.width = frameSize.width;
		that.viewport.height = that.resolution.height = frameSize.height;
								
		//Resize canvas to new resolution.
		var xScale = that.resolution.width / cc.originalCanvasSize.width;
        var yScale = that.resolution.height / cc.originalCanvasSize.height;
		
		if (xScale > yScale)
            xScale = yScale;
				
		document.getElementsByTagName('body')[0].style.font = "normal " + Constants.Font.SIZE*xScale + "px " + Constants.Font.NAME;
		MenuScreens.resize();
	}
	
	this.init = function(){

		cc._globalFontSize = Constants.Font.SIZE;
		cc._globalFontName = Constants.Font.NAME;
	
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
		
		chrome.storage.sync.get('skillSet', function(data){
			that.callbackCounter++;
						
			if(data.skillSet != null)
				that.skillSet = new SkillSet(data.skillSet);
				
			that.apply();
		});
		
		//Set options for EGLView.
		cc.EGLView.getInstance().adjustViewPort(true);
		cc.EGLView.getInstance().resizeWithBrowserSize(true);
		cc.EGLView.getInstance().setResizeCallback(resize);
	};
	
	//Apply when all callbacks have been called.
	this.apply = function(){
	
		if(this.callbackCounter >= 3)
		{
			this.resizeWindow();
			
			if(this.resolution.isFullscreen)
				this.enterFullscreen();
				
			this.loaded = true;
		}
	};
};