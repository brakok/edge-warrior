//Constants
var Constants = {
	Game: {
		MAX_PLAYERS: 4,
		UNIT_TIMER: 1,
		OFFSET_Y_ALLOWED_FOR_PLAYERS: 250
	},
	Database: {
		ADDRESS: 'http://127.0.0.1'
	},
	Physic: {
		GRAVITY: -500,
		FRICTION: 0.97,
		MASS_PLAYER: 10,
		MASS_BLOCK: 999999,
		MASS_BLOCK_STATIC: 999999999999,
		TIME_STEP: 0.017,
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
		JUMP_POWER: 2350,
		RUN_POWER_ONGROUND: 2500,
		RUN_POWER_OFFGROUND: 100,
		WIDTH: 30,
		HEIGHT: 50,
		MAX_SPEED_FACTOR: 0.0000001,
		MAX_VELOCITY: 175,
		VELOCITY_FACTOR: 0.4,
		SPEED_LOWER_LIMIT: 100,
		PickAxe:  {
			TIMER: 5,
			VEL_X: 6,
			VEL_Y: 2.5,
			OFFSET_X: 15,
			OFFSET_Y: 15,
			DISTANCE: 100,
			WIDTH: 30,
			HEIGHT: 30,
			LIMIT: 2
		}
	},
	Block: {
		WIDTH: 80,
		HEIGHT: 30,
		LANDING_TIMER: 0.01,
		LAUNCH_LAND_TIMER: 0.1,
		LAUNCHING_SPEED: -400,
		SPAWN_MAXLAUNCHING_Y: 850,
		SPAWN_MAXLAUNCHING_X: 2200,
		LAND_SAFE_TIMER: 0.3,
		Restriction: {
			SPAWN_TIMER: 6
		}
	},
	NPC: {
		PeskyBox: {
			WIDTH: 60,
			HEIGHT: 60,
			SPEED: 1.3,
			SPEED_STEP: 0.3,
			DURATION: 5,
			DURATION_STEP: 1.5,
			FLEE_TIMER: 0.175,
			FLEE_STEP: 0.04,
			SLOWDOWN_DISTANCE_FACTOR: 25,
			FRICTION_FACTOR: 0.93,
			PUSH_X: 900,
			PUSH_X_STEP: 150,
			PUSH_Y: 900,
			PUSH_Y_STEP: 150
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
			SPEED_MIN: 8,
			SPEED_STEP: 3,
			WIDTH: 45,
			HEIGHT: 45,
			DISTANCE_MIN: 150,
			DISTANCE_STEP: 85
		},
		EnergySpike: {
			SPEED: 0.007,
			WIDTH: 30,
			COOLDOWN: 1,
			IMPULSE_X: 4500,
			IMPULSE_Y: 1500
		},
		Jaw: {
			WIDTH: 120,
			HEIGHT: 30,
			INITIAL_COUNT: 4,
			STEP: 6
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
		SERVER_TO_SERVER_PORT: 1060,
		REFRESH_PRESENCE: 2000,
		CHECK_GAME_SERVER: 5000,
		SERVER_THRESHOLD: 15000
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
		NEW_NPC: 'newNPC',
		REFRESH_STATS: 'refreshStats',
		GET_STATS: 'getStats',
		KEEP_SERVER_ALIVE: 'keepServerAlive',
		HANDSHAKE_INFO: 'handshakeInfo',
		CHAT: 'chat'
	},
	ErrorMessage: {
		INVALID_LOBBY: 'Lobby is invalid. Full or game already started.'
	},
	Regex: {
		EMAIL: /^\S{0,}@\S{0,}[.]{1}[a-zA-Z0-9]{2,}$/
	}
};