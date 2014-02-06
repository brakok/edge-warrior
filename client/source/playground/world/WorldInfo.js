
var WorldInfo = {
	random: function(){
		
		var w = this.Pit;
		
		return {
			width: w.WIDTH,
			height: w.HEIGHT,
			type: Enum.World.Type.PIT
		};		
	},
	Pit: {
		WIDTH: 1200,
		HEIGHT: 800,
		Background: {
			SKY_SPRITE_PATH: assetsWorldDir + 'sky.png',
			BACKGROUND_SPRITE_PATH: assetsWorldDir + 'background_pit.png'
		},
		Wall: {
			SPRITE_PATH: assetsWorldDir + 'wall_pit.png',
			CORNER_SPRITE_PATH: assetsWorldDir + 'corner_pit.png'
		},
		Floor: {
			SPRITE_PATH: assetsWorldDir + 'floor_pit.png',
			CORNER_SPRITE_PATH: assetsWorldDir + 'corner_pit.png'
		}
	}
};