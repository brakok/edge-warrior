
var ColorBox = function(layer, x, y, colorType){
	this.layer = layer;
	this.x = x;
	this.y = y;
	this.colorType = colorType;
	
	this.button = null;
	this.menu = null;
		
	this.init();
};

ColorBox.prototype.init = function(){
	this.button	= cc.MenuItemImage.create(assetsMenuDir + this.colorType + '.png', 
										  assetsMenuDir + this.colorType + '.png',
										  this.switchColor,
										  this);
										  
	this.button.setPosition(new cc.Point(this.x, this.y));	  
	
	this.menu = new cc.Menu.create(this.button);
	this.menu.setPosition(new cc.Point(0,0));
		
	this.layer.addChild(this.menu);
};

ColorBox.prototype.switchColor = function(){
	
	if(this.colorType >= Enum.Slot.Color.WHITE)
		this.colorType = Enum.Slot.Color.UNASSIGNED;
	else
		this.colorType++;
		
	//Toggle both selected and normal images for the desired.
	this.button.removeChild(this.button._normalImage);
	this.button._normalImage = cc.Sprite.create(assetsMenuDir + this.colorType + '.png');
	this.button._normalImage.setAnchorPoint(cc.p(0, 0));
	this.button.addChild(this.button._normalImage);
	
	this.button.removeChild(this.button._selectedImage);
	this.button._selectedImage = cc.Sprite.create(assetsMenuDir + this.colorType + '.png');
	this.button._selectedImage.setAnchorPoint(cc.p(0, 0));
	this.button.addChild(this.button._selectedImage);
};

ColorBox.prototype.removeChildren = function(){
	this.layer.removeChild(this.menu);
};