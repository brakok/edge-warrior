
var Overlord = {
	assignKill: function(killed){
		var killerIndex = Math.round((Math.random()*(Game.connectedPlayers-1))-0.5);
		var otherPlayers = [];
		
		for(var i in Game.players)
		{
			if(Game.players[i].id != killed.id)
				otherPlayers.push(Game.players[i]);
		}
		
		//Keep track of killed victims.
		var tmpKilledList = (!otherPlayers[killerIndex].isAlive ? killed.killedList : null);
		
		//Assign the kill.
		otherPlayers[killerIndex].kill(killed, BlockType.NEUTRAL);
		
		if(tmpKilledList != null)
		{
			otherPlayers[killerIndex].killedList = [];
			otherPlayers[killerIndex].killedList.push(killed.id);
			
			killed.killedList = tmpKilledList;
		}
	}
};