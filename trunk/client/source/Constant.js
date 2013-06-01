var Constants = {
	Network: {
		ADDRESS: 'http://192.168.2.18:80'
	},
	Block: {
		Percent: {
			STARTING_NEUTRAL: 25,
			LOST_FOREACH_ENEMY: 5
		}
	},
	KillCommand: {
		Time: {
			APPARITION: 3,
			FIRST_STEP: 5
		}		
	},
	DeathZone: {
		EnergySpike: {
			HEIGHT: 800,
			LIGHTBALL_ORBIT_SPEED: 5,
			LIGHTBALL_ORBIT_RADIUS: 8
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
		GOAL_ACTION: 'goalAction'
	}
};