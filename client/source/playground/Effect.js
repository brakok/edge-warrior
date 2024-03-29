
var Effect = function(type, x, y, degree){
	
	this.type = type;
	this.x = x;
	this.y = y;
	
	this.degree = degree;
	this.hasEnded = false;
	
	this.init();
};

Effect.prototype.init = function(){

	this.sprite = null;
	this.animation = null;
	
	switch(this.type){
		case Enum.Effect.Type.PLAYER_DEATH:
		
			//Create player death animation.
			this.sprite = cc.Sprite.createWithSpriteFrameName('PlayerDeath.0000.png');
			this.animation = AnimationManager.create('PlayerDeath', 0, 12, 24);
			break;
		case Enum.Effect.Type.BLOCK_LANDING:
		
			//Create fog animation on block landing.
			this.sprite = cc.Sprite.createWithSpriteFrameName('BlockLanding.0000.png');
			this.animation = AnimationManager.create('BlockLanding', 0, 12, 24);
			break;
		case Enum.Effect.Type.BLOCK_DISAPPEARING:
		
			//Create fog animation on block landing.
			this.sprite = cc.Sprite.createWithSpriteFrameName('BlockDisappearing.0000.png');
			this.animation = AnimationManager.create('BlockDisappearing', 0, 8, 24);
			break;
		case Enum.Effect.Type.SWAP_COLOR:
		
			//Trigger animation when a block swaps his color.
			this.sprite = cc.Sprite.createWithSpriteFrameName('SwapColor.0000.png');
			this.animation = AnimationManager.create('SwapColor', 0, 12, 24);
			break;
		case Enum.Effect.Type.DOUBLE_JUMP:
			
			//Effect when double jumping.
			this.sprite = cc.Sprite.createWithSpriteFrameName('DoubleJump.0000.png');
			this.animation = AnimationManager.create('DoubleJump', 0, 8, 24);
			break;
		case Enum.Effect.Type.SPARK:
		
			//Light explosion.
			this.sprite = cc.Sprite.createWithSpriteFrameName('Spark.0000.png');
			this.animation = AnimationManager.create('Spark', 0, 6, 48);
			break;
		case Enum.Effect.Type.SPAWN_UNLEASHED:
		
			//Effect created by spawn explosion.
			this.sprite = cc.Sprite.createWithSpriteFrameName('spawn_unleashed.0000.png');
			this.animation = AnimationManager.create('spawn_unleashed', 0, 16, 24);
			break;
		case Enum.Effect.Type.FIREBALL_EXPLOSION:

			//Effect created by dying fireball.
			this.sprite = cc.Sprite.createWithSpriteFrameName('Fireball_explosion.0000.png');
			this.animation = AnimationManager.create('Fireball_explosion', 0, 12, 24);
			break;
		
		case Enum.Effect.Type.FIREPULSE_EXPLOSION:

			//Effect created when fire pulse lands.
			this.sprite = cc.Sprite.createWithSpriteFrameName('FirePulse_explosion.0000.png');
			this.animation = AnimationManager.create('FirePulse_explosion', 0, 12, 24);
			break;
		
		case Enum.Effect.Type.JAW_DISAPPEARING:

			//Effect created when jaw disappears.
			this.sprite = cc.Sprite.createWithSpriteFrameName('JawDisappearing.0000.png');
			this.animation = AnimationManager.create('JawDisappearing', 0, 10, 24);
			break;
		case Enum.Effect.Type.PESKY_BOX_DISAPPEARING:
		
			//Effect created when pesky box ends.
			this.sprite = cc.Sprite.createWithSpriteFrameName('PeskyBoxDisappearing.0018.png');
			this.animation = AnimationManager.create('PeskyBoxDisappearing', 18, 36, 24);
			break;
			
		case Enum.Effect.Type.PICK_AXE_DISAPPEARING:
		
			//Effect created when pesky box ends.
			this.sprite = cc.Sprite.createWithSpriteFrameName('PickAxeDisappearing.0000.png');
			this.animation = AnimationManager.create('PickAxeDisappearing', 0, 6, 24);
			break;
		case Enum.Effect.Type.DEFLECTOR_DISAPPEARING:
		
			//Effect created when deflector ends.
			this.sprite = cc.Sprite.createWithSpriteFrameName('Deflector_disappearing.0036.png');
			this.animation = AnimationManager.create('Deflector_disappearing', 36, 48, 24);
			break;
		case Enum.Effect.Type.BOUNCE:
		
			//Effect created when player touches deflector.
			this.sprite = cc.Sprite.createWithSpriteFrameName('Bounce.0000.png');
			this.animation = AnimationManager.create('Bounce', 0, 6, 24);
			break;
		case Enum.Effect.Type.TELEPORT:
		
			//Effect created when player teleports.
			this.sprite = cc.Sprite.createWithSpriteFrameName('Teleport.0000.png');
			this.animation = AnimationManager.create('Teleport', 0, 8, 24);
			break;
		case Enum.Effect.Type.TIME_ZONE_DISAPPEARING:
		
			//Effect created when time zone ends.
			this.sprite = cc.Sprite.createWithSpriteFrameName('TimeZone_disappearing.0006.png');
			this.animation = AnimationManager.create('TimeZone_disappearing', 6, 12, 24);
			break;
		case Enum.Effect.Type.SAND_SPIRIT_DISAPPEARING:
		
			//Effect created when time zone ends.
			this.sprite = cc.Sprite.createWithSpriteFrameName('SandSpirit_disappearing.0000.png');
			this.animation = AnimationManager.create('SandSpirit_disappearing', 0, 12, 24);
			break;
			
		case Enum.Effect.Type.VENOM_WAVE_END:
		
			//Effect created when time zone ends.
			this.sprite = cc.Sprite.createWithSpriteFrameName('VenomWave_end.0012.png');
			this.animation = AnimationManager.create('VenomWave_end', 12, 18, 24);
			break;
			
		case Enum.Effect.Type.VENOM_BALL_THROW:
		
			//Effect created when time zone ends.
			this.sprite = cc.Sprite.createWithSpriteFrameName('VenomBall_throw.0000.png');
			this.animation = AnimationManager.create('VenomBall_throw', 0, 12, 24);
			break;
			
		case Enum.Effect.Type.VENOM_BALL_END:
		
			//Effect created when time zone ends.
			this.sprite = cc.Sprite.createWithSpriteFrameName('VenomBall_end.0006.png');
			this.animation = AnimationManager.create('VenomBall_end', 0, 6, 24);
			break;
		case Enum.Effect.Type.CANCEL_DROP:
		
			//Effect created when player can't drop a block.
			this.sprite = cc.Sprite.createWithSpriteFrameName('CancelDrop.0000.png');
			this.animation = AnimationManager.create('CancelDrop', 0, 14, 24);
			
			AudioManager.playEffect(Constants.Sound.File.Player.DOUBLE_JUMP);
			break;
	}
	
	this.sprite.setZOrder(Constants.Effect.Z_INDEX);

	if(this.degree != null)
		this.sprite.setRotation(this.degree);
	
	this.callback = cc.CallFunc.create(function(node){
								Client.game.layer.removeChild(node);
								this.hasEnded = true;
							}, this.sprite);
};

Effect.prototype.launch = function(){

	//Trigger death animation.
	this.sprite.runAction(cc.Sequence.create(this.animation, 
											 this.callback));
			 
	this.sprite.setPosition(new cc.Point(this.x, this.y));
	Client.game.layer.addChild(this.sprite);
};

Effect.prototype.render = function(){
	Client.game.camera.project(this.sprite, this.x, this.y);
};

Effect.prototype.update = function(){
	//Nothing.
};