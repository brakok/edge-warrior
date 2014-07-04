
cd.Server.WorldInfo = {
	create: function(type, width, height, game){
	
		var world = null;
		
		switch(type){
			case Enum.World.Type.CHURCH:
				world = new cd.Server.WorldInfo.Church(width, height, game);
				break;
			case Enum.World.Type.ALIEN:
				world = new cd.Server.WorldInfo.Alien(width, height, game);
				break;
			case Enum.World.Type.PIT:
				world = new cd.Server.WorldInfo.Pit(width, height, game);
				break;
		}
		
		return world;
	}
};