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
		SMOKE: 0,
		SAND: 1,
		LIL_BEAM: 2,
		STUCK: 3
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
			JAW_FALL: 1,
			ECLIPSE: 2,
			PESKY_BOX: 3,
			DEFLECTOR: 4,
			TIME_ZONE: 5
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
			ENERGY_SPIKE: 1,
			JAW: 2,
			PICK_AXE: 3
		}
	},
	NPC: {
		Action: {
			Type: {
				COMMON: 0
			}
		},
		Type: {
			PESKY_BOX: 0,
			SAND_SPIRIT: 1
		}
	},
	Trigger: {
		Action: {
			Type: {
				COMMON: 0
			}
		},
		Type: {
			DEFLECTOR: 0,
			TIME_ZONE: 1,
			GRAVITY_BEAM: 2,
			VENOM_BALL: 3,
			VENOM_WAVE: 4
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
			FIREPULSE_EXPLOSION: 8,
			JAW_DISAPPEARING: 9,
			PESKY_BOX_DISAPPEARING: 10,
			PICK_AXE_DISAPPEARING: 11,
			DEFLECTOR_DISAPPEARING: 12,
			BOUNCE: 13,
			TIME_ZONE_DISAPPEARING: 14,
			TELEPORT: 15,
			SAND_SPIRIT_DISAPPEARING: 16,
			VENOM_WAVE_END: 17,
			VENOM_BALL_THROW: 18,
			VENOM_BALL_END: 19
		}
	},
	Element: {
		Type: {
			ECLIPSE: 0,
			TELEPORT: 1
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