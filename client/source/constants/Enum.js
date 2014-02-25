var Enum = {
	Game: {
		Phase: {
			PLAYING: 0,
			WINNER: 1,
			WARMUP: 2,
			ENDING: 3
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
	Particles: {
		SMOKE: 0
	},
	World: {
		Type: {
			PIT: 0,
			CHURCH: 1,
			ALIEN: 2
		}
	},
	Block: {
		Type:{
			NEUTRAL: 0,
			COLORED: 1,
			SPAWN: 2,
			SKILLED: 3
		},
		Skill: {
			FIRE_PULSE: 0,
			JAW_FALL: 1
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
			FIREBALL: 0,
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
			SPAWN_UNLEASHED: 6,
			FIREBALL_EXPLOSION: 7,
			FIREPULSE_EXPLOSION: 8
		}
	},
	Voice: {
		Type: {
			IDLE: 0,
			JUMP: 1,
			KILL: 2
		}
	},
	SkillStore: {
		Mode: {
			POWER: 0,
			QUANTITY: 1
		}
	}
};