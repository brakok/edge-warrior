
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
		
		io.sockets.in(Game.id).emit(Constants.Message.NEW_DEATHZONE, data);
	}
};