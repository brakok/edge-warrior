var assestsPlaceHolderDir = 'placeholders/';

var assetsWorldDir = 'assets/world/';
var assetsMenuDir = 'assets/menu/';
var assetsBlockDir = 'assets/blocks/';
var assetsPlayerDir = 'assets/players/';
var assetsHudDir = 'assets/hud/';
var assetsWinningGoalDir = 'assets/winningGoal/';
var assetsEffectDir = 'assets/effects/';
var assetsNpcDir = 'assets/npc/';
var assetsTriggerDir = 'assets/triggers/';
var assetsSkillDir = 'assets/skills/';
var assetsParticles = 'assets/particles/';
var assetsCommon = 'assets/common/';

var soundDir = 'sounds/';
var soundVoiceDir = 'sounds/voices/';
var soundMusicDir = 'sounds/musics/';

var assets = [

	//Font
	{fontName: Constants.Font.NAME, src:[{src:"assets/css/fonts/Quantico-Bold.otf", type:"truetype"}]},

	//Common
	{type:'image', src: assetsCommon + 'logo.png'},
	
	//Particles
	{type:'image', src: assetsParticles + 'smoke.png'},
	{type:'image', src: assetsParticles + 'sand.png'},
	{type:'image', src: assetsParticles + 'lilBeam.png'},
	{type:'image', src: assetsParticles + 'WhiteDot.png'},
	{type:'image', src: assetsParticles + 'stuck.png'},
	
	//Menu
	{type:'image', src: assetsMenuDir + '0.png'},
	{type:'image', src: assetsMenuDir + '1.png'},
	{type:'image', src: assetsMenuDir + '2.png'},
	{type:'image', src: assetsMenuDir + '3.png'},
	{type:'image', src: assetsMenuDir + '4.png'},
	{type:'image', src: assetsMenuDir + 'true.png'},
	{type:'image', src: assetsMenuDir + 'false.png'},
	{type:'image', src: assetsMenuDir + 'color_circle.png'},
	{type:'image', src: assetsMenuDir + 'skill_selected.png'},
	{type:'image', src: assetsMenuDir + 'skill_unselected.png'},
	
	//Menu background
	{type:'image', src: assetsMenuDir + 'login_background.png'},
	{type:'image', src: assetsMenuDir + 'account_background.png'},
	{type:'image', src: assetsMenuDir + 'main_background.png'},
	{type:'image', src: assetsMenuDir + 'options_background.png'},
	{type:'image', src: assetsMenuDir + 'options_submenu_background.png'},
	{type:'image', src: assetsMenuDir + 'lobby_background.png'},
	{type:'image', src: assetsMenuDir + 'pause_background.png'},
	{type:'image', src: assetsMenuDir + 'end_screen_background.png'},
	{type:'image', src: assetsMenuDir + 'skill_background.png'},
	{type:'image', src: assetsMenuDir + 'credit_background.png'},
	{type:'image', src: assetsMenuDir + 'rules_background.png'},
	
	//Sounds
	{type:"sound", src: soundDir + 'block_land.mp3'},
	{type:"sound", src: soundDir + 'block_swapColor.mp3'},
	{type:"sound", src: soundDir + 'block_explode.mp3'},
	{type:"sound", src: soundDir + 'player_spawn.mp3'},
	{type:"sound", src: soundDir + 'player_death.mp3'},
	{type:"sound", src: soundDir + 'player_land.mp3'},
	{type:"sound", src: soundDir + 'foot_step.mp3'},
	{type:"sound", src: soundDir + 'double_jump.mp3'},
	{type:"sound", src: soundDir + 'tentacle_transform.mp3'},
	{type:"sound", src: soundDir + 'floatingBall_idle.mp3'},
	{type:"sound", src: soundDir + 'buy.mp3'},
	{type:"sound", src: soundDir + 'switch_menu.mp3'},
	{type:"sound", src: soundDir + 'action_menu.mp3'},
	{type:"sound", src: soundDir + 'jaw.mp3'},
	{type:"sound", src: soundDir + 'jawDisappearing.mp3'},
	{type:"sound", src: soundDir + 'floating.mp3'},
	{type:"sound", src: soundDir + 'PeskySpawn.mp3'},
	{type:"sound", src: soundDir + 'fire.mp3'},
	{type:"sound", src: soundDir + 'explosion01.mp3'},
	{type:"sound", src: soundDir + 'explosion02.mp3'},
	{type:"sound", src: soundDir + 'deny_action.mp3'},
	{type:"sound", src: soundDir + 'PickAxe.mp3'},
	{type:"sound", src: soundDir + 'PickAxeDisappearing.mp3'},
	{type:"sound", src: soundDir + 'deflector_spawn.mp3'},
	{type:"sound", src: soundDir + 'deflector_idle.mp3'},
	{type:"sound", src: soundDir + 'deflector_disappearing.mp3'},
	{type:"sound", src: soundDir + 'Bounce.mp3'},
	{type:"sound", src: soundDir + 'timeZone_spawn.mp3'},
	{type:"sound", src: soundDir + 'timeZone_disappearing.mp3'},
	{type:"sound", src: soundDir + 'Sand.mp3'},
	{type:"sound", src: soundDir + 'GravityBeam.mp3'},
	{type:"sound", src: soundDir + 'VenomBall_end.mp3'},
	{type:"sound", src: soundDir + 'VenomBall_throw.mp3'},
	
	//Voices
	{type:"sound", src: soundVoiceDir + 'red_kill.mp3'},
	{type:"sound", src: soundVoiceDir + 'red_jump01.mp3'},
	{type:"sound", src: soundVoiceDir + 'red_jump02.mp3'},
	{type:"sound", src: soundVoiceDir + 'red_idle01.mp3'},
	{type:"sound", src: soundVoiceDir + 'red_idle02.mp3'},
	{type:"sound", src: soundVoiceDir + 'red_idle03.mp3'},
	{type:"sound", src: soundVoiceDir + 'yellow_kill.mp3'},
	{type:"sound", src: soundVoiceDir + 'yellow_jump01.mp3'},
	{type:"sound", src: soundVoiceDir + 'yellow_jump02.mp3'},
	{type:"sound", src: soundVoiceDir + 'yellow_idle01.mp3'},
	{type:"sound", src: soundVoiceDir + 'yellow_idle02.mp3'},
	{type:"sound", src: soundVoiceDir + 'yellow_idle03.mp3'},
	{type:"sound", src: soundVoiceDir + 'blue_kill.mp3'},
	{type:"sound", src: soundVoiceDir + 'blue_jump01.mp3'},
	{type:"sound", src: soundVoiceDir + 'blue_jump02.mp3'},
	{type:"sound", src: soundVoiceDir + 'blue_idle01.mp3'},
	{type:"sound", src: soundVoiceDir + 'blue_idle02.mp3'},
	{type:"sound", src: soundVoiceDir + 'blue_idle03.mp3'},
	{type:"sound", src: soundVoiceDir + 'white_kill.mp3'},
	{type:"sound", src: soundVoiceDir + 'white_jump01.mp3'},
	{type:"sound", src: soundVoiceDir + 'white_jump02.mp3'},
	{type:"sound", src: soundVoiceDir + 'white_idle01.mp3'},
	{type:"sound", src: soundVoiceDir + 'white_idle02.mp3'},
	{type:"sound", src: soundVoiceDir + 'white_idle03.mp3'},
	
	{type:"sound", src: soundVoiceDir + 'SandSpirit.mp3'},
	{type:"sound", src: soundVoiceDir + 'SandSpirit_disappearing.mp3'},
	
	{type:"sound", src: soundVoiceDir + 'floatingBall_summon.mp3'},
	
	//Musics
	{type:"sound", src: soundMusicDir + 'menu.mp3'},

	//World
	{type:'image', src: assetsWorldDir + 'black_box.png'},
	
	{type:'image', src: assetsWorldDir + 'pit_wall.png'}, //Pit
	{type:'image', src: assetsWorldDir + 'pit_floor.png'},
	{type:'image', src: assetsWorldDir + 'pit_corner.png'},
	{type:'image', src: assetsWorldDir + 'pit_background.png'},
	
	{type:'image', src: assetsWorldDir + 'church_wall.png'}, //Church
	{type:'image', src: assetsWorldDir + 'church_floor.png'},
	{type:'image', src: assetsWorldDir + 'church_corner.png'},
	{type:'image', src: assetsWorldDir + 'church_background.png'},
	
	{type:'image', src: assetsWorldDir + 'alien_wall.png'}, //Alien
	{type:'image', src: assetsWorldDir + 'alien_floor.png'},
	{type:'image', src: assetsWorldDir + 'alien_corner.png'},
	{type:'image', src: assetsWorldDir + 'alien_background.png'},
	
	{type:'image', src: assetsWorldDir + 'sky_day.png'}, //Skies
	{type:'image', src: assetsWorldDir + 'sky_night.png'},
	{type:'image', src: assetsWorldDir + 'sky_evening.png'},
	{type:'image', src: assetsWorldDir + 'sky_morning.png'},

	//NPCs
	{type:'image', src: assetsNpcDir + 'PeskyBox.png'},
	{type:'image', src: assetsNpcDir + 'PeskyBoxDisappearing.png'},
	{type:'image', src: assetsNpcDir + 'Eyes.png'},
	{type:'image', src: assetsNpcDir + 'SandSpirit.png'},
	{type:'image', src: assetsNpcDir + 'SandSpirit_disappearing.png'},
	{type:'image', src: assetsNpcDir + 'SandSpirit_action.png'},
	
	{type:"plist", src: assetsNpcDir + 'PeskyBox.plist'},
	{type:"plist", src: assetsNpcDir + 'PeskyBoxDisappearing.plist'},
	{type:"plist", src: assetsNpcDir + 'Eyes.plist'},
	{type:"plist", src: assetsNpcDir + 'SandSpirit.plist'},
	{type:"plist", src: assetsNpcDir + 'SandSpirit_disappearing.plist'},
	
	//Triggers
	{type:'image', src: assetsTriggerDir + 'Deflector_spawn.png'},
	{type:'image', src: assetsTriggerDir + 'Deflector_idle.png'},
	{type:'image', src: assetsTriggerDir + 'Deflector_disappearing.png'},
	{type:'image', src: assetsTriggerDir + 'TimeZone_spawn.png'},
	{type:'image', src: assetsTriggerDir + 'TimeZone_disappearing.png'},
	{type:'image', src: assetsTriggerDir + 'GravityBeam.png'},
	{type:'image', src: assetsTriggerDir + 'VenomWave_spawn.png'},
	{type:'image', src: assetsTriggerDir + 'VenomWave_idle.png'},
	{type:'image', src: assetsTriggerDir + 'VenomWave_end.png'},
	{type:'image', src: assetsTriggerDir + 'VenomBall_throw.png'},
	{type:'image', src: assetsTriggerDir + 'VenomBall_idle.png'},
	{type:'image', src: assetsTriggerDir + 'VenomBall_end.png'},
	
	{type:"plist", src: assetsTriggerDir + 'Deflector_spawn.plist'},
	{type:"plist", src: assetsTriggerDir + 'Deflector_idle.plist'},
	{type:"plist", src: assetsTriggerDir + 'Deflector_disappearing.plist'},
	{type:"plist", src: assetsTriggerDir + 'TimeZone_spawn.plist'},
	{type:"plist", src: assetsTriggerDir + 'TimeZone_disappearing.plist'},
	{type:"plist", src: assetsTriggerDir + 'VenomWave_spawn.plist'},
	{type:"plist", src: assetsTriggerDir + 'VenomWave_idle.plist'},
	{type:"plist", src: assetsTriggerDir + 'VenomWave_end.plist'},
	{type:"plist", src: assetsTriggerDir + 'VenomBall_throw.plist'},
	{type:"plist", src: assetsTriggerDir + 'VenomBall_idle.plist'},
	{type:"plist", src: assetsTriggerDir + 'VenomBall_end.plist'},
	
	//Effects
	{type:'image', src: assetsEffectDir + 'lightBall.png'},
	{type:'image', src: assetsEffectDir + 'Spark.png'},
	{type:'image', src: assetsEffectDir + 'Eclipse.png'},
	{type:'image', src: assetsEffectDir + 'Jaw.png'},
	{type:'image', src: assetsEffectDir + 'JawDisappearing.png'},
	{type:'image', src: assetsEffectDir + 'EnergySpike_tentacle.png'},
	{type:'image', src: assetsEffectDir + 'EnergySpike_twisted.png'},
	{type:'image', src: assetsEffectDir + 'EnergySpike_transform.png'},
	{type:'image', src: assetsEffectDir + 'PlayerDeath.png'},
	{type:'image', src: assetsEffectDir + 'BlockLanding.png'},
	{type:'image', src: assetsEffectDir + 'BlockDisappearing.png'},
	{type:'image', src: assetsEffectDir + 'SwapColor.png'},
	{type:'image', src: assetsEffectDir + 'DoubleJump.png'},
	{type:'image', src: assetsEffectDir + 'spawn_unleashed.png'},
	{type:'image', src: assetsEffectDir + 'Fireball.png'},
	{type:'image', src: assetsEffectDir + 'Fireball_explosion.png'},
	{type:'image', src: assetsEffectDir + 'FirePulse_explosion.png'},
	{type:'image', src: assetsEffectDir + 'PickAxe.png'},
	{type:'image', src: assetsEffectDir + 'PickAxeDisappearing.png'},
	{type:'image', src: assetsEffectDir + 'Bounce.png'},
	{type:'image', src: assetsEffectDir + 'Teleport.png'},
	
	{type:"plist", src: assetsEffectDir + 'EnergySpike_tentacle.plist'},
	{type:"plist", src: assetsEffectDir + 'EnergySpike_twisted.plist'},
	{type:"plist", src: assetsEffectDir + 'EnergySpike_transform.plist'},
	{type:"plist", src: assetsEffectDir + 'PlayerDeath.plist'},
	{type:"plist", src: assetsEffectDir + 'Jaw.plist'},
	{type:"plist", src: assetsEffectDir + 'JawDisappearing.plist'},
	{type:"plist", src: assetsEffectDir + 'BlockLanding.plist'},
	{type:"plist", src: assetsEffectDir + 'BlockDisappearing.plist'},
	{type:"plist", src: assetsEffectDir + 'SwapColor.plist'},
	{type:"plist", src: assetsEffectDir + 'DoubleJump.plist'},
	{type:"plist", src: assetsEffectDir + 'Spark.plist'},
	{type:"plist", src: assetsEffectDir + 'spawn_unleashed.plist'},
	{type:"plist", src: assetsEffectDir + 'Fireball.plist'},
	{type:"plist", src: assetsEffectDir + 'Fireball_explosion.plist'},
	{type:"plist", src: assetsEffectDir + 'FirePulse_explosion.plist'},
	{type:"plist", src: assetsEffectDir + 'PickAxeDisappearing.plist'},
	{type:"plist", src: assetsEffectDir + 'Bounce.plist'},
	{type:"plist", src: assetsEffectDir + 'Teleport.plist'},

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
	
	//Skill block.
	{type:'image', src: assetsBlockDir + 'block_firePulse.png'},
	{type:'image', src: assetsBlockDir + 'block_jawFall.png'},
	{type:'image', src: assetsBlockDir + 'block_Eclipse.png'},
	{type:'image', src: assetsBlockDir + 'block_peskyBox.png'},
	{type:'image', src: assetsBlockDir + 'block_deflector.png'},
	{type:'image', src: assetsBlockDir + 'block_timeZone.png'},
	
	//Skill.
	{type:'image', src: assetsSkillDir + 'firePulse.png'},
	{type:'image', src: assetsSkillDir + 'jawFall.png'},
	{type:'image', src: assetsSkillDir + 'Eclipse.png'},
	{type:'image', src: assetsSkillDir + 'peskyBox.png'},
	{type:'image', src: assetsSkillDir + 'deflector.png'},
	{type:'image', src: assetsSkillDir + 'timeZone.png'},
	
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
	{type:'image', src: assetsPlayerDir + 'white_idle.png'},
	{type:'image', src: assetsPlayerDir + 'white_running.png'},
	{type:'image', src: assetsPlayerDir + 'white_jumping.png'},
	
	{type:"plist", src: assetsPlayerDir + 'yellow_idle.plist'},
	{type:"plist", src: assetsPlayerDir + 'yellow_running.plist'},
	{type:"plist", src: assetsPlayerDir + 'yellow_jumping.plist'},
	{type:"plist", src: assetsPlayerDir + 'red_idle.plist'},
	{type:"plist", src: assetsPlayerDir + 'red_running.plist'},
	{type:"plist", src: assetsPlayerDir + 'red_jumping.plist'},
	{type:"plist", src: assetsPlayerDir + 'blue_idle.plist'},
	{type:"plist", src: assetsPlayerDir + 'blue_running.plist'},
	{type:"plist", src: assetsPlayerDir + 'blue_jumping.plist'},
	{type:"plist", src: assetsPlayerDir + 'white_idle.plist'},
	{type:"plist", src: assetsPlayerDir + 'white_running.plist'},
	{type:"plist", src: assetsPlayerDir + 'white_jumping.plist'},
	
	//Hud.
	{type:'image', src: assetsHudDir + 'fieldset.png'},
	{type:'image', src: assetsHudDir + 'pickaxe.png'},
	{type:'image', src: assetsHudDir + 'dot_level.png'},
	{type:'image', src: assetsHudDir + 'dot_level_gold.png'},
	{type:'image', src: assetsHudDir + 'skill_locked.png'},
	{type:'image', src: assetsHudDir + 'skill_fieldset.png'},
	{type:'image', src: assetsHudDir + 'power.png'},
	{type:'image', src: assetsHudDir + 'quantity.png'},
	{type:'image', src: assetsHudDir + 'killCommand.png'},
	{type:'plist', src: assetsHudDir + 'killCommand.plist'}
	
];