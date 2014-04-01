
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
	
	var txtKeySkill1 = new KeyInput('keySkill1', this.keys.SKILL1, this);
	var txtKeySkill2 = new KeyInput('keySkill2', this.keys.SKILL2, this);
	var txtKeySkill3 = new KeyInput('keySkill3', this.keys.SKILL3, this);
	var txtKeySkill4 = new KeyInput('keySkill4', this.keys.SKILL4, this);
	
	var txtKeyBuyMode = new KeyInput('keyBuyMode', this.keys.TOGGLE_BUY_MODE, this);
	var txtChat = new KeyInput('keyChat', this.keys.CHAT, this);
	
	//Update keys for new ones.
	this.updateKeys = function(){
		this.keys.RIGHT = txtKeyRight.value;
		this.keys.LEFT = txtKeyLeft.value;
		this.keys.JUMP = txtKeyJump.value;
		this.keys.KILL = txtKeyKC.value;
		this.keys.OPT1 = txtKeyOpt1.value;
		this.keys.OPT2 = txtKeyOpt2.value;
		this.keys.PAUSE = txtKeyPause.value;
		
		this.keys.SKILL1 = txtKeySkill1.value;
		this.keys.SKILL2 = txtKeySkill2.value;
		this.keys.SKILL3 = txtKeySkill3.value;
		this.keys.SKILL4 = txtKeySkill4.value;
		
		this.keys.TOGGLE_BUY_MODE = txtKeyBuyMode.value;
		this.keys.CHAT = txtChat.value;
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
		   || this.keys.PAUSE == code
		   || this.keys.SKILL1 == code
		   || this.keys.SKILL2 == code
		   || this.keys.SKILL3 == code
		   || this.keys.SKILL4 == code
		   || this.keys.TOGGLE_BUY_MODE == code
		   || this.keys.CHAT == code)
		 {
			HtmlHelper.showError('Key already bound.');
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
		
		txtKeySkill1.setValue(this.keys.SKILL1, false);
		txtKeySkill2.setValue(this.keys.SKILL2, false);
		txtKeySkill3.setValue(this.keys.SKILL3, false);
		txtKeySkill4.setValue(this.keys.SKILL4, false);
		
		txtKeyBuyMode.setValue(this.keys.TOGGLE_BUY_MODE, false);
		txtChat.setValue(this.keys.CHAT, false);
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