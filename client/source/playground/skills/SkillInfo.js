
var SkillInfo = {
	load: function(type){
	
		switch(type){
			case Enum.Block.Skill.FIRE_PULSE:
				return this.FirePulse;
			case Enum.Block.Skill.JAW_FALL:
				return this.JawFall;
			case Enum.Block.Skill.ECLIPSE:
				return this.Eclipse;
			case Enum.Block.Skill.PESKY_BOX:
				return this.PeskyBox;
			case Enum.Block.Skill.DEFLECTOR:
				return this.Deflector;
			case Enum.Block.Skill.TIME_ZONE:
				return this.TimeZone;
		}
		
		return null;
	},
	FirePulse: {
		TITLE: 'Fire pulse',
		DESCRIPTION: 'Log of fire. Release a fire wave when landing. The wave destroys blocks and kills other players.',
		MENU_SPRITE_PATH: assetsSkillDir + 'firePulse.png',
		BLOCK_SPRITE_PATH: assetsBlockDir + 'block_firePulse.png',
		PERCENT_START: 4,
		PERCENT_STEP: 3,
		COST: 650,
		COST_STEP: 850
	},
	JawFall: {
		TITLE: 'Jaw fall',
		DESCRIPTION: 'Launch a carnivorous block that destroys other block on contact. Kill players too.',
		MENU_SPRITE_PATH: assetsSkillDir + 'jawFall.png',
		BLOCK_SPRITE_PATH: assetsBlockDir + 'block_jawFall.png',
		PERCENT_START: 4,
		PERCENT_STEP: 3,
		COST: 700,
		COST_STEP: 800
	},
	Eclipse: {
		TITLE: 'Eclipse',
		DESCRIPTION: 'When landing, create a black circle hiding everything behind it. Owner sees through it.',
		MENU_SPRITE_PATH: assetsSkillDir + 'eclipse.png',
		BLOCK_SPRITE_PATH: assetsBlockDir + 'block_Eclipse.png',
		PERCENT_START: 5,
		PERCENT_STEP: 3,
		COST: 850,
		COST_STEP: 1150
	},
	PeskyBox: {
		TITLE: 'Pesky box',
		DESCRIPTION: 'When landing, create an annoying character that follows his target for a short duration. Player loses all speed upon contact.',
		MENU_SPRITE_PATH: assetsSkillDir + 'peskyBox.png',
		BLOCK_SPRITE_PATH: assetsBlockDir + 'block_peskyBox.png',
		PERCENT_START: 6,
		PERCENT_STEP: 3,
		COST: 725,
		COST_STEP: 850
	},
	Deflector: {
		TITLE: 'Deflector',
		DESCRIPTION: 'When landing, create a deflector which bumps players who touch it.',
		MENU_SPRITE_PATH: assetsSkillDir + 'deflector.png',
		BLOCK_SPRITE_PATH: assetsBlockDir + 'block_deflector.png',
		PERCENT_START: 5,
		PERCENT_STEP: 3,
		COST: 675,
		COST_STEP: 825
	},
	TimeZone: {
		TITLE: 'Time zone',
		DESCRIPTION: 'When landing, create a time zone which restores players position when ending. Destroy blocks that were not landed when the time zone started.',
		MENU_SPRITE_PATH: assetsSkillDir + 'timeZone.png',
		BLOCK_SPRITE_PATH: assetsBlockDir + 'block_timeZone.png',
		PERCENT_START: 4,
		PERCENT_STEP: 3,
		COST: 915,
		COST_STEP: 925
	}
};