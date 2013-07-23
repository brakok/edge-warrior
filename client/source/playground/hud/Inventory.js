var Inventory = function(offset, y, screenWidth, layer){

	this.layer = layer;
	this.x = screenWidth - offset;
	this.y = y;
	
	this.blocks = null;
	
	this.killCommand = new KillCommand(this.x + Constants.HUD.Inventory.KillCommand.REL_X, this.y + Constants.HUD.Inventory.KillCommand.REL_Y, screenWidth, layer);
	
	//Add the fieldset containing player blocks.
	this.fieldset = cc.Sprite.create(assetsHudDir + 'fieldset.png');
	
	//Set the fieldset in the right corner.
	this.fieldset.setPosition(new cc.Point(this.x, y));	
		
	this.layer.addChild(this.fieldset);
};

Inventory.prototype.update = function(dt){
	this.killCommand.update(dt);
};

Inventory.prototype.getCurrent = function(){
	return this.blocks[0];
};

Inventory.prototype.setBlocks = function(current, next){
	
	if(this.blocks != null)
	{
		for(var i in this.blocks)
		{
			if(this.blocks[i] != null)
			{
				this.layer.removeChild(this.blocks[i].sprite);
				delete this.blocks[i];
			}
		}
		
		this.blocks = [];
	}
	else
		this.blocks = [];
	
	//Set the new blocks.
	this.setCurrent(current);
	this.addBlock(next);
};

Inventory.prototype.useBlock = function(){

	this.layer.removeChild(this.blocks[0].sprite);
	
	if(this.blocks[1] != null)
		this.layer.removeChild(this.blocks[1].sprite);
	
	this.blocks.splice(0, 1);
	
	for(var i = 0; i < this.blocks.length; i++)
		if(i < 2)
			this.renderBlock(i);
};

//Add a block in the list.
Inventory.prototype.addBlock = function(block){
		
		var index = this.blocks.length;
		this.blocks.push(block);
		
		this.renderBlock(index);
};

//Set current block.
Inventory.prototype.setCurrent = function(block){

	if(this.blocks[0] != null)
		this.layer.removeChild(this.blocks[0].sprite);
	
	if(this.blocks[1] != null)
		this.layer.removeChild(this.blocks[1].sprite);

	this.blocks.unshift(block);
	
	//Render first two blocks.
	for(var i = 0; i < (this.blocks.length > 2 ? 2 : this.blocks.length); i++)
		this.renderBlock(i);
};

//Add to layer to be displayed.
Inventory.prototype.renderBlock = function(index){
	
	//Set good Z-index.
	this.blocks[index].sprite._zOrder = Constants.HUD.Inventory.Current.Z_INDEX + (index*Constants.HUD.Inventory.Next.STEP_Z_INDEX);
	//Resize block.
	this.blocks[index].sprite.setScale((Constants.HUD.Inventory.Current.SCALE*this.blocks[index].scale) +  (index*Constants.HUD.Inventory.Next.STEP_SCALE));
	//Set it position.
	this.blocks[index].sprite.setPosition(new cc.Point(this.x + Constants.HUD.Inventory.Current.REL_X + (index*Constants.HUD.Inventory.Next.STEP_X), 
													   this.y + Constants.HUD.Inventory.Current.REL_Y + (index*Constants.HUD.Inventory.Next.STEP_Y)));
	
	//Add to layer if there's only one block in the inventory.
	if(index < 2)
		this.layer.addChild(this.blocks[index].sprite);
};