var FloatingBall = function(x, y){	this.x = x;	this.y = y;		//Callback restoring idle animation.	this.actionCallback = cc.CallFunc.create(function(node){								this.swapAnimation(Enum.Anim.Type.IDLE);								this.currentAction = Enum.Anim.Type.IDLE;							}, this);};FloatingBall.prototype.init = function(){		this.currentAnimationType = Enum.Anim.Type.IDLE;		this.currentAction = Enum.Action.Type.STANDING;		//Base frame.	this.currentAnimation = cc.Sprite.createWithSpriteFrameName('floatingBall_idle.0000.png');	this.setPosition(this.x, this.y);	this.currentAnimation._zOrder = 50;		//Creation of the animations.	this.idleAnimation = AnimationManager.create('floatingBall_idle', 0, 24, 24);	this.actionAnimation = AnimationManager.create('floatingBall_action', 24, 44, 24);		this.currentAnimation.runAction(cc.RepeatForever.create(this.idleAnimation));	Client.layer.addChild(this.currentAnimation);};FloatingBall.prototype.setPosition = function(x, y){	this.x = x;	this.y = y;};FloatingBall.prototype.update = function(){	Client.camera.project(this.currentAnimation, this.x, this.y);};FloatingBall.prototype.execute = function(actionType){	if(this.currentAction != actionType)	{		switch(actionType)		{			case Enum.Action.Type.SUMMONING:				this.swapAnimation(Enum.Anim.Type.SUMMONING);				break;		}			this.currentAction = actionType;	}};FloatingBall.prototype.swapAnimation = function(animType){		if(animType != this.currentAnimationType)	{		Client.layer.removeChild(this.currentAnimation);				switch(animType)		{			case Enum.Anim.Type.IDLE:				this.currentAnimation.runAction(cc.RepeatForever.create(this.idleAnimation));				break;			case Enum.Anim.Type.SUMMONING:				//Create a sequence that will restore idle animation at the end.				this.currentAnimation.runAction(cc.Sequence.create(this.actionAnimation, 																   this.actionCallback));				break;		}				this.currentAnimationType = animType;				Client.layer.addChild(this.currentAnimation);	}};FloatingBall.prototype.fromServer = function(data){	this.x = data.x;	this.y = data.y;		this.setPosition(this.x, this.y);};