
var DeathZoneManager = function(game){
	this.currentGame = game;
};

DeathZoneManager.prototype.launch = function(deathZone){
	
	this.currentGame.deathZoneSequence++;
	this.currentGame.deathZones.push(deathZone);
	
	var data = {
		id: deathZone.id,
		type: deathZone.type,
		x: deathZone.parent != null && deathZone.relX != null ? deathZone.parent.x + deathZone.relX : deathZone.x,
		y: deathZone.parent != null && deathZone.relY != null ? deathZone.parent.y + deathZone.relY : deathZone.y,
		vel: deathZone.vel
	};

	//Insert specific custom data.
	switch(deathZone.type){
		case Enum.DeathZone.Type.ENERGY_SPIKE:
			data.finalX = deathZone.finalX;
			data.finalY = deathZone.finalY;
			break;
	}
	
	io.sockets.in(this.currentGame.id).emit(Constants.Message.NEW_DEATHZONE, data);
};