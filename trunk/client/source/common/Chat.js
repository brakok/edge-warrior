
var Chat = new function(){
	this.div = document.getElementById('chat');
	this.divContent = document.getElementById('content');
	this.canvas = document.getElementById('gameCanvas');
	
	this.playerColors = {};
	
	this.isVisible = false;
	this.fadeTimer = null;
	this.intervalId = null;
	
	var that = this;
	
	this.txt = document.getElementById('txtChat');
	this.divTxt = document.getElementById('divTxtChat');
	
	this.txt.addEventListener('keydown', function(){
		
		if(event.keyCode == 10 || event.keyCode == 13)
		{
			if(that.txt.value != null && that.txt.value != '')
				Client.sendMessage(that.txt.value);
				
			that.txt.value = '';
			
			if(Client.game != null)
			{
				that.txt.blur();
				that.canvas.focus();
			}
		}
	});
	
	this.txt.addEventListener('blur', function(){
	
		if(Client.game != null && (that.txt.value == null || that.txt.value == ''))
			that.poke();
	
		that.txt.value = '';
	});
	
	this.x = 0;
	this.y = 0;
	
	this.addLine = function(username, value){
	
		//Randomize player color for chat.
		if(this.playerColors[username] == null)
		{
			var rndColor = {r: 0, g: 0, b: 0};
			
			rndColor.r = parseInt(Math.random()*255);
			rndColor.g = parseInt(Math.random()*255);
			rndColor.b = parseInt(Math.random()*255);
		
			//Minor adjusments for visibility.
			if(Client.game == null)
			{
				rndColor.r = parseInt(rndColor.r*0.65);
				rndColor.g = parseInt(rndColor.g*0.65);
				rndColor.b = parseInt(rndColor.b*0.65);
			}
			else if(rndColor.r + rndColor.g + rndColor.b < 300)
			{
				rndColor.r += 50;
				rndColor.g += 50;
				rndColor.b += 50;
			}
		
			this.playerColors[username] = rndColor;
		}
		
		var color = this.playerColors[username];
		this.divContent.innerHTML += '<br /><span style="color: rgb(' + color.r + ',' + color.g + ',' + color.b + ')">' + username + ': </span>' + value; 
	};

	this.clear = function(){
		this.divContent.innerHTML = '';
		this.txt.value = '';
		this.playerColors = {};
	};

	this.setColor = function(background, text){
		this.div.style.backgroundColor = background;
		this.div.style.color = text;
	};
	
	this.setSize = function(width, height){
		this.div.style.width = width + '%';
		this.div.style.height = height + '%';
	};
	
	this.setPosition = function(x, y){
		this.x = x;
		this.y = y;
		
		this.div.style.left = x + 'px';
		this.div.style.top = y + 'px';
	};

	this.poke = function(){
		
		this.isVisible = true;
		this.div.style.opacity = '1';
		
		//Must be hidden after delay.
		if(this.intervalId != null)
		{
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
		
		this.div.style.display = 'block';
		this.txt.style.display = 'none';
		this.hide(true);
	};
	
	this.show = function(showTxt){
		
		Client.initKeys();
		
		this.isVisible = true;
		this.div.style.opacity = '1';
		
		//Must be hidden after delay.
		if(this.intervalId != null)
		{
			clearInterval(this.intervalId);
			this.intervalId = null;
		}

		this.txt.style.display = this.div.style.display = 'block';
		
		if(Client.game != null)
			this.txt.focus();
	};

	this.hide = function(withFade){

		if(this.isVisible)
		{
			if(this.intervalId != null)
			{
				clearInterval(this.intervalId);
				this.intervalId = null;
			}
		
			if(withFade != null && withFade && this.intervalId == null)
			{
				this.fadeTimer = Constants.Chat.WAIT_BEFORE_HIDE;
				
				var that = this;
				this.intervalId = setInterval(function(){
					
					that.fadeTimer -= 0.017;					
					
					if(that.fadeTimer > 0 && that.fadeTimer <= Constants.Chat.FADE_OUT)
						that.div.style.opacity = that.fadeTimer/Constants.Chat.FADE_OUT;
					else if (that.fadeTimer <= 0)
					{
						that.isVisible = false;
						that.div.style.display = 'none';
						that.div.style.opacity = '1';
						clearInterval(that.intervalId);
						that.intervalId = null;
					}
					
				}, 17);
			}
			else
			{
				this.isVisible = false;
				this.div.style.display = 'none';
			}
		}
	};
};

