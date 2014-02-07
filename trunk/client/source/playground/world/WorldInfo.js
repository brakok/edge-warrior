
var WorldInfo = {
	random: function(){
		
		var w = this.Church;
		
		return {
			width: w.WIDTH,
			height: w.HEIGHT,
			type: Enum.World.Type.CHURCH
		};		
	},
	Pit: {
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
		WIDTH: 900,
		HEIGHT: 1300,
		Background: {
			SKY_SPRITE_PATH: assetsWorldDir + 'sky_night.png',
			BACKGROUND_SPRITE_PATH: assetsWorldDir + 'pit_background.png'
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