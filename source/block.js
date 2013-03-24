var Block = function (x, y, color) {

	this.color = color;
	this.sprite = cc.Sprite.create('placeholders/block_' + color + '.png');
	
	this.sprite.setPosition(new cc.Point(x, y));
	this.sprite.setScale(2, 0.5);

	/*
	var testScale = 3;
	this.sprite.schedule(function (){
		testScale += 0.05;
		this.setScale(testScale, 1);
	});
	*/
}