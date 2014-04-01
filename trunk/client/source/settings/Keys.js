var Keys = function(keys){

	if(keys == null)
	{
		this.RIGHT = cc.KEY.d;
		this.LEFT = cc.KEY.a;
		this.JUMP = cc.KEY.space;
		this.KILL = cc.KEY.q;
		this.OPT1 = cc.KEY.z;
		this.OPT2 = cc.KEY.x;
		this.PAUSE = cc.KEY.p;
		
		//To buy skills.
		this.SKILL1 = cc.KEY['1'];
		this.SKILL2 = cc.KEY['2'];
		this.SKILL3 = cc.KEY['3'];
		this.SKILL4 = cc.KEY['4'];
		this.TOGGLE_BUY_MODE = cc.KEY.c;
		this.CHAT = cc.KEY.enter;
	}
	else
	{
		this.RIGHT = keys.RIGHT;
		this.LEFT = keys.LEFT;
		this.JUMP = keys.JUMP;
		this.KILL = keys.KILL;
		this.OPT1 = keys.OPT1;
		this.OPT2 = keys.OPT2;
		this.PAUSE = keys.PAUSE;
		
		//To buy skills.
		this.SKILL1 = keys.SKILL1;
		this.SKILL2 = keys.SKILL2;
		this.SKILL3 = keys.SKILL3;
		this.SKILL4 = keys.SKILL4;
		this.TOGGLE_BUY_MODE = keys.TOGGLE_BUY_MODE;
		this.CHAT = keys.CHAT;
	}
};

Keys.prototype.reset = function(){
	this.RIGHT = cc.KEY.d;
	this.LEFT = cc.KEY.a;
	this.JUMP = cc.KEY.space;
	this.KILL = cc.KEY.q;
	this.OPT1 = cc.KEY.z;
	this.OPT2 = cc.KEY.x;
	this.PAUSE = cc.KEY.p;
	
	this.SKILL1 = cc.KEY['1'];
	this.SKILL2 = cc.KEY['2'];
	this.SKILL3 = cc.KEY['3'];
	this.SKILL4 = cc.KEY['4'];
	this.TOGGLE_BUY_MODE = cc.KEY.c;
	this.CHAT = cc.KEY.enter;
};