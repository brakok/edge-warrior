
var World = function(type, layer){

	var info = null;
	
	this.layer = layer;
	
	switch(type){
		case Enum.World.Type.PIT:
			info = WorldInfo.Pit;
			break;
		case Enum.World.Type.CHURCH:
			info = WorldInfo.Church;
			break;
		case Enum.World.Type.ALIEN:
			info = WorldInfo.Alien;
			break;
	}
	
	if(info)
	{
		this.info = info;
	
		this.width = info.WIDTH;
		this.height = info.HEIGHT;
		
		//Create background.
		this.background = new Background(this.width*0.5, this.height*0.5, this.width, this.height, info.Background);
		
		//Create walls and floor.
		this.floor = new Floor(this.width*0.5, 12, this.width, false, info.Floor);
		this.leftWall = new Wall(Enum.Direction.RIGHT, 0, this.height + 12, this.height*2, true, info.Wall);
		this.rightWall = new Wall(Enum.Direction.LEFT, this.width, this.height + 12, this.height*2, true, info.Wall);
		
		//Black boxes are used to hide spikes when they raise from the ground.	
		this.blackBoxes = [];
		this.blackBoxes.push(new BlackBox(-this.width*0.5-Constants.World.OFFSET, this.height*0.5, this.width, this.height*4));
		this.blackBoxes.push(new BlackBox(this.width*0.5, -this.height*0.5, this.width*3, this.height));
		this.blackBoxes.push(new BlackBox(this.width*1.5+Constants.World.OFFSET, this.height*0.5, this.width, this.height*4));
		
		//Add walls to layer.
		this.leftWall.load(this.layer);
		this.rightWall.load(this.layer);
		this.floor.load(this.layer);
		this.background.load(this.layer);
	}	
};

World.prototype.update = function(){
	
	this.floor.update();
	this.leftWall.update();
	this.rightWall.update();
	this.background.update();
	
	for(var i = 0; i < this.blackBoxes.length; ++i)
		this.blackBoxes[i].update();
};