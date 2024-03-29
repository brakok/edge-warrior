var Player = function (x, y, color, isControlled, username) {
	
	this.x = x;
	this.y = y;
	
	this.color = color;
	this.username = username;
	
	this.givenBlock = null;
	
	this.isAlive = true;
	this.hasWon = false;
	
	this.units = 0;	
	this.pickAxeCount = 0;
	
	Smoothering.init(this, x, y);
	
	this.updatedOnce = false;
	this.isControlled = isControlled;
	this.audioId = null;
	
	this.blockTypeAvailable = [];
	this.blockTypeAvailable.push(new BlockOption(Enum.Block.Type.NEUTRAL, Constants.Block.Percent.STARTING_NEUTRAL));
	
	this.stuckTimer = 0;
	this.stuckEmitter = null;
	 
	this.stunTimer = 0;
	this.stunEmitter = null;
	 
	this.voices = null;
	
	this.maySpeak = false;
	this.voiceTimer = 0;
	this.lastVoice = null;
}

//Change percent on a specific option. Negative percent lowers actual one.
Player.prototype.changePercent = function(blockType, percent, skill){

	var blockOption = this.getBlockOption(blockType, skill);

	if(blockOption)
		blockOption.percent += percent;

};

//Stronger a specific skilled block.
Player.prototype.changePower = function(skill){

	var blockOption = this.getBlockOption(Enum.Block.Type.SKILLED, skill);

	if(blockOption && blockOption.skill != null)
		blockOption.skill.power++;
};

//Buy a skill to obtain skill block.
Player.prototype.buySkill = function(number){
		
	var skill = Options.getSkill(number);
	
	if(skill != null)
	{
		//Can't exceed buy limit.
		if((!Client.game.hud.skillStore.hasFreeBlock && skill.cost > this.units) || skill.level >= Constants.Block.Skill.MAX_LEVEL)
		{
			AudioManager.playEffect(Constants.Sound.File.Common.DENY_ACTION, false);
			return;
		}

		var blockOption = this.getBlockOption(Enum.Block.Type.SKILLED, skill.type);
		
		if(blockOption == null)
		{
			this.blockTypeAvailable.push(new BlockOption(Enum.Block.Type.SKILLED, skill.percent.start, skill.type, 0));
		}
		else
		{		
			//Change power or apparition percent chance.
			switch(Options.buyMode){
				case Enum.SkillStore.Mode.POWER:
					this.changePower(skill.type);
					break;
				case Enum.SkillStore.Mode.QUANTITY:
					this.changePercent(blockOption.type, skill.percent.step, skill.type);
					break;
			}
		}

		//Trigger buy sound.
		AudioManager.playEffect(Constants.Sound.File.Common.BUY, false);
		skill.level++;

		this.units -= skill.cost;
		skill.cost += skill.costStep;

		if(this.units < 0)
			this.units = 0;
		
		if(Client.game.hud.skillStore.hasFreeBlock)
		{
			Client.game.hud.skillStore.hasFreeBlock = false;
			Client.game.hud.skillStore.needUpdate = true;
		}
	}
};

//Add a block as the current block from an extern source.
Player.prototype.addNextBlock = function(blockType){
	this.givenBlock = blockType;
	Client.game.hud.inventory.setCurrent(new Block(0,0, this.givenBlock.type, this.color, this.givenBlock.skill));
};

//Ask player to randomize next block in the list.
Player.prototype.pushNextBlock = function(){
	
	//Use current block.
	Client.game.hud.inventory.useBlock();
	
	if(this.givenBlock == null)
	{			
		var rnd = Math.floor(Math.random()*100);
		var found = false;
		var min = 0;
		
		var end = this.blockTypeAvailable.length;
		var i = 0;
		var nextBlock = null;
		
		//Loop through block types available to the player to initiate next command.
		while(i < end && !found)
		{
			if(rnd <= (this.blockTypeAvailable[i].percent + min))
			{
				nextBlock = {
					type: this.blockTypeAvailable[i].type,
					skill: this.blockTypeAvailable[i].skill
				};
					
				found = true;
			}
			
			min += this.blockTypeAvailable[i].percent;
			i++;
		}
		
		//Colored if not found.
		if(!found)
			nextBlock = {
				type: Enum.Block.Type.COLORED,
				skill: null
			};
			
		Client.game.hud.inventory.addBlock(new Block(0,0, nextBlock.type, this.color, nextBlock.skill));
	}
	else
		this.givenBlock = null;
};

//Initiation.
Player.prototype.init = function(){

	this.facing = Enum.Facing.LEFT;
	
	var colorText = 'yellow';
	
	switch(this.color)
	{
		case Enum.Color.RED:
			colorText = 'red';
			break;
		case Enum.Color.BLUE:
			colorText = 'blue';
			break;
		case Enum.Color.WHITE:
			colorText = 'white';
			break;
	}
	
	this.voices = {
		kill: new Voice(Enum.Voice.Type.KILL, colorText, 1),
		jump: new Voice(Enum.Voice.Type.JUMP, colorText, 2),
		idle: new Voice(Enum.Voice.Type.IDLE, colorText, 3)
	};

	this.resetVoiceTimer();
	
	//Set current animation to idle.
	this.currentAnimationType = Enum.Anim.Type.IDLE;	
	this.currentAction = Enum.Action.Type.STANDING;

	//Base frame.
	this.currentAnimation = cc.Sprite.createWithSpriteFrameName(colorText + '_idle.0000.png');
	this.currentAnimation.setZOrder(Constants.Player.Z_ORDER);
	this.setPosition(this.x, this.y);
			
	//Creation of the animations.
	this.idleAnimation = AnimationManager.create(colorText + '_idle', 0, 24, 24);
	this.runningAnimation = AnimationManager.create(colorText + '_running', 24, 48, 24);
	this.jumpingAnimation = AnimationManager.create(colorText + '_jumping', 49, 60, 24);
	
	//Starting animation is idle.
	this.currentAnimation.runAction(cc.RepeatForever.create(this.idleAnimation));
	Client.game.layer.addChild(this.currentAnimation);
};

//Player killing.
Player.prototype.kill = function(){

	if(Client.game.currentPhase != Enum.Game.Phase.WINNER)
	{		
		//Taunt enemy.
		if(this.lastVoice != null)
			AudioManager.stopVoice(this.lastVoice);
			
		if(this.isControlled && this.maySpeak)
			this.resetVoiceTimer();
		
		this.lastVoice = this.voices.kill.getRandomVoice();
		AudioManager.playVoice(this.lastVoice, false);
	}
};

Player.prototype.getPosition = function(){
	return this.currentAnimation.getPosition();
};

Player.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
};

Player.prototype.getBlockOption = function(blockType, skillType){

	for(var i in this.blockTypeAvailable)
		if(this.blockTypeAvailable[i].type == blockType && (skillType == null || this.blockTypeAvailable[i].skill.type == skillType))
			return this.blockTypeAvailable[i];
	
	return null;
};

//Reset the voice timer to a random value between minimum value and specified range.
Player.prototype.resetVoiceTimer = function(){
	this.voiceTimer = Constants.Sound.VoiceTimer.MIN + (Math.random()*Constants.Sound.VoiceTimer.RANGE);
};

//Handle inputs.
Player.prototype.manageInput = function(){

	//Toggle buy mode for skills.
	if(Client.keys[Options.keys.TOGGLE_BUY_MODE] && !Client.pressedKeys[Options.keys.TOGGLE_BUY_MODE])
		Client.game.hud.skillStore.changeBuyMode();

	//Buy skill.
	if(Client.keys[Options.keys.SKILL1] && !Client.pressedKeys[Options.keys.SKILL1])
		this.buySkill(1);
	if(Client.keys[Options.keys.SKILL2] && !Client.pressedKeys[Options.keys.SKILL2])
		this.buySkill(2);
	if(Client.keys[Options.keys.SKILL3] && !Client.pressedKeys[Options.keys.SKILL3])
		this.buySkill(3);
	if(Client.keys[Options.keys.SKILL4] && !Client.pressedKeys[Options.keys.SKILL4])
		this.buySkill(4);
	
	//Lose focus of canvas when opening chat.
	if(Client.keys[Options.keys.CHAT] && !Client.pressedKeys[Options.keys.CHAT])
		Chat.show();
	
	//Store blocks in inventory.
	if(this.givenBlock == null)
	{
		var blockToSend = null;
		
		//Store or use option 1.
		if(Client.keys[Options.keys.OPT1] && !Client.pressedKeys[Options.keys.OPT1])
		{				
			if(Client.game.hud.inventory.option1 == null)
				Client.game.hud.inventory.setOption(true);
			else
				Client.game.hud.inventory.useOption(true);
			
			blockToSend = Client.game.hud.inventory.getCurrent().toServer();
		}
			
		//Store or use option 2.
		if(Client.keys[Options.keys.OPT2] && !Client.pressedKeys[Options.keys.OPT2])
		{
			if(Client.game.hud.inventory.option2 == null)
				Client.game.hud.inventory.setOption(false);
			else
				Client.game.hud.inventory.useOption(false);
			
			blockToSend = Client.game.hud.inventory.getCurrent().toServer();
		}
		
		if(blockToSend != null)
			Client.socket.emit(Constants.Message.NEXT_BLOCK, blockToSend);
	}
};

Player.prototype.render = function(){
	Client.game.camera.project(this.currentAnimation, this.x, this.y);
};

Player.prototype.update = function(dt){
	
	//Update position.
	var newPos = Smoothering.pop(this);
	
	if(newPos.x != this.x || newPos.y != this.y)
	{
		this.x = newPos.x;
		this.y = newPos.y;
	}

	//Create things that need a game running.
	if(!this.updatedOnce)
	{
		this.stuckEmitter = ParticleManager.create(Enum.Particles.STUCK, this.x, this.y, Client.game.layer);
		this.stunEmitter = ParticleManager.create(Enum.Particles.STUN, this.x, this.y, Client.game.layer);
		this.updatedOnce = true;
	}
	
	//Stuck effect.
	if(this.isAlive)
	{
		this.stuckEmitter.x = this.x - 18;
		this.stuckEmitter.y = this.y;
	
		this.stunEmitter.x = this.x;
		this.stunEmitter.y = this.y + 20;
	
		//Handle stuck emitter.
		if(this.stuckTimer > 0 && !this.stuckEmitter.isRunning)
			this.stuckEmitter.run();
		else if(this.stuckTimer <= 0 && this.stuckEmitter.isRunning)
			this.stuckEmitter.stop(false);
			
		//Handle stun emitter.
		if(this.stunTimer > 0 && !this.stunEmitter.isRunning)
			this.stunEmitter.run();
		else if(this.stunTimer <= 0 && this.stunEmitter.isRunning)
			this.stunEmitter.stop(false);
	}
	
	//Block inputs during warmup phase.
	if(this.isControlled && Client.game.currentPhase != Enum.Game.Phase.WARMUP)
	{	
		//Handle inputs.
		this.manageInput();
	
		if(this.maySpeak)
		{
			if(this.voiceTimer <= 0)
			{
				if(this.lastVoice != null)
					AudioManager.stopVoice(this.lastVoice);
			
				this.lastVoice = this.voices.idle.getRandomVoice();
				AudioManager.playVoice(this.lastVoice, false);
			
				this.resetVoiceTimer();
			}
			else
				this.voiceTimer -= dt;
		}
	}
};

Player.prototype.execute = function(action){

	//Assign good animation to the right action.
	switch(action)
	{
		case Enum.Action.Type.STANDING:
			
			//Allow player to speak randomly when on ground.
			if(this.isControlled && !this.maySpeak)
				this.maySpeak = true;
		
			this.swapAnimation(Enum.Anim.Type.IDLE);
			break;
		case Enum.Action.Type.RUNNING:
			
			//Allow player to speak randomly when on ground.
			if(this.isControlled && !this.maySpeak)
				this.maySpeak = true;
		
			this.swapAnimation(Enum.Anim.Type.RUNNING);
			
			if(this.audioId != null)
			{
				AudioManager.stopEffect(this.audioId);
				this.audioId = null;
			}
			
			this.audioId = AudioManager.playEffect(Constants.Sound.File.Player.FOOT_STEP, true);
			break;
		case Enum.Action.Type.JUMPING:
			
			if(this.lastVoice != null)
				AudioManager.stopVoice(this.lastVoice);
				
			//Get a random voice when jumping.
			this.lastVoice = this.voices.jump.getRandomVoice();
			AudioManager.playVoice(this.lastVoice, false);
			
			//Prevent player to talk randomly when in mid-air.
			if(this.isControlled)
			{
				this.maySpeak = false;
				this.resetVoiceTimer();
			}
			
			this.swapAnimation(Enum.Anim.Type.JUMPING);
			break;
		case Enum.Action.Type.DOUBLE_JUMPING:
			this.swapAnimation(Enum.Anim.Type.JUMPING);
			break;
		case Enum.Action.Type.FALLING:
			
			if(this.maySpeak)
			{
				this.maySpeak = false;
				this.resetVoiceTimer();
			}
		
			this.swapAnimation(Enum.Anim.Type.FALLING);
			break;
	}

	if(this.currentAction != action && this.currentAction == Enum.Action.Type.RUNNING && this.audioId != null)
	{
		AudioManager.stopEffect(this.audioId);
		this.audioId = null;
	}
	
	//Check if player has just landed.
	if(this.hasLanded(action))
		this.land();		
	
	this.currentAction = action;
};

Player.prototype.hasLanded = function(action){
	var wasMidAir = this.currentAction == Enum.Action.Type.JUMPING || this.currentAction == Enum.Action.Type.DOUBLE_JUMPING || this.currentAction == Enum.Action.Type.FALLING;
	var isOnGround = action == Enum.Action.Type.STANDING || action == Enum.Action.Type.RUNNING;
	
	return wasMidAir && (isOnGround || action == Enum.Action.Type.JUMPING);
};

Player.prototype.land = function(){
	//Trigger landing sound.
	AudioManager.playEffect(Constants.Sound.File.Player.LAND, false);
};

Player.prototype.fromServer = function(data){

	Smoothering.push(this, data.x, data.y);	
		
	this.pickAxeCount = data.pickAxeCount;
	this.stuckTimer = data.stuckTimer;
	this.stunTimer = data.stunTimer;
	
	if(data.facing != this.facing)
	{
		this.facing = data.facing;
		this.turn();
	}
};

Player.prototype.die = function() {
	Client.game.layer.removeChild(this.currentAnimation);
	
	//Create an animation for the dying player.
	EffectManager.create(Enum.Effect.Type.PLAYER_DEATH, this.x, this.y);
	AudioManager.playEffect(Constants.Sound.File.Player.DEATH, false);
	
	if(this.lastVoice != null)
		AudioManager.stopVoice(this.lastVoice);
	
	if(this.stuckEmitter.isRunning)
		this.stuckEmitter.stop(false);
	
	if(this.stunEmitter.isRunning)
		this.stunEmitter.stop(false);
	
	this.isAlive = false;
	this.maySpeak = false;
	this.resetVoiceTimer();
};

Player.prototype.win = function(){
	Client.game.layer.removeChild(this.currentAnimation);
	this.hasWon = true;
};

Player.prototype.turn = function(){

	//Flip the sprite to current direction.
	if(this.currentAnimation != null)
		this.currentAnimation.setFlippedX(this.facing == Enum.Facing.RIGHT);
	
	//Reset anim when turning.
	if(this.currentAction == Enum.Anim.Type.RUNNING)
	{
		this.swapAnimation(Enum.Anim.Type.RUNNING, true);
			
		if(this.audioId != null)
		{
			AudioManager.stopEffect(this.audioId);
			this.audioId = null;
		}
		
		this.audioId = AudioManager.playEffect(Constants.Sound.File.Player.FOOT_STEP, true);
	}
};

//Leave from a game.
Player.prototype.leave = function(){
	Client.game.layer.removeChild(this.currentAnimation);
};

Player.prototype.spawn = function(x, y){
	
	Smoothering.push(this, x, y);
	
	Client.game.layer.addChild(this.currentAnimation);
	this.isAlive = true;
};

Player.prototype.swapAnimation = function(newAnim, mustSwap){
	
	if(mustSwap == null || !mustSwap)
		if(newAnim == this.currentAnimationType && newAnim != Enum.Anim.Type.JUMPING)
			return;
			
	this.currentAnimationType = newAnim;
	Client.game.layer.removeChild(this.currentAnimation);
	
	switch(newAnim)
	{
		case Enum.Anim.Type.IDLE:
			this.currentAnimation.runAction(cc.RepeatForever.create(this.idleAnimation));
			break;
		case Enum.Anim.Type.RUNNING:
			this.currentAnimation.runAction(cc.RepeatForever.create(this.runningAnimation));
			break;
		case Enum.Anim.Type.JUMPING:
			this.currentAnimation.runAction(this.jumpingAnimation);
			break;
		case Enum.Anim.Type.FALLING:
			this.currentAnimation.runAction(this.jumpingAnimation);
			break;
	}

	Client.game.layer.addChild(this.currentAnimation);
};

