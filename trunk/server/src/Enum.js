//Enums
var Color = {
	RED: 0,
	BLUE: 1,
	YELLOW: 2,
	WHITE: 3,
	GREEN: 4,
	ORANGE: 5,
	PURPLE: 6,
	BLACK: 7
};

var UserDataType = {
	PLAYER: 0,
	BLOCK: 1
};

var BlockType = {
	NEUTRAL: 0,
	COLORED: 1,
	SPAWN: 2,
	SKILLED: 3
};

var CollisionType = {
	STATIC: 0,
	PLAYER: 1,
	GROUND_SENSOR: 2,
	BLOCK: 3,
	DROP_SENSOR: 4
};

var Facing = {
	RIGHT:  0,
	LEFT: 1
};

var BlockState = {
	STATIC: 0,
	DYNAMIC: 1
};

var BlockDestructionType = {
	COLOR_CONTACT: 0,
	SPAWN: 1
};

//Constants
var PhysicConstants = {
	GRAVITY: -150,
	FRICTION: 0.99,
	MASS_PLAYER: 10,
	MASS_BLOCK: 99999999,
	MASS_BLOCK_STATIC: 99999999999,
	TIME_STEP: 1/60,
	FRICTION_FACTOR_ONGROUND: 0.9,
	TURN_FRICTION_FACTOR: 0.05
};

var PlayerConstants = {
	JUMP_POWER: 1350,
	RUN_POWER_ONGROUND: 1000,
	RUN_POWER_OFFGROUND: 15,
	WIDTH: 40,
	HEIGHT: 40,
	MAX_SPEED_FACTOR: 0.01
};

var BlockConstants = {
	WIDTH: 80,
	HEIGHT: 30,
	LAUNCHING_SPEED: -500,
	SPAWN_MAXLAUNCHING_Y: 500,
	SPAWN_MAXLAUNCHING_X: 500
};

var ActionType = {
	NONE: -1,
	STANDING: 0,
	RUNNING: 1,
	JUMPING: 2,
	FALLING: 3,
	DOUBLE_JUMPING: 4
};

var BlockRestriction = {
	SPAWN_TIMER: 7
};

//Socket messages.
var Message = {
	NEXT_BLOCK: 'nextBlock',
	NEW_BLOCK: 'newBlock',
	SEND_BLOCK: 'sendBlock',
	DELETE_BLOCK: 'deleteBlock',
	PULL: 'pull',
	PUSH: 'push',
	INIT: 'init',
	CONNECTED: 'connected',
	CONNECTION: 'connection',
	NEW_PLAYER: 'newPlayer',
	PLAYER_KILLED: 'playerKilled',
	PLAYER_SPAWNED: 'playerSpawned',
	LAUNCH: 'launch'
};