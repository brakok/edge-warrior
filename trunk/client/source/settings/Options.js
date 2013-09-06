
var Options = new function(){
		
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
	
	var that = this;
	
	chrome.storage.sync.get('keys', function(data){
		
		if(data.keys != null)
			that.keys = data.keys;
	});

	//Save new keys.
	this.saveKeys = function(keys){
		delete this.keys;
		this.keys = keys;
		
		chrome.storage.sync.set({'keys': keys});
	};
};

