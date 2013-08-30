
var KeyForm = function(){
	this.div = document.getElementById('keys');
	
	this.defaultKeys = {
		RIGHT: cc.KEY.d,
		LEFT: cc.KEY.a,
		JUMP: cc.KEY.space,
		KILL: cc.KEY.q,
		OPT1: cc.KEY.z,
		OPT2: cc.KEY.x,
		PAUSE: cc.KEY.p
	};
	
	var tmpKeys = null;
	chrome.storage.sync.get('keys', function(keys){
		console.log(keys);
		tmpKeys = keys;
	});
	
	if(tmpKeys == null)
		this.keys = this.defaultKeys;
	else
		this.keys = tmpKeys;
	
	//Get key fields.
	var txtKeyRight = new KeyInput('keyRight', this.keys.RIGHT);
	var txtKeyLeft = new KeyInput('keyLeft', this.keys.LEFT);
	
	var txtKeyJump = new KeyInput('keyJump', this.keys.JUMP);
	var txtKeyKC = new KeyInput('keyKC', this.keys.KILL);
	
	var txtKeyOpt1 = new KeyInput('keyOpt1', this.keys.OPT1);
	var txtKeyOpt2 = new KeyInput('keyOpt2', this.keys.OPT2);
	var txtKeyPause = new KeyInput('keyPause', this.keys.PAUSE);
	
	//Save keys.
	this.save = function(){
	
		this.keys.RIGHT = txtKeyRight.value;
		this.keys.LEFT = txtKeyLeft.value;
		this.keys.JUMP = txtKeyJump.value;
		this.keys.KILL = txtKeyKC.value;
		this.keys.OPT1 = txtKeyOpt1.value;
		this.keys.OPT2 = txtKeyOpt2.value;
		this.keys.PAUSE = txtKeyPause.value;

		var tmpKeys = this.keys;
		chrome.storage.sync.set({'keys': tmpKeys});
	};
	
	//Set default keys.
	this.reset = function(){
		this.keys = this.defaultKeys;
		this.load();
	};
	
	//Set values in inputs.
	this.load = function(){
		txtKeyRight.setValue(this.keys.RIGHT);
		txtKeyLeft.setValue(this.keys.LEFT);
		txtKeyJump.setValue(this.keys.JUMP);
		txtKeyKC.setValue(this.keys.KILL);
		txtKeyOpt1.setValue(this.keys.OPT1);
		txtKeyOpt2.setValue(this.keys.OPT2);
		txtKeyPause.setValue(this.keys.PAUSE);
	};
};

KeyForm.prototype.setVisible = function(isVisible){
	this.div.style.display = (isVisible ? "block" : "none");
};

KeyForm.prototype.setPosition = function(x, y){
	this.div.style.left = x + 'px';
	this.div.style.top = y + 'px';
};