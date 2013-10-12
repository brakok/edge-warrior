
var KeyForm = function(){
	this.div = document.getElementById('keys');
	this.keys = Options.keys;
	
	//Get key fields.
	var txtKeyRight = new KeyInput('keyRight', this.keys.RIGHT, this);
	var txtKeyLeft = new KeyInput('keyLeft', this.keys.LEFT, this);
	
	var txtKeyJump = new KeyInput('keyJump', this.keys.JUMP, this);
	var txtKeyKC = new KeyInput('keyKC', this.keys.KILL, this);
	
	var txtKeyOpt1 = new KeyInput('keyOpt1', this.keys.OPT1, this);
	var txtKeyOpt2 = new KeyInput('keyOpt2', this.keys.OPT2, this);
	var txtKeyPause = new KeyInput('keyPause', this.keys.PAUSE, this);
	
	//Update keys for new ones.
	this.updateKeys = function(){
		this.keys.RIGHT = txtKeyRight.value;
		this.keys.LEFT = txtKeyLeft.value;
		this.keys.JUMP = txtKeyJump.value;
		this.keys.KILL = txtKeyKC.value;
		this.keys.OPT1 = txtKeyOpt1.value;
		this.keys.OPT2 = txtKeyOpt2.value;
		this.keys.PAUSE = txtKeyPause.value;
	};
	
	//Save keys.
	this.save = function(){
		var tmpKeys = this.keys;
		Options.saveKeys(this.keys);
	};
	
	//Set default keys.
	this.reset = function(){
		this.keys.reset();
		
		this.save();
		this.load();
	};
	
	//Valid uniqueness of key.
	this.valid = function(code){
		
		if(this.keys.RIGHT == code
		   || this.keys.LEFT == code
		   || this.keys.JUMP == code
		   || this.keys.KILL == code
		   || this.keys.OPT1 == code
		   || this.keys.OPT2 == code
		   || this.keys.PAUSE == code)
		 {
			return false;
		 }
		  
		 return true;
	};
		
	//Set values in inputs.
	this.load = function(){
		txtKeyRight.setValue(this.keys.RIGHT, false);
		txtKeyLeft.setValue(this.keys.LEFT, false);
		txtKeyJump.setValue(this.keys.JUMP, false);
		txtKeyKC.setValue(this.keys.KILL, false);
		txtKeyOpt1.setValue(this.keys.OPT1, false);
		txtKeyOpt2.setValue(this.keys.OPT2, false);
		txtKeyPause.setValue(this.keys.PAUSE, false);
	};
	
	this.init = function(){
		this.keys = Options.keys;
		this.load();		
	};
};

KeyForm.prototype.setVisible = function(isVisible){
	this.div.style.display = (isVisible ? "block" : "none");
};

KeyForm.prototype.setPosition = function(x, y){
	this.div.style.left = x + 'px';
	this.div.style.top = y + 'px';
};