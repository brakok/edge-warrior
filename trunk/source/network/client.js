//Object containing network information.
var Client = function(){
	
	this.connect = function(){
		this.socket = io.connect('http://localhost:80');
		
		this.socket.on('init', function (data) {
			console.log('Sending player...');
			
			//Server positioning and giving color to player.
			GameContainer.you = new Player(data.x, data.y, data.color);
			socket.emit('init', GameContainer.you);
		});
	};
};

