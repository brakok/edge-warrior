
var WorldInfo = {
	create: function(type, width, height, game){
	
		var world = null;
		
		switch(type){
			case Enum.World.Type.CHURCH:
				world = new WorldInfo.Church(width, height, game);
				break;
			case Enum.World.Type.ALIEN:
				world = new WorldInfo.Alien(width, height, game);
				break;
			case Enum.World.Type.PIT:
				world = new WorldInfo.Pit(width, height, game);
				break;
		}
		
		return world;
	}
};