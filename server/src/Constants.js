//Constants
var Constants = {
	Game: {
		MAX_PLAYERS: 4
	},
	Physic: {
		GRAVITY: -150,
		FRICTION: 0.97,
		MASS_PLAYER: 10,
		MASS_BLOCK: 999999,
		MASS_BLOCK_STATIC: 999999999999,
		TIME_STEP: 1/60,
		FRICTION_FACTOR_ONGROUND: 0.85,
		TURN_FRICTION_FACTOR: 0.05
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
		LAUNCHING_SPEED: -500,
		SPAWN_MAXLAUNCHING_Y: 500,
		SPAWN_MAXLAUNCHING_X: 500,
		Restriction: {
			SPAWN_TIMER: 6
		}
	},
	WinningGoal: {
		OFFSET_Y: -100,
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
			SPEED: 4,
			WIDTH: 30,
			COOLDOWN: 1,
			IMPULSE_X: 10000,
			IMPULSE_Y: 300
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
		GO: 'go'
	}
};