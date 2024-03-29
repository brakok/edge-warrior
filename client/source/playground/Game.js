
var Game = function(){

	this.enemies = [];
	this.blocks = [];
	
	this.npcs = {};
	this.deathZones = {};
	this.triggers = {};
	
	//Countdown of warmup.
	this.warmupTimer = Constants.Game.Phase.Warmup.PHASE_TIME;
	
	//Dynamic objects.
	this.player = null;
	this.currentPhase = Enum.Game.Phase.WARMUP;
	
	this.goal = null;
	
	this.width = null;
	this.height = null;

	//Layers.
	this.layer = null;
	this.hud = null;
	this.endScreen = null;
	
	this.camera = null;
	this.ready = false;
	this.isPaused = false;
	
	this.hasPulledOnce = false;
	this.mayPause = true;
};

Game.prototype.pause = function(){
	this.isPaused = true;
	myApp.GameScene.layer.removeChild(this.hud);
	myApp.GameScene.layer.addChild(this.pauseMenu);
};

Game.prototype.unpause = function(){
	this.isPaused = false;
	this.pauseMenu.switchTo(this.pauseMenu.home);
	myApp.GameScene.layer.removeChild(this.pauseMenu);
	myApp.GameScene.layer.addChild(this.hud);
};

//Get right player for specified color.
Game.prototype.getPlayer = function(color){
	
	if(this.player.color == color)
		return this.player;
	else
		for(var i in this.enemies)
			if(this.enemies[i].color == color)
				return this.enemies[i];
				
	return null;
};

Game.prototype.init = function(width, height, layer, frontLayer, hud, endScreen, pauseMenu){

	//Layer size.
	this.width = width;
	this.height = height;

	//Layers.
	this.layer = layer;
	this.frontLayer = frontLayer;
	this.hud = hud;
	this.endScreen = endScreen;
	this.pauseMenu = pauseMenu;
	
	this.ready = false;
};

//Game start.
Game.prototype.launch = function(type){

	//Init game with needed layers.
	var gameLayer = myApp.GameScene.layer;
	this.init(gameLayer.width, gameLayer.height, gameLayer.playGroundLayer, gameLayer.frontLayer, gameLayer.hud, gameLayer.endScreen, gameLayer.pauseMenu);

	//Add received elements to the layer (render).
	this.createWorld(type);
	
	//Lower neutral by quantity of enemies.
	this.player.changePercent(Enum.Block.Type.NEUTRAL, -Constants.Block.Percent.LOST_FOREACH_ENEMY*this.enemies.length);
};

//Create environment and camera.
Game.prototype.createWorld = function(type){

	//World creation.
	this.world = new World(type, this.layer);

	//Create camera.
	this.camera = new Camera(this.width*0.5-(this.width*0.5-this.world.width*0.5), 
							 this.height*0.5,
							 1,
							 Constants.Camera.ZOOM_FACTOR,
							 Constants.Camera.SPEED_X,
							 Constants.Camera.SPEED_Y,
							 Constants.Camera.SPEED_ZOOM);
	
	//Init dynamic elements.
	this.player.init();
	
	for(var i in this.enemies)
		this.enemies[i].init();
			
	this.goal.init();

	//Set first blocks to the HUD.
	this.hud.inventory.setBlocks(new Block(0,0, Enum.Block.Type.NEUTRAL, this.player.color), 
								 new Block(0,0, Enum.Block.Type.COLORED, this.player.color));
	
	this.ready = true;
};

Game.prototype.processUnits = function(){
	
	var newUnits = 0;
	
	for(var i in this.blocks)
	{
		var currentBlock = this.blocks[i];
		
		//Add unit for each owned block.
		if(currentBlock.originalColor == this.player.color && currentBlock.type == Enum.Block.Type.COLORED)
			newUnits += Constants.Block.Unit.TO_ADD;
			
		//Remove units for each complementary block.
		if(currentBlock.color == this.player.color + 4)
			newUnits += Constants.Block.Unit.TO_MINUS; 
	}
	
	if(this.player.units + newUnits > Constants.Block.Unit.MAX)
		this.player.units = Constants.Block.Unit.MAX;
	else
		this.player.units += newUnits;
	
	if(this.player.units < 0)
		this.player.units = 0;
};

//Render game elements.
Game.prototype.render = function(){

	this.world.render();
	this.player.render();
	
	for(var i = 0; i < this.enemies.length; ++i)
		if(this.enemies[i])
			this.enemies[i].render();

	for(var i in this.blocks)
		if(this.blocks[i])
			this.blocks[i].render();
	
	for(var i in this.deathZones)
		if(this.deathZones[i])
			this.deathZones[i].render();

	for(var i in this.npcs)
		if(this.npcs[i])
			this.npcs[i].render();
	
	for(var i in this.triggers)
		if(this.triggers[i])
			this.triggers[i].render();
	
	this.goal.render();
	
	//Update all effects.
	EffectManager.render();
	
	//Update all elements.
	ElementManager.render();
	
	//Update particle systems.
	ParticleManager.render();
};

//Update elements contained in the container.
Game.prototype.update = function (dt){
		
	//Update info from the server.
	if(this.ready && this.currentPhase != Enum.Game.Phase.ENDING)
	{
		switch(this.currentPhase){
			case Enum.Game.Phase.PLAYING:
			case Enum.Game.Phase.WINNER:
			
				if(Client.keys[Options.keys.PAUSE] && this.mayPause)
				{
					if(!this.isPaused)
					{
						Chat.hide();
						this.pause();
					}
					else
					{
						myApp.GameScene.placeChat();
						this.unpause();
					}
					
					this.mayPause = false;
				}
				else if(!Client.keys[Options.keys.PAUSE] && !this.mayPause)
					this.mayPause = true;
					
				if(!this.isPaused)
				{
					//Send 
					Client.push();
				
					this.hud.update(dt);
					
					//Project static objects.
					this.world.update();
					
					//Update dynamic objects.
					this.player.update(dt);
					
					for(var i = 0; i < this.enemies.length; ++i)
						if(this.enemies[i])
							this.enemies[i].update(dt);

					for(var i in this.blocks)
						if(this.blocks[i])
							this.blocks[i].update(dt);
					
					for(var i in this.deathZones)
						if(this.deathZones[i])
							this.deathZones[i].update(dt);

					for(var i in this.npcs)
						if(this.npcs[i])
							this.npcs[i].update(dt);
					
					for(var i in this.triggers)
						if(this.triggers[i])
							this.triggers[i].update(dt);
					
					this.goal.update();
					
					//Update all effects.
					EffectManager.update();
										
					//Update all elements.
					ElementManager.update(dt);
					
					//Update particle systems.
					ParticleManager.update(dt);
					
					//Update skillstore.
					this.hud.skillStore.update(this.player.units);
					
					//Position camera.
					this.moveCamera();
					this.camera.update();
					
					//Rendering.
					this.render();
				}
			
				break;
			case Enum.Game.Phase.WARMUP:
			
				this.hud.update(dt);
					
				//Position camera.
				this.camera.update();

				//Project static objects.
				this.world.update();
				
				//Update dynamic objects.
				this.player.update(dt);
				
				for(var i = 0; i < this.enemies.length; ++i)
					this.enemies[i].update(dt);

				for(var i in this.blocks)
					this.blocks[i].update(dt);
				
				for(var i in this.deathZones)
					this.deathZones[i].update(dt);
				
				for(var i in this.triggers)
					this.triggers[i].update(dt);
				
				this.goal.update();
				
				//Update all effects.
				EffectManager.update();
					
				if(this.warmupTimer > Constants.Game.Phase.Warmup.ON_PLAYER)
				{
					if(this.camera.y != this.player.y && this.camera.x != this.player.x)
					{
						//Slowdown camera for warmup.
						this.camera.zoom = Constants.Game.Phase.Warmup.Camera.ZOOM_FACTOR;
						this.camera.targetedZoom = Constants.Game.Phase.Warmup.Camera.ZOOM_FACTOR;
						this.camera.speed.x = Constants.Game.Phase.Warmup.Camera.SPEED_X;
						this.camera.speed.y = Constants.Game.Phase.Warmup.Camera.SPEED_Y;
					
						this.camera.y = this.camera.focus.y = this.player.y;
						this.camera.x = this.camera.focus.x = this.player.x;
					}
				}
				else if(this.warmupTimer > Constants.Game.Phase.Warmup.ON_GOAL)
					this.camera.lookAt(this.goal.x, this.goal.y);
				else if(this.warmupTimer < Constants.Game.Phase.Warmup.OFF_GOAL)
				{
					//Reset camera to its original state.
					if(this.camera.speed.x != Constants.Camera.SPEED_X)
					{
						this.camera.targetedZoom = 1;
						this.camera.speed.x = Constants.Camera.SPEED_X;
						this.camera.speed.y = Constants.Camera.SPEED_Y;
					}
						
					this.moveCamera();
				}
					
				this.warmupTimer -= dt;
				
				//Rendering.
				this.render();
				
				break;
		};
		
		//Hide loading screen.
		if(Client.isLoading && this.hasPulledOnce)
			Client.stopLoading();
	}
		
	Client.pressedKeys[Options.keys.RIGHT] = Client.keys[Options.keys.RIGHT];
	Client.pressedKeys[Options.keys.LEFT] = Client.keys[Options.keys.LEFT];
	Client.pressedKeys[Options.keys.JUMP] = Client.keys[Options.keys.JUMP];
	Client.pressedKeys[Options.keys.KILL] = Client.keys[Options.keys.KILL];
	
	//Option keys.
	Client.pressedKeys[Options.keys.OPT1] = Client.keys[Options.keys.OPT1];
	Client.pressedKeys[Options.keys.OPT2] = Client.keys[Options.keys.OPT2];
	
	Client.pressedKeys[Options.keys.SKILL1] = Client.keys[Options.keys.SKILL1];
	Client.pressedKeys[Options.keys.SKILL2] = Client.keys[Options.keys.SKILL2];
	Client.pressedKeys[Options.keys.SKILL3] = Client.keys[Options.keys.SKILL3];
	Client.pressedKeys[Options.keys.SKILL4] = Client.keys[Options.keys.SKILL4];
	Client.pressedKeys[Options.keys.TOGGLE_BUY_MODE] = Client.keys[Options.keys.TOGGLE_BUY_MODE];
	
	Client.pressedKeys[Options.keys.CHAT] = Client.keys[Options.keys.CHAT];
	Client.pressedKeys[Options.keys.DIG] = Client.keys[Options.keys.DIG];
};

//Randomize next block and emit the command related to the current block.
Game.prototype.randomBlock = function(){
		
	//Ask player to create the next block and send the new one to the server.
	this.player.pushNextBlock();
	Client.socket.emit(Constants.Message.NEXT_BLOCK, this.hud.inventory.getCurrent().toServer());
};

//Kill a player and remove it from the layer.
Game.prototype.kill = function(killed, killer){
		
	if(killed.color == this.player.color)
	{
		this.hud.inventory.killCommand.reset();
		this.player.die();
	}
	else
		for(var i in this.enemies)
			if(this.enemies[i].color == killed.color)
				this.enemies[i].die();
				
	if(killer != null)
	{
		var playerKiller = this.getPlayer(killer.color);
		playerKiller.kill();
	}
};

//Redirect action to right player.
Game.prototype.redirectAction = function(data){
		
	var player = this.getPlayer(data.playerColor);
	player.execute(data.action);
};

//Set the new location and zoom of camera to catch all players.
Game.prototype.moveCamera = function(){
	
	var minX = null;
	var maxX = null;
	var minY = null;
	var maxY = null;
	
	var containedObjects = [];
	
	if(this.player.isAlive && !this.player.hasWon)
		containedObjects.push(this.player);
	
	for(var i in this.enemies)
		if(this.enemies[i].isAlive && !this.enemies[i].hasWon)
			containedObjects.push(this.enemies[i]);
			
	for(var i in this.blocks)
		if(this.blocks[i].type == Enum.Block.Type.SPAWN)
			containedObjects.push(this.blocks[i]);
		
	if(this.currentPhase == Enum.Game.Phase.WINNER)
		containedObjects.push(this.goal);
	
	//Get extremities.
	for(var i in containedObjects)
	{		
		if(minX == null || containedObjects[i].x < minX)
			minX = containedObjects[i].x;
		if(maxX == null || containedObjects[i].x > maxX)
			maxX = containedObjects[i].x;
		if(minY == null || containedObjects[i].y < minY)
			minY = containedObjects[i].y;
		if(maxY == null || containedObjects[i].y > maxY)
			maxY = containedObjects[i].y;
	}
	
	var maxDistanceX = maxX - minX;
	var maxDistanceY = maxY - minY;
	
	//Get ratio between viewport and distance of players.
	var ratioX = (maxDistanceX*Constants.Camera.CONTAINER_FACTOR_X)/Options.viewport.width;
	var ratioY = (maxDistanceY*Constants.Camera.CONTAINER_FACTOR_Y)/Options.viewport.height;
	
	//Get highest ratio.
	var zoomRatio = (ratioX > ratioY ? ratioX : ratioY);

	if(zoomRatio < 1)
		this.camera.targetedZoom = 1;
	else
		this.camera.targetedZoom = 1/zoomRatio;
		
	this.camera.lookAt((maxX + minX)*0.5, ((maxY + minY)*0.5) + Constants.Camera.HIGHER);	
};

//Trigger when someone touched the goal.
Game.prototype.electWinner = function(winner){
	
	var player = this.getPlayer(winner.color);
	player.win();
	
	this.currentPhase = Enum.Game.Phase.WINNER;
	this.goal.activate();
};

//End of the round. Show splash screen of victorious.
Game.prototype.end = function(data){

	this.currentPhase = Enum.Game.Phase.ENDING;

	//Stop winning goal.
	this.goal.end();
	Chat.hide();

	myApp.GameScene.layer.removeChild(this.hud);
	myApp.GameScene.layer.addChild(this.endScreen);
	
	var winner = this.getPlayer(data.winner.color);
	
	//If everybody were already dead, hasWon may be false.
	if(!winner.hasWon)
		winner.win();

	this.endScreen.addWinner(winner, data);
};

//Used to know kill command current step.
Game.prototype.changeStep = function(stepReached){

	if(stepReached == Enum.StepReached.NONE)
		this.hud.inventory.killCommand.reset();
	else
		this.hud.inventory.killCommand.start(stepReached);
};

//Update positions from server ones.
Game.prototype.updateFromServer = function(remotePlayers, remoteBlocks, remoteGoal, remoteDeathZones, remoteNPCs, remoteTriggers){
	
	//Update players.
	for(var i in remotePlayers)
		this.getPlayer(remotePlayers[i].color).fromServer(remotePlayers[i]);
				
	//Update blocks.
	for(var i in remoteBlocks)
		if(this.blocks[remoteBlocks[i].id] != null)
			this.blocks[remoteBlocks[i].id].fromServer(remoteBlocks[i]);
		
	//Update deathZones.
	for(var i in remoteDeathZones)
		if(this.deathZones[remoteDeathZones[i].id] != null)
			this.deathZones[remoteDeathZones[i].id].fromServer(remoteDeathZones[i]);							
				
	//Update NPCs.
	for(var i in remoteNPCs)
		if(this.npcs[remoteNPCs[i].id] != null)
			this.npcs[remoteNPCs[i].id].fromServer(remoteNPCs[i]);		
			
	//Update triggers.
	for(var i in remoteTriggers)
		if(this.triggers[remoteTriggers[i].id] != null)
			this.triggers[remoteTriggers[i].id].fromServer(remoteTriggers[i]);	
		
	//Update goal.
	this.goal.fromServer(remoteGoal);
	
	this.hasPulledOnce = true;
};

//Spawn player.
Game.prototype.spawnPlayer = function(remotePlayer){
	
	var player = this.getPlayer(remotePlayer.color);
	player.spawn(remotePlayer.x, remotePlayer.y);
};

//Add a new block from the server.
Game.prototype.addBlock = function(remoteBlock){
	this.blocks[remoteBlock.id] = new Block(remoteBlock.x, remoteBlock.y, remoteBlock.type, remoteBlock.color, remoteBlock.skill);
	this.blocks[remoteBlock.id].init();
};

//Add a new death zone from the server.
Game.prototype.addDeathZone = function(remoteDeathZone){	
	
	var deathZone = null;
		
	switch(remoteDeathZone.type)
	{
		case Enum.DeathZone.Type.FIREBALL:
		case Enum.DeathZone.Type.PICK_AXE:
			deathZone = new Missile(remoteDeathZone.x, remoteDeathZone.y, remoteDeathZone.type, remoteDeathZone.vel);
			break;
		case Enum.DeathZone.Type.ENERGY_SPIKE:
			deathZone = new Spike(remoteDeathZone.x, remoteDeathZone.y, remoteDeathZone.type, remoteDeathZone.finalX, remoteDeathZone.finalY);
			this.goal.swapAnimation(Enum.Anim.Type.GOAL_ACTION);
			break;
		case Enum.DeathZone.Type.JAW:
			deathZone = new Jaw(remoteDeathZone.x, remoteDeathZone.y);
			break;
	}
	
	this.deathZones[remoteDeathZone.id] = deathZone;
};

//Add a new element from the server.
Game.prototype.addElement = function(remoteElement){

	var element = null;
	
	switch(remoteElement.type){
		case Enum.Element.Type.ECLIPSE:
			element = new Eclipse(remoteElement.x, remoteElement.y, remoteElement.power, Client.username == remoteElement.username);
			break;
		case Enum.Element.Type.TELEPORT:
			EffectManager.create(Enum.Effect.Type.TELEPORT, remoteElement.x, remoteElement.y);
			return;
		case Enum.Element.Type.CANCEL_DROP:
			EffectManager.create(Enum.Effect.Type.CANCEL_DROP, remoteElement.x, remoteElement.y);
			return;
	}
	
	ElementManager.launch(element);
};

//Add a new NPC from the server.
Game.prototype.addNpc = function(remoteNpc){

	var npc = null;
	
	switch(remoteNpc.type){
		case Enum.NPC.Type.PESKY_BOX:
			npc = new PeskyBox(remoteNpc.x, remoteNpc.y, remoteNpc.facing, this.getPlayer(remoteNpc.target));
			break;
		case Enum.NPC.Type.SAND_SPIRIT:
			npc = new SandSpirit(remoteNpc.x, remoteNpc.y, remoteNpc.facing);
			break;
	}

	this.npcs[remoteNpc.id] = npc;
};

//Add a trigger.
Game.prototype.addTrigger = function(remoteTrigger){

	var trigger = null;
	
	switch(remoteTrigger.type){
		case Enum.Trigger.Type.DEFLECTOR:
			trigger = new Deflector(remoteTrigger.x, remoteTrigger.y);
			break;
		case Enum.Trigger.Type.TIME_ZONE:
			trigger = new TimeZone(remoteTrigger.x, remoteTrigger.y);
			break;
		case Enum.Trigger.Type.GRAVITY_BEAM:
			trigger = new GravityBeam(remoteTrigger.x, remoteTrigger.y);
			break;
		case Enum.Trigger.Type.VENOM_BALL:
			trigger = new VenomBall(remoteTrigger.x, remoteTrigger.y, remoteTrigger.vel.x, remoteTrigger.vel.y);
			break;
		case Enum.Trigger.Type.VENOM_WAVE:
			trigger = new VenomWave(remoteTrigger.x, remoteTrigger.y);
			break;
	}

	this.triggers[remoteTrigger.id] = trigger;
};

//Delete a npc.
Game.prototype.deleteNpc = function(remoteNpcId){
	
	if(this.npcs[remoteNpcId] != null)
	{
		this.npcs[remoteNpcId].explode();
		delete this.npcs[remoteNpcId];
	}
};

//Delete a trigger.
Game.prototype.deleteTrigger = function(remoteTriggerId){
	if(this.triggers[remoteTriggerId] != null)
	{
		this.triggers[remoteTriggerId].explode();
		delete this.triggers[remoteTriggerId];
	}
};

//Delete a death zone.
Game.prototype.deleteDeathZone = function(remoteDeathZoneId){

	if(this.deathZones[remoteDeathZoneId] != null)
	{
		this.deathZones[remoteDeathZoneId].explode();
		delete this.deathZones[remoteDeathZoneId];
	}
};

//Delete a block.
Game.prototype.deleteBlock = function(remoteBlockId, cause){

	if(this.blocks[remoteBlockId] != null)
	{
		this.blocks[remoteBlockId].explode(cause);
		delete this.blocks[remoteBlockId];
	}
};

//Remove a player from the game.
Game.prototype.removeEnemy = function(username){

	var index = null;
	for(var i in this.enemies)
		if(this.enemies[i].username == username)
		{
			index = i;
			break;
		}
		
	if(index != null)
	{
		this.enemies[i].leave();
		delete this.enemies[i];
	}
};