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
		this.layer.removeChild(this.currentBlock.sprite);
		
	if(this.nextBlock != null)
		this.layer.removeChild(this.nextBlock.sprite);

	//Set the new blocks.
	this.setCurrent(current);
	this.setNext(next);		
	
	//Add to layer.
	this.layer.addChild(this.currentBlock.sprite);
	this.layer.addChild(this.nextBlock.sprite);
};

Inventory.prototype.pushBlock = function(block){
		
		this.layer.removeChild(this.currentBlock.sprite);
	
		//Push the new block on the next and the next on the current.
		this.setCurrent(this.nextBlock);
		this.setNext(block);

		//Add to layer.
		this.layer.addChild(this.nextBlock.sprite);
};

//Set current block.
Inventory.prototype.setCurrent = function(block){
	this.currentBlock = block;
	
	//Set correct scale and good z-index on current.
	this.currentBlock.sprite._zOrder = Constants.HUD.Inventory.Current.Z_INDEX;
	
	//Resize block.
	this.currentBlock.sprite.setScale(Constants.HUD.Inventory.Current.SCALE * this.currentBlock.scale);
	
	//Set it position.
	this.currentBlock.sprite.setPosition(new cc.Point(this.x + this.defaultPosition.current.x, this.y + this.defaultPosition.current.y));
};

//Set next block.
Inventory.prototype.setNext = function(block){
	this.nextBlock = block;
	
	//Set correct scale and good z-index on next block.
	this.nextBlock.sprite._zOrder = Constants.HUD.Inventory.Next.Z_INDEX;
	
	//Resize block.
	this.nextBlock.sprite.setScale(Constants.HUD.Inventory.Next.SCALE * this.nextBlock.scale);
	
	//Set it position.
	this.nextBlock.sprite.setPosition(new cc.Point(this.x + this.defaultPosition.next.x, this.y + this.defaultPosition.next.y));
};