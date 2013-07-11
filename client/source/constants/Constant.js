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
	World: {
		OFFSET: 4,
		Floor: {
			Z_INDEX: 50
		},
		Wall: {
			Z_INDEX: 50
		},
		BlackBox: {
			Z_INDEX: 49
		},
		Background: {
			Z_INDEX: -1000
		}
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
			
			Z_INDEX: 40,
			HEIGHT: 800
		},
		Missile: {
			Z_INDEX: 40
		}
	},
	WinningGoal: {
		FloatingBall: {
			Z_INDEX: 55
		}
	},
	EndScreen: {
		Z_INDEX: 1000
	},
	HUD: {
		ENDSCREEN_Z_INDEX: -1000,
		Z_INDEX: 1000,
		Inventory: {
			Current: {
				Z_INDEX: 1002,
				SCALE: 1.6
			},
			Next: {
				Z_INDEX: 1001,
				SCALE: 1.2
			}
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
		Z_INDEX: 60,
		DoubleJump: {
			OFFSET: 50
		},
		BlockLanding: {
			OFFSET: 2,
			TIMER: 0.05
		},
		LightBall: {
			ORBIT_SPEED: 5,
			ORBIT_RADIUS: 8,
			Z_INDEX: 56,
		}
	},
	Sound: {
		Effect: {
			VOLUME: 0.5
		},
		File: {
			Block: {
				LANDING: 'block_land',
				SWAP_COLOR: 'block_swapColor'
			},
			Player: {
				DEATH: 'player_death'
			}
		}
	}
};