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
	UserData: {
		Type: {
			PLAYER: 0,
			BLOCK: 1,
			WINNING_GOAL: 2,
			RAYBALL: 3
		}
	},
	Block: {
		Type: {
			NEUTRAL: 0,
			COLORED: 1,
			SPAWN: 2,
			SKILLED: 3
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
	Collision: {
		Type: {
			STATIC: 0,
			PLAYER: 1,
			GROUND_SENSOR: 2,
			BLOCK: 3,
			DROP_SENSOR: 4,
			WINNING_GOAL: 5,
			DEATH_ZONE: 6
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
			DOUBLE_JUMPING: 4
		}
	},
	Missile: {
		Type: {
			RAYBALL: 0
		}
	}
};

//Constants
var Constants = {
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
		JUMP_COOLDOWN: 0.1,
		JUMP_POWER: 1350,
		RUN_POWER_ONGROUND: 1000,
		RUN_POWER_OFFGROUND: 15,
		WIDTH: 40,
		HEIGHT: 40,
		MAX_SPEED_FACTOR: 0.01
	},
	Block: {
		WIDTH: 80,
		HEIGHT: 30,
		LAUNCHING_SPEED: -500,
		SPAWN_MAXLAUNCHING_Y: 500,
		SPAWN_MAXLAUNCHING_X: 500,
		Restriction: {
			SPAWN_TIMER: 6
		}
	},
	
	WinningGoal: {
		OFFSET_Y: 600,
		PHASE_TIME: 35,
		FLOATING_BALL: {
			WIDTH: 90,
			HEIGHT: 90,
			SPEED: 1,
			MAX_SPEED: 30,
			FRICTION_FACTOR: 0.98,
			ORBIT_RADIUS: 20,
			ORBIT_SPEED: 0.05
		}
	},
	Missile: {
		RAYBALL: {
			SPEED: 50,
			WIDTH: 45,
			HEIGHT: 45,
			COOLDOWN: 0.5
		}
	},
	KillCommand: {
		Time: {
			FIRST_STEP: 5,
			SECOND_STEP: 10
		}
	},
	Message: {
		NEXT_BLOCK: 'nextBlock',
		NEW_BLOCK: 'newBlock',
		SEND_BLOCK: 'sendBlock',
		DELETE_BLOCK: 'deleteBlock',
		PULL: 'pull',
		PUSH: 'push',
		INIT: 'init',
		CONNECTED: 'connected',
		CONNECTION: 'connection',
		NEW_PLAYER: 'newPlayer',
		PLAYER_KILLED: 'playerKilled',
		PLAYER_SPAWNED: 'playerSpawned',
		LAUNCH: 'launch',
		KILL_COMMAND: 'killCommand',
		AT_GOAL: 'atGoal',
		WIN: 'win',
		DELETE_MISSILE: 'deleteMissile',
		NEW_MISSILE: 'newMissile'
	}
};