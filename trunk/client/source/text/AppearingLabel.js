
//Delay in second.
var AppearingLabel = function(x, y, value, color, delay, apparitionTime, startSize, endSize, layer){
	this.x = x;
	this.y = y;
	this.color = color;
	
	this.label = null;
	
	this.value = value;
	this.done = false;
	
	this.timer = 0;
	this.delay = delay;
	this.apparitionTime = apparitionTime;
	
	this.startSize = startSize;
	this.endSize = endSize;
	this.deltaSize = endSize - startSize;
	
	this.layer = layer;
};

AppearingLabel.prototype.start = function(){
	
	this.label = cc.LabelTTF.create(this.value, Constants.Font.NAME, this.startSize);
	this.label.setOpacity(0);
	this.label.setPosition(new cc.Point(this.x, this.y));
	this.label.setColor(this.color);

	var that = this;
	
	this.label.schedule(function(dt){
	
		if(that.timer > that.delay + that.apparitionTime)
		{
			if(!that.done)
			{
				that.label.setOpacity(255);
				that.label.setFontSize(that.endSize);
				that.done = true;
			}

			that.label.unscheduleAllCallbacks();
			return;
		}

		that.timer += dt;
		
		if(that.timer >= that.delay)
		{
			var elapsed = that.timer - that.delay;
			var factor = elapsed/that.apparitionTime;
			
			if(factor > 1)
				factor = 1;
			
			that.label.setOpacity(factor*255);
			that.label.setFontSize(that.startSize + that.deltaSize*factor);
		}
	});
	
	this.layer.addChild(this.label);
};