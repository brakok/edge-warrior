
var DeathZoneManager = {
	launch: function(deathZone){
	
		Game.deathZoneSequence++;
		Game.deathZones.push(deathZone);
		
		var data = {
			id: deathZone.id,
			type: deathZone.stats.type,
			x: deathZone.x,
			y: deathZone.y
		};
		
		//Insert specific custom data.
		switch(deathZone.stats.type){
			case Enum.DeathZone.Type.ENERGY_SPIKE:
				data.finalX = deathZone.finalX;
				data.finalY = deathZone.finalY;
				break;
		}
		
		io.sockets.in(Game.id).emit(Constants.Message.NEW_DEATHZONE, data);
	}
};