var assestsPlaceHolderDir = 'placeholders/';

var assetsWorldDir = 'assets/world/';
var assetsBlockDir = 'assets/blocks/';
var assetsPlayerDir = 'assets/players/';
var assetsHudDir = 'assets/hud/';
var assetsWinningGoalDir = 'assets/winningGoal/';
var assetsEffectDir = 'assets/effects/';
var soundDir = 'sounds/';
var soundVoiceDir = 'sounds/voices/';

var assets = [

	//Sounds
	{type:"sound", src: soundDir + 'block_land'},
	{type:"sound", src: soundDir + 'block_swapColor'},
	{type:"sound", src: soundDir + 'block_explode'},
	{type:"sound", src: soundDir + 'player_spawn'},
	{type:"sound", src: soundDir + 'player_death'},
	{type:"sound", src: soundDir + 'player_land'},
	{type:"sound", src: soundDir + 'foot_step'},
	{type:"sound", src: soundDir + 'double_jump'},
	
	//Voices
	{type:"sound", src: soundVoiceDir + 'red_kill'},
	{type:"sound", src: soundVoiceDir + 'red_jump01'},
	{type:"sound", src: soundVoiceDir + 'red_jump02'},
	{type:"sound", src: soundVoiceDir + 'red_idle01'},
	{type:"sound", src: soundVoiceDir + 'red_idle02'},
	{type:"sound", src: soundVoiceDir + 'red_idle03'},

	//World
	{type:'image', src: assetsWorldDir + 'wall_pit.png'},
	{type:'image', src: assetsWorldDir + 'floor_pit.png'},
	{type:'image', src: assetsWorldDir + 'corner_pit.png'},
	{type:'image', src: assetsWorldDir + 'black_box.png'},
	{type:'image', src: assetsWorldDir + 'background_pit.png'},
	{type:'image', src: assetsWorldDir + 'sky.png'},

	//Effects
	{type:'image', src: assetsEffectDir + 'lightBall.png'},
	{type:'image', src: assetsEffectDir + 'Spark.png'},
	{type:'image', src: assetsEffectDir + 'EnergySpike_tentacle.png'},
	{type:'image', src: assetsEffectDir + 'EnergySpike_twisted.png'},
	{type:'image', src: assetsEffectDir + 'EnergySpike_transform.png'},
	{type:'image', src: assetsEffectDir + 'PlayerDeath.png'},
	{type:'image', src: assetsEffectDir + 'BlockLanding.png'},
	{type:'image', src: assetsEffectDir + 'BlockDisappearing.png'},
	{type:'image', src: assetsEffectDir + 'SwapColor.png'},
	{type:'image', src: assetsEffectDir + 'DoubleJump.png'},
	{type:'image', src: assetsEffectDir + 'spawn_unleashed.png'},
	
	{type:"plist", src: assetsEffectDir + 'EnergySpike_tentacle.plist'},
	{type:"plist", src: assetsEffectDir + 'EnergySpike_twisted.plist'},
	{type:"plist", src: assetsEffectDir + 'EnergySpike_transform.plist'},
	{type:"plist", src: assetsEffectDir + 'PlayerDeath.plist'},
	{type:"plist", src: assetsEffectDir + 'BlockLanding.plist'},
	{type:"plist", src: assetsEffectDir + 'BlockDisappearing.plist'},
	{type:"plist", src: assetsEffectDir + 'SwapColor.plist'},
	{type:"plist", src: assetsEffectDir + 'DoubleJump.plist'},
	{type:"plist", src: assetsEffectDir + 'Spark.plist'},
	{type:"plist", src: assetsEffectDir + 'spawn_unleashed.plist'},

	//Winning goal.
	{type:'image', src: assetsWinningGoalDir + 'floatingBall_idle.png'},
	{type:'image', src: assetsWinningGoalDir + 'floatingBall_action.png'},
	{type:'image', src: assetsWinningGoalDir + 'floatingBall_attract.png'},
	{type:"plist", src: assetsWinningGoalDir + 'floatingBall_idle.plist'},
	{type:"plist", src: assetsWinningGoalDir + 'floatingBall_action.plist'},
	{type:"plist", src: assetsWinningGoalDir + 'floatingBall_attract.plist'},
	
	//Block.
	{type:'image', src: assetsBlockDir + 'block.png'},
	{type:'image', src: assetsBlockDir + 'block_0.png'},
	{type:'image', src: assetsBlockDir + 'block_1.png'},
	{type:'image', src: assetsBlockDir + 'block_2.png'},
	{type:'image', src: assetsBlockDir + 'block_3.png'},
	{type:'image', src: assetsBlockDir + 'block_4.png'},
	{type:'image', src: assetsBlockDir + 'block_5.png'},
	{type:'image', src: assetsBlockDir + 'block_6.png'},
	{type:'image', src: assetsBlockDir + 'block_7.png'},
	{type:'image', src: assetsBlockDir + 'block_spawn.png'},
	
	//Player
	{type:'image', src: assetsPlayerDir + 'yellow_idle.png'},
	{type:'image', src: assetsPlayerDir + 'yellow_running.png'},
	{type:'image', src: assetsPlayerDir + 'yellow_jumping.png'},
	{type:'image', src: assetsPlayerDir + 'red_idle.png'},
	{type:'image', src: assetsPlayerDir + 'red_running.png'},
	{type:'image', src: assetsPlayerDir + 'red_jumping.png'},
	{type:'image', src: assetsPlayerDir + 'blue_idle.png'},
	{type:'image', src: assetsPlayerDir + 'blue_running.png'},
	{type:'image', src: assetsPlayerDir + 'blue_jumping.png'},
	
	{type:"plist", src: assetsPlayerDir + 'yellow_idle.plist'},
	{type:"plist", src: assetsPlayerDir + 'yellow_running.plist'},
	{type:"plist", src: assetsPlayerDir + 'yellow_jumping.plist'},
	{type:"plist", src: assetsPlayerDir + 'red_idle.plist'},
	{type:"plist", src: assetsPlayerDir + 'red_running.plist'},
	{type:"plist", src: assetsPlayerDir + 'red_jumping.plist'},
	{type:"plist", src: assetsPlayerDir + 'blue_idle.plist'},
	{type:"plist", src: assetsPlayerDir + 'blue_running.plist'},
	{type:"plist", src: assetsPlayerDir + 'blue_jumping.plist'},
	
	//Hud.
	{type:'image', src: assetsHudDir + 'fieldset.png'},
	{type:'image', src: assetsHudDir + 'killCommand.png'},
	{type:'plist', src: assetsHudDir + 'killCommand.plist'}
];