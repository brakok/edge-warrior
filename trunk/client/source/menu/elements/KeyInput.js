
var KeyInput = function(id, value){
	
	this.id = id;
	
	this.input = document.getElementById(id);
	this.value = value;
	
	this.displayText = this.convert(value);
	this.input.value = this.displayText;
	
	//Bind event.
	(function(keyInput){
		keyInput.input.onkeyup = function() { 
			if(keyInput.input.value != '' && keyInput.input.value != null)
				keyInput.setValue(keyInput.input.value.toUpperCase().charCodeAt(0));
				
			//keyInput.input.blur();
		};
		keyInput.input.onblur = function() { 
			if(keyInput.input.value == '' || keyInput.input.value == null)
				keyInput.reset();
		};
		keyInput.input.onfocus = function(){
			keyInput.input.value = '';
		};
	})(this);
};

KeyInput.prototype.reset = function(){
	this.input.value = this.displayText;
};

KeyInput.prototype.setValue = function(value){
	this.value = value;
	this.displayText = this.convert(value);
	
	this.input.value = this.displayText;
};

//Convert ASCII to character.
KeyInput.prototype.convert = function(input){
	
	console.log('Code: ' + input);
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