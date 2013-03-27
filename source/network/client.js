//Object containing network information.
var Client = function(){

	this.connect = function(){
		this.ready = false;
		
		var socket = io.connect('http://localhost:80');
		
		socket.on('init', function (data) {
			console.log('Receiving initiation data...');
			
			//Server positioning and giving color to player.
			GameContainer.you = new Player(data.you.x, data.you.y, data.you.color);
			
			//Positioning enemies.
			for(var i in data.enemies)
			{
				GameContainer.addPlayer(new Player(data.enemies[i].x,
													data.enemies[i].y,
													data.enemies[i].color));
			}
			
			socket.emit('init', GameContainer.you.toServer());
			GameContainer.initLayer();
		});
		
		socket.on('pull', function (data){
			GameContainer.players[0].fromServer(data);
		});
		
		//Once defined, preserved the socket.
		this.socket = socket;
	};
	
	//Pushing info to server.
	this.push = function(){
		this.socket.emit('push', GameContainer.you.toServer());
	};
	
	//Pulling info from server.
	this.pull = function(){
		this.socket.emit('pull');
	};
};

