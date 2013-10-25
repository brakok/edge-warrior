
var Game = function(){

	this.enemies = [];
	this.blocks = [];
	this.deathZones = {};
	
	//Dynamic objects.
	this.player = null;
	this.currentState = Enum.Game.State.PLAYING;
	this.currentPhase = Enum.Game.Phase.PLAYING;
	
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

Game.prototype.init = function(width, height, layer, hud, endScreen, pauseMenu){

	this.width = width;
	this.height = height;

	//Layers.
	this.layer = layer;
	this.hud = hud;
	this.endScreen = endScreen;
	this.pauseMenu = pauseMenu;
	
	this.ready = false;
};

//Game start.
Game.prototype.launch = function(){
	//Add received elements to the layer (render).
	this.createWorld();
	
	//Lower neutral by quantity of enemies.
	this.player.changePercent(Enum.Block.Type.NEUTRAL, -Constants.Block.Percent.LOST_FOREACH_ENEMY*this.enemies.length);
};

//Create environment and camera.
Game.prototype.createWorld = function(){

	//Create camera.
	this.camera = new Camera(this.width*0.5-(this.width*0.5-this.mapSize.width*0.5), 
							 this.height*0.5,
							 1,
							 Constants.Camera.ZOOM_FACTOR,
							 Constants.Camera.SPEED_X,
							 Constants.Camera.SPEED_Y,
							 Constants.Camera.SPEED_ZOOM);
	
	//Create walls and floor.
	this.floor = new Floor(this.mapSize.width*0.5, -40, this.mapSize.width, false, Enum.Wall.Type.PIT);
	this.leftWall = new Wall(Enum.Direction.RIGHT, -50, this.mapSize.height + 10, this.mapSize.height*2, true, Enum.Wall.Type.PIT);
	this.rightWall = new Wall(Enum.Direction.LEFT, this.mapSize.width + 50, this.mapSize.height + 10, this.mapSize.height*2, true, Enum.Wall.Type.PIT);

	//Black boxes are used to hide spikes when they raise from the ground.	
	this.blackBoxes = [];
	this.blackBoxes.push(new BlackBox(-this.mapSize.width*0.5-Constants.World.OFFSET, this.mapSize.height*0.5, this.mapSize.width, this.mapSize.height*3));
	this.blackBoxes.push(new BlackBox(this.mapSize.width*0.5, -this.mapSize.height*0.5, this.mapSize.width*3, this.mapSize.height));
	this.blackBoxes.push(new BlackBox(this.mapSize.width*1.5+Constants.World.OFFSET, this.mapSize.height*0.5, this.mapSize.width, this.mapSize.height*3));
	
	//Add background.
	this.background = new Background(this.mapSize.width*0.5, this.mapSize.height*0.5, this.mapSize.width, this.mapSize.height, Enum.World.Type.PIT);
	
	//Add walls to layer.
	this.leftWall.init();
	this.rightWall.init();
	this.floor.init();
	this.background.init();

	//Init dynamic elements.
	this.player.init();
	
	for(var i in this.enemies)
		this.enemies[i].init();
			
	this.goal.init();

	//Set first blocks to the HUD.
	this.hud.inventory.setBlocks(new Block(0,0, Enum.Block.Type.NEUTRAL, this.player.color), 
								 new Block(0,0, Enum.Block.Type.COLORED, this.player.color));
	
	this.ready = true;
	this.currentState = Enum.Game.State.PLAYING;
};

//Update elements contained in the container.
Game.prototype.update = function (dt){
		
	//Update info from the server.
	if(this.ready && this.currentState != Enum.Game.State.ENDING)
	{
		if(Client.keys[Options.keys.PAUSE] && this.mayPause)
		{
			if(!this.isPaused)
				this.pause();
			else
				this.unpause();
			
			this.mayPause = false;
		}
		else if(!Client.keys[Options.keys.PAUSE] && !this.mayPause)
			this.mayPause = true;
			
		if(!this.isPaused)
		{
			//Send 
			Client.push();
		
			this.hud.update(dt);
			
			//Position camera.
			this.moveCamera();
			this.camera.update();
			
			//Project static objects.
			this.projectWorld();
			
			//Update dynamic objects.
			this.player.update(dt);
			
			for(var i in this.enemies)
				this.enemies[i].update(dt);

			for(var i in this.blocks)
				this.blocks[i].update(dt);
			
			for(var i in this.deathZones)
				this.deathZones[i].update(dt);
				
			for(var i in this.blackBoxes)
				this.blackBoxes[i].update();
				
			this.goal.update();
			
			//Update all effects.
			EffectManager.update();
		}
	}
};

//Randomize next block and emit the command related to the current block.
Game.prototype.randomBlock = function(){
		
	//Ask player to create the next block and send the new one to the server.
	this.player.pushNextBlock();
	Client.socket.emit(Constants.Message.NEXT_BLOCK, this.hud.inventory.getCurrent().type);
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
	
	var minX = this.player.x;
	var maxX = this.player.x;
	var minY = this.player.y;
	var maxY = this.player.y;
	
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
		if(containedObjects[i].x < minX)
			minX = containedObjects[i].x;
		if(containedObjects[i].x > maxX)
			maxX = containedObjects[i].x;
		if(containedObjects[i].y < minY)
			minY = containedObjects[i].y;
		if(containedObjects[i].y > maxY)
			maxY = containedObjects[i].y;
	}
	
	this.camera.lookAt((maxX + minX)*0.5, ((maxY + minY)*0.5)+Constants.Camera.HIGHER);		
	
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

	this.currentState = Enum.Game.State.ENDING;

	//Stop winning goal.
	this.goal.end();

	myApp.GameScene.layer.removeChild(this.hud);
	myApp.GameScene.layer.addChild(this.endScreen);
	
	var winner = this.getPlayer(data.winner.color);
	
	//If everybody were already dead, hasWon may be false.
	if(!winner.hasWon)
		winner.win();
		
	this.endScreen.addWinner(winner, data.succeed, data.survivors);
};

//Used to know kill command current step.
Game.prototype.changeStep = function(stepReached){

	if(stepReached == Enum.StepReached.NONE)
		this.hud.inventory.killCommand.reset();
	else
		this.hud.inventory.killCommand.start(stepReached);
};

//Project walls and floor.
Game.prototype.projectWorld = function(){

	this.floor.update();
	this.leftWall.update();
	this.rightWall.update();
	this.background.update();
};

//Update positions from server ones.
Game.prototype.updateFromServer = function(remotePlayers, remoteBlocks, remoteGoal, remoteDeathZones){
	
	//Update players.
	for(var i in remotePlayers)
		this.getPlayer(remotePlayers[i].color).fromServer(remotePlayers[i]);
				
	//Update blocks.
	for(var i in remoteBlocks)
		if(this.blocks[remoteBlocks[i].id] != null)
			this.blocks[remoteBlocks[i].id].fromServer(remoteBlocks[i]);
		
	//Update missiles.
	for(var i in remoteDeathZones)
		if(this.deathZones[remoteDeathZones[i].id] != null)
			this.deathZones[remoteDeathZones[i].id].fromServer(remoteDeathZones[i]);							
		
	//Update goal.
	this.goal.fromServer(remoteGoal);
};

//Spawn player.
Game.prototype.spawnPlayer = function(remotePlayer){
	
	var player = this.getPlayer(remotePlayer.color);
	player.spawn(remotePlayer.x, remotePlayer.y);
};

//Add a new block from the server.
Game.prototype.addBlock = function(remoteBlock){
	this.blocks[remoteBlock.id] = new Block(remoteBlock.x, remoteBlock.y, remoteBlock.type, remoteBlock.color);
	this.blocks[remoteBlock.id].init();
};

//Add a new missile from the server.
Game.prototype.addDeathZone = function(remoteDeathZone){	
	
	var deathZone = null;

	switch(remoteDeathZone.type)
	{
		case Enum.DeathZone.Type.RAYBALL:
			deathZone = new Missile(remoteDeathZone.x, remoteDeathZone.y, remoteDeathZone.type);
			break;
		case Enum.DeathZone.Type.ENERGY_SPIKE:
			deathZone = new Spike(remoteDeathZone.x, remoteDeathZone.y, remoteDeathZone.type, remoteDeathZone.finalX, remoteDeathZone.finalY);
			break;
	}
	
	this.goal.swapAnimation(Enum.Anim.Type.GOAL_ACTION);
	this.deathZones[remoteDeathZone.id] = deathZone;
};

//Delete a missile.
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