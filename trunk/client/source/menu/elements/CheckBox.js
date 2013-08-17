
var CheckBox = function(layer, x, y, checked){
	this.layer = layer;
	this.x = x;
	this.y = y;
	
	if(checked != null)
		this.checked = checked;
	else
		this.checked = false;
		
	this.button = null;
	this.menu = null;
	
	this.init();
};

CheckBox.prototype.init = function(){
	this.button	= cc.MenuItemImage.create(assetsMenuDir + this.checked	+ '.png', 
										  assetsMenuDir + this.checked + '.png',
										  this.toggle,
										  this);
										  
	this.button.setPosition(new cc.Point(this.x, this.y));	  
	
	this.menu = new cc.Menu.create(this.button);
	this.menu.setPosition(new cc.Point(0,0));
		
	this.layer.addChild(this.menu);
};

//Toggle between true and false.
CheckBox.prototype.toggle = function(){

	this.checked = !this.checked;
		
	//Toggle both selected and normal images for the desired.
	this.button.removeChild(this.button._normalImage);
	this.button._normalImage = cc.Sprite.create(assetsMenuDir + this.checked + '.png');
	this.button._normalImage.setAnchorPoint(cc.p(0, 0));
	this.button.addChild(this.button._normalImage);
	
	this.button.removeChild(this.button._selectedImage);
	this.button._selectedImage = cc.Sprite.create(assetsMenuDir + this.checked + '.png');
	this.button._selectedImage.setAnchorPoint(cc.p(0, 0));
	this.button.addChild(this.button._selectedImage);
};

CheckBox.prototype.removeChildren = function(){
	this.layer.removeChild(this.menu);
};