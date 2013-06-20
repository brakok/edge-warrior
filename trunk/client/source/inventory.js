var Inventory = function(offset, y, screenWidth, layer){

	//Default position relative to fieldset.
	this.defaultPosition = {
		current: {x : -15, y: -10 },
		next: { x : 40, y : 20 }
	};

	this.layer = layer;
	this.x = screenWidth - offset;
	this.y = y;
	
	this.currentBlock = null;
	this.nextBlock = null;
	
	//Add the fieldset containing player blocks.
	this.fieldset = cc.Sprite.create(assetsHudDir + 'fieldset.png');
	
	//Set the fieldset in the right corner.
	this.fieldset.setPosition(new cc.Point(this.x, y));	
		
	this.layer.addChild(this.fieldset);
};

Inventory.prototype.setBlocks = function(current, next){
	
	if(this.currentBlock != null)
		this.layer.removeChild(this.currentBlock);
		
	if(this.nextBlock != null)
		this.layer.removeChild(this.nextBlock);

	this.currentBlock = current.sprite;
	this.nextBlock = next.sprite;		
	
	this.currentBlock.setPosition(new cc.Point(this.x + this.defaultPosition.current.x, this.y + this.defaultPosition.current.y));
	this.nextBlock.setPosition(new cc.Point(this.x + this.defaultPosition.next.x, this.y + this.defaultPosition.next.y));
	
	//Place current above next.
	this.currentBlock._zOrder = Constants.HUD.Inventory.CURRENT_Z_INDEX;
	this.nextBlock._zOrder = Constants.HUD.Inventory.NEXT_Z_INDEX;
	
	this.currentBlock.setScale(1.6);
	this.nextBlock.setScale(1.2);
	
	this.layer.addChild(this.currentBlock);
	this.layer.addChild(this.nextBlock);
};

Inventory.prototype.pushBlock = function(block){
		
		this.layer.removeChild(this.currentBlock);
	
		//Push the new block on the next and the next on the current.
		this.currentBlock = this.nextBlock;
		this.nextBlock = block.sprite;
		
		//Set correct scale and good z-index on current.
		this.currentBlock._zOrder = Constants.HUD.Inventory.CURRENT_Z_INDEX;
		this.nextBlock._zOrder = Constants.HUD.Inventory.NEXT_Z_INDEX;
		
		this.currentBlock.setScale(1.6);
		this.nextBlock.setScale(1.2);
		
		//Set their position.
		this.currentBlock.setPosition(new cc.Point(this.x + this.defaultPosition.current.x, this.y + this.defaultPosition.current.y));
		this.nextBlock.setPosition(new cc.Point(this.x + this.defaultPosition.next.x, this.y + this.defaultPosition.next.y));
		
		this.layer.addChild(this.nextBlock);
};