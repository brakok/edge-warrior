var Constants = {
	Network: {
		ADDRESS: 'http://localhost:1050'
	},
	Player: {
		Z_ORDER: 10
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
		}
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
	Particles: {
		Z_ORDER: 8,
		Smoke: {
			PARTICLES_COUNT: 125,
			SPEED: 500
		}
	},
	Block: {
		Z_ORDER: 9,
		Percent: {
			STARTING_NEUTRAL: 15,
			LOST_FOREACH_ENEMY: 3
		},
		Skill: {
			MAX_POWER: 5
		},
		Unit: {
			TO_ADD: 4,
			TO_MINUS: -2
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
	Camera: {
		HIGHER: 15,
		SPEED_X: 0.0000005,
		SPEED_Y: 0.0005,
		SPEED_ZOOM: 0.2,
		CONTAINER_FACTOR_X: 1.65,
		CONTAINER_FACTOR_Y: 2,
		ZOOM_FACTOR: 1.2
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
		LOGOUT: 'logout'
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
		Music: {
			VOLUME: 0.5
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
			Spike: {
				TENTACLE_TRANSFORM: 'tentacle_transform'
			},
			WinningGoal: {
				FloatingBall: {
					IDLE: 'floatingBall_idle',
					SUMMON: 'floatingBall_summon'
				}
			}
		},
		VoiceTimer: {
			MIN: 6,
			RANGE : 5
		}
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
			Z_INDEX: 5000
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
				ITEM_WIDTH: 80,
				ITEM_HEIGHT: 80,
				MARGIN_X: 10,
				MARGIN_Y: 10,
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