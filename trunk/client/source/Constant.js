var Network = {
	ADDRESS: 'http://localhost:80'
};

var Percent = {
	STARTING_NEUTRAL: 25,
	LOST_FOREACH_ENEMY: 5
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
	NEW_PLAYER: 'newPlayer',
	PLAYER_KILLED: 'playerKilled',
	PLAYER_SPAWNED: 'playerSpawned',
	LAUNCH: 'launch',
	KILL_COMMAND: 'killCommand'
};