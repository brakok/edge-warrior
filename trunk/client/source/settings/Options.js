
var Options = new function(){
		
	this.loaded = false;
	this.fullscreen = false;
	
	this.keys = new Keys();
	this.skillSet = new SkillSet();
	
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
		
		chrome.storage.sync.get('skillSet', function(data){
			that.callbackCounter++;
			
			if(data.skillSet != null)
				that.skillSet = new SkillSet(data.skillSet);
				
			that.apply();
		});
	};
	
	//Apply when all callbacks have been called.
	this.apply = function(){
	
		if(this.callbackCounter >= 3)
		{
			this.resizeWindow();
			this.loaded = true;
		}
	};
};