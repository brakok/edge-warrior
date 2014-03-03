
var SkillInfo = {
	load: function(type){
	
		switch(type){
			case Enum.Block.Skill.FIRE_PULSE:
				return this.FirePulse;
			case Enum.Block.Skill.JAW_FALL:
				return this.JawFall;
			case Enum.Block.Skill.ECLIPSE:
				return this.Eclipse;
		}
		
		return null;
	},
	FirePulse: {
		TITLE: 'Fire pulse',
		DESCRIPTION: 'Log of fire. Release a fire wave when landing. The wave destroys blocks and kills other players.',
		MENU_SPRITE_PATH: assetsSkillDir + 'firePulse.png',
		BLOCK_SPRITE_PATH: assetsBlockDir + 'block_firePulse.png',
		PERCENT_START: 50,
		PERCENT_STEP: 2,
		COST: 5,
		COST_STEP: 5
	},
	JawFall: {
		TITLE: 'Jaw fall',
		DESCRIPTION: 'Launch a carnivorous block that destroys other block on contact. Kill players too.',
		MENU_SPRITE_PATH: assetsSkillDir + 'jawFall.png',
		BLOCK_SPRITE_PATH: assetsBlockDir + 'block_jawFall.png',
		PERCENT_START: 50,
		PERCENT_STEP: 3,
		COST: 5,
		COST_STEP: 5
	},
	Eclipse: {
		TITLE: 'Eclipse',
		DESCRIPTION: 'When landing, create a black circle hiding everything behind it. Owner sees through it.',
		MENU_SPRITE_PATH: assetsSkillDir + 'eclipse.png',
		BLOCK_SPRITE_PATH: assetsBlockDir + 'block_Eclipse.png',
		PERCENT_START: 50,
		PERCENT_STEP: 3,
		COST: 5,
		COST_STEP: 5
	}
};