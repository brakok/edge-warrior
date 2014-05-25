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
		TIME_STEP: 0.025,
		FRICTION_FACTOR_ONGROUND: 0.9,
		SLEEP_TIME_THRESHOLD: 0.075
	},
	Spawn: {
		Limit: {
			OFFSET: 150
		},
		MAXLAUNCHING_Y: 850,
		MAXLAUNCHING_X: 2200,
		STUN_TIMER: 0.4
	},
	Player: {
		INITIAL_SPAWN_Y: 100,
		JUMP_COOLDOWN: 0.1,
		JUMP_POWER: 2350,
		RUN_POWER_ONGROUND: 1750,
		WIDTH: 30,
		HEIGHT: 50,
		MAX_SPEED_FACTOR: 245,
		WRONG_SIDE_MINUS_FACTOR: 0.5,
		PickAxe:  {
			TIMER: 15,
			VEL_X: 6,
			VEL_Y: 2,
			OFFSET_X: 40,
			OFFSET_Y: 15,
			DISTANCE: 100,
			WIDTH: 35,
			HEIGHT: 35,
			LIMIT: 2
		}
	},
	Block: {
		WIDTH: 80,
		HEIGHT: 30,
		LANDING_TIMER: 0.01,
		LAUNCH_LAND_TIMER: 0.1,
		LAUNCHING_SPEED: -400,
		LAND_SAFE_TIMER: 0.3,
		Restriction: {
			SPAWN_TIMER: 6
		}
	},
	World: {
		Church: {
			GOAL_OFFSET_Y: -400,
			Event: {
				TIMER_MIN: 15,
				TIMER_RANGE: 3
			}
		},
		Alien: {
			GOAL_OFFSET_Y: -150,
			Event: {
				TIMER_MIN: 5,
				TIMER_RANGE: 1,
				EYES_TIMER: 7,
				STUCK_DURATION: 4,
				ALLOWED_SPEED: 5
			}
		},
		Pit: {
			GOAL_OFFSET_Y: 0,
			Event: {
				TIMER_MIN: 25,
				TIMER_RANGE: 10
			}
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
			PUSH_X: 1250,
			PUSH_X_STEP: 25,
			PUSH_Y: 1250,
			PUSH_Y_STEP: 25
		},
		SandSpirit: {
			WIDTH: 30,
			HEIGHT: 30,
			SPEED_X: 0.9,
			SPEED_Y: 1,
			DURATION: 5,
			FRICTION_FACTOR: 0.95,
			SLOWDOWN_DISTANCE_FACTOR: 100,
			MASS_FACTOR: 3
		}
	},
	Trigger: {
		Deflector: {
			REL_Y: 75,
			DURATION: 4.5,
			DURATION_STEP: 2,
			WIDTH: 70,
			HEIGHT: 70,
			PUSH: 350,
			PUSH_STEP: 35,
			MAX_PUSH_Y_FACTOR: 0.3,
			PRESENCE_TIMER: 0.5,
			STUN_TIME: 0.3
		},
		TimeZone: {
			DURATION: 2.5,
			DURATION_STEP: 1,
			WIDTH: 250,
			HEIGHT: 250
		},
		GravityBeam: {
			WIDTH: 150,
			HEIGHT: 1400,
			DURATION: 8,
			MAX_LIFT_HEIGHT: 150,
			TIME_ALLOWED: 2.5,
			MAX_VEL_Y: 75,
			IMPULSE: 150,
			COOLDOWN: 2.5
		}
	},
	WinningGoal: {
		PHASE_TIME: 8,
		LOWER_GOAL_FACTOR: 0.1,
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
			IMPULSE_Y: 1500,
			STUN_TIME: 0.25
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
		CHAT: 'chat',
		NEW_TRIGGER: 'newTrigger',
		DELETE_TRIGGER: 'deleteTrigger',
		ACTION_TRIGGER: 'actionTrigger',
		ACTION_NPC: 'actionNpc'
	},
	ErrorMessage: {
		INVALID_LOBBY: 'Lobby is invalid. Full or game already started.'
	},
	Regex: {
		EMAIL: /^\S{0,}@\S{0,}[.]{1}[a-zA-Z0-9]{2,}$/
	}
};