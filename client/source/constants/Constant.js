var Constants = {
	Network: {
		ADDRESS: 'http://localhost:1050'
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
	Camera: {
		HIGHER: 75,
		SPEED_X: 0.0000003,
		SPEED_Y: 0.0005,
		SPEED_ZOOM: 0.2,
		CONTAINER_FACTOR_X: 1.65,
		CONTAINER_FACTOR_Y: 2,
		ZOOM_FACTOR: 1.3
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
			X: 235,
			Y: 83,
			Mode: {
				OFFSET_X: 167,
				OFFSET_Y: -27
			}
		},
		Inventory: {
			OFFSET: 250,
			Y: 100,
			Current: {
				Z_INDEX: 1005,
				SCALE: 1.6,
				REL_X: -122,
				REL_Y: -43
			},
			Next: {
				STEP_Z_INDEX: -1,
				STEP_SCALE: -0.4,
				STEP_X: 35,
				STEP_Y: 18
			},
			Option1: {
				Z_INDEX: 1005,
				SCALE: 1.2,
				REL_X: 31,
				REL_Y: -49
			},
			Option2: {
				Z_INDEX: 1005,
				SCALE: 1.2,
				REL_X: 142,
				REL_Y: -49
			},
			KillCommand: {
				REL_X: 160,
				REL_Y: 42,
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
		GO: 'go'
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
		NAME: "Arial",
		SIZE: 28,
		MIDSIZE: 40,
		BIGSIZE: 60
	},
	Menu: {
		BACKGROUND_Z_INDEX: 0,
		EndScreen: {
			Z_INDEX: 5000
		},
		Login: {
			Z_INDEX: 0
		},
		MainMenu: {
			Z_INDEX: 0
		},
		LobbyScreen: {
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
	}
};