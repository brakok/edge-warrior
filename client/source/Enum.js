var Enum = {
	Game: {
		State: {
			PLAYING: 0
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
	Block: {
		Type:{
			NEUTRAL: 0,
			COLORED: 1,
			SPAWN: 2,
			SKILLED: 3
		},
		Destruction: {
			COLOR_CONTACT: 0
		}
	},
	Anim:{
		Type:{
			IDLE: 0,
			RUNNING: 1,
			JUMPING: 2,
			FALLING: 3,
			SUMMONING: 4
		}
	},
	Action: {
		Type: {
			STANDING: 0,
			RUNNING: 1,
			JUMPING: 2,
			FALLING: 3,
			DOUBLE_JUMPING: 4,
			SUMMONING: 5
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
	}
};