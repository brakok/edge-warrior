
var SkillList = function(x, y, columns, rows, layer){
	this.x = x;
	this.y = y;
	this.columns = columns;
	this.rows = rows;
	
	this.layer = layer;
	
	this.title = null;
	this.list = null;
	
	this.selectedSkill = null;

	this.init();
};

SkillList.prototype.init = function(){
	
	this.list = SkillDescription.loadAll();
	
	//Item size.
	var itemWidth = Constants.Menu.SkillScreen.SkillList.ITEM_WIDTH*Constants.Menu.SkillScreen.SkillList.SCALE_X;
	var itemHeight = Constants.Menu.SkillScreen.SkillList.ITEM_HEIGHT*Constants.Menu.SkillScreen.SkillList.SCALE_Y;
	
	//Board size.
	var width = (this.columns-1) * Constants.Menu.SkillScreen.SkillList.MARGIN_X + this.columns*itemWidth;
	var height = (this.rows-1) * Constants.Menu.SkillScreen.SkillList.MARGIN_Y + this.rows*itemHeight;
	
	//Compute step size.
	var stepX = itemWidth + Constants.Menu.SkillScreen.SkillList.MARGIN_X;
	var stepY = itemHeight + Constants.Menu.SkillScreen.SkillList.MARGIN_Y;
	
	//Compute top left corner.
	var initialX = this.x - (width*0.5) + (itemWidth*0.5);
	var initialY = this.y + (height*0.5) - (itemHeight*0.5);
	
	var rowIndex = 0;
	var that = this;
	
	for(var i = 0; i < this.list.length; i++)
	{
		rowIndex = Math.floor(i/this.columns);
	
		this.list[i].load(initialX + stepX*(i % this.columns), 
						  initialY + stepY*rowIndex, 
						  Constants.Menu.SkillScreen.SkillList.SCALE_X, 
						  Constants.Menu.SkillScreen.SkillList.SCALE_X,
						  this.layer, 
						  function(){
							that.layer.selectSkill(this);
							this.select();
						  });
	}
	
	//Set title.
	this.title = cc.LabelTTF.create("Choose your skills", Constants.Font.NAME, Constants.Font.SIZE);
	this.title.setColor(new cc.Color3B(0,0,0));
	this.title.setPosition(new cc.Point(this.x - width*0.5 + 100, this.y + height*0.5 + 40));
	
	this.layer.addChild(this.title);
};