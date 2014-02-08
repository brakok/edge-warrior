
var WorldInfo = {
	random: function(){
		
		var w = null;
		var rnd = Math.floor(Math.random()*2);
		
		switch(rnd){
			case Enum.World.Type.PIT:
				w = this.Pit;
				break;
			case Enum.World.Type.CHURCH:
				w = this.Church;
				break;
			default:
				w = this.Pit;
		}
		
		return {
			width: w.WIDTH,
			height: w.HEIGHT,
			type: w.TYPE
		};
	},
	Pit: {
		TYPE: Enum.World.Type.PIT,
		WIDTH: 1200,
		HEIGHT: 800,
		Background: {
			SKY_SPRITE_PATH: assetsWorldDir + 'sky_day.png',
			BACKGROUND_SPRITE_PATH: assetsWorldDir + 'pit_background.png'
		},
		Wall: {
			SPRITE_PATH: assetsWorldDir + 'pit_wall.png',
			CORNER_SPRITE_PATH: assetsWorldDir + 'pit_corner.png'
		},
		Floor: {
			SPRITE_PATH: assetsWorldDir + 'pit_floor.png',
			CORNER_SPRITE_PATH: assetsWorldDir + 'pit_corner.png'
		}
	},
	Church: {
		TYPE: Enum.World.Type.CHURCH,
		WIDTH: 900,
		HEIGHT: 1300,
		Background: {
			SKY_SPRITE_PATH: assetsWorldDir + 'sky_night.png',
			BACKGROUND_SPRITE_PATH: assetsWorldDir + 'church_background.png'
		},
		Wall: {
			SPRITE_PATH: assetsWorldDir + 'church_wall.png',
			CORNER_SPRITE_PATH: assetsWorldDir + 'church_corner.png'
		},
		Floor: {
			SPRITE_PATH: assetsWorldDir + 'church_floor.png',
			CORNER_SPRITE_PATH: assetsWorldDir + 'church_corner.png'
		}
	}
};