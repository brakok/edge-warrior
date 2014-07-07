var Constants = {
	Network: {
		//ADDRESS: 'http://crushedmaster.cloudapp.net',
		ADDRESS: 'http://localhost',
		SERVER_PORT: 1051,
		MASTER_PORT: 1050,
		SERVER_TO_SERVER_PORT: 1060
	},
	Player: {
		Z_ORDER: 10,
		INITIAL_SPAWN_Y: 100,
		JUMP_COOLDOWN: 0.1,
		JUMP_POWER: 2350,
		RUN_POWER_ONGROUND: 1750,
		WIDTH: 30,
		HEIGHT: 50,
		MAX_SPEED_FACTOR: 245,
		WRONG_SIDE_MINUS_FACTOR: 0.5,
		STUCK_MASS_FACTOR: 100,
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
	Common: {
		SMOOTH_DISTANCE: 2500
	},
	Game: {
		Phase: {
			Warmup: {
				PHASE_TIME: 3,
				ON_PLAYER: 2.5,
				ON_GOAL: 1.5,
				OFF_GOAL: 0.5,
				Camera: {
					ZOOM_FACTOR: 1.3,
					SPEED_X: 0.0000001,
					SPEED_Y: 0.0001,
				}
			}
		},
		MAX_PLAYERS: 4,
		UNIT_TIMER: 1,
		OFFSET_Y_ALLOWED_FOR_PLAYERS: 250
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
			OFFSET: 130,
			ON_RELEASE: 120
		},
		MAXLAUNCHING_Y: 1250,
		MAXLAUNCHING_X: 2850,
		STUN_TIMER: 0.4,
		NO_GROUND_FROM_PLAYER_TIMER: 0.3
	},
	Mouse: {
		DOUBLE_CLICK_THRESHOLD: 250 //In ms
	},
	Video: {
		Canvas: {
			ORIGINAL_WIDTH: 1920,
			ORIGINAL_HEIGHT: 1080
		},
		ORIGINAL_WIDTH: 1024,
		ORIGINAL_HEIGHT: 768
	},
	Text: {
		FallingLabel: {
			GRAVITY: 1
		}
	},
	Particles: {
		Z_ORDER: 8
	},
	Block: {
		Z_ORDER: 9,
		Percent: {
			STARTING_NEUTRAL: 15,
			LOST_FOREACH_ENEMY: 3
		},
		Skill: {
			MAX_LEVEL: 5
		},
		Unit: {
			TO_ADD: 4,
			TO_MINUS: -2,
			MAX: 99999
		},
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
		OFFSET: 10,
		Floor: {
			Z_INDEX: 70
		},
		Wall: {
			Z_INDEX: 70
		},
		BlackBox: {
			Z_INDEX: 69
		},
		Background: {
			Z_INDEX: -1000
		},
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
				TIMER_MIN: 35,
				TIMER_RANGE: 15
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
	Camera: {
		HIGHER: 5,
		SPEED_X: 0.0000007,
		SPEED_Y: 0.0007,
		SPEED_ZOOM: 0.25,
		CONTAINER_FACTOR_X: 1.85,
		CONTAINER_FACTOR_Y: 2.35,
		ZOOM_FACTOR: 1.2
	},
	DeathZone: {
		EnergySpike: {
			Z_INDEX: 40,
			HEIGHT: 800,
			SPEED: 0.007,
			WIDTH: 30,
			COOLDOWN: 1,
			IMPULSE_X: 4500,
			IMPULSE_Y: 1500,
			STUN_TIME: 0.25
		},
		Missile: {
			Z_INDEX: 40
		},
		Jaw: {
			Z_INDEX: 8,
			WIDTH: 120,
			HEIGHT: 30,
			INITIAL_COUNT: 4,
			STEP: 6
		},
		Fireball: {
			SPEED_MIN: 8,
			SPEED_STEP: 3,
			WIDTH: 45,
			HEIGHT: 45,
			DISTANCE_MIN: 150,
			DISTANCE_STEP: 85
		},
	},
	WinningGoal: {
		PHASE_TIME: 8,
		LOWER_GOAL_FACTOR: 0.1,
		FloatingBall: {
			Z_INDEX: 55,
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
	HUD: {
		Z_INDEX: 1000,
		SkillStore: {
			X: 325,
			Y: 125,
			Mode: {
				OFFSET_X: -260,
				OFFSET_Y: 15
			},
			Units: {
				OFFSET_X: -190,
				OFFSET_Y: 16,
				Title: {
					OFFSET_X: -60,
					OFFSET_Y: 13,
				}
			},
			Skills: {
				SCALE_X: 0.65,
				SCALE_Y: 0.65,
				Level: {
					OFFSET_X: 22,
					OFFSET_Y: 22,
					Z_ORDER: 1005
				},
				One: {
					OFFSET_X: -256,
					OFFSET_Y: -66
				},
				Two: {
					OFFSET_X: -158,
					OFFSET_Y: -66
				},
				Three: {
					OFFSET_X: -60,
					OFFSET_Y: -66
				},
				Four: {
					OFFSET_X: 37,
					OFFSET_Y: -66
				}
			}
		},
		Inventory: {
			OFFSET: 325,
			Y: 125,
			Current: {
				Z_INDEX: 1005,
				SCALE: 1.6,
				REL_X: -45,
				REL_Y: -68
			},
			Next: {
				STEP_Z_INDEX: -1,
				STEP_SCALE: -0.4,
				STEP_X: 35,
				STEP_Y: 25
			},
			Option1: {
				Z_INDEX: 1005,
				SCALE: 1.2,
				REL_X: 126,
				REL_Y: -21
			},
			Option2: {
				Z_INDEX: 1005,
				SCALE: 1.2,
				REL_X: 212,
				REL_Y: -71
			},
			KillCommand: {
				REL_X: 245,
				REL_Y: 12,
				Time: {
					APPARITION: 3,
					FIRST_STEP: 5
				}		
			}
		},
		PickAxe: {
			Z_INDEX: 1005,
			OFFSET_X: 265,
			Y: 50,
			OFFSET: 50
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
		CHAT: 'chat',
		NEW_TRIGGER: 'newTrigger',
		DELETE_TRIGGER: 'deleteTrigger',
		ACTION_TRIGGER: 'actionTrigger',
		ACTION_NPC: 'actionNpc'
	},
	Effect: {
		Z_INDEX: 50,
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
	Element: {
		Eclipse: {
			Z_INDEX: 75,
			SCALE_STEP: 0.4,
			DURATION: 4,
			DURATION_STEP: 1,
			FADE_IN: 0.25,
			FADE_OUT: 0.75,
			OWNER_MAX_OPACITY: 125,
			Dot: {
				SPEED: 5,
				TIMER: 0.05,
				OFFSET: 10,
				OFFSET_VAR: 5,
				SCALE: 0.8
			}
		}
	},
	NPC: {
		Z_ORDER: 15,
		PeskyBox: {
			EYE_RADIUS: 5,
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
		Z_ORDER: 14,
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
			EXEC_TIMER: 0.25,
			DURATION: 2.5,
			DURATION_STEP: 1,
			WIDTH: 250,
			HEIGHT: 250
		},
		GravityBeam: {
			SCALE_TIMER: 0.25,
			WIDTH: 150,
			HEIGHT: 1400,
			DURATION: 8,
			MAX_LIFT_HEIGHT: 150,
			TIME_ALLOWED: 2.5,
			MAX_VEL_Y: 75,
			IMPULSE: 150,
			COOLDOWN: 2.5
		},
		VenomBall: {
			THROW_OFFSET: 50,
			END_OFFSET: 15,
			WIDTH: 30,
			HEIGHT: 30,
			STUCK_TIME: 3,
			GRAVITY: 0.4
		},
		VenomWave: {
			WIDTH: 40,
			HEIGHT: 120,
			SPEED_X: 0,
			SPEED_Y: -8,
			COOLDOWN: 0.26,
			VAR_COOLDOWN: 0.15,
			VEL_MIN_X: 3,
			VEL_MIN_Y: 1,
			VEL_RANGE_X: 11,
			VEL_RANGE_Y: 7,
			STUCK_TIME: 4
		}
	},
	Sound: {
		Effect: {
			VOLUME: 0.65
		},
		Music: {
			VOLUME: 0.25
		},
		File: {
			Block: {
				LANDING: 'block_land',
				SWAP_COLOR: 'block_swapColor',
				EXPLODE: 'block_explode'
			},
			Player: {
				DEATH: 'player_death',
				SPAWN: 'player_spawn',
				LAND: 'player_land',
				FOOT_STEP: 'foot_step',
				DOUBLE_JUMP: 'double_jump',
				IDLE: '_idle',
				JUMP: '_jump',
				KILL: '_kill'
			},
			PeskyBox: {
				SPAWN: 'PeskySpawn',
				DISAPPEARING: 'PeskySpawn'
			},
			Jaw: {
				EAT: 'jaw',
				DISAPPEARING: 'jawDisappearing'
			},
			Spike: {
				TENTACLE_TRANSFORM: 'tentacle_transform'
			},
			WinningGoal: {
				FloatingBall: {
					IDLE: 'floatingBall_idle',
					SUMMON: 'floatingBall_summon'
				}
			},
			PickAxe: {
				MOVING: 'PickAxe',
				ENDING: 'PickAxeDisappearing'
			},
			Deflector: {
				SPAWN: 'deflector_spawn',
				IDLE: 'deflector_idle',
				DISAPPEARING: 'deflector_disappearing',
				BOUNCE: 'Bounce'
			},
			TimeZone: {
				SPAWN: 'timeZone_spawn',
				DISAPPEARING: 'timeZone_disappearing'
			},
			SandSpirit: {
				SPAWN: 'SandSpirit',
				DISAPPEARING: 'SandSpirit_disappearing'
			},
			GravityBeam: {
				SPAWN: 'GravityBeam'
			},
			VenomBall: {
				END: 'VenomBall_end',
				THROW: 'VenomBall_throw'
			},
			Music: {
				MENU: 'menu'
			},
			Common: {
				FLOATING: 'floating',
				FIRE: 'fire',
				BUY: 'buy',
				DENY_ACTION: 'deny_action',
				EXPLOSION01: 'explosion01',
				EXPLOSION02: 'explosion02',
				SAND: 'Sand'
			}
		},
		VoiceTimer: {
			MIN: 6,
			RANGE : 5
		}
	},
	Chat: {
		WAIT_BEFORE_HIDE: 5,
		FADE_OUT: 1
	},
	Font: {
		NAME: "Quantico Bold",
		VERY_SMALLSIZE: 14,
		SMALLSIZE: 18,
		SIZE: 28,
		MIDSIZE: 40,
		BIGSIZE: 60
	},
	Menu: {
		BACKGROUND_Z_INDEX: 0,
		ACTION_EFFECT: 'action_menu',
		EndScreen: {
			Z_INDEX: 5000,
			APPEAR_TIME: 0.4,
			SCORE_VEL_Y: 20,
			SCORE_VAR_VEL_X: 5,
			SCORE_VAR_VEL_Y: 5
		},
		Login: {
			Z_INDEX: 0
		},
		CreateAccount: {
			Z_INDEX: 0
		},
		ChangePassword: {
			Z_INDEX: 0
		},
		ResetPassword: {
			Z_INDEX: 0
		},
		MainMenu: {
			Z_INDEX: 0
		},
		LobbyScreen: {
			Z_INDEX: 0
		},
		Credits: {
			Z_INDEX: 0
		},
		RulesScreen: {
			Z_INDEX: 0
		},
		ServerList: {
			Z_INDEX: 0
		},
		OptionsScreen: {
			Z_INDEX: 5000
		},
		PauseMenu: {
			Z_INDEX: 5000
		},
		SkillScreen: {
			Z_INDEX: 5000,
			SkillSlot: {
				STEP_Y: -0.2
			},
			SkillList: {
				SCALE_X: 0.7,
				SCALE_Y: 0.7,
				ITEM_WIDTH: 110,
				ITEM_HEIGHT: 110,
				MARGIN_X: 20,
				MARGIN_Y: 20,
				COLUMNS: 6,
				ROWS: 1
			},
			SkillSummary: {
				WIDTH: 1050,
				HEIGHT: 300
			}
		},
		LoadingScreen: {
			Z_INDEX: 5000,
			BigCircle: {
				Z_INDEX: 0,
				SCALE: 1,
				DEGREE_BY_SECOND: -180
			},
			SmallCircle: {
				Z_INDEX: 1,
				SCALE: 0.5,
				DEGREE_BY_SECOND: 180
			}
		}
	},
	Regex: {
		EMAIL: /^\S{0,}@\S{0,}[.]{1}[a-zA-Z0-9]{2,}$/
	}
};