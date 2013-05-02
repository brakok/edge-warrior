//Possible game states.
var GameState = {
	PLAYING: 0
};

//Enum of possible colors.
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

var BlockDestructionType = {
	COLOR_CONTACT: 0
};

var BlockType = {
	NEUTRAL: 0,
	COLORED: 1,
	SPAWN: 2,
	SKILLED: 3
};

var AnimType = {
	IDLE: 0,
	RUNNING: 1,
	JUMPING: 2,
	FALLING: 3
};

var ActionType = {
	STANDING: 0,
	RUNNING: 1,
	JUMPING: 2,
	FALLING: 3
};

var Facing = {
	RIGHT:  0,
	LEFT: 1
};