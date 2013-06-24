var Constants = {
	Network: {
		ADDRESS: 'http://localhost:80'
	},
	Block: {
		Percent: {
			STARTING_NEUTRAL: 25,
			LOST_FOREACH_ENEMY: 5
		}
	},
	Floor: {
		Z_INDEX: 50
	},
	Wall: {
		Z_INDEX: 50
	},
	BlackBox: {
		Z_INDEX: 49
	},
	KillCommand: {
		Time: {
			APPARITION: 3,
			FIRST_STEP: 5
		}		
	},
	Camera: {
		HIGHER: 75,
		SPEED_X: 0.00001,
		SPEED_Y: 0.000005,
		SPEED_ZOOM: 0.2,
		UPWARD_FACTOR: 0.3,
		CONTAINER_FACTOR_X: 1.65,
		CONTAINER_FACTOR_Y: 2
	},
	DeathZone: {
		EnergySpike: {
			LIGHTBALL_ORBIT_SPEED: 5,
			LIGHTBALL_ORBIT_RADIUS: 8,
			LIGHTBALL_Z_INDEX: 51,
			Z_INDEX: 40,
			HEIGHT: 800
		},
		Missile: {
			Z_INDEX: 40
		}
	},
	WinningGoal: {
		FloatingBall: {
			Z_INDEX: 50
		}
	},
	EndScreen: {
		Z_INDEX: 1000
	},
	HUD: {
		ENDSCREEN_Z_INDEX: -1000,
		Z_INDEX: 1000,
		Inventory: {
			CURRENT_Z_INDEX: 1002,
			NEXT_Z_INDEX: 1001
		}
	},
	Message:{
		NEXT_BLOCK: 'nextBlock',
		NEW_BLOCK: 'newBlock',
		SEND_BLOCK: 'sendBlock',
		DELETE_BLOCK: 'deleteBlock',
		PULL: 'pull',
		PUSH: 'push',
		INIT: 'init',
		CONNECTED: 'connected',
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
		BLOCK_ACTION: 'blockAction'
	},
	Effect: {
		Z_INDEX: 10,
		DoubleJump: {
			OFFSET: 50
		},
		BlockLanding: {
			OFFSET: 2,
			TIMER: 0.05
		}
	}
};