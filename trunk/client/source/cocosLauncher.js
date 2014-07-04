(function () {
	var doc = document;
	
	//Create Cocos2d confguration.
	var config = {
		COCOS2D_DEBUG:2,
		box2d:false,
		showFPS:false,
		frameRate:60,
		tag:'gameCanvas',
		engineDir:'source/lib/Cocos2d/cocos2d/',
		appFiles:[
				  //Client
				  'source/constants/Constant.js',
				  'source/constants/Enum.js',
				  'source/network/socket.io.js',
				  
				  'source/Resources.js',
				  
				  'source/common/HtmlHelper.js',
				  'source/common/Chat.js',
				  'source/common/Util.js',
				  'source/common/Smoothering.js',
				  
				  'source/playground/client/Block.js',
				  'source/playground/client/Player.js',
				  'source/playground/client/world/Wall.js',
				  'source/playground/client/world/Floor.js',
				  'source/playground/client/winnerGoal/FloatingBall.js',
				  'source/playground/client/Eclipse.js',
				  
				  'source/playground/client/skills/SkillInfo.js',
				  'source/playground/client/skills/SkillDescription.js',
				  
				  'source/settings/GameSettings.js',
				  'source/settings/Keys.js',
				  'source/playground/client/skills/SkillSet.js',
				  'source/settings/Options.js',
				  'source/menu/elements/SkillList.js',
				  'source/menu/elements/SkillSummary.js',
				  'source/menu/elements/SkillSlot.js',
				  'source/menu/elements/Slot.js',
				  'source/menu/elements/ColorBox.js',
				  'source/menu/elements/CheckBox.js',
				  'source/menu/elements/LobbyList.js',
				  'source/menu/elements/KeyForm.js',
				  'source/menu/elements/KeyInput.js',
				  'source/playground/client/BlockOption.js',
				  'source/playground/client/Camera.js',
				  
				  'source/network/client.js',
				  'source/network/Profile.js',
				  
				  'source/scene/GameScene.js',
				  'source/scene/MenuScene.js',
				  'source/menu/MenuScreens.js',
				  'source/menu/LobbyScreen.js',
				  'source/menu/Credits.js',
				  'source/menu/RulesScreen.js',
				  'source/menu/Login.js',
				  'source/menu/ChangePassword.js',
				  'source/menu/ResetPassword.js',
				  'source/menu/CreateAccount.js',
				  'source/menu/MainMenu.js',
				  'source/menu/ServerList.js',
				  'source/menu/EndScreen.js',
				  'source/menu/PauseMenu.js',
				  'source/menu/OptionsScreen.js',
				  'source/menu/KeysScreen.js',
				  'source/menu/VideoScreen.js',
				  'source/menu/SkillScreen.js',
				  'source/menu/LoadingScreen.js',
				  
				  'source/playground/client/Game.js',
				  'source/playground/client/hud/Inventory.js',
				  'source/playground/client/manager/AnimationManager.js',
				  'source/playground/client/manager/AudioManager.js',
				  
				  'source/playground/client/hud/KillCommand.js',
				  'source/playground/client/hud/SkillStore.js',
				  'source/playground/client/hud/SkillItem.js',
				  'source/playground/client/hud/PickAxeCounter.js',
				  
				  'source/playground/client/particles/ChargingDot.js',
				  'source/playground/client/particles/Particle.js',
				  'source/playground/client/particles/ParticleEmitter.js',
				  
				  'source/playground/client/deathzones/Missile.js',
				  'source/playground/client/deathzones/Spike.js',
				  'source/playground/client/deathzones/Jaw.js',
				  
				  'source/playground/client/triggers/Deflector.js',
				  'source/playground/client/triggers/TimeZone.js',
				  'source/playground/client/triggers/GravityBeam.js',
				  'source/playground/client/triggers/VenomWave.js',
				  'source/playground/client/triggers/VenomBall.js',
				  
				  'source/playground/client/npc/PeskyBox.js',
				  'source/playground/client/npc/SandSpirit.js',
				  
				  'source/text/AppearingLabel.js',
				  'source/text/FallingLabel.js',
				  
				  'source/playground/client/manager/EffectManager.js',
				  'source/playground/client/manager/ElementManager.js',
				  'source/playground/client/manager/ParticleManager.js',
				  'source/playground/client/Effect.js',
				  'source/playground/client/world/BlackBox.js',
				  'source/playground/client/world/World.js',
				  'source/playground/client/world/WorldInfo.js',
				  'source/playground/client/LightBall.js',
				  'source/playground/client/Voice.js',
				  'source/playground/client/hud/Hud.js',
				  'source/playground/client/world/Background.js',
				  
				  //Server
				  'source/network/Lobby.js',
				  'source/network/GameSettings.js'
				  'source/network/Server.js',
				  
				 'source/playground/server/deathzones/Jaw.js',
				 'source/playground/server/deathzones/Missile.js',
				 'source/playground/server/deathzones/Spike.js',
				 
				 'source/playground/server/listeners/Listener.js',
				 'source/playground/server/listeners/BlockListener.js',
				 'source/playground/server/listeners/DeathZoneListener.js',
				 'source/playground/server/listeners/DropListener.js',
				 'source/playground/server/listeners/GoalListener.js',
				 'source/playground/server/listeners/GroundListener.js',
				 'source/playground/server/listeners/NpcListener.js',
				 'source/playground/server/listeners/TriggerListener.js',
				 
				 'source/playground/server/managers/Manager.js',
				 'source/playground/server/managers/BlockManager.js',
				 'source/playground/server/managers/DeathZoneManager.js',
				 'source/playground/server/managers/NpcManager.js',
				 'source/playground/server/managers/TriggerManager.js',
				 
				 'source/playground/server/npc/PeskyBox.js',
				 'source/playground/server/npc/SandSpirit.js',
				 
				 'source/playground/server/skills/SkillInfo.js',
				 'source/playground/server/skills/Deflector.js',
				 'source/playground/server/skills/Eclipse.js',
				 'source/playground/server/skills/FirePulse.js',
				 'source/playground/server/skills/JawFall.js',
				 'source/playground/server/skills/PeskyBox.js',
				 'source/playground/server/skills/TimeZone.js',
				 
				 'source/playground/server/triggers/Deflector.js',
				 'source/playground/server/triggers/GravityBeam.js',
				 'source/playground/server/triggers/TimeZone.js',
				 'source/playground/server/triggers/VenomBall.js',
				 'source/playground/server/triggers/VenomWave.js',
				 
				 'source/playground/server/winnerGoal/floatingBall.js',
				 
				 'source/playground/server/world/elements/SpawnZone.js',
				 'source/playground/server/world/WorldInfo.js',
				 'source/playground/server/world/Alien.js',
				 'source/playground/server/world/Church.js',
				 'source/playground/server/world/Pit.js',
				 
				 'source/playground/server/Block.js',
				 'source/playground/server/Game.js',
				 'source/playground/server/Overlord.js',
				 'source/playground/server/Player.js']
	};
	
	//Add event that load everything needed by Cocos2d.
	window.addEventListener('DOMContentLoaded', function (){
		var script = doc.createElement('script');
		script.src = config.engineDir + 'jsloader.js';
		doc.body.appendChild(script);
		script.id = 'cocos2d-html5';	

		document.ccConfig = config;
	});
})();