//Enums
var Enum = {
	Color: {
		RED: 0,
		BLUE: 1,
		YELLOW: 2,
		WHITE: 3,
		GREEN: 4,
		ORANGE: 5,
		PURPLE: 6,
		BLACK: 7
	},
	Slot: {
		Color: {
			UNASSIGNED: 0,
			RED: 1,
			BLUE: 2,
			YELLOW: 3,
			WHITE: 4
		}
	},
	UserData: {
		Type: {
			PLAYER: 0,
			BLOCK: 1,
			WINNING_GOAL: 2,
			FIREBALL: 3,
			ENERGY_SPIKE: 4,
			JAW: 5,
			PESKY_BOX: 6
		}
	},
	Block: {
		Type: {
			NEUTRAL: 0,
			COLORED: 1,
			SPAWN: 2,
			SKILLED: 3
		},
		Skill: {
			Trigger: {
				ON_LANDING: 0,
				ON_LAUNCHING: 1
			},
			FIRE_PULSE: 0,
			JAW_FALL: 1,
			ECLIPSE: 2,
			PESKY_BOX: 3
		},
		State: {
			STATIC: 0,
			DYNAMIC: 1
		},
		Destruction: {
			COLOR_CONTACT: 0,
			SPAWN: 1,
			CRUSHED: 2
		}
	},
	NPC: {
		Type: {
			PESKY_BOX: 0
		}
	},
	Element: {
		Type: {
			ECLIPSE: 0
		}
	},
	Collision: {
		Type: {
			STATIC: 0,
			PLAYER: 1,
			GROUND_SENSOR: 2,
			BLOCK: 3,
			DROP_SENSOR: 4,
			WINNING_GOAL: 5,
			DEATH_ZONE: 6,
			SKILL: 7,
			NPC: 8
		}
	},
	Facing: {
		RIGHT:  0,
		LEFT: 1
	},
	StepReached: {
		NONE: 0,
		STANDING: 1,
		PLAYER: 2,
		OVERLORD: 3
	},
	Direction: {
		UP: 0,
		LEFT: 1,
		DOWN: 2,
		RIGHT: 3
	},
	Action: {
		Type: {
			NONE: -1,
			STANDING: 0,
			RUNNING: 1,
			JUMPING: 2,
			FALLING: 3,
			DOUBLE_JUMPING: 4,
			SUMMONING: 5,
			LANDING: 6
		}
	},
	DeathZone: {
		Type: {
			FIREBALL: 0,
			ENERGY_SPIKE: 1,
			JAW: 2
		}
	},
	WinningGoal: {
		Type: {
			FLOATING_BALL: 1
		}
	}
};//Constants
var Constants = {
	Game: {
		MAX_PLAYERS: 4,
		UNIT_TIMER: 1,
		OFFSET_Y_ALLOWED_FOR_PLAYERS: 250
	},
	Physic: {
		GRAVITY: -150,
		FRICTION: 0.97,
		MASS_PLAYER: 10,
		MASS_BLOCK: 999999,
		MASS_BLOCK_STATIC: 999999999999,
		TIME_STEP: 1/60,
		FRICTION_FACTOR_ONGROUND: 0.85,
		TURN_FRICTION_FACTOR: 0.05,
		SLEEP_TIME_THRESHOLD: 0.075
	},
	Spawn: {
		Limit: {
			OFFSET: 150
		}
	},
	Player: {
		INITIAL_SPAWN_Y: 100,
		JUMP_COOLDOWN: 0.1,
		JUMP_POWER: 1350,
		RUN_POWER_ONGROUND: 650,
		RUN_POWER_OFFGROUND: 15,
		WIDTH: 30,
		HEIGHT: 50,
		MAX_SPEED_FACTOR: 0.0000001,
		MAX_VELOCITY: 175,
		VELOCITY_FACTOR: 0.4,
		SPEED_LOWER_LIMIT: 100
	},
	Block: {
		WIDTH: 80,
		HEIGHT: 30,
		LANDING_TIMER: 0.01,
		LAUNCH_LAND_TIMER: 0.1,
		LAUNCHING_SPEED: -300,
		SPAWN_MAXLAUNCHING_Y: 500,
		SPAWN_MAXLAUNCHING_X: 500,
		Restriction: {
			SPAWN_TIMER: 6
		}
	},
	NPC: {
		PeskyBox: {
			WIDTH: 60,
			HEIGHT: 60,
			SPEED: 0.3,
			SPEED_STEP: 0.1,
			DURATION: 6,
			DURATION_STEP: 2,
			FLEE_TIMER: 0.75,
			FLEE_STEP: 0.125
		}
	},
	WinningGoal: {
		OFFSET_Y: -50,
		PHASE_TIME: 8,
		FloatingBall: {
			WIDTH: 90,
			HEIGHT: 90,
			SPEED: 1,
			MAX_SPEED: 12,
			FRICTION_FACTOR: 0.98,
			ORBIT_RADIUS: 20,
			ORBIT_SPEED: 0.05,
			STUCK_TIME: 0.4,
			TURN_FRICTION_FACTOR: 0.95
		}
	},
	Warmup: {
		PHASE_TIME: 3
	},
	DeathZone: {
		Fireball: {
			SPEED_MIN: 7,
			SPEED_STEP: 10,
			WIDTH: 45,
			HEIGHT: 45,
			DISTANCE_MIN: 150,
			DISTANCE_STEP: 75
		},
		EnergySpike: {
			SPEED: 0.007,
			WIDTH: 30,
			COOLDOWN: 1,
			IMPULSE_X: 2250,
			IMPULSE_Y: 1000
		},
		Jaw: {
			WIDTH: 80,
			HEIGHT: 30,
			INITIAL_COUNT: 3,
			STEP: 4
		}
	},
	KillCommand: {
		Time: {
			FIRST_STEP: 5,
			SECOND_STEP: 10
		}
	},
	Network: {
		ADDRESS: 'http://localhost:1060',
		SERVER_PORT: 1051,
		MASTER_PORT: 1050,
		SERVER_TO_SERVER_PORT: 1060
	},
	Message: {
		NEXT_BLOCK: 'nextBlock',
		NEW_BLOCK: 'newBlock',
		SEND_BLOCK: 'sendBlock',
		DELETE_BLOCK: 'deleteBlock',
		PULL: 'pull',
		PUSH: 'push',
		INIT: 'init',
		CONNECTION: 'connection',
		DISCONNECT: 'disconnect',
		NEW_PLAYER: 'newPlayer',
		PLAYER_KILLED: 'playerKilled',
		PLAYER_SPAWNED: 'playerSpawned',
		LAUNCH: 'launch',
		KILL_COMMAND: 'killCommand',
		AT_GOAL: 'atGoal',
		WIN: 'win',
		DELETE_DEATHZONE: 'deleteDeathZone',
		NEW_DEATHZONE: 'newDeathZone',
		GOAL_ACTION: 'goalAction',
		PLAYER_ACTION: 'playerAction',
		BLOCK_ACTION: 'blockAction',
		CREATE_LOBBY: 'createLobby',
		JOIN_LOBBY: 'joinLobby',
		CLOSE_LOBBY: 'closeLobby',
		LEAVE_LOBBY: 'leaveLobby',
		CONNECTED_LOBBY: 'connectedLobby',
		GAME_CREATED: 'gameCreated',
		PLAYER_READY: 'playerReady',
		REGISTER: 'register',
		SEARCH_LOBBY: 'searchLobby',
		JOIN_GAME: 'joinGame',
		DISCONNECT_PLAYER: 'disconnectPlayer',
		UPDATE_SLOT: 'updateSlot',
		UPDATE_LOBBY: 'updateLobby',
		GO: 'go',
		PROCESS_UNITS: 'processUnit',
		ERROR: 'serverError',
		CREATE_ACCOUNT: 'createAccount',
		LOGIN: 'login',
		CHANGE_PASSWORD: 'changePassword',
		RESET_PASSWORD: 'resetPassword',
		LOGOUT: 'logout',
		NEW_ELEMENT: 'newElement',
		DELETE_NPC: 'deleteNPC',
		NEW_NPC: 'newNPC'
	},
	ErrorMessage: {
		INVALID_LOBBY: 'Lobby is invalid. Full or game already started.'
	},
	Regex: {
		EMAIL: /^\S{0,}@\S{0,}[.]{1}[a-zA-Z0-9]{2,}$/
	}
};
var Listeners = function(game){
	this.currentGame = game;
	
	//All listeners.
	this.DeathZoneListener = new DeathZoneListener(this.currentGame);
	this.GoalListener = new GoalListener(this.currentGame);
	this.DropListener = new DropListener(this.currentGame);
	this.GroundListener = new GroundListener(this.currentGame);
	this.BlockListener = new BlockListener(this.currentGame);
	this.NpcListener = new NpcListener(this.currentGame);
};
//Block listener.
var BlockListener = function(game){
	this.currentGame = game;
};

BlockListener.prototype.begin = function(arbiter, space){
	
	var block1 = null;
	var block2 = null;
	
	if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.BLOCK)
		block1 = arbiter.body_a.userdata.object;

	if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.BLOCK)
		block2 = arbiter.body_b.userdata.object;
		
	//Resolve skill.
	if(block1 != null && block1.type == Enum.Block.Type.SKILLED && block1.skill != null)
		this.resolve(block1, arbiter.body_b.userdata);
		
	if(block2 != null && block2.type == Enum.Block.Type.SKILLED && block2.skill != null)
		this.resolve(block2, arbiter.body_a.userdata);

	//Special process for collision with two blocks.
	if(block1 != null && block2 != null)
	{	
		//Some skills need a target defined when touching a block.
		if(block1.skill && block1.skill.targetWithBlock)
			block1.linkedBlockId = block2.id;
		
		if(block2.skill && block2.skill.targetWithBlock)
			block2.linkedBlockId = block1.id;
	
		if(block1.type == Enum.Block.Type.COLORED && block2.type == Enum.Block.Type.COLORED
		&& block1.color == block2.color && block1.color < Enum.Color.GREEN)
		{			
			//Check if linked block has been destroyed first.
			if(block1.linkedBlockId != null && this.currentGame.blocks[block1.linkedBlockId] == null)
				block1.linkedBlockId = null;
			if(block2.linkedBlockId != null && this.currentGame.blocks[block2.linkedBlockId] == null)
				block2.linkedBlockId = null;
		
			//If blocks are touching a third one, destroy them all.
			if((block1.linkedBlockId != null && block1.linkedBlockId != block2.id) 
				|| (block2.linkedBlockId != null && block2.linkedBlockId != block1.id))
			{
				block1.markToDestroy(Enum.Block.Destruction.COLOR_CONTACT);
				block2.markToDestroy(Enum.Block.Destruction.COLOR_CONTACT);
				
				//Destroy linked leaves.
				if(block1.linkedBlockId != null)
					this.destroyLeaves(block1.linkedBlockId, block1.id);
				if(block2.linkedBlockId != null)
					this.destroyLeaves(block2.linkedBlockId, block2.id);
								
				block1 = null;
				block2 = null;
			}
			else
			{
				block1.linkedBlockId = block2.id;
				block2.linkedBlockId = block1.id;
			}
		}
		else if(block1.type == Enum.Block.Type.COLORED && block2.type == Enum.Block.Type.COLORED 
				&& Math.abs(block1.color - block2.color) == 4)
		{
			//Destroy complementary blocks on contact.
			block1.markToDestroy(Enum.Block.Destruction.COLOR_CONTACT);
			block2.markToDestroy(Enum.Block.Destruction.COLOR_CONTACT);
			
			block1 = null;
			block2 = null;
		}
	}
	
	//Treament for player within contact.
	var player = null;
	
	if(block1 == null && arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
		player = arbiter.body_a.userdata.object;

	if(block2 == null && arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
		player = arbiter.body_b.userdata.object;
	
	//Trigger spawn.
	if(block1 != null && player == null && block1.type == Enum.Block.Type.SPAWN)
		block1.mustTrigger = true;
	if(block2 != null && player == null && block2.type == Enum.Block.Type.SPAWN)
		block2.mustTrigger = true;
	
	if(player != null)
	{
		var killingBlock = (block1 != null ? block1 : block2);
			
		if(killingBlock != null && !killingBlock.landed && killingBlock.ownerId != player.id)
		{
			if(killingBlock.ownerId == null)
			{
				this.currentGame.overlord.kill(player, killingBlock.type);
			}
			else
			{
				//Find killing player.
				var killingPlayer = null;
				
				for(var i in this.currentGame.players)
				{
					if(this.currentGame.players[i].id == killingBlock.ownerId)
						killingPlayer = this.currentGame.players[i];
				}

				//If found, mark the player to be inserted in the next update in the killer blocks list.
				if(killingPlayer != null)
					killingPlayer.kill(player, killingBlock.type);
			}
		}
		
		block1 = null;
		block2 = null;
	}
		
	//Check if blocks land.
	if(block1 != null && !block1.isStatic && (block1.launchLandTimer  <= 0 || (!player && !block2)))
	{
		//State can't be changed during callback.
		block1.toggleState = true;
		block1.isStatic = true;
		block1.justLanded = true;
		block1.landingTimer = Constants.Block.LANDING_TIMER;
	}
	
	if(block2 != null && !block2.isStatic && (block2.launchLandTimer  <= 0 || (!player && !block1)))
	{
		block2.toggleState = true;
		block2.isStatic = true;
		block2.justLanded = true;
		block2.landingTimer = Constants.Block.LANDING_TIMER;
	}
};
	
BlockListener.prototype.resolve = function(skillBlock, otherUserdata){
	
	switch(skillBlock.skill.trigger){
		case Enum.Block.Skill.Trigger.ON_LANDING:
			
			if(otherUserdata != null && otherUserdata.type == Enum.UserData.Type.PLAYER)
				return;
				
			skillBlock.mustTrigger = true;
			
			break;
	}
};
	
BlockListener.prototype.destroyLeaves = function(blockId, previousId){
		
	var block = this.currentGame.blocks[blockId];
	
	if(block != null)
	{
		block.markToDestroy(Enum.Block.Destruction.COLOR_CONTACT);
		
		if(block.linkedBlockId != null && block.linkedBlockId != previousId)
			this.destroyLeaves(block.linkedBlockId, blockId);
	}
};
var NpcListener = function(game){
	this.currentGame = game;
};

NpcListener.prototype.begin = function(arbiter, space){
	
	var player = null;
	var npc = null;
	var block = null;
	
	if(arbiter.body_a.userdata != null)
	{
		if(arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_a.userdata.object;
		else if(arbiter.body_a.userdata.type == Enum.UserData.Type.BLOCK)
			block = arbiter.body_a.userdata.object;
		else	
			npc = arbiter.body_a.userdata.object;
	}	
	
	if(arbiter.body_b.userdata != null)
	{
		if(arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_b.userdata.object;
		else if(arbiter.body_b.userdata.type == Enum.UserData.Type.BLOCK)
			block = arbiter.body_b.userdata.object;
		else	
			npc = arbiter.body_b.userdata.object;
	}
	
	if(player != null)
	{
		if(npc != null){
			switch(npc.type){
				case Enum.NPC.Type.PESKY_BOX:
					player.body.setVel(new chipmunk.Vect(0,0));
					
					if(player.id == npc.target.id)
						npc.fleeTimer = npc.maxFleeTime;
					
					break;
			}
		}
	}
};
//Mortal things listener.
var DeathZoneListener = function(game){
	this.currentGame = game;
};

DeathZoneListener.prototype.begin = function(arbiter, space){
	
	var player = null;
	var block = null;
	var deathZone = null;
	var deathZoneType = null;
	
	if(arbiter.body_a.userdata != null)
	{
		if(arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_a.userdata.object;
		else if(arbiter.body_a.userdata.type == Enum.UserData.Type.BLOCK)
			block = arbiter.body_a.userdata.object;
		else	
		{
			deathZone = arbiter.body_a.userdata.object;
			deathZoneType = arbiter.body_a.userdata.type;
		}
	}	
	if(arbiter.body_b.userdata != null)
	{
		if(arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
			player = arbiter.body_b.userdata.object;
		else if(arbiter.body_b.userdata.type == Enum.UserData.Type.BLOCK)
			block = arbiter.body_b.userdata.object;
		else	
		{
			deathZone = arbiter.body_b.userdata.object;
			deathZoneType = arbiter.body_b.userdata.type;
		}
	}	
	
	//Some specific case for skills.
	if(deathZone != null){
		
		switch(deathZoneType){
			case Enum.UserData.Type.JAW:
				
				if(!player && !block)
					deathZone.stillExists = false;

				break;
		}
	}
	
	//Must be enabled to continue.
	if(deathZone != null && deathZone != null && !deathZone.enabled)
		return;
	
	if(player != null)
	{
		if(deathZone != null)
		{
			//Find killing player.
			var killingPlayer = null;
			
			for(var i in this.currentGame.players)
				if(this.currentGame.players[i].id == deathZone.ownerId)
				{
					killingPlayer = this.currentGame.players[i];
					break;
				}

			//If found, mark the player to be inserted in the next update in the killer blocks list.
			if(killingPlayer != null && killingPlayer.id != player.id)
				killingPlayer.kill(player, deathZone.stats.type);
			else
				player.toBeDestroy = true;
		}
		else
			player.toBeDestroy = true;
	}
	
	if(block != null && block.type != Enum.Block.Type.SPAWN && (deathZone == null || deathZone.blockId == null || deathZone.blockId != block.id))
	{
		block.markToDestroy(Enum.Block.Destruction.CRUSHED);
		
		if(deathZone && deathZoneType){
		
			switch(deathZoneType){
				case Enum.UserData.Type.JAW:
					//Jaw can only destroy a limited number of blocks.
					deathZone.count--;
					
					if(deathZone.count == 0)
					{
						deathZone.enabled = false;
						deathZone.stillExists = false;
					}
					
					break;
			}
		}
	}
};
//Drop listener.
var DropListener = function(game){
	this.currentGame = game;
};

DropListener.prototype.begin = function(arbiter, space){
	var player = null;
	
	if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
		player = arbiter.body_a.userdata.object;

	if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
		player = arbiter.body_b.userdata.object;
	
	if(player != null)
		player.obstruction++;
};
		
DropListener.prototype.separate = function(arbiter, space){
	var player = null;
	
	if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
		player = arbiter.body_a.userdata.object;

	if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
		player = arbiter.body_b.userdata.object;
	
	if(player != null)
		player.obstruction--;
};
//Goal listener.
var GoalListener = function(game){
	this.currentGame = game;
};

GoalListener.prototype.begin = function(arbiter, space){

	var player = null;
	
	if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
		player = arbiter.body_a.userdata.object;

	if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER)
		player = arbiter.body_b.userdata.object;
		
	if(this.currentGame.winner == null)
		this.currentGame.electWinner(player);
	else
		player.toBeDestroy = true;
};
//Ground listener.
var GroundListener = function(game){
	this.currentGame = game;
};

GroundListener.prototype.begin = function(arbiter, space){

	var player = null;
	var sensorIsB = arbiter.b.sensor;
	
	if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
		player = arbiter.body_a.userdata.object;

	//Allow player to jump on other.
	if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER && (player == null || sensorIsB))
		player = arbiter.body_b.userdata.object;
	
	if(player != null)
		player.groundContact++;
};

GroundListener.prototype.separate = function(arbiter, space){
	var player = null;
	var sensorIsB = arbiter.b.sensor;
	
	if(arbiter.body_a.userdata != null && arbiter.body_a.userdata.type == Enum.UserData.Type.PLAYER)
		player = arbiter.body_a.userdata.object;

	//Allow player to jump on other.
	if(arbiter.body_b.userdata != null && arbiter.body_b.userdata.type == Enum.UserData.Type.PLAYER && (player == null || sensorIsB))
		player = arbiter.body_b.userdata.object;
		
	if(player != null){
		player.groundContact--;
		return;
	}
};
var Managers = function(game){
	this.currentGame = game;

	this.BlockManager = new BlockManager(this.currentGame);
	this.DeathZoneManager = new DeathZoneManager(this.currentGame);
	this.NpcManager = new NpcManager(this.currentGame);
};
var Account = new function(){
	var cradle = require('cradle');
	var db = new(cradle.Connection)('http://127.0.0.1', 5984, { cache: true, raw: false, auth: { username: 'ptlarouche', password: 'Silver75' } }).database('dream');
	var crypto = require('crypto');
	
	//To send email.
	var nodemailer = require('nodemailer');
	var smtpTransport = nodemailer.createTransport('SMTP', {
		service: 'Gmail',
		auth: {
			user: 'crushed.dream.the.game@gmail.com',
			pass: 'goldrush975'
		}
	});

	//Create views.
	db.save('_design/players', {
		views: {
			all: {
				map: function(doc){ 
					if(doc.username) 
						emit(doc.username, doc); 
				}
			},
			byEmail: {
				map: function(doc){ 
					if(doc.email) 
						emit(doc.email.toLowerCase(), doc);
				}
			}
		}
	}, function(err, res){
	
		if(err)
			console.log('Error when creating couchdb views.');
	});
	
	//Hash password with salt.
	function sha1(pass, salt) {
	  return crypto.createHmac('sha1', salt).update(pass).digest('hex');
	}
	
	//Generate random salt.
	function generateSalt(len) {
	
	  var chars = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	  var salt = '';
		  
	  for (var i = 0; i < len; i++) {
		var p = Math.floor(Math.random() * chars.length);
		salt += chars[p];
	  }
	  
	  return salt;
	}
	
	//Validate profile.
	function validateProfile(profile){
		
		if(profile.username == null || profile.username == '')
			return false;
			
		if(profile.password == null || profile.password == '')
			return false;
			
		if(profile.confirmation == null || profile.confirmation == '')
			return false;
			
		if(profile.email == null || profile.email == '')
			return false;
			
		if(profile.password.length < 6)
			return false;
			
		if(profile.username.length < 6)
			return false;
			
		if(profile.password != profile.confirmation)
			return false;
			
		if(!/^\S{0,}@\S{0,}[.]{1}[a-zA-Z0-9]{2,}$/.test(profile.email))
			return false;
		
		return true;
	}
	
	function validateNewPassword(oldPassword, newPassword, confirmation){
		
		if(!oldPassword || !newPassword || !confirmation || oldPassword == '' || newPassword == '' || confirmation == '')
			return false;
			
		if(oldPassword == newPassword)
			return false;
			
		if(newPassword != confirmation)
			return false;
			
		return true;
	}
	
	function validateResetPassword(username, email){
		
		if(username == null || username == '')
			return false;
		
		if(email == null || email == '')
			return false;
		
		if(!Constants.Regex.EMAIL.test(email))
			return false;
		
		return true;
	}
	
	//Add score to winner.
	this.win = function(username, points){
	
		if(username == null || username == '')
			return;
			
		db.get(username.toLowerCase(), function(err, profile){
			
			if(profile == null)
				return;
				
			if(profile.score == null)
				profile.score = 0;
				
			profile.score += points;
			
			db.merge(username.toLowerCase(), { score: profile.score }, function(err, res){
			
				if(err)
					console.log('Add victory failed (' + profile.username + ')');
			});
		});
	};
	
	//Remove score to loser.
	this.lose = function(username){
	
		if(username == null || username == '')
			return;
			
		db.get(username.toLowerCase(), function(err, profile){
			
			if(profile == null)
				return;
				
			if(profile.score == null)
				profile.score = 0;
				
			profile.score--;
			
			db.merge(username.toLowerCase(), { score: profile.score }, function(err, res){
			
				if(err)
					console.log('Add defeat failed (' + profile.username + ')');
			});
		});
	};
	
	//Authentication
	this.authenticate = function(profile, callback){
		
		var errorMsg = [];
		
		if(profile.username == null || profile.username == '' || profile.password == null || profile.password == '')
		{
			errorMsg.push('Username/password are required.');
			callback(errorMsg);
			return;
		}
		
		db.get(profile.username.toLowerCase(), function(err, doc){
			
			if(doc == null)
			{
				errorMsg.push('Invalid username/password.');
				callback(errorMsg);
				return;
			}
			
			var password = sha1(profile.password, doc.salt);
						
			if(password != doc.password)
			{
				errorMsg.push('Invalid username/password.');
				callback(errorMsg);
				return;
			}
			else
				callback(errorMsg);
		});
	};
	
	//Create new account
	this.create = function(profile, callback){
	
		var errorMsg = [];
	
		if(!validateProfile(profile))
		{
			errorMsg.push('Invalid account.');
			callback(errorMsg);
			return;
		}
		
		//Check unicity.
		db.view('players/byEmail', { key: profile.email.toLowerCase() }, function(err, players){
				
			if(players && players.length > 0)
			{
				errorMsg.push('Email already taken.');
				callback(errorMsg);
				return;
			}
		
			db.get(profile.username.toLowerCase(), function(err, doc){
			
				if(doc != null)
				{
					errorMsg.push('Username already taken.');
					callback(errorMsg);
					return;
				}
			
				//Erase confirmation (useless to stock).
				delete profile.confirmation;
			
				//Hash password.
				profile.salt = generateSalt(12);
				profile.password = sha1(profile.password, profile.salt);
				profile.score = 0;
		
				db.save(profile.username.toLowerCase(), profile, function(err, res){

					if(err)
					{
						console.log('Adding user failed (' + profile.username + ')');
						errorMsg.push('Unexpected error when creating account.');
					}
					
					callback(errorMsg);
				});
			});
		});
	};
	
	//Change password
	this.changePassword = function(profile, oldPassword, newPassword, confirmation, callback){
	
		var errors = [];
	
		if(!validateNewPassword(oldPassword, newPassword, confirmation))
		{
			errors.push('Error when validating new password.');
			callback(errors);
			return;
		}
	
		db.get(profile.username.toLowerCase(), function(err, doc){
			
			if(err || !doc)
			{
				errors.push('Error when changing password.');
				callback(errors);
				return;
			}
			
			var password = sha1(oldPassword, doc.salt);
						
			//Check if old password has been correctly input.
			if(password != doc.password)
			{
				errors.push('Old password mismatches current password.');
				callback(errorMsg);
				return;
			}
			
			//Hash password.
			doc.salt = generateSalt(12);
			doc.password = sha1(newPassword, doc.salt);
			
			db.merge(profile.username.toLowerCase(), { salt: doc.salt, password: doc.password }, function(err, res){
			
				if(err)
				{
					console.log('Change password failed (' + profile.username + ')');
					errors.push('Unexpected error when changing password.');
				}
				
				callback(errors);
			});
		});
	};
	
	//Reset password.
	this.resetPassword = function(profile, email, callback){
		
		var errors = [];
		
		if(!validateResetPassword(profile.username, email))
		{
			errors.push('Error when validating informations to reset password.');
			callback(errors);
			return;
		}
		
		db.view('players/byEmail', { key: email.toLowerCase() }, function(err, players){
		
			if(!players || players.length == 0)
			{
				errors.push('No user is bound to this email.');
				callback(errors);
				return;
			}
		
			var player = players[0].value;
		
			if(player.username.toLowerCase() != profile.username.toLowerCase())
			{
				errors.push('Wrong user/email.');
				callback(errors);
				return;
			}
			
			var newPassword = generateSalt(8);
			var newSalt = generateSalt(12);
			
			player.salt = newSalt;
			player.password = sha1(newPassword, newSalt);
			
			db.merge(player.username.toLowerCase(), { salt: player.salt, password: player.password }, function(err, res){
			
				if(err)
				{
					console.log('Reset password failed (' + profile.username + ')');
					errors.push('Unexpected error when resetting password.');
				}
				else
				{
					//Send email to player to confirm.
					var mailOptions = {
						from: 'Crushed Dream <crushed.dream.the.game@gmail.com>',
						to: player.email,
						subject: 'Reset password',
						html: '<h1>Password has been reset!</h1><p>This is your new password : ' + newPassword  
							  + ' <br /> Please change this password in the Change Password screen after your next login. </p><p> See you soon!</p>'
					};
					
					smtpTransport.sendMail(mailOptions, function(err, response){
						if(err)
						{
							errors.push('Error when sending email. Try again or contact crushed.dream.the.game@gmail.com for help.');
							callback(errors);
							return;
						}
					});
				}
				
				callback(errors);
			});
		});
	};
};
var SkillInfo = {
	load: function(skill){
		
		var tmpSkill = null;
		
		switch(skill.type){
			case Enum.Block.Skill.FIRE_PULSE:
				tmpSkill = this.FirePulse;
				break;
			case Enum.Block.Skill.JAW_FALL:
				tmpSkill = this.JawFall;
				break;
			case Enum.Block.Skill.ECLIPSE:
				tmpSkill = this.Eclipse;
				break;
			case Enum.Block.Skill.PESKY_BOX:
				tmpSkill = this.PeskyBox;
				break;
		}
		
		if(tmpSkill)
		{
			skill.count = tmpSkill.COUNT;
			skill.trigger = tmpSkill.TRIGGER;
			skill.selfDestroy = tmpSkill.SELF_DESTROY;
			skill.useLaunchTimer = tmpSkill.USE_LAUNCH_TIMER;
			skill.targetWithBlock = tmpSkill.TARGET_WITH_BLOCK;
		}
		
		return skill;
	},
	exec: function(block){
	
		switch(block.skill.type)
		{
			case Enum.Block.Skill.FIRE_PULSE:

				if(block.landingTimer <= 0 && block.skill.count > 0)
				{
					//Launch one fireball for both sides.
					block.currentGame.managers.DeathZoneManager.launch(new Missile(block.currentGame.deathZoneSequence,
																				  block.ownerId,
																				  null,
																				  block.x,
																				  block.y, 
																				  Enum.DeathZone.Type.FIREBALL,
																				  {
																					direction: Enum.Direction.LEFT,
																					power: block.skill.power
																				  },
																				  block.currentGame));
					
					block.currentGame.managers.DeathZoneManager.launch(new Missile(block.currentGame.deathZoneSequence,
																				  block.ownerId,
																				  null,
																				  block.x, 
																				  block.y, 
																				  Enum.DeathZone.Type.FIREBALL,
																				  {
																					direction: Enum.Direction.RIGHT,
																					power: block.skill.power
																				  },
																				  block.currentGame));
				
					block.skill.count--;
					block.mustTrigger = false;
					block.explode(Enum.Block.Destruction.COLOR_CONTACT);
				}
				
				break;
			case Enum.Block.Skill.JAW_FALL:
			
				//Add jaw to falling block.
				if(block.skill.count > 0)
					block.currentGame.managers.DeathZoneManager.launch(new Jaw(block.currentGame.deathZoneSequence, 
																			   block, 
																			   0, 
																			   (Constants.Block.HEIGHT*0.5 + Constants.DeathZone.Jaw.HEIGHT*0.5)*-1, 
																			   Constants.DeathZone.Jaw.INITIAL_COUNT + Constants.DeathZone.Jaw.STEP*block.skill.power, 
																			   Constants.DeathZone.Jaw.WIDTH, 
																			   Constants.DeathZone.Jaw.HEIGHT, 
																			   block.currentGame));
			
				block.skill.count--;
				block.mustTrigger = false;
				break;
			case Enum.Block.Skill.ECLIPSE:
			
				//Send client info to create an eclipse.
				if(block.skill.count > 0)
				{
					var owner = null;
					
					for(var i in block.currentGame.players)
						if(i == block.ownerId)
						{
							owner = block.currentGame.players[i];
							break;
						}

					if(owner)
					{
						var data = {
							username: owner.username,
							power: block.skill.power,
							x: block.x,
							y: block.y,
							type: Enum.Element.Type.ECLIPSE
						};
						
						io.sockets.in(block.currentGame.id).emit(Constants.Message.NEW_ELEMENT, data);
					}
				}
				
				block.skill.count--;
				block.mustTrigger = false;
				break;
			case Enum.Block.Skill.PESKY_BOX:
			
				if(block.skill.count > 0)
				{
					var targetBlock = block.currentGame.blocks[block.linkedBlockId];
					var targetPlayer = null;
					
					if(targetBlock)
						targetPlayer = block.currentGame.players[targetBlock.ownerId];
					
					if(targetPlayer)
						block.currentGame.managers.NpcManager.add(new PeskyBox(block.currentGame.npcSequence,
																			   block.x,
																			   block.y,
																			   Constants.NPC.PeskyBox.WIDTH,
																			   Constants.NPC.PeskyBox.HEIGHT,
																			   Constants.NPC.PeskyBox.SPEED + Constants.NPC.PeskyBox.SPEED_STEP*block.skill.power,
																			   Constants.NPC.PeskyBox.DURATION + Constants.NPC.PeskyBox.DURATION_STEP*block.skill.power,
																			   Constants.NPC.PeskyBox.FLEE_TIMER - Constants.NPC.PeskyBox.FLEE_STEP*block.skill.power,
																			   targetPlayer,
																			   block.currentGame));
				}
				
				block.skill.count--;
				block.mustTrigger = false;
				break;
		}			
	},
	FirePulse: {
		COUNT: 1,
		TRIGGER: Enum.Block.Skill.Trigger.ON_LANDING,
		SELF_DESTROY: true,
		USE_LAUNCH_TIMER: false,
		TARGET_WITH_BLOCK: false
	},
	JawFall: {
		COUNT: 1,
		TRIGGER: Enum.Block.Skill.Trigger.ON_LAUNCHING,
		SELF_DESTROY: false,
		USE_LAUNCH_TIMER: true,
		TARGET_WITH_BLOCK: false
	},
	Eclipse: {
		COUNT: 1,
		TRIGGER: Enum.Block.Skill.Trigger.ON_LANDING,
		SELF_DESTROY: false,
		USE_LAUNCH_TIMER: false,
		TARGET_WITH_BLOCK: false
	},
	PeskyBox: {
		COUNT: 1,
		TRIGGER: Enum.Block.Skill.Trigger.ON_LANDING,
		SELF_DESTROY: false,
		USE_LAUNCH_TIMER: false,
		TARGET_WITH_BLOCK: true
	}
};//Server version of the player.
var Player = function(id, username, x, y, color, game){

	this.currentGame = game;
	this.username = username;
	
	this.id = id;
	this.x = x;
	this.y = y;
		
	this.killTime = 0;	
	this.stepReached = Enum.StepReached.NONE;
	
	this.isAlive = true;
	this.toBeDestroy = false;
	this.hasWon = false;
	this.isRemoved = false;
	
	//Timer indicating how long a player may keep a spawn block in his inventory.
	this.spawnTimer = Constants.Block.Restriction.SPAWN_TIMER;
	
	this.width = Constants.Player.WIDTH;
	this.height = Constants.Player.HEIGHT;
	
	this.groundContact = 0;
	
	//Used to prevent player to drop a block if obstructed.
	this.obstruction = 0;
	
	this.doubleJumpEnabled = false;
	this.doubleJumpUsed = true;
	this.jumpCooldown = Constants.Player.JUMP_COOLDOWN;
	
	this.currentBlock = {
		type: Enum.Block.Type.NEUTRAL,
		skill: null
	};
	
	this.hasGivenBlock = false;
	
	//Killer's id.
	this.killerId = null;
	
	this.facing = Enum.Facing.LEFT;
	this.currentAction = Enum.Action.Type.STANDING;
	
	this.color = color;
	this.keys = {
		right: false,
		left: false,
		jump: false
	};
	
	//Physic body.
	this.body = null;	
};

Player.prototype.kill = function(killed, blockType, mustStealList){

	killed.toBeDestroy = true;
	
	//Assign spawn block.
	if(this.currentBlock.type != Enum.Block.Type.SPAWN && blockType != Enum.Block.Type.SPAWN)
	{
		this.currentBlock = {
			type: Enum.Block.Type.SPAWN,
			skill: null
		};
		
		io.sockets.sockets[this.id].emit(Constants.Message.SEND_BLOCK, 
										{
											type: Enum.Block.Type.SPAWN,
											skill: null
										});
		this.hasGivenBlock = true;
	}
		
	killed.killerId = this.id;
		
	//Steal killed killeds' list to killer.
	if(mustStealList == null || mustStealList)
	{
		for(var i in this.currentGame.players)
		{
			if(this.currentGame.players[i].killerId == killed.id)
				this.currentGame.players[i].killerId = this.id;
		}
	}
	
	//Swap killer colored blocks to killed complementary one.
	for(var i in this.currentGame.blocks)
	{
		if(this.currentGame.blocks[i] != null 
		   && this.currentGame.blocks[i].type == Enum.Block.Type.COLORED 
		   && this.currentGame.blocks[i].color == this.color)
	    {
			this.currentGame.blocks[i].color = killed.color + 4; //Color + 4 = complementary one.
		}
	}
};

Player.prototype.spawn = function(x, y){

	//Set new position.
	this.body.setPos(new chipmunk.Vect(x, y));

	//Add physical presence.
	this.currentGame.space.addBody(this.body);
	this.currentGame.space.addShape(this.shape);
	this.currentGame.space.addShape(this.groundSensor);
	this.currentGame.space.addShape(this.dropSensor);
	
	this.isAlive = true;
	this.killerId = null;
	this.isRemoved = false;
	
	io.sockets.in(this.currentGame.id).emit(Constants.Message.PLAYER_SPAWNED, this.toClient());
};

Player.prototype.win = function(){
	
	//Remove physical presence.
	this.currentGame.space.removeShape(this.shape);
	this.currentGame.space.removeShape(this.groundSensor);
	this.currentGame.space.removeShape(this.dropSensor);
	this.currentGame.space.removeBody(this.body);
	
	this.isRemoved = true;
	io.sockets.in(this.currentGame.id).emit(Constants.Message.AT_GOAL, this.toClient());
};

Player.prototype.die = function(){

	//Remove physical presence.
	this.currentGame.space.removeShape(this.shape);
	this.currentGame.space.removeShape(this.groundSensor);
	this.currentGame.space.removeShape(this.dropSensor);
	this.currentGame.space.removeBody(this.body);
	
	this.isAlive = false;
	this.toBeDestroy = false;
	this.isRemoved = true;
	this.hasGivenBlock = false;
		
	this.stepReached = 0;
	this.killTime = 0;
	this.groundContact = 0;
	
	var killer = null;
	
	for(var i in this.currentGame.players)
		if(this.currentGame.players[i].id == this.killerId)
		{
			killer = this.currentGame.players[i];
			break;
		}
	
	var data = {
		killed : this.toClient(),
		killer : (killer != null ? killer.toClient() : null)
	};
	
	io.sockets.in(this.currentGame.id).emit(Constants.Message.PLAYER_KILLED, data);
	
	//Ask for the next block if player is currently holding a spawn block.
	if(this.currentBlock == Enum.Block.Type.SPAWN)
		io.sockets.sockets[this.id].emit(Constants.Message.NEXT_BLOCK);
};

//Leave current game.
Player.prototype.leave = function(){
	
	if(this.isAlive && !this.isRemoved)
	{
		//Remove physical presence.
		this.currentGame.space.removeShape(this.shape);
		this.currentGame.space.removeShape(this.groundSensor);
		this.currentGame.space.removeShape(this.dropSensor);
		this.currentGame.space.removeBody(this.body);
	}
};

Player.prototype.getPosition = function(){
	
	return (this.body != null ? this.body.getPos() : new chipmunk.Vect(this.x, this.y));
};

Player.prototype.update = function(){
	
	if(this.toBeDestroy)
	{	
		this.die();
		return;
	}
	if(this.hasWon && !this.isRemoved)
		this.win();
	
	//Control goal for winner phase.
	if(this.hasWon)
		this.currentGame.goal.update(this.keys);
	
	if(this.isAlive && !this.hasWon)
	{
		this.x = this.getPosition().x;
		this.y = this.getPosition().y;
		
		var nextX = 0;
		var impulse = 0;
		
		if(this.keys.right || this.keys.left)
		{
			var velX = Math.abs(this.body.getVel().x);
			var factor = 1;
			
			if(velX > Constants.Player.MAX_VELOCITY)
				factor *= Constants.Player.MAX_SPEED_FACTOR;
				
			//Reduce impulse if velocity is above a specified limit.
			if(velX > Constants.Player.SPEED_LOWER_LIMIT)
				factor /= velX*Constants.Player.VELOCITY_FACTOR;
				
			impulse = Constants.Player.RUN_POWER_ONGROUND * factor;
		}	
		
		//Move
		if(this.keys.right)
			nextX += impulse;
			
		if(this.keys.left)
			nextX -= impulse;
		
		if(this.groundContact > 0 && this.doubleJumpUsed)
			this.doubleJumpUsed = false;
		
		//Look if player is falling.
		if(this.groundContact == 0 && this.currentAction != Enum.Action.Type.FALLING && this.currentAction != Enum.Action.Type.NONE && this.jumpCooldown <= 0)
		{
			if(this.currentAction == Enum.Action.Type.RUNNING || this.currentAction == Enum.Action.Type.STANDING)
				this.execute(Enum.Action.Type.FALLING);
			else
				this.currentAction = Enum.Action.Type.NONE;
		}
		
		//Jump
		if(this.keys.jump && this.groundContact > 0)
		{
			this.jump(false);
			this.doubleJumpEnabled = false;
		}
			
		//Double jump
		if(this.keys.jump && this.groundContact == 0 && this.doubleJumpEnabled && !this.doubleJumpUsed)
			this.doubleJump();
			
		//Allow double jump.
		if(!this.keys.jump && this.groundContact == 0 && !this.doubleJumpUsed)
			this.doubleJumpEnabled = true;
				
		if(nextX != 0)
		{
			var lastFacing = this.facing;
			this.facing = (nextX > 0 ? Enum.Facing.RIGHT : Enum.Facing.LEFT);
			
			if(lastFacing != this.facing)
				this.turn();

			this.body.applyImpulse(new chipmunk.Vect(nextX, 0), new chipmunk.Vect(0,0));
			
			//Switch current action to running if player is on the ground.
			if(this.groundContact > 0 && this.currentAction != Enum.Action.Type.RUNNING && this.currentAction != Enum.Action.Type.JUMPING)
				this.execute(Enum.Action.Type.RUNNING);	
		}
		else
		{
			//Artificial friction for players when on ground and pressing no key.
			if(this.groundContact > 0)
			{
				this.body.setVel(new chipmunk.Vect(this.body.getVel().x*Constants.Physic.FRICTION_FACTOR_ONGROUND, this.body.getVel().y));
				
				if(this.currentAction != Enum.Action.Type.STANDING && this.currentAction != Enum.Action.Type.JUMPING)
					this.execute(Enum.Action.Type.STANDING);					
				
				//Calculate standing time for kill command.
				if(this.isAlive)
				{
					var addTime = false;
					var sendMessage = false;
				
					if(this.killTime < Constants.KillCommand.Time.FIRST_STEP)
						addTime = true;
				
					//Standing phase.
					if(this.killTime == 0)
					{
						sendMessage = true;
						this.stepReached = Enum.StepReached.STANDING;
					}
									
					//Assign to a player phase.
					if(this.killTime >= Constants.KillCommand.Time.FIRST_STEP && this.keys.kill)
					{
						addTime = true;
						
						if(this.stepReached < Enum.StepReached.PLAYER)
						{
							sendMessage = true;
							this.stepReached = Enum.StepReached.PLAYER;
						}
					}
					
					//Assign to the overlord phase.
					if(this.killTime >= Constants.KillCommand.Time.SECOND_STEP && this.keys.kill && this.stepReached < Enum.StepReached.OVERLORD)
						this.stepReached = Enum.StepReached.OVERLORD;
				
					if(sendMessage)
						io.sockets.sockets[this.id].emit(Constants.Message.KILL_COMMAND, this.stepReached);
				
					if(addTime)
						this.killTime += this.currentGame.dt;	
				}	
			}
		}
		
		//Reset kill command timer.
		if(this.killTime > 0 && (nextX != 0 || this.keys.jump))
		{
			this.killTime = 0;
			this.stepReached = 0;
			
			io.sockets.sockets[this.id].emit(Constants.Message.KILL_COMMAND, Enum.StepReached.NONE);
		}	
		
		if(this.jumpCooldown > 0)
			this.jumpCooldown -= this.currentGame.dt;
	}
	
	//Manage kill command.
	if(this.stepReached > Enum.StepReached.STANDING && (!this.keys.kill || this.stepReached == Enum.StepReached.OVERLORD))
	{	
		switch(this.stepReached)
		{
			case Enum.StepReached.PLAYER:
				this.currentGame.overlord.assignKill(this);
				break;
			case Enum.StepReached.OVERLORD:
				this.currentGame.overlord.kill(this, null);
				break;
		}
	}
	
	//Check timers related to player and trigger actions associated.
	if(!this.hasWon)
		this.checkTimers();
};

Player.prototype.checkTimers = function(){

	//Prevent player to keep a spawn block (kill him and drop spawn block). 
	if(this.currentBlock == Enum.Block.Type.SPAWN && this.isAlive)
	{
		this.spawnTimer -= this.currentGame.dt;
		
		if(this.spawnTimer < 0)
		{
			var hasLivingPlayer = false;
			
			for(var i in this.currentGame.players)
				if(this.currentGame.players[i].isAlive && this.currentGame.players[i].id != this.id)
				{
					hasLivingPlayer = true;
					break;
				}
					
			if(hasLivingPlayer)
				this.dropBlock(this.body.getPos().x, this.body.getPos().y, false);
			
			//Assign kill to a random player.
			this.currentGame.overlord.assignKill(this, hasLivingPlayer);
		}
	}
	else
	{
		if(this.spawnTimer < Constants.Block.Restriction.SPAWN_TIMER)
			this.spawnTimer = Constants.Block.Restriction.SPAWN_TIMER;
	}
	
};

Player.prototype.turn = function(){
	this.body.setVel(new chipmunk.Vect(this.body.getVel().x*Constants.Physic.TURN_FRICTION_FACTOR, this.body.getVel().y));
};

Player.prototype.jump = function(isDoubleJumping){

	if(this.jumpCooldown <= 0)
	{
		this.jumpCooldown = Constants.Player.JUMP_COOLDOWN;
		
		if(!isDoubleJumping)
			this.execute(Enum.Action.Type.JUMPING);
		
		this.body.setVel(new chipmunk.Vect(this.body.getVel().x, 0));
		this.body.applyImpulse(new chipmunk.Vect(0, Constants.Player.JUMP_POWER), new chipmunk.Vect(0,0));
	}
	
};

Player.prototype.doubleJump = function(){

	if(this.jumpCooldown <= 0)
	{
		this.jump(true);
		this.dropBlock();

		this.execute(Enum.Action.Type.DOUBLE_JUMPING);
		this.doubleJumpUsed = true;
		this.doubleJumpEnabled = false;
	}
};

Player.prototype.dropBlock = function(x, y, checkDropzone){

	//Spawn a block if drop zone isn't obstructed.
	if((this.obstruction == 0 || (checkDropzone != null && !checkDropzone)) 
		&& this.y < this.currentGame.height - Constants.WinningGoal.OFFSET_Y + Constants.Game.OFFSET_Y_ALLOWED_FOR_PLAYERS)
	{

		var tmpX = (x != null ? x : this.getPosition().x);
		var tmpY = (y != null ? y : this.getPosition().y - (Constants.Player.HEIGHT*0.5 + Constants.Block.HEIGHT*0.5) - 5);
	
		//Create a block and launch it.
		this.currentGame.managers.BlockManager.launch(new Block(this.currentGame.blockSequence, 
															  tmpX, 
															  tmpY, 
															  this.currentBlock.type, 
															  this.color,
															  this.id,
															  this.currentGame,
															  this.currentBlock.skill));
		
		this.hasGivenBlock = false;
		
		//Ask for next block of current player.
		io.sockets.sockets[this.id].emit(Constants.Message.NEXT_BLOCK);
	}
};

//Init the physical part of the player.
Player.prototype.initBody = function(space){
	
	var groundSensorHalfWidth = Constants.Player.WIDTH*0.33;
	var playerHalfHeight = Constants.Player.HEIGHT*0.5;
	var groundSensorHeight = 2;

	//Body creation.
	this.body = this.currentGame.space.addBody(new chipmunk.Body(Constants.Physic.MASS_PLAYER, Infinity));
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
						
	//Assign custom data to body.
	this.body.userdata = {
		type: Enum.UserData.Type.PLAYER,
		object: this
	};
						
	//Create a shape associated with the body.
	this.shape = this.currentGame.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.shape.setCollisionType(Enum.Collision.Type.PLAYER);
		
	//Add ground sensor.
	this.groundSensor = this.currentGame.space.addShape(chipmunk.BoxShape2(this.body, 
																new chipmunk.BB(-(groundSensorHalfWidth), 
																				-(playerHalfHeight+groundSensorHeight), 
																				(groundSensorHalfWidth), 
																				-(playerHalfHeight))));
	this.groundSensor.setCollisionType(Enum.Collision.Type.GROUND_SENSOR);
	this.groundSensor.sensor = true;
	
	//Add drop sensor to prevent double jump when drop zone is obstructed.
	this.dropSensor = this.currentGame.space.addShape(chipmunk.BoxShape2(this.body,
															new chipmunk.BB(-(Constants.Block.WIDTH*0.33), 
																			-(playerHalfHeight+(Constants.Block.HEIGHT*0.75)), 
																			(Constants.Block.WIDTH*0.33), 
																			-(playerHalfHeight))));
																
	this.dropSensor.setCollisionType(Enum.Collision.Type.DROP_SENSOR);
	this.dropSensor.sensor = true;
};

Player.prototype.execute = function(action){
	this.currentAction = action;
	
	var data = {
		action: action,
		playerColor: this.color
	};
	
	io.sockets.in(this.currentGame.id).emit(Constants.Message.PLAYER_ACTION, data);
};
	
//Format for client.
Player.prototype.toClient = function(){
	return {
		x: this.getPosition().x,
		y: this.getPosition().y,
		color: this.color,
		facing: this.facing
	};
};
var Lobby = function(id, hostId, username){
	this.id = id;
	this.name = 'Lobby of ' + username;
	
	this.hostId = hostId;
	this.connectedPlayers = 1;
	this.settings = new GameSettings(id, 1200, 800, 2, username);
};

Lobby.prototype.update = function(data){
	this.name = data.name;
};

Lobby.prototype.toClient = function(){

	return {
		id: this.id,
		name: this.name,
		settings: this.settings,
		connectedPlayers: this.connectedPlayers,
		maxPlayers: Constants.Game.MAX_PLAYERS
	};
};//Server version of the block.
var Block = function(id, x, y, type, color, ownerId, game, skill){
	
	this.currentGame = game;
	
	this.id = id;
	this.linkedBlockId = null;
	this.ownerId = ownerId;
	
	this.width = Constants.Block.WIDTH;
	this.height = Constants.Block.HEIGHT;
	
	//Flag is true when block's body is sleeping.
	this.landed = false;
	//Flag is true when block's body encounters another block.
	this.justLanded = false;
	//Precision timer to trigger action shortly after the block just landed. Prevents to trigger action when bodies are collapsing.
	this.landingTimer = 0;
	
	this.stillExist = true;
	
	this.x = x;
	this.y = y;
	this.type = type;
	
	//Set skill information.
	this.skill = (type == Enum.Block.Type.SKILLED ? SkillInfo.load(skill) : null);	
	this.color = color;
	
	this.launchLandTimer = (this.skill && this.skill.useLaunchTimer ? Constants.Block.LAUNCH_LAND_TIMER : 0);
	this.mustTrigger = false;

	//Needed to indicate, during update, if state is changed. Cannot be done during a space step (callback).
	this.toggleState = false;
	this.isStatic = false;
	this.toBeDestroy = false;
	this.destroyCause = null;
	
	this.state = Enum.Block.State.DYNAMIC;
		
	//Body creation (when not static).
	this.body = this.currentGame.space.addBody(new chipmunk.Body(Constants.Physic.MASS_BLOCK, Infinity));
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
						
	//Assign custom data to body.
	this.body.userdata = {
		type: Enum.UserData.Type.BLOCK,
		object: this
	};
			
	//Create a shape associated with the body.
	this.shape = this.currentGame.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.shape.setCollisionType(Enum.Collision.Type.STATIC);
	this.shape.setFriction(1);
	
	//Sensor allowing shape to be defined as block, because listener overrides collision behavior.
	this.blockSensor = this.currentGame.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.blockSensor.setCollisionType(Enum.Collision.Type.BLOCK);
	this.blockSensor.sensor = true;
};

Block.prototype.markToDestroy = function(cause){
	this.toBeDestroy = true;
	this.destroyCause = cause;
};

Block.prototype.launch = function(){
	this.landed = false;
	this.body.setVel(new chipmunk.Vect(0, Constants.Block.LAUNCHING_SPEED));
	
	//Start skill if on launch.
	if(this.type == Enum.Block.Type.SKILLED && this.skill && this.skill.trigger == Enum.Block.Skill.Trigger.ON_LAUNCHING)
		this.trigger();
};

Block.prototype.active = function(flag){
	
	if(flag)
	{
		//Block become dynamic.
		if(this.state != Enum.Block.State.DYNAMIC)
		{
			this.landed = false;
			this.state = Enum.Block.State.DYNAMIC;
			
			this.body.nodeIdleTime = 0;
			this.body.setMass(Constants.Physic.MASS_BLOCK);
			this.currentGame.space.addBody(this.body);
		}
	}
	else
	{
		//Block become static.
		if(this.state != Enum.Block.State.STATIC)
		{
			this.state = Enum.Block.State.STATIC;
			
			this.landed = true;
			this.currentGame.space.removeBody(this.body);
			this.body.nodeIdleTime = Infinity;
			this.body.setMass(Constants.Physic.MASS_BLOCK_STATIC);
		}
	}
};

Block.prototype.update = function(dt){
	
	if(this.toBeDestroy)
		this.explode(this.destroyCause);
	else
	{	
		//Trigger effect (can't during space step).
		if(this.mustTrigger)
			this.trigger();
		
		//Reduce landing timer by delta.
		if(this.landingTimer > 0)
			this.landingTimer -= dt;
		
		if(this.launchLandTimer > 0)
		{
			this.body.setVel(new chipmunk.Vect(0, Constants.Block.LAUNCHING_SPEED));
			this.launchLandTimer -= dt;
		}
		
		if(this.stillExist)
		{
			//Check if it just landed to tell client to activate animation.
			if(this.justLanded && (this.skill == null || !this.skill.selfDestroy))
			{
				var data = {
					action: Enum.Action.Type.LANDING,
					id: this.id
				};
			
				io.sockets.in(this.currentGame.id).emit(Constants.Message.BLOCK_ACTION, data);
				this.justLanded = false;
			}
		
			//Activate or desactivate a block to become static or dynamic.
			if(this.toggleState && (this.state == Enum.Block.State.STATIC || this.body.isSleeping()))
			{
				this.active(!this.isStatic);
				this.toggleState = false;
			}	
			
			this.x = this.body.getPos().x;
			this.y = this.body.getPos().y;
		}
	}
};

Block.prototype.toClient = function(){
	return {
		id: this.id,
		x: this.body.getPos().x,
		y: this.body.getPos().y,
		type: this.type,
		skill: this.skill,
		color: this.color
	};
};

Block.prototype.trigger = function(){

	if(this.stillExist)
	{
		if(this.type == Enum.Block.Type.SPAWN)
		{
			this.spawn();
			this.mustTrigger = false;
		}
		else if(this.type == Enum.Block.Type.SKILLED)
		{
			//Trigger skill.
			SkillInfo.exec(this);
		}
	}
	
};

Block.prototype.spawn = function(){

	var killerId = this.ownerId;
	var posY = Constants.Player.HEIGHT;
	
	//Respawn dead players.
	for(var i in this.currentGame.players)
	{
		var factor = Math.PI*(Math.random()*2);
		
		var launchPowerX = Constants.Block.SPAWN_MAXLAUNCHING_X*Math.sin(factor);
		var launchPowerY = Math.abs(Constants.Block.SPAWN_MAXLAUNCHING_Y*Math.cos(factor));
		
		//Prevent block to spawn player on the world edges.
		if((this.body.getPos().x < Constants.Spawn.Limit.OFFSET && launchPowerX < 0)
		|| (this.body.getPos().x > this.currentGame.width - Constants.Spawn.Limit.OFFSET && launchPowerX > 0))
			launchPowerX *= -1;
	
		if(!this.currentGame.players[i].isAlive && this.currentGame.players[i].killerId == killerId)
		{
			//Spawn the player.
			this.currentGame.players[i].spawn(this.body.getPos().x +(launchPowerX*0.1), this.body.getPos().y + posY);
			
			//Launch the player to random position.
			this.currentGame.players[i].body.setVel(new chipmunk.Vect(0,0));
			this.currentGame.players[i].body.applyImpulse(new chipmunk.Vect(launchPowerX, launchPowerY), new chipmunk.Vect(0,0));
		}
	}
	
	//Check if spawn block is overlord's one.
	if(this.ownerId == null)
		this.currentGame.overlord.hasActiveSpawnBlock = false;
	
	this.explode(Enum.Block.Destruction.SPAWN);
};

Block.prototype.explode = function(cause){
	
	var data = {
		cause: cause,
		id: this.id
	};
	
	//Strange behavior when trying to remove a static shape. Works fine when reactivated first.
	this.active(true);
	this.currentGame.space.removeShape(this.blockSensor);
	this.currentGame.space.removeShape(this.shape);
	this.currentGame.space.removeBody(this.body);

	//Unreference from game's blocks list.
	for(var i in this.currentGame.blocks)
	{
		if(this.currentGame.blocks[i] != null && this.currentGame.blocks[i].id == this.id)
			delete this.currentGame.blocks[i];
	}
	
	this.stillExist = false;
	this.toBeDestroy = false;
	
	io.sockets.in(this.currentGame.id).emit(Constants.Message.DELETE_BLOCK, data);
};
var GameSettings = function(id, width, height, maxPlayers, username){

	//Assign when game is created by the server.
	this.id = id;
	
	this.players = [];
	this.addPlayer(username, Enum.Slot.Color.UNASSIGNED);
	
	this.width = width;
	this.height = height;
	this.worldType = null;
	
	this.maxPlayers = maxPlayers;
};

GameSettings.prototype.update = function(settings){
	this.width = settings.width;
	this.height = settings.height;
	this.worldType = settings.type;
};

GameSettings.prototype.getPlayer = function(username){
	for(var i in this.players)
		if(this.players[i] != null && this.players[i].username == username)
			return this.players[i];
		
	return null;
};

GameSettings.prototype.updatePlayer = function(username, color, ready){
	var player = this.getPlayer(username);
	player.color = color;
	player.ready = ready;
};

GameSettings.prototype.addPlayer = function(username, color){
	this.players.push({
		username: username,
		color: color,
		ready: false
	});
};

GameSettings.prototype.removePlayer = function(username){
	
	var index = null;
	for(var i in this.players)	
		if(this.players[i].username == username)
		{
			index = i;
			break;
		}
	
	if(index != null)
		this.players.splice(index, 1);
};

//Assign good color to duplicata.
GameSettings.prototype.validateColors = function(){
		
	//Find duplicated colors.
	var usedColors = {};
	var wrongColors = {};
	for(var i in this.players)
		if(usedColors[this.players[i].color] == null)
			usedColors[this.players[i].color] = 1;
		else
		{
			usedColors[this.players[i].color]++;
			wrongColors[this.players[i].color] = usedColors[this.players[i].color];
		}
	
	//Find unused colors.
	var unusedColors = [];
	for(var i = 1; i < 5; i++)
		if(usedColors[i] == null)
			unusedColors.push(i);
	
	//Assign unused color to player with duplicated color.
	for(var i = this.players.length-1; i > -1; i--)
	{
		if(wrongColors[this.players[i].color] != null && wrongColors[this.players[i].color] > 1)
		{
			wrongColors[this.players[i].color]--;
			
			var index = Math.round(Math.random()*(unusedColors.length-1));
			this.players[i].color = unusedColors[index];
			unusedColors.splice(index, 1);
		}
	}
};//Game container server-side.
var Game = function(settings){
	
	//Members
	this.id = settings.id;
	this.players = [];
	this.blocks = [];
	this.deathZones = [];
	this.npcs = [];
	
	//Create delta.
	this.previousTime = new Date();
	this.dt = 0;
	
	this.playerInfos = settings.players;
	
	//Sequences.
	this.blockSequence = 0;
	this.deathZoneSequence = 0;
	this.npcSequence = 0;
	
	this.goal = null;
	this.intervalId = null;
	this.winner = null;
	this.winningPhaseTimer = Constants.WinningGoal.PHASE_TIME;
	
	this.spawnY = Constants.Player.INITIAL_SPAWN_Y;
	
	//World information.
	this.width = settings.width;
	this.height = settings.height;
	this.worldType = settings.worldType;
	
	this.connectedPlayers = 0;
	this.connectingPlayers = 0;
	
	this.maxPlayers = settings.maxPlayers;
	this.state = false;
	this.space = null;
	
	this.unitTimer = Constants.Game.UNIT_TIMER;
	
	//Create listeners.
	this.listeners = new Listeners(this);
	
	//Managers.
	this.managers = new Managers(this);
	
	//Create Overlord.
	this.overlord = new Overlord(this);
};

Game.prototype.createWorld = function(){

	if(this.space == null || this.space == 'undefined')
	{
		var currentListeners = this.listeners;
	
		this.space = new chipmunk.Space();
		this.space.gravity = new chipmunk.Vect(0, Constants.Physic.GRAVITY);
		
		//Add goal listener.
		this.space.addCollisionHandler(Enum.Collision.Type.WINNING_GOAL, 
									   Enum.Collision.Type.PLAYER, 
									   function(arbiter, space){ currentListeners.GoalListener.begin(arbiter, space);}, 
									   null, 
									   null, 
									   null);
		
		//Add death zone listener.
		this.space.addCollisionHandler(Enum.Collision.Type.DEATH_ZONE, 
									   Enum.Collision.Type.PLAYER, 
									   function(arbiter, space){ currentListeners.DeathZoneListener.begin(arbiter, space);}, 
									   null, 
									   null, 
									   null);
									   
		this.space.addCollisionHandler(Enum.Collision.Type.DEATH_ZONE, 
									   Enum.Collision.Type.BLOCK, 
									   function(arbiter, space){ currentListeners.DeathZoneListener.begin(arbiter, space);}, 
									   null, 
									   null, 
									   null);
									   
		this.space.addCollisionHandler(Enum.Collision.Type.DEATH_ZONE, 
									   Enum.Collision.Type.STATIC, 
									   function(arbiter, space){ currentListeners.DeathZoneListener.begin(arbiter, space);}, 
									   null, 
									   null, 
									   null);
		
		//Add npc listener.
		this.space.addCollisionHandler(Enum.Collision.Type.NPC, 
									   Enum.Collision.Type.PLAYER, 
									   function(arbiter, space){ currentListeners.NpcListener.begin(arbiter, space);}, 
									   null, 
									   null, 
									   null);
		
		//Add ground sensor callback.
		this.space.addCollisionHandler(Enum.Collision.Type.GROUND_SENSOR, 
									   Enum.Collision.Type.STATIC, 
									   function(arbiter, space){ currentListeners.GroundListener.begin(arbiter, space);}, 
									   null, 
									   null, 
									   function(arbiter, space){ currentListeners.GroundListener.separate(arbiter, space);});
									   
		this.space.addCollisionHandler(Enum.Collision.Type.GROUND_SENSOR, 
									   Enum.Collision.Type.PLAYER, 
									   function(arbiter, space){ currentListeners.GroundListener.begin(arbiter, space);}, 
									   null, 
									   null, 
									   function(arbiter, space){ currentListeners.GroundListener.separate(arbiter, space);});
					
		//Add block listener callback.
		this.space.addCollisionHandler(Enum.Collision.Type.BLOCK, 
									   Enum.Collision.Type.STATIC, 
									   function(arbiter, space){ currentListeners.BlockListener.begin(arbiter, space);}, 
									   null, 
									   null, 
									   null);
		this.space.addCollisionHandler(Enum.Collision.Type.BLOCK, 
									   Enum.Collision.Type.BLOCK, 
									   function(arbiter, space){ currentListeners.BlockListener.begin(arbiter, space); }, 
									   null, 
									   null, 
									   null);
		this.space.addCollisionHandler(Enum.Collision.Type.BLOCK, 
									   Enum.Collision.Type.PLAYER, 
									   function(arbiter, space){ currentListeners.BlockListener.begin(arbiter, space); }, 
									   null, 
									   null, 
									   null);

		//Add drop zone listener callback.
		this.space.addCollisionHandler(Enum.Collision.Type.DROP_SENSOR, 
									   Enum.Collision.Type.STATIC, 
									   function(arbiter, space){ currentListeners.DropListener.begin(arbiter, space);}, 
									   null, 
									   null, 
									   function(arbiter, space){ currentListeners.DropListener.separate(arbiter, space);});
		
		//Force bodies to sleep when idle after 0.075 second.
		this.space.sleepTimeThreshold = Constants.Physic.SLEEP_TIME_THRESHOLD;
		this.space.collisionBias = 0;
		
		//Create floor and walls.
		var ground = new chipmunk.SegmentShape(this.space.staticBody,
												new chipmunk.Vect(0, 0),
												new chipmunk.Vect(this.width, 0),
												10);
		
		var leftWall = new chipmunk.SegmentShape(this.space.staticBody,
												new chipmunk.Vect(-5, 0),
												new chipmunk.Vect(0, this.height*3),
												10);
												
		var rightWall = new chipmunk.SegmentShape(this.space.staticBody,
													new chipmunk.Vect(this.width + 5, 0),
													new chipmunk.Vect(this.width, this.height*3),
													10);																
		
		//Set friction on ground.
		ground.setFriction(Constants.Physic.FRICTION);
		
		this.space.addShape(ground);
		this.space.addShape(leftWall);
		this.space.addShape(rightWall);			
			
		//Init players' bodies.
		for(var i in this.players)
			this.players[i].initBody();
			
		//Add the goal. TODO: Random between multiples goals.
		this.goal = new FloatingBall(this.width*0.5, this.height - Constants.WinningGoal.OFFSET_Y, this);
	}
};

Game.prototype.update = function(){

	//Get delta.
	var currentTime = new Date();
	this.dt = (currentTime - this.previousTime)*0.001;
	this.previousTime = currentTime;

	//When world's ready...
	if(this.ready)
	{	
		for(var i in this.players)
			this.players[i].update();

		if(this.space != null)
		{
			//Update space.
			var stepcounter = this.dt;
			
			while(stepcounter > 0)
			{
				this.space.step(Constants.Physic.TIME_STEP);
				stepcounter -= Constants.Physic.TIME_STEP;
			}
		}
			
		for(var i in this.blocks)
		{
			if(this.blocks[i] != null)
				this.blocks[i].update(this.dt);
		}
		
		//Check if Overlord needs to use a spawn block.
		var overlordGotKills = false;
		
		for(var i in this.players)
			if(!this.players[i].isAlive && this.players[i].killerId == null)
			{
				overlordGotKills = true;
				break;
			}
				
		if(overlordGotKills && !this.overlord.hasActiveSpawnBlock)
			this.overlord.launch(Enum.Block.Type.SPAWN);
			
		for(var i in this.deathZones)
			if(this.deathZones[i] != null)
				this.deathZones[i].update();
				
		//Update NPCs.
		for(var i in this.npcs)
			if(this.npcs[i] != null)
				this.npcs[i].update();
		
		//Reduce winning phase timer when there's a winner.
		if(this.winner != null)
		{
			var hasSurvivors = false;
			for(var i in this.players)
			{	
				if(i != this.winner.id && this.players[i].isAlive)
					hasSurvivors = true;
			}
			
			//Stop countdown if there's no more survivor.
			if(!hasSurvivors)
				this.winningPhaseTimer = 0;
		
			if(this.winningPhaseTimer > 0)
				this.winningPhaseTimer -= this.dt;
		}
		else
		{
			//Process units.
			if(this.unitTimer <= 0)
			{
				io.sockets.in(this.id).emit(Constants.Message.PROCESS_UNITS);
				this.unitTimer = Constants.Game.UNIT_TIMER;
			}
			else
				this.unitTimer -= this.dt
		}
		
		//Winner!
		if(this.winningPhaseTimer <= 0)
			this.end();
		
		//Send data to clients.
		this.pull();
	}
};

Game.prototype.electWinner = function(winner){
	this.winner = winner;
	this.winner.hasWon = true;
};

Game.prototype.end = function(){
	var survivors = [];
	var playerCount = 0;
	
	//Count and kill survivors.
	for(var i in this.players)
	{
		playerCount++;
		
		if(i != this.winner.id)
		{
			Account.lose(this.players[i].username);
		
			if(this.players[i].isAlive)
			{
				this.players[i].die();
				survivors.push(this.players[i].toClient());
			}
		}
	}

	//Calculate new scores.
	Account.win(this.winner.username, playerCount-1 + (survivors.length < 1 ? Math.floor(playerCount*0.5) : 0));
	
	var data = {
		winner: this.winner.toClient(),
		succeed: (survivors.length == 0),
		survivors: survivors
	};

	io.sockets.in(this.id).emit(Constants.Message.WIN, data);
	clearInterval(this.intervalId);
};

//Interrupt game to be removed.
Game.prototype.trash = function(){
	clearInterval(this.intervalId);
};

Game.prototype.push = function(inputs, id){
	this.players[id].keys = inputs;
};


Game.prototype.pull = function(){
		
	var players = [];
	
	//Players.
	for(var i in this.players)
		if(this.players[i].isAlive)
			players.push(this.players[i].toClient());
	
	//Blocks.
	var blocks = [];
	for(var i in this.blocks)
		if(this.blocks[i] != null)
			blocks.push(this.blocks[i].toClient());
		
	//Death zones.
	var deathZones = [];
	for(var i in this.deathZones)
		if(this.deathZones[i] != null)
			deathZones.push(this.deathZones[i].toClient());

	//NPCs.
	var npcs = [];
	for(var i in this.npcs)
		if(this.npcs[i] != null)
			npcs.push(this.npcs[i].toClient());
	
	var data = {
		players: players,
		goal: this.goal.toClient(),
		blocks: blocks,
		deathZones: deathZones,
		npcs: npcs
	};
	
	//Send message to all players.
	io.sockets.in(this.id).emit(Constants.Message.PULL, data);
};

Game.prototype.launch = function(){

	var GameInstance = this;
	var updateFunc = function(){
		GameInstance.update();
	};

	//17 milliseconds = 60 FPS
	this.intervalId = setInterval(updateFunc, 17);
};
var Overlord = function(game){
	this.currentGame = game;
	this.hasActiveSpawnBlock = false;
};

Overlord.prototype.assignKill = function(killed, keepList){
	
	var otherPlayers = [];
	for(var i in this.currentGame.players)
	{
		if(this.currentGame.players[i].id != killed.id && this.currentGame.players[i].isAlive)
			otherPlayers.push(this.currentGame.players[i]);
	}
	
	if(otherPlayers.length == 0)
	{		
		this.kill(killed, null);
		return;
	}
	
	var killerIndex = (otherPlayers.length == 1 ? 0 : Math.round((Math.random()*(otherPlayers.length-1))-0.5));
			
	//Assign the kill.
	otherPlayers[killerIndex].kill(killed, Enum.Block.Type.NEUTRAL, (keepList == null || !keepList));
};

Overlord.prototype.launch = function(blockType){
		
	if(blockType == Enum.Block.Type.SPAWN)
	{
		//Spawn block falls from the sky.
		if(!this.hasActiveSpawnBlock)
		{
			var spawnY = this.currentGame.height + 100;
			var spawnX = Constants.Block.WIDTH*0.5 + (Math.random()*(this.currentGame.width-Constants.Block.WIDTH));
			
			//Create a block and launch it.
			var block = new Block(this.currentGame.blockSequence, 
								  spawnX, 
								  spawnY, 
								  Enum.Block.Type.SPAWN, 
								  null,
								  null, 
								  this.currentGame);
			
			this.currentGame.blocks.push(block);
			block.launch();
			
			this.currentGame.blockSequence++;	
			io.sockets.in(this.currentGame.id).emit(Constants.Message.NEW_BLOCK, block.toClient());
			
			this.hasActiveSpawnBlock = true;
		}
	}
};

Overlord.prototype.kill = function(killed, cause){
		
	//Steal killed's list.
	for(var i in this.currentGame.players)
		if(this.currentGame.players[i].killerId == killed.id)
			this.currentGame.players[i].killerId = null;
	
	//Force player to die.
	killed.toBeDestroy = true;
};//Modules.var http = require('http');var chipmunk = require('chipmunk');//Create server.
var masterServer = {
	client: null,
	server: null
};

masterServer.client = http.createServer(function(req, res){});
masterServer.server = http.createServer(function(req, res){});

//Port.
masterServer.client.listen(Constants.Network.MASTER_PORT); //localhost
masterServer.server.listen(Constants.Network.SERVER_TO_SERVER_PORT);

//Remove log level or adjust it to have every log in console.
var ioMasterClient = require('socket.io').listen(masterServer.client).set('log level', 1);
var ioMasterServer = require('socket.io').listen(masterServer.server).set('log level', 1);

var MasterServer = new function(){
	this.lobbies = {};
	this.gameSequenceId = 1;
	
	this.closeLobby = function(socket){
		console.log('Lobby closed (' + socket.userdata.gameId + ')');
						
		socket.broadcast.to(socket.userdata.gameId).emit(Constants.Message.CLOSE_LOBBY, socket.userdata.gameId);
		
		//Disconnect all players from game room.
		for(var i in ioMasterClient.sockets.in(socket.userdata.gameId).sockets)			
			ioMasterClient.sockets.sockets[i].leave(socket.userdata.gameId);
		
		delete this.lobbies[socket.userdata.gameId];
	};
	
	//Search socket bound to a player currently logged in.
	this.searchPlayer = function(username){
	
		for(var i in ioMasterClient.sockets.sockets)
		{
			var currentSocket = ioMasterClient.sockets.sockets[i];
			
			if(currentSocket.userdata && currentSocket.userdata.username == username)
				return currentSocket;
		}
			
		return null;
	};
	
	this.disconnectPlayer = function(socket){
		if(socket.userdata.gameId != null)
		{
			console.log(socket.userdata.username + ' left lobby (' + socket.userdata.gameId + ')');
			
			//Remove player from lobby.
			this.lobbies[socket.userdata.gameId].settings.removePlayer(socket.userdata.username);
			this.lobbies[socket.userdata.gameId].connectedPlayers--;
			
			socket.broadcast.to(socket.userdata.gameId).emit(Constants.Message.LEAVE_LOBBY, socket.userdata.username);
			socket.leave(socket.userdata.gameId);
		}
	};
};

//Bind listeners on sockets.
//Server to client.
ioMasterClient.sockets.on(Constants.Message.CONNECTION, function (socket){
	socket.set("heartbeat interval", 20);
	socket.set("heartbeat timeout", 60);

	console.log('Connection to client established - Master');

	//Authenticate.
	socket.on(Constants.Message.LOGIN, function(profile){
		
		console.log('Player connecting : ' + profile.username);
		
		Account.authenticate(profile, function(errors){
			
			var player = MasterServer.searchPlayer(profile.username);
			
			if(player != null)
				errors.push('User already logged in.');
			
			//Set userdata.
			if(!errors || errors.length == 0)
				socket.userdata = {
					username: profile.username,
					gameId: null
				};

			socket.emit(Constants.Message.LOGIN, errors);
		});
	});
	
	//Logout.
	socket.on(Constants.Message.LOGOUT, function(username){
		delete socket.userdata;	
	});
	
	//Create an account.
	socket.on(Constants.Message.CREATE_ACCOUNT, function(profile){
		
		console.log('Creating account : ' + profile.username);
			
		Account.create(profile, function(errors){
			socket.emit(Constants.Message.CREATE_ACCOUNT, errors);
		});
	});
	
	//Change password.
	socket.on(Constants.Message.CHANGE_PASSWORD, function(data){
	
		console.log('Change password : ' + data.profile.username);
		
		Account.changePassword(data.profile, data.oldPassword, data.newPassword, data.confirmation, function(errors){
			socket.emit(Constants.Message.CHANGE_PASSWORD, errors);
		});
	});
	
	//Reset password.
	socket.on(Constants.Message.RESET_PASSWORD, function(data){
	
		console.log('Reset password : ' + data.profile.username);
		
		Account.resetPassword(data.profile, data.email, function(errors){
			socket.emit(Constants.Message.RESET_PASSWORD, errors);
		});
	});
	
	//Socket disconnected.
	socket.on(Constants.Message.DISCONNECT, function(){
		if(socket.userdata != null && socket.userdata.gameId != null && MasterServer.lobbies[socket.userdata.gameId] != null)
		{
			if(MasterServer.lobbies[socket.userdata.gameId].hostId == socket.id)
				MasterServer.closeLobby(socket);
			else
				MasterServer.disconnectPlayer(socket);
		}
	});
	
	//Return lobbies to client.
	socket.on(Constants.Message.SEARCH_LOBBY, function(){
	
		var lobbies = [];
		
		for(var i in MasterServer.lobbies)
			if(MasterServer.lobbies[i] != null)
				lobbies.push(MasterServer.lobbies[i].toClient());
	
		socket.emit(Constants.Message.SEARCH_LOBBY, lobbies);
	});
	
	//Send game id to player.
	socket.on(Constants.Message.CREATE_LOBBY, function(username){
		console.log('Lobby created (' + MasterServer.gameSequenceId + ') : ' + username);
		MasterServer.lobbies[MasterServer.gameSequenceId] = new Lobby(MasterServer.gameSequenceId, socket.id, username);
		
		socket.emit(Constants.Message.CREATE_LOBBY, MasterServer.gameSequenceId);
		socket.join(MasterServer.gameSequenceId);
		
		//Set game id into socket userdata.
		socket.userdata.gameId = MasterServer.gameSequenceId;
		
		MasterServer.gameSequenceId++;
	});
	
	//Join a lobby.
	socket.on(Constants.Message.JOIN_LOBBY, function(data){
		
		if(MasterServer.lobbies[data.gameId].connectedPlayers < Constants.Game.MAX_PLAYERS)
		{
			console.log('Lobby joined (' + data.gameId + ') :' + data.username);

			MasterServer.lobbies[data.gameId].connectedPlayers++;
			MasterServer.lobbies[data.gameId].settings.addPlayer(data.username, Enum.Slot.Color.UNASSIGNED);
			
			ioMasterClient.sockets.in(data.gameId).emit(Constants.Message.JOIN_LOBBY, data.username);
						
			var returnData = {
				gameId: data.gameId,
				name: MasterServer.lobbies[data.gameId].name,
				players: MasterServer.lobbies[data.gameId].settings.players
			};
			
			//Join the room.
			socket.join(data.gameId);
			socket.userdata.gameId = data.gameId;
			
			socket.emit(Constants.Message.CONNECTED_LOBBY, returnData);
		}
		else
			socket.emit(Constants.Message.ERROR, Constants.ErrorMessage.INVALID_LOBBY);
	});
	
	//Disconnect from lobby.
	socket.on(Constants.Message.LEAVE_LOBBY, function(){
		MasterServer.disconnectPlayer(socket);
	});
	
	//Close lobby.
	socket.on(Constants.Message.CLOSE_LOBBY, function() {
		MasterServer.closeLobby(socket);
	});
	
	//When player updates his slot info.
	socket.on(Constants.Message.UPDATE_SLOT, function(data){
		MasterServer.lobbies[socket.userdata.gameId].settings.updatePlayer(socket.userdata.username, data.color, data.ready);
		
		data.username = socket.userdata.username;
		socket.broadcast.to(socket.userdata.gameId).emit(Constants.Message.UPDATE_SLOT, data);
	});
	
	//Update lobby informations.
	socket.on(Constants.Message.UPDATE_LOBBY, function(data){
		var lobby = MasterServer.lobbies[socket.userdata.gameId];
		lobby.update(data);
		
		socket.broadcast.to(socket.userdata.gameId).emit(Constants.Message.UPDATE_LOBBY, data);
	});
	
	//Lobby to game.
	socket.on(Constants.Message.START_GAME, function(gameSettings){
		
		//Tweaks some informations.
		MasterServer.lobbies[socket.userdata.gameId].settings.maxPlayers = MasterServer.lobbies[socket.userdata.gameId].connectedPlayers;
		MasterServer.lobbies[socket.userdata.gameId].settings.validateColors();	
		MasterServer.lobbies[socket.userdata.gameId].settings.update(gameSettings);
		
		if(ioMasterServer.sockets.clients().length > 0)
		{
			var index = Math.round(Math.random()*(ioMasterServer.sockets.clients().length-1));
			var count = 0;
			
			var serverSocket = null;
			var socketId = null;
			
			for(var i in ioMasterServer.sockets.sockets)
			{
				if(count == index)
				{
					serverSocket = ioMasterServer.sockets.sockets[i];
					break;
				}
				
				count++;
			}

			//Ask specified server to create a game.
			if(serverSocket != null)
			{
				console.log('Server found : ' + serverSocket.manager.handshaken[serverSocket.id].address.address);
				serverSocket.emit(Constants.Message.START_GAME, MasterServer.lobbies[socket.userdata.gameId].settings);
			}
			else
				console.log('No server socket found');
		}
		else
			console.log('No server found');
	});
});

//Server to server.
ioMasterServer.sockets.on(Constants.Message.CONNECTION, function (socket){
	
	console.log('Server connected : ' + socket.manager.handshaken[socket.id].address.address);
	
	//Send to client ip address for their game server.
	socket.on(Constants.Message.GAME_CREATED, function(data){
		console.log('Game created : ' + data.gameId);
		
		delete MasterServer.lobbies[data.gameId];
		ioMasterClient.sockets.in(data.gameId).emit(Constants.Message.GAME_CREATED, 'http://' + data.address + ':' + Constants.Network.SERVER_PORT);
	});
});

console.log('Master server created');//Create server.
var server = http.createServer(function(req, res){});

//Port.
server.listen(Constants.Network.SERVER_PORT); //localhost

//Remove log level or adjust it to have every log in console.
var io = require('socket.io').listen(server).set('log level', 1);

//Server object.
var Server = new function(){
	this.gameList = {};
	this.address = null;
	
	this.addGame = function(settings){	
		this.gameList[settings.id] = new Game(settings);
	};
		
	this.register = function(){
		var socket = require('socket.io-client').connect(Constants.Network.ADDRESS);
		
		//Get ip address.
		var os = require('os')

		var interfaces = os.networkInterfaces();

		for (k in interfaces) {
			for (k2 in interfaces[k]) {
				var address = interfaces[k][k2];
				
				if (address.family == 'IPv4' && !address.internal)
				{
					this.address = address.address;
						break;
				}
			}
			
			if(this.address != null)
				break;
		}
		
		//Lobby to game.
		socket.on(Constants.Message.START_GAME, function(settings){
		
			console.log('Creating game... ' + Server.address);
			
			var data = {
				gameId: settings.id,
				address: Server.address
			};
			
			//Create game.
			Server.addGame(settings);
			socket.emit(Constants.Message.GAME_CREATED, data);
		});
		
		this.socket = socket;
	};
	
	//Disconnect player.
	this.disconnectPlayer = function(socket){
		console.log('Player left (' + socket.userdata.gameId + ') : ' + socket.userdata.username);
		
		var game = this.gameList[socket.userdata.gameId];
		var index = null;
		
		for(var i in game.players)
			if(game.players[i].username == socket.userdata.username)
			{
				index = i;
				break;
			}
			
		socket.broadcast.to(socket.userdata.gameId).emit(Constants.Message.DISCONNECT_PLAYER, socket.userdata.username);	
		
		if(index != null)
		{
			var disconnectingPlayer = this.gameList[socket.userdata.gameId].players[index]
			disconnectingPlayer.leave();
			io.sockets.sockets[disconnectingPlayer.id].gameId = null;
			
			delete this.gameList[socket.userdata.gameId].players[index];
			
			var hasPlayers = false;
			
			//Check if game has players.
			for(var i in this.gameList[socket.userdata.gameId].players)
				if(this.gameList[socket.userdata.gameId].players[i] != null)
				{
					hasPlayers = true;
					break;
				}
			
			//Remove game instance if empty.
			if(!hasPlayers)
			{
				this.gameList[socket.userdata.gameId].trash();
				delete this.gameList[socket.userdata.gameId];
			}
		}
	};
	
	this.register();
};

//Bind listeners on sockets.
io.sockets.on(Constants.Message.CONNECTION, function (socket){
	socket.set("heartbeat interval", 20);
	socket.set("heartbeat timeout", 60);

	console.log('Connection to client established');
		
	//Socket disconnected.
	socket.on(Constants.Message.DISCONNECT, function(){
		console.log('Disconnect : ' + socket.userdata.gameId);
		if(socket.userdata != null && socket.userdata.gameId != null && Server.gameList[socket.userdata.gameId] != null)
			Server.disconnectPlayer(socket);
	});
		
	//Send information about enemies to the connecting player.
	socket.on(Constants.Message.JOIN_GAME, function(data){
	
		console.log('Connecting player... (' + data.gameId + ') : ' + data.username);
		socket.join(data.gameId);
		
		socket.userdata = {
			gameId: data.gameId,
			username: data.username
		};
		
		var players = [];
		
		for(var i in Server.gameList[data.gameId].players)
		{
			var enemy = Server.gameList[data.gameId].players[i].toClient();
			enemy.username = Server.gameList[data.gameId].players[i].username;
			players.push(enemy);
		}
		
		var color = null;
		for(var i in Server.gameList[data.gameId].playerInfos)
			if(Server.gameList[data.gameId].playerInfos[i].username == data.username)
				color = Server.gameList[data.gameId].playerInfos[i].color-1;
		
		//Create connecting player.
		var player = new Player(socket.id, 
								data.username,
								Server.gameList[data.gameId].width*0.2*(Server.gameList[data.gameId].connectingPlayers+1), 
								Server.gameList[data.gameId].spawnY, 
								color,
								Server.gameList[data.gameId]);
		
		var playerToClient = player.toClient();
		playerToClient.username = data.username;
		
		//Send last player connected.
		players.push(playerToClient);
		
		//Value initiating a player.
		var initData = {
			players: players
		};
		
		Server.gameList[data.gameId].players[socket.id] = player;
		Server.gameList[data.gameId].connectingPlayers++;

		//Start initiation.
		if(Server.gameList[data.gameId].connectingPlayers == Server.gameList[data.gameId].maxPlayers)
			io.sockets.in(data.gameId).emit(Constants.Message.INIT, initData);
	});
	
	//Disconnect player.
	socket.on(Constants.Message.DISCONNECT_PLAYER, function(){
		Server.disconnectPlayer(socket);
	});

	//When player ready, refresh information of his opponents about his existence.
	socket.on(Constants.Message.PLAYER_READY, function(){
		var gameId = socket.userdata.gameId;
		
		console.log('Player ready! (' + gameId + ')');
		
		Server.gameList[gameId].connectedPlayers++;		
		
		var player = Server.gameList[gameId].players[socket.id].toClient();
		player.username = Server.gameList[gameId].players[socket.id].username;
				
		if(Server.gameList[gameId].connectedPlayers == Server.gameList[gameId].maxPlayers)
		{
			console.log('Game launching...');
			
			//Init physic world.
			Server.gameList[gameId].createWorld();
			Server.gameList[gameId].launch();
		
			var data = {
				goal: Server.gameList[gameId].goal.toClient(),
				width: Server.gameList[gameId].width,
				height: Server.gameList[gameId].height,
				worldType: Server.gameList[gameId].worldType
			};
			
			data.goal.type = Server.gameList[gameId].goal.type;
			
			console.log('Game launched!');
			io.sockets.in(gameId).emit(Constants.Message.LAUNCH, data);
			
			//Launch warmup!
			console.log('WARMUP');
			(function(gameId){
				console.log('...');
				setTimeout(function(){ 
					console.log('GO!');
					io.sockets.in(gameId).emit(Constants.Message.GO); 
				}, Constants.Warmup.PHASE_TIME*1000);
			})(gameId);
			
			Server.gameList[gameId].ready = true;
		}
	});
	
	socket.on(Constants.Message.NEXT_BLOCK, function(command){
		//Do not override if server has given a special block to player (as a Spawn Block).
		if(!Server.gameList[socket.userdata.gameId].players[socket.id].hasGivenBlock)
			Server.gameList[socket.userdata.gameId].players[socket.id].currentBlock = command;
	});
	
	//Retrieving information from players.
	socket.on(Constants.Message.PUSH, function(inputs){
		if(socket.userdata.gameId != null)
			Server.gameList[socket.userdata.gameId].push(inputs, socket.id);
	});
});

console.log('Server created');var FloatingBall = function(x, y, game){		this.currentGame = game;	this.x = x;	this.y = y;		this.velocity = 0;	this.orbitTime = 0;		this.cooldown = 0;	this.stuckTime = 0;		this.jumpPressed = false;		this.type = Enum.WinningGoal.Type.FLOATING_BALL;		this.spikeStats = {		speed: Constants.DeathZone.EnergySpike.SPEED * this.y,		direction: Enum.Direction.UP,		distance: this.y	};		//Make a static body.	this.body = new chipmunk.Body(Infinity, Infinity);	this.body.setPos(new chipmunk.Vect(this.x, this.y));		//Assign custom data to body.	this.body.userdata = {		type: Enum.UserData.Type.WINNING_GOAL,		object: this	};		//Create a shape associated with the body.	this.shape = this.currentGame.space.addShape(chipmunk.BoxShape(this.body, Constants.WinningGoal.FloatingBall.WIDTH, Constants.WinningGoal.FloatingBall.HEIGHT));	this.shape.setCollisionType(Enum.Collision.Type.WINNING_GOAL);	this.shape.sensor = true;};FloatingBall.prototype.update = function(inputs){		if(this.stuckTime <= 0)	{		var nextX = 0;				if(inputs.right)			nextX += Constants.WinningGoal.FloatingBall.SPEED;		if(inputs.left)			nextX -= Constants.WinningGoal.FloatingBall.SPEED;					if(nextX != 0)		{			//Turn.			if((nextX > 0 && this.velocity < 0) ||(nextX < 0 && this.velocity > 0))				this.velocity *= Constants.WinningGoal.FloatingBall.TURN_FRICTION_FACTOR;							this.velocity += nextX;		}		else		{			if(this.velocity != 0)			{				//Artificial friction.				if(Math.abs(this.velocity) < Constants.WinningGoal.FloatingBall.SPEED*0.25)					this.velocity = 0;				else					this.velocity *= Constants.WinningGoal.FloatingBall.FRICTION_FACTOR;			}		}	}		//Trigger action on jump command.	if(inputs.jump && this.cooldown <= 0 && !this.jumpPressed)	{		this.launch();		this.cooldown = Constants.DeathZone.EnergySpike.COOLDOWN;		this.jumpPressed = true;	}	if(!inputs.jump && this.jumpPressed)		this.jumpPressed = false;			if(this.cooldown > 0)		this.cooldown -= this.currentGame.dt;		if(this.stuckTime > 0)		this.stuckTime -= this.currentGame.dt;		//Velocity can't be higher than max speed.	if(this.velocity < -(Constants.WinningGoal.FloatingBall.MAX_SPEED))		this.velocity = -(Constants.WinningGoal.FloatingBall.MAX_SPEED);	if(this.velocity > Constants.WinningGoal.FloatingBall.MAX_SPEED)		this.velocity = Constants.WinningGoal.FloatingBall.MAX_SPEED;		//Calculate ball's orbit.	this.orbitTime += Constants.WinningGoal.FloatingBall.ORBIT_SPEED;	var nextY = Math.sin(this.orbitTime)*Constants.WinningGoal.FloatingBall.ORBIT_RADIUS;		if(this.orbitTime >= 360)		this.orbitTime = 0;		this.translate(this.velocity, nextY);};FloatingBall.prototype.launch = function(){	this.currentGame.managers.DeathZoneManager.launch(new Spike(this.currentGame.deathZoneSequence,													  this.x, 													  0, 													  Constants.DeathZone.EnergySpike.WIDTH, 													  this.y, 													  this.currentGame.winner.id,													  Enum.DeathZone.Type.ENERGY_SPIKE,													  this.spikeStats, 													  this.currentGame));		//Resets velocity and immobilizes the curse ball for a moment.	this.velocity = 0;	this.stuckTime = Constants.WinningGoal.FloatingBall.STUCK_TIME;		io.sockets.in(this.currentGame.id).emit(Constants.Message.GOAL_ACTION, Enum.Action.Type.SUMMONING);};FloatingBall.prototype.translate = function(velX, velY) {	this.x += velX;	var tmpY = this.y + velY;		if(this.x > this.currentGame.width - Constants.WinningGoal.FloatingBall.WIDTH*0.5)	{		this.x = this.currentGame.width - Constants.WinningGoal.FloatingBall.WIDTH*0.5;		this.velocity = 0;	}	else if(this.x < Constants.WinningGoal.FloatingBall.WIDTH*0.5)	{		this.x = Constants.WinningGoal.FloatingBall.WIDTH*0.5;		this.velocity = 0;	}			this.body.setPos(new chipmunk.Vect(this.x, tmpY));};FloatingBall.prototype.getPosition = function(){	return this.body.getPos();};FloatingBall.prototype.toClient = function(){	return {		x: this.getPosition().x,		y: this.getPosition().y	};};
var Missile = function(id, ownerId, blockId, x, y, type, stats, game){
	
	this.currentGame = game;
	
	this.stillExists = true;
	this.id = id;

	this.ownerId = ownerId;
	this.blockId = blockId;
	
	this.x = x;
	this.y = y;
	this.velocity = {x:0, y:0};
	
	this.enabled = true;
	this.width = null;
	this.height = null;
	
	this.type = type;
	this.stats = stats;
	
	this.body = new chipmunk.Body(Infinity, Infinity);
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
	
	var userDataType = null;
	
	//Find good type for association.
	switch(this.type)
	{
		case Enum.DeathZone.Type.FIREBALL:
			userDataType = Enum.UserData.Type.FIREBALL;
			
			this.stats.distance = Constants.DeathZone.Fireball.DISTANCE_MIN + (Constants.DeathZone.Fireball.DISTANCE_MIN*this.stats.power);
			this.stats.speed = Constants.DeathZone.Fireball.SPEED_MIN + (Constants.DeathZone.Fireball.SPEED_STEP*this.stats.power);
			
			this.originalX = this.x;
			this.originalY = this.y;
			
			this.width = Constants.DeathZone.Fireball.WIDTH;
			this.height = Constants.DeathZone.Fireball.HEIGHT;
			
			break;
	}
	
	//Assign custom data to body.
	this.body.userdata = {
		type: userDataType,
		object: this
	};
	
	//Create a shape associated with the body.
	this.shape = this.currentGame.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.shape.setCollisionType(Enum.Collision.Type.DEATH_ZONE);
	this.shape.sensor = true;
};

Missile.prototype.move = function(){
	
	var distX = (this.x + this.velocity.x - this.originalX);
	var distY = (this.y + this.velocity.y - this.originalY);
	
	//Travel maximum possible distance.
	if((distX*distX)+(distY*distY) < this.stats.distance*this.stats.distance)
	{
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	}
	else
	{
		var rad = 0;
		
		switch(this.stats.direction)
		{
			case Enum.Direction.UP:
				rad = 0;
				break;
			case Enum.Direction.LEFT:
				rad = Math.PI*1.5;
				break;
			case Enum.Direction.DOWN:
				rad = Math.PI;
				break;
			case Enum.Direction.RIGHT:
				rad = Math.PI*0.5;
				break;
		}

		this.x = this.originalX + (this.stats.distance + 1)*Math.sin(rad);
		this.y = this.originalY + (this.stats.distance + 1)*Math.cos(rad);
	}
	
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
};

Missile.prototype.toClient = function(){
	return {
		x: this.x,
		y: this.y,
		id: this.id
	};
};

Missile.prototype.explode = function(){

	//Remove physical presence.
	this.currentGame.space.removeShape(this.shape);
		
	//Remove from game.
	for(var i in this.currentGame.deathZones)
		if(this.currentGame.deathZones[i] != null && this.currentGame.deathZones[i].id == this.id)
			delete this.currentGame.deathZones[i];
	
	var data = {
		id: this.id
	};
	
	//Send info to client.
	this.stillExists = false;
	io.sockets.in(this.currentGame.id).emit(Constants.Message.DELETE_DEATHZONE, data);
};

Missile.prototype.update = function(){

	var distX = (this.x - this.originalX);
	var distY = (this.y - this.originalY);
				
	//If distance has been reached or surpassed, missile is deleted.
	if((distX*distX)+(distY*distY) >= this.stats.distance*this.stats.distance)
		this.explode();
	
	if(this.stillExists)
	{
		var push = {x:0, y:0};
		var rad = 0;
		
		switch(this.stats.direction)
		{
			case Enum.Direction.UP:
				rad = 0;
				break;
			case Enum.Direction.LEFT:
				rad = Math.PI*1.5;
				break;
			case Enum.Direction.DOWN:
				rad = Math.PI;
				break;
			case Enum.Direction.RIGHT:
				rad = Math.PI*0.5;
				break;
		}
		
		if(this.stats.acceleration != null)
		{
			var tmpVelY = this.velocity.y;
			var tmpVelX = this.velocity.x;
			
			tmpVelX += this.stats.acceleration.x;
			tmpVelY += this.stats.acceleration.y;
			
			if((tmpVelX*tmpVelX)+(tmpVelY*tmpVelY) > (this.stats.maxspeed*this.stats.maxspeed))
			{
				this.velocity.x = this.stats.maxspeed*Math.sin(rad);
				this.velocity.y = this.stats.maxspeed*Math.cos(rad);
			}
			else
			{
				this.velocity.x += this.stats.acceleration.x*Math.sin(rad);
				this.velocity.y += this.stats.acceleration.y*Math.cos(rad);
			}
		}
		else
		{		
			this.velocity.x = this.stats.speed*Math.sin(rad);
			this.velocity.y = this.stats.speed*Math.cos(rad);
		}
			
		this.move();
	}
};


var DeathZoneManager = function(game){
	this.currentGame = game;
};

DeathZoneManager.prototype.launch = function(deathZone){
	
	this.currentGame.deathZoneSequence++;
	this.currentGame.deathZones.push(deathZone);
	
	var data = {
		id: deathZone.id,
		type: deathZone.type,
		x: deathZone.x,
		y: deathZone.y
	};
	
	//Insert specific custom data.
	switch(deathZone.type){
		case Enum.DeathZone.Type.ENERGY_SPIKE:
			data.finalX = deathZone.finalX;
			data.finalY = deathZone.finalY;
			break;
		case Enum.DeathZone.Type.FIREBALL:
			data.direction = deathZone.stats.direction;
			break;
	}
	
	io.sockets.in(this.currentGame.id).emit(Constants.Message.NEW_DEATHZONE, data);
};
var NpcManager = function(game){
	this.currentGame = game;
};

NpcManager.prototype.add = function(npc){
	
	this.currentGame.npcSequence++;
	this.currentGame.npcs.push(npc);
	
	var data = {
		id: npc.id,
		type: npc.type,
		x: npc.x,
		y: npc.y,
		facing: npc.facing
	};
	
	io.sockets.in(this.currentGame.id).emit(Constants.Message.NEW_NPC, data);
};
var BlockManager = function(game){
	this.currentGame = game;
};

BlockManager.prototype.launch = function(block){
			
	this.currentGame.blocks.push(block);
	block.launch();
	
	this.currentGame.blockSequence++;		
	
	//Emit the new block to all players.
	io.sockets.in(this.currentGame.id).emit(Constants.Message.NEW_BLOCK, block.toClient());
};var Spike = function(id, x, y, width, height, ownerId, type, stats, game){		this.currentGame = game;		this.stillExists = true;	this.mustMove = true;		this.enabled = true;	this.type = type;	this.stats = stats;		this.ownerId = ownerId;	this.id = id;	this.distance = stats.distance;		//Get original X and Y.	var degree = null;	switch(stats.direction)	{		case Enum.Direction.UP:			degree = 0;			break;		case Enum.Direction.LEFT:			degree = 270;			break;		case Enum.Direction.DOWN:			degree = 180;			break;		case Enum.Direction.RIGHT:			degree = 90;			break;	}		this.x = x - (this.distance*0.5*Math.sin(degree));	this.y = y - (this.distance*0.5*Math.cos(degree));		this.finalX = this.x + (this.distance*Math.sin(degree));	this.finalY = this.y + (this.distance*Math.cos(degree));		this.originalX = this.x;	this.originalY = this.y;		this.velocity = {x:0, y:0};		this.width = width;	this.height = height;		this.body = new chipmunk.Body(Infinity, Infinity);	this.body.setPos(new chipmunk.Vect(this.x, this.y));		var userDataType = null;		//Find good type for association.	switch(this.type)	{		case Enum.DeathZone.Type.ENERGY_SPIKE:			userDataType = Enum.UserData.Type.ENERGY_SPIKE;			break;	}		//Assign custom data to body.	this.body.userdata = {		type: userDataType,		object: this	};		//Create a shape associated with the body.	this.shape = this.currentGame.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));	this.shape.setCollisionType(Enum.Collision.Type.DEATH_ZONE);	this.shape.sensor = true;};Spike.prototype.move = function(){		this.x += this.velocity.x;	this.y += this.velocity.y;		this.body.setPos(new chipmunk.Vect(this.x, this.y));};Spike.prototype.toClient = function(){	return {		x: this.x,		y: this.y,		id: this.id	};};Spike.prototype.explode = function(){	//Remove physical presence.	this.currentGame.space.removeShape(this.shape);			//Remove from game.	for(var i in this.currentGame.deathZones)		if(this.currentGame.deathZones[i] != null && this.currentGame.deathZones[i].id == this.id)			delete this.currentGame.deathZones[i];		var data = {		id: this.id	};		//Send info to client.	this.stillExists = false;	io.sockets.in(this.currentGame.id).emit(Constants.Message.DELETE_DEATHZONE, data);};Spike.prototype.endProcess = function(){	switch(this.type)	{		case Enum.DeathZone.Type.ENERGY_SPIKE:						for(var i in this.currentGame.players)			{				if(this.currentGame.players[i] != null && this.currentGame.players[i].isAlive && !this.currentGame.players[i].isRemoved)				{					var factor = 1;										if(this.currentGame.players[i].body.getPos().x < this.x)						factor = -1;											this.currentGame.players[i].body.applyImpulse(new chipmunk.Vect(factor*Constants.DeathZone.EnergySpike.IMPULSE_X, 																		Constants.DeathZone.EnergySpike.IMPULSE_Y),													  new chipmunk.Vect(0,0));				}			}						break;	}};Spike.prototype.update = function(){	if(this.stillExists && this.mustMove)	{		var push = {x:0, y:0};		var degree = 0;				switch(this.stats.direction)		{			case Enum.Direction.UP:				degree = 0;				break;			case Enum.Direction.LEFT:				degree = 270;				break;			case Enum.Direction.DOWN:				degree = 180;				break;			case Enum.Direction.RIGHT:				degree = 90;				break;		}				if(this.stats.acceleration != null)		{			var tmpVelY = this.velocity.y;			var tmpVelX = this.velocity.x;						tmpVelX += this.stats.acceleration.x;			tmpVelY += this.stats.acceleration.y;						if((tmpVelX*tmpVelX)+(tmpVelY*tmpVelY) > (this.stats.maxspeed*this.stats.maxspeed))			{				this.velocity.x = this.stats.maxspeed*Math.sin(degree);				this.velocity.y = this.stats.maxspeed*Math.cos(degree);			}			else			{				this.velocity.x += this.stats.acceleration.x*Math.sin(degree);				this.velocity.y += this.stats.acceleration.y*Math.cos(degree);			}		}		else		{			this.velocity.x = this.stats.speed*Math.sin(degree);			this.velocity.y = this.stats.speed*Math.cos(degree);		}				var tmpX = this.x + this.velocity.x;		var tmpY = this.y + this.velocity.y;				var distX = (tmpX - this.originalX);		var distY = (tmpY - this.originalY);							//If distance has been reached or surpassed, spike stops moving.		if((distX*distX)+(distY*distY) >= this.stats.distance*this.stats.distance)		{			this.mustMove = false;			this.x = this.finalX;			this.y = this.finalY;						//Set new position and trigger effect when spike is set.			this.body.setPos(new chipmunk.Vect(this.x, this.y));			this.endProcess();		}			else			this.move();	}};var Jaw = function(id, parent, x, y, count, width, height, game){		this.currentGame = game;		this.stillExists = true;			this.enabled = true;	this.parent = parent;	this.id = id;		this.blockId = this.parent.id;	this.ownerId = this.parent.ownerId;		this.type = Enum.DeathZone.Type.JAW;	this.count = count;			//Position relative to parent.	this.x = x;	this.y = y;	this.width = width;	this.height = height;		this.body = new chipmunk.Body(Infinity, Infinity);	this.body.setPos(new chipmunk.Vect(this.parent.x + this.x, this.parent.y + this.y));			//Assign custom data to body.	this.body.userdata = {		type: Enum.UserData.Type.JAW,		object: this	};		//Create a shape associated with the body.	this.shape = this.currentGame.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));	this.shape.setCollisionType(Enum.Collision.Type.DEATH_ZONE);	this.shape.sensor = true;};Jaw.prototype.toClient = function(){	return {		x: this.parent.x + this.x,		y: this.parent.y + this.y,		id: this.id	};};Jaw.prototype.explode = function(){	//Remove physical presence.	this.currentGame.space.removeShape(this.shape);			var data = {		id: this.id	};			//Remove from game.	for(var i in this.currentGame.deathZones)		if(this.currentGame.deathZones[i] != null && this.currentGame.deathZones[i].id == this.id)			delete this.currentGame.deathZones[i];		//Send info to client.	this.stillExists = false;	io.sockets.in(this.currentGame.id).emit(Constants.Message.DELETE_DEATHZONE, data);};Jaw.prototype.update = function(){	if(this.stillExists)	{		this.body.setPos(new chipmunk.Vect(this.parent.x + this.x, this.parent.y + this.y));				if(this.parent.isStatic)			this.explode();	}	else		this.explode();};
var PeskyBox = function(id, x, y, width, height, speed, duration, maxFleeTime, target, game){
	
	this.id = id;
	this.x = x;
	this.y = y;
	
	this.width = width;
	this.height = height;
	
	this.duration = duration;
	
	this.facing = Enum.Facing.LEFT;
	this.type = Enum.NPC.Type.PESKY_BOX;
	
	this.velocity = {
		x: 0,
		y: 0
	};
	
	this.fleeTimer = 0;
	this.maxFleeTime = maxFleeTime;
	
	this.toBeDestroyed = false;
	
	this.speed = speed;
	
	this.target = target;
	this.currentGame = game;
	
	//Create body.
	this.body = new chipmunk.Body(Infinity, Infinity);
	this.body.setPos(new chipmunk.Vect(this.x, this.y));
	
	//Assign custom data to body.
	this.body.userdata = {
		type: Enum.UserData.Type.PESKY_BOX,
		object: this
	};
	
	//Create a shape associated with the body.
	this.shape = this.currentGame.space.addShape(chipmunk.BoxShape(this.body, this.width, this.height));
	this.shape.setCollisionType(Enum.Collision.Type.NPC);
	this.shape.sensor = true;
};

PeskyBox.prototype.toClient = function(){

	return {
		id: this.id,
		x: this.x,
		y: this.y,
		facing: this.facing
	};
};

PeskyBox.prototype.update = function(){
	
	if(this.toBeDestroyed)
		this.explode();
	else
	{
		var nextX = 0;
		var nextY = 0;
	
		if(this.fleeTimer > 0)
		{
			nextX = this.speed * (this.x < this.target.x ? -1 : 1);
			nextY = this.speed * (this.y < this.target.y ? -1 : 1);
			
			this.fleeTimer -= this.currentGame.dt;
		}
		else
		{
			nextX = (this.target.x - this.x)/25;
			nextY = (this.target.y - this.y)/25;
			
			if(Math.abs(nextX) > this.speed)
				nextX = this.speed * (this.x < this.target.x ? 1 : -1);
				
			if(Math.abs(nextY) > this.speed)
				nextY = this.speed * (this.y < this.target.y ? 1 : -1);
		}
		
		this.velocity.x += nextX;
		this.velocity.y += nextY;
		
		this.velocity.x *= 0.96;
		this.velocity.y *= 0.96;
		
		var pos = this.body.getPos();
		this.body.setPos(new chipmunk.Vect(pos.x + this.velocity.x, pos.y + this.velocity.y));
		pos = this.body.getPos();
		
		this.x = pos.x;
		this.y = pos.y;
				
		this.duration -= this.currentGame.dt;
		
		if(this.duration <= 0)
			this.toBeDestroyed = true;
	}
	
};

PeskyBox.prototype.explode = function(){

	//Remove physical presence.
	this.currentGame.space.removeShape(this.shape);
		
	//Remove from game.
	for(var i in this.currentGame.npcs)
		if(this.currentGame.npcs[i] != null && this.currentGame.npcs[i].id == this.id)
			delete this.currentGame.npcs[i];
	
	var data = {
		id: this.id
	};
	
	//Send info to client.
	this.stillExists = false;
	io.sockets.in(this.currentGame.id).emit(Constants.Message.DELETE_NPC, data);
};