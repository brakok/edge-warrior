var DefaultPosition = {
	currentY: 50,
	nextY: 75
};

//HUD needs to be add to the GameScene.
var HUD = cc.LayerColor.extend({
	fieldset: null,
	currentBlock: null,
	nextBlock: null,
	option1: null,
	option2: null,
	blockDefaultX: 0,
	layer: null,
	init: function(width, height){
	
		this._super(new cc.Color4B(0, 0, 0, 0), width,height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));
		
		//Add the fieldset containing player blocks.
		this.fieldset = cc.Sprite.create('placeholders/fieldset.png');
		
		//Set the fieldset in the right corner.
		this.fieldset.setPosition(new cc.Point(width - 150, 100));	
		this.blockDefaultX = width - 100;
		
		this.addChild(this.fieldset);
	},
	setBlocks: function(current, next){
	
		if(this.currentBlock != null)
			this.removeChild(this.currentBlock);
			
		if(this.nextBlock != null)
			this.removeChild(this.nextBlock);
	
		this.currentBlock = current.sprite;
		this.nextBlock = next.sprite;		
		
		this.currentBlock.setPosition(new cc.Point(this.blockDefaultX, DefaultPosition.currentY));
		this.nextBlock.setPosition(new cc.Point(this.blockDefaultX, DefaultPosition.nextY));
		
		this.addChild(this.currentBlock);
		this.addChild(this.nextBlock);
	},
	pushBlock: function(block){
		
		this.removeChild(this.currentBlock);
	
		//Push the new block on the next and the next on the current.
		this.currentBlock = this.nextBlock;
		this.nextBlock = block.sprite;
		
		this.currentBlock.setPosition(new cc.Point(this.blockDefaultX, DefaultPosition.currentY));
		this.nextBlock.setPosition(new cc.Point(this.blockDefaultX, DefaultPosition.nextY));
		
		this.addChild(this.nextBlock);
	}
});

HUD.create = function(width, height) {

	var hud = new HUD();
	hud.init(width, height);
	
	return hud;
};