var DefaultPosition = {
	current: {x :0, y: 65, offset: 140 },
	next: { x :0, y : 95, offset: 85 }
};

//HUD needs to be add to the GameScene.
var HUD = cc.LayerColor.extend({
	fieldset: null,
	currentBlock: null,
	nextBlock: null,
	option1: null,
	option2: null,
	layer: null,
	init: function(width, height){
	
		this._super(new cc.Color4B(0, 0, 0, 0), width,height);
		this.setAnchorPoint(new cc.Point(0.5,0.5));
		
		//Add the fieldset containing player blocks.
		this.fieldset = cc.Sprite.create(assetsHudDir + 'fieldset.png');
		
		//Set the fieldset in the right corner.
		this.fieldset.setPosition(new cc.Point(width - 125, 75));	
		
		DefaultPosition.current.x = width - DefaultPosition.current.offset;
		DefaultPosition.next.x = width - DefaultPosition.next.offset;
		
		this.addChild(this.fieldset);
	},
	setBlocks: function(current, next){
	
		if(this.currentBlock != null)
			this.removeChild(this.currentBlock);
			
		if(this.nextBlock != null)
			this.removeChild(this.nextBlock);
	
		this.currentBlock = current.sprite;
		this.nextBlock = next.sprite;		
		
		this.currentBlock.setPosition(new cc.Point(DefaultPosition.current.x, DefaultPosition.current.y));
		this.nextBlock.setPosition(new cc.Point(DefaultPosition.next.x, DefaultPosition.next.y));
		
		//Place current above next.
		this.currentBlock._zOrder = 1;
		this.currentBlock.setScale(1.6);
		this.nextBlock.setScale(1.2);
		
		this.addChild(this.currentBlock);
		this.addChild(this.nextBlock);
	},
	pushBlock: function(block){
		
		this.removeChild(this.currentBlock);
	
		//Push the new block on the next and the next on the current.
		this.currentBlock = this.nextBlock;
		this.nextBlock = block.sprite;
		
		//Set correct scale and good z-index on current.
		this.currentBlock._zOrder = 1;
		this.currentBlock.setScale(1.6);
		this.nextBlock.setScale(1.2);
		
		//Set their position.
		this.currentBlock.setPosition(new cc.Point(DefaultPosition.current.x, DefaultPosition.current.y));
		this.nextBlock.setPosition(new cc.Point(DefaultPosition.next.x, DefaultPosition.next.y));
		
		this.addChild(this.nextBlock);
	}
});

HUD.create = function(width, height) {

	var hud = new HUD();
	
	//Infront of everything.
	hud._zOrder = 1000;
	hud.init(width, height);
	
	return hud;
};