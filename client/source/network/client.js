//Object containing network information.
var Client = new function(){

	//Members.
	this.keys = [];
	this.enemies = [];
	this.blocks = [];
	this.deathZones = {};
	
	this.player = null;
	this.currentState = Enum.Game.State.PLAYING;
	this.needPush = false;
	this.goal = null;
	
	//Init keys.
	this.keys[cc.KEY.d] = false;
	this.keys[cc.KEY.a] = false;
	this.keys[cc.KEY.space] = false;
	this.keys[cc.KEY.q] = false;
	
	//Initialize the game client.
	this.init = function (width, height, layer, hud, endScreen) {
	
		this.width = width;
		this.height = height;
	
		this.layer = layer;
		this.hud = hud;
		this.endScreen = endScreen;
		
		this.ready = false;
		
		//Creating client and connecting to server.
		this.connect();
	};
	
	//Add elements on layer.
	this.initLayers = function(mapWidth, mapHeight){
	
		this.mapSize = {
			width: mapWidth,
			height: mapHeight
		};
		
		//Create camera.
		this.camera = new Camera(this.width*0.5-(this.width*0.5-this.mapSize.width*0.5), this.height*0.5, this.width, this.height, 1);
		this.projectWorld();
	
		//Init dynamic elements.
		this.player.init();
		
		for(var i in this.enemies)
			this.enemies[i].init();
				
		this.goal.init();

		//Set first blocks to the HUD.
		this.hud.inventory.setBlocks(new Block(0,0, this.player.currentBlock, this.player.color), 
									 new Block(0,0, this.player.nextBlock, this.player.color));
		
		this.ready = true;
	};
	
	//Randomize next block and emit the command related to the current block.
	this.randomBlock = function(){
		
		//Ask player to create the next block and send the new one to the server.
		this.player.pushNextBlock();
		this.socket.emit(Constants.Message.NEXT_BLOCK, this.player.currentBlock);
	};
	
	//Update elements contained in the container.
	this.update = function (dt){
		
		//Update info from the server.
		if(this.ready)
		{
			this.push();
			this.pull();
			
			this.hud.update(dt);
		}
	};
		
	//Connect to server.
	this.connect = function(){
		this.ready = false;
		
		var socket = io.connect(Constants.Network.ADDRESS);
		
		//Init.
		socket.on(Constants.Message.INIT, function (data) {
			console.log('Initialize');				
			
			//Server positioning and giving color to player.
			Client.player = new Player(data.player.x, data.player.y, data.player.color);	

			for(var i in data.enemies)
			{
				Client.enemies.push(new Player(data.enemies[i].x,
											   data.enemies[i].y,
											   data.enemies[i].color));
			}

			socket.emit(Constants.Message.CONNECTED);
		});
		
		//Incoming enemy.
		socket.on(Constants.Message.NEW_PLAYER, function(data){
			console.log('New player...');
			
			Client.enemies.push(new Player(data.x,
										   data.y,
										   data.color));
		});
		
		socket.on(Constants.Message.LAUNCH, function(data){
			console.log('Launching!');
			
			//Add goal.
			switch(data.goal.type)
			{
				case Enum.WinningGoal.Type.FLOATING_BALL:
					Client.goal = new FloatingBall(data.goal.x, data.goal.y);
					break;
			}
			
			//Add received elements to the layer (render).
			Client.initLayers(data.width, data.height);
			
			//Lower neutral by quantity of enemies.
			Client.player.changePercent(Enum.Block.Type.NEUTRAL, -Constants.Block.Percent.LOST_FOREACH_ENEMY*Client.enemies.length);
		});
		
		socket.on(Constants.Message.NEW_BLOCK, function(block){
			//Add a new block.
			Client.addBlock(block); 
		});
		
		socket.on(Constants.Message.DELETE_BLOCK, function(data){
			//Delete a block.
			Client.deleteBlock(data.id, data.cause);
		});
		
		//Pulling info from server.
		socket.on(Constants.Message.PULL, function (data){	
			Client.updateFromServer(data.player, data.enemies, data.blocks, data.goal, data.deathZones);
		});
		
		//Ask for next block.
		socket.on(Constants.Message.NEXT_BLOCK, function(data){
			Client.randomBlock();
		});
		
		//Received dead people information.
		socket.on(Constants.Message.PLAYER_KILLED, function(killed){
			Client.kill(killed);
		});
		
		//Received information to build spawn block.
		socket.on(Constants.Message.SEND_BLOCK, function(blockType){
			Client.player.addNextBlock(blockType);
		});
		
		//Spawn player.
		socket.on(Constants.Message.PLAYER_SPAWNED, function(remotePlayer){
			Client.spawnPlayer(remotePlayer);
		});
		
		//Indicate at which step user is currently.
		socket.on(Constants.Message.KILL_COMMAND, function(stepReached){
			Client.changeStep(stepReached);
		});
		
		//On victory of any player.
		socket.on(Constants.Message.WIN, function(data){
			Client.end(data);
		});
		
		socket.on(Constants.Message.GOAL_ACTION, function(actionType){
			Client.goal.execute(actionType);
		});
		
		//When a player touches the goal.
		socket.on(Constants.Message.AT_GOAL, function(winner){
			Client.electWinner(winner);
		});
		
		//Delete a death zone.
		socket.on(Constants.Message.DELETE_DEATHZONE, function(data){
			Client.deleteDeathZone(data.id);
		});
		
		//Add a death zone.
		socket.on(Constants.Message.NEW_DEATHZONE, function(data){
			Client.addDeathZone(data);
		});
		
		//Once defined, preserved the socket.
		this.socket = socket;
	};
	
	this.electWinner = function(winner){
		
		if(winner.color == this.player.color)
			this.player.win();
		else
			for(var i in this.enemies)
				if(this.enemies[i].color == winner.color)
					this.enemies[i].win();
	};
	
	//End of the round. Show splash screen of victorious.
	this.end = function(data){
		this.hud._zOrder = -1000;
		this.endScreen.addWinner(data.winner, data.succeed);
	};
	
	//Used to know kill command current step.
	this.changeStep = function(stepReached){
	
		if(stepReached == Enum.StepReached.NONE)
			this.hud.killCommand.reset();
		else
			this.hud.killCommand.start(stepReached);
	};
	
	//Kill a player and remove it from the layer.
	this.kill = function(killed){
		
		if(killed.color == this.player.color)
		{
			this.hud.killCommand.reset();
			this.player.die();
		}
		else
			for(var i in this.enemies)
				if(this.enemies[i].color == killed.color)
					this.enemies[i].die();
	};
	
	//Create a floor.
	this.createFloor = function(x, y, width, hasCorner, type){
		
		var floorFragments = [];
		var imgName = null;
		var cornerImgName = null;
		
		switch(type)
		{
			case Enum.Wall.Type.PIT:
				imgName = 'floor_pit.png';
				cornerImgName = 'corner_pit.png';
				break;
		}
		
		var firstSegment = cc.Sprite.create(assetsWorldDir + imgName);
		var numOfFragment = (width/firstSegment.getTexture().width)-1; //Remove last corner.
		
		var stepX = firstSegment.getTexture().width;
		var tmpX = x - width*0.5 + stepX*0.5;
		var zOrder = 45;
		
		//Add a corner at the bottom of the wall.
		if(hasCorner)
		{
			var corner = cc.Sprite.create(assetsWorldDir + cornerImgName);
			corner.setPosition(new cc.Point(x, tmpX - stepX));
			corner._zOrder = zOrder;
			
			//Left corner.
			floorFragments.push({
				sprite: corner,
				x: tmpX - stepX
			});
			
			corner = cc.Sprite.create(assetsWorldDir + cornerImgName);
			corner.setPosition(new cc.Point(x, tmpX + stepX*numOfFragment));
			corner.setFlipX(true);
			
			//Right corner.
			floorFragments.push({
				sprite: corner,
				x: tmpX + stepX*numOfFragment
			});
		}
		
		//Add first segment.
		firstSegment.setPosition(new cc.Point(x, tmpX));
		firstSegment._zOrder = zOrder;
		
		floorFragments.push({
			sprite: firstSegment,
			x: tmpX
		});
		
		//Add other fragments to the wall.
		for(var i = 0; i < numOfFragment; i++)
		{
			tmpX += stepX;
			
			var segment = cc.Sprite.create(assetsWorldDir + imgName);
			segment.setPosition(new cc.Point(x, tmpX));
			segment._zOrder = zOrder;
			
			floorFragments.push({
				sprite: segment,
				x: tmpX
			});
		}
		
		return {
			fragments: floorFragments,
			x: x,
			y: y
		};
	};
	
	//Create a wall.
	this.createWall = function(facing, x, y, height, hasCorner, type){
	
		var wallFragments = [];
		var imgName = null;
		var cornerImgName = null;
		
		switch(type)
		{
			case Enum.Wall.Type.PIT:
				imgName = 'wall_pit.png';
				cornerImgName = 'corner_pit.png';
				break;
		}
		
		var mustFlip = facing == Enum.Direction.LEFT;
		var firstSegment = cc.Sprite.create(assetsWorldDir + imgName);
		var numOfFragment = height/firstSegment.getTexture().height;
		
		var stepY = firstSegment.getTexture().height;
		var tmpY = y - height*0.5 + stepY*0.5;
		var zOrder = 45;
		
		//Add a corner at the bottom of the wall.
		if(hasCorner)
		{
			var corner = cc.Sprite.create(assetsWorldDir + cornerImgName);
			corner.setPosition(new cc.Point(x, tmpY - stepY));
			corner.setFlipX(mustFlip);
			corner._zOrder = zOrder;
			
			wallFragments.push({
				sprite: corner,
				y: tmpY - stepY
			});
		}
		
		//Add the first segment.
		firstSegment.setFlipX(mustFlip);
		firstSegment.setPosition(new cc.Point(x, tmpY));
		firstSegment._zOrder = zOrder;
		
		wallFragments.push({
			sprite: firstSegment,
			y: tmpY
		});
		
		//Add other fragments to the wall.
		for(var i = 0; i < numOfFragment; i++)
		{
			tmpY += stepY;
			
			var segment = cc.Sprite.create(assetsWorldDir + imgName);
			segment.setPosition(new cc.Point(x, tmpY));
			segment.setFlipX(mustFlip);
			segment._zOrder = zOrder;
			
			wallFragments.push({
				sprite: segment,
				y: tmpY
			});
		}
		
		return {
			fragments: wallFragments,
			x: x,
			y: y
		};
	};
	
	//Project walls and floor.
	this.projectWorld = function(){
	
		if(this.floor == null)
		{
			//Create walls and floor.
			this.floor = this.createFloor(this.mapSize.width*0.5, -50, this.mapSize.width, false, Enum.Wall.Type.PIT);
			this.leftWall = this.createWall(Enum.Direction.RIGHT, -50, this.mapSize.height*0.5, this.mapSize.height, true, Enum.Wall.Type.PIT);
			this.rightWall = this.createWall(Enum.Direction.LEFT, this.mapSize.width + 50, this.mapSize.height*0.5, this.mapSize.height, true, Enum.Wall.Type.PIT);

			//Add walls to layer.
			for(var i in this.leftWall.fragments)
				this.layer.addChild(this.leftWall.fragments[i].sprite);
			
			for(var i in this.rightWall.fragments)
				this.layer.addChild(this.rightWall.fragments[i].sprite);
				
			//Add floor to layer.
			for(var i in this.floor.fragments)
				this.layer.addChild(this.floor.fragments[i].sprite);
		}
	
		for(var i in this.floor.fragments)
			this.camera.project(this.floor.fragments[i].sprite, this.floor.fragments[i].x, this.floor.y);	
		
		for(var i in this.leftWall.fragments)
			this.camera.project(this.leftWall.fragments[i].sprite, this.leftWall.x, this.leftWall.fragments[i].y);		
			
		for(var i in this.rightWall.fragments)
			this.camera.project(this.rightWall.fragments[i].sprite, this.rightWall.x, this.rightWall.fragments[i].y);
	};
	
	//Update positions from server ones.
	this.updateFromServer = function(remotePlayer, remoteEnemies, remoteBlocks, remoteGoal, remoteDeathZones){
		
		//Position.
		//this.camera.lookAt(remotePlayer.x, remotePlayer.y);
		this.projectWorld();
		
		//Update player.
		this.player.fromServer(remotePlayer);

		//Update enemies.
		for(var i in this.enemies)
			for(var j in remoteEnemies)
				if(this.enemies[i].color == remoteEnemies[j].color)
					this.enemies[i].fromServer(remoteEnemies[j]);
			
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
	this.spawnPlayer = function(remotePlayer){
		
		if(remotePlayer.color == this.player.color)
			this.player.spawn(remotePlayer.x, remotePlayer.y);
		else
			for(var i in this.enemies)
				if(this.enemies[i].color == remotePlayer.color)
					this.enemies[i].spawn(remotePlayer.x, remotePlayer.y);
	};
	
	//Add a new block from the server.
	this.addBlock = function(remoteBlock){
		this.blocks[remoteBlock.id] = new Block(remoteBlock.x, remoteBlock.y, remoteBlock.type, remoteBlock.color);
		this.blocks[remoteBlock.id].init();
	};
	
	//Add a new missile from the server.
	this.addDeathZone = function(remoteDeathZone){	
		
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
	this.deleteDeathZone = function(remoteDeathZoneId){
	
		if(this.deathZones[remoteDeathZoneId] != null)
		{
			this.deathZones[remoteDeathZoneId].explode();
			delete this.deathZones[remoteDeathZoneId];
		}
	};
	
	//Delete a block.
	this.deleteBlock = function(remoteBlockId, cause){
	
		if(this.blocks[remoteBlockId] != null)
		{
			this.blocks[remoteBlockId].explode(cause);
			delete this.blocks[remoteBlockId];
		}
	};
	
	//Pushing info to server.
	this.push = function(){
		
		var inputs = {
			right: this.keys[cc.KEY.d],
			left: this.keys[cc.KEY.a],
			jump: this.keys[cc.KEY.space],
			kill: this.keys[cc.KEY.q]
		};
	
		//Send key pressed to server.
		this.socket.emit(Constants.Message.PUSH, inputs);
		this.needPush = false;
	};
	
	//Pulling info from server.
	this.pull = function(){
		this.socket.emit(Constants.Message.PULL);
	};
};