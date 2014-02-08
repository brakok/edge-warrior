var Smoke = cc.ParticleSystem.extend({
    init:function () {
        return this.initWithTotalParticles(Constants.Particles.Smoke.PARTICLES_COUNT);
    },
    initWithTotalParticles:function (numberOfParticles) {
        if (cc.ParticleSystem.prototype.initWithTotalParticles.call(this, numberOfParticles)) {
            // duration
            this.setDuration(0.75);

            // Gravity Mode
            this.setEmitterMode(cc.PARTICLE_MODE_GRAVITY);

            // Gravity Mode: gravity
            this.setGravity(cc.p(1, 0));

            // Gravity Mode: radial acceleration
            this.setRadialAccel(0);
            this.setRadialAccelVar(0);

            // Gravity Mode: speed of particles
            this.setSpeed(0);
            this.setSpeedVar(0);

            // starting angle
            this.setAngle(0);
            this.setAngleVar(0);

            // emitter position
			this.setPosition(cc.p(0,0));
            this.setPosVar(cc.p(0,0));

            // life of particles
            this.setLife(0.75);
            this.setLifeVar(0.1);

            // size, in pixels
            this.setStartSize(25.0);
            this.setStartSizeVar(2.0);
            this.setEndSize(5.0);
			this.setEndSizeVar(1.0);

            // emits per frame
            this.setEmissionRate(this.getTotalParticles() / this.getLife());

            // color of particles
            this.setStartColor(cc.c4f(0.5,0.5,0.5,1.0));
            this.setStartColorVar(cc.c4f(0,0,0,0));
            this.setEndColor(cc.c4f(0,0,0,1));
            this.setEndColorVar(cc.c4f(0,0,0,0));
			
			this.setPositionType(cc.PARTICLE_TYPE_FREE);
			
            // additive
            //this.setBlendAdditive(true);
            return true;
        }
        return false;
    },
	stop: function(){
		this.stopSystem();
		this.hasStopped = true;
	},
	load: function(){
		this.layer.addChild(this);
	},
	unload: function(){
		this.layer.removeChild(this);
		this.toBeDestroyed = true;
	}
});

Smoke.create = function (x, y, width, layer) {
    var ret = new Smoke();
    if (ret.init()) {
	
		this.x = x;
		this.y = y;
	
		ret.setPosition(x, y);
		ret.setPosVar(cc.p(width, 0));
		ret.hasStopped = false;
		ret.toBeDestroyed = false;
		ret.layer = layer;
		
		ret.setTexture(cc.TextureCache.getInstance().addImage(assetsParticles + 'smoke.png'));
        return ret;
    }
    return null;
};