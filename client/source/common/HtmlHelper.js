
var HtmlHelper = {
	errorTimeoutHandle: null,
	messageTimeoutHandle: null,
	errors: {},
	messages: {},
	computeWidth: function(el){
		var isVisible = el.style.display != "none";
		
		if(!isVisible)
		{
			el.style.visibility = "hidden";
			el.style.display = "block";
		}
		
		var width = parseInt(window.getComputedStyle(el).width);
		
		if(!isVisible)
		{
			el.style.visibility = null;
			el.style.display = "none";
		}
		
		return width;
	},
	showError: function(msg){
		
		if(this.errors[msg])
			return;
		
		var span = document.getElementById('message');
		span.style.display = 'none';
		
		this.errors[msg] = true;
		
		var span = document.getElementById('error');
		span.style.display = 'block';
		
		if(span.innerHTML == null || span.innerHTML == '')
			span.innerHTML = msg;
		else
			span.innerHTML += '<br />' + msg;

		if(this.errorTimeoutHandle)
			window.clearTimeout(this.errorTimeoutHandle);
		
		var that = this;
		
		//Clean error message after specified time.
		this.errorTimeoutHandle = setTimeout(function(){
			span.innerHTML = '';
			span.style.display = 'none';
			
			that.errors = {};
		}, 5000);
	},
	showMessage: function(msg){
	
		if(this.messages[msg])
			return;
	
		var span = document.getElementById('error');
		span.style.display = 'none';
	
		this.messages[msg] = true;
	
		var span = document.getElementById('message');
		span.style.display = 'block';
		
		if(span.innerHTML == null || span.innerHTML == '')
			span.innerHTML = msg;
		else
			span.innerHTML += '<br />' + msg;

		if(this.messageTimeoutHandle)
			window.clearTimeout(this.messageTimeoutHandle);
		
		var that = this;
		
		//Clean error message after specified time.
		this.messageTimeoutHandle = setTimeout(function(){
			span.innerHTML = '';
			span.style.display = 'none';
			
			that.messages = {};
		}, 5000);
	}
};