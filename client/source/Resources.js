var assestsPlaceHolderDir = 'placeholders/';

var assetsBlockDir = 'assets/blocks/';
var assetsPlayerDir = 'assets/players/';
var assetsHudDir = 'assets/hud/';
var assetsWinningGoal = 'assets/winningGoal/';

var assets = [

	{type:'image', src: assestsPlaceHolderDir + 'ray_ball.png'},
	{type:'image', src: assestsPlaceHolderDir + 'energy_spike.png'},

	{type:'image', src: assetsWinningGoal + 'floatingBall_idle.png'},
	{type:'image', src: assetsWinningGoal + 'floatingBall_action.png'},
	{type:"plist", src: assetsWinningGoal + 'floatingBall_idle.plist'},
	{type:"plist", src: assetsWinningGoal + 'floatingBall_action.plist'},
	
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
	
	{type:'image', src: assetsPlayerDir + 'yellow_idle.png'},
	{type:'image', src: assetsPlayerDir + 'yellow_running.png'},
	{type:'image', src: assetsPlayerDir + 'yellow_jumping.png'},
	
	{type:'image', src: assetsHudDir + 'fieldset.png'},
	
	{type:'image', src: assetsHudDir + 'killCommand.png'},
	{type:'plist', src: assetsHudDir + 'killCommand.plist'},
	
	{type:"plist", src: assetsPlayerDir + 'yellow_idle.plist'},
	{type:"plist", src: assetsPlayerDir + 'yellow_running.plist'},
	{type:"plist", src: assetsPlayerDir + 'yellow_jumping.plist'}
];