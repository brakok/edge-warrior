var Enum = {
	Game: {
		State: {
			PLAYING: 0
		},
		Phase: {
			PLAYING: 0,
			WINNER: 1
		}
	},
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
	Wall: {
		Type: {
			PIT: 0
		}
	},
	Floor: {
		Type: {
			PIT: 0
		}
	},
	World: {
		Type: {
			PIT: 0
		}
	},
	Block: {
		Type:{
			NEUTRAL: 0,
			COLORED: 1,
			SPAWN: 2,
			SKILLED: 3
		},
		Destruction: {
			COLOR_CONTACT: 0,
			SPAWN: 1,
			CRUSHED: 2
		}
	},
	Anim:{
		Type:{
			IDLE: 0,
			RUNNING: 1,
			JUMPING: 2,
			FALLING: 3,
			SUMMONING: 4,
			ATTRACT: 5
		}
	},
	Action: {
		Type: {
			STANDING: 0,
			RUNNING: 1,
			JUMPING: 2,
			FALLING: 3,
			DOUBLE_JUMPING: 4,
			SUMMONING: 5,
			LANDING: 6
		}
	},
	Facing:{
		RIGHT:  0,
		LEFT: 1
	},
	StepReached: {
		NONE: 0,
		STANDING: 1,
		PLAYER: 2,
		OVERLORD: 3
	},
	DeathZone: {
		Type: {
			RAYBALL: 0,
			ENERGY_SPIKE: 1
		}
	},
	WinningGoal: {
		Type: {
			FLOATING_BALL: 1
		}
	},
	Direction: {
		UP: 0,
		LEFT: 1,
		DOWN: 2,
		RIGHT: 3
	},
	Effect: {
		Type: {
			PLAYER_DEATH: 0,
			BLOCK_LANDING: 1,
			BLOCK_DISAPPEARING: 2,
			SWAP_COLOR: 3,
			DOUBLE_JUMP: 4,
			SPARK: 5,
			SPAWN_UNLEASHED: 6
		}
	},
	Voice: {
		Type: {
			IDLE: 0,
			JUMP: 1,
			KILL: 2
		}
	}
};