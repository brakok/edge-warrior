
var FallingLabel = function(x, y, value, color, delay, size, startVelX, startVelY, varVelX, varVelY, layer){

	this.x = x;
	this.y = y;
	this.size = size;
	
	this.value = value;
	this.color = color;
	
	this.label = null;
	this.done = false;
	this.appeared = false;
	
	this.timer = 0;
	this.delay = delay;
	
	this.velocity = {
		x: (startVelX - varVelX*0.5) + Math.random()*varVelX,
		y: (startVelY - varVelY*0.5) + Math.random()*varVelY,
	};
		
	this.layer = layer;
};

FallingLabel.prototype.start = function(){
	
	this.label = cc.LabelTTF.create(this.value, Constants.Font.NAME, this.size);
	this.label.setOpacity(0);
	this.label.setPosition(new cc.Point(this.x, this.y));
	this.label.setColor(this.color);
	
	var that = this;
	
	this.label.schedule(function(dt){
	
		if(that.y < 0)
		{
			if(!that.done)
			{
				that.done = true;
				that.label.unscheduleAllCallbacks();
				
				that.layer.removeChild(that.label);
			}
			
			return;
		}
	
		that.timer += dt;
	
		if(that.timer >= that.delay)
		{
			if(!that.appeared)
			{
				that.label.setOpacity(255);
				that.appeared = true;
			}
			
			that.velocity.y -= Constants.Text.FallingLabel.GRAVITY;
		
			that.x += that.velocity.x;
			that.y += that.velocity.y;
			
			that.label.setPosition(new cc.Point(that.x, that.y));
		}
	});
	
	this.layer.addChild(this.label);
};