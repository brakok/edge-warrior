
var KeyInput = function(id, value, parent){
	
	this.id = id;
	
	this.input = document.getElementById(id);
	this.value = value;
	
	this.parent = parent;
	
	this.displayText = this.convert(value);
	this.input.value = this.displayText;
	
	var that = this;
	
	//Bind event.
	this.input.onkeydown = function(e) { 
		
		var code = e.keyCode;

		//Numpad
		if(code > 96 && code < 106)
			code -= 48;

		if(that.parent.valid(code))
			that.setValue(code, true);

		that.input.blur();
	};
	
	this.input.onblur = function() { 
		if(that.input.value == '' || that.input.value == null)
			that.reset();
	};
	
	this.input.onfocus = function(){
		that.input.value = '';
	};
};

KeyInput.prototype.reset = function(){
	this.input.value = this.displayText;
};

KeyInput.prototype.setValue = function(value, mustValidate){
	this.value = value;
	
	if(mustValidate != null && mustValidate)
		this.parent.updateKeys();
	
	this.displayText = this.convert(value);
	this.input.value = this.displayText;
};

//Convert ASCII to character.
KeyInput.prototype.convert = function(input){

	var value = null;
	switch(input){
		case cc.KEY.space:
			value = 'SPACE';
			break;
		case cc.KEY.backspace:
			value = 'BACKSLASH';
			break;
		case cc.KEY.tab:
			value = 'TAB';
			break;
		case cc.KEY.enter:
			value = 'ENTER';
			break;
		case cc.KEY.shift:
			value = 'SHIFT';
			break;
		case cc.KEY.ctrl:
			value = 'CTRL';
			break;
		case cc.KEY.alt:
			value = 'ALT';
			break;
		case cc.KEY.pause:
			value = 'PAUSE';
			break;
		case cc.KEY.capslock:
			value = 'CAPS';
			break;
		case cc.KEY.escape:
			value = 'ESC';
			break;
		case cc.KEY.left:
			value = 'LEFT';
			break;
		case cc.KEY.up:
			value = 'UP';
			break;
		case cc.KEY.right:
			value = 'RIGHT';
			break;
		case cc.KEY.down:
			value = 'DOWN';
			break;
		default:
			value = String.fromCharCode(input).toUpperCase();
			break;
	}
	
	return '[' + value + ']';
};