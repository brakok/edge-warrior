var DefaultPosition = {
	currentY: 50,
	nextY: 75
};

//HUD needs to be add to the GameScene.
var HUD = cc.Layer.extend({
	fieldset: null,
	currentBlock: null,
	nextBlock: null,
	option1: null,
	option2: null,
	blockDefaultX: 0,
	layer: null,
	init: function(){
		this._super();
	},
	create: function(width, height){

		this.layer = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 0), width, height);
		this.layer.setAnchorPoint(new cc.Point(0.5,0.5));
		
		//Add the fieldset containing player blocks.
		this.fieldset = cc.Sprite.create('placeholders/fieldset.png');
		
		//Set the fieldset in the right corner.
		this.fieldset.setPosition(new cc.Point(width - 150, 100));	
		this.blockDefaultX = width - 100;
		
		this.layer.addChild(this.fieldset);
		
		return this;
	},
	setBlocks: function(current, next){
		this.currentBlock = current.sprite;
		this.nextBlock = next.sprite;		
		
		this.currentBlock.setPosition(new cc.Point(this.blockDefaultX, DefaultPosition.currentY));
		this.nextBlock.setPosition(new cc.Point(this.blockDefaultX, DefaultPosition.nextY));
		
		this.layer.addChild(this.currentBlock);
		this.layer.addChild(this.nextBlock);
	},
	pushBlock: function(block){
		
		this.layer.removeChild(this.currentBlock);
	
		console.log(this.currentBlock.getPosition());
	
		this.currentBlock = this.nextBlock;
		this.nextBlock = block.sprite;
		
		
		
		this.currentBlock.setPosition(new cc.Point(this.blockDefaultX, DefaultPosition.currentY));
		this.nextBlock.setPosition(new cc.Point(this.blockDefaultX, DefaultPosition.nextY));
		
		console.log(this.currentBlock.getPosition());
		
		this.layer.addChild(this.nextBlock);
	}
});

HUD.create = function(width, height) {

	var hud = new HUD();
	hud.init();
	
	return hud.create(width, height);
};