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
	Slot: {
		Color: {
			UNASSIGNED: 0,
			RED: 1,
			BLUE: 2,
			YELLOW: 3,
			WHITE: 4
		}
	},
	UserData: {
		Type: {
			PLAYER: 0,
			BLOCK: 1,
			WINNING_GOAL: 2,
			FIREBALL: 3,
			ENERGY_SPIKE: 4,
			JAW: 5,
			PESKY_BOX: 6,
			PICK_AXE: 7
		}
	},
	Block: {
		Type: {
			NEUTRAL: 0,
			COLORED: 1,
			SPAWN: 2,
			SKILLED: 3
		},
		Skill: {
			Trigger: {
				ON_LANDING: 0,
				ON_LAUNCHING: 1
			},
			FIRE_PULSE: 0,
			JAW_FALL: 1,
			ECLIPSE: 2,
			PESKY_BOX: 3
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
	World: {
		Type: {
			PIT: 0,
			CHURCH: 1,
			ALIEN: 2
		}
	},
	NPC: {
		Type: {
			PESKY_BOX: 0
		}
	},
	Element: {
		Type: {
			ECLIPSE: 0
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
			DEATH_ZONE: 6,
			SKILL: 7,
			NPC: 8
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
			DOUBLE_JUMPING: 4,
			SUMMONING: 5,
			LANDING: 6
		}
	},
	DeathZone: {
		Type: {
			FIREBALL: 0,
			ENERGY_SPIKE: 1,
			JAW: 2,
			PICK_AXE: 3
		}
	},
	WinningGoal: {
		Type: {
			FLOATING_BALL: 1
		}
	}
};