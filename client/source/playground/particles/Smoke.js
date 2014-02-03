var Smoke = cc.ParticleSystem.extend({
    init:function () {
        return this.initWithTotalParticles(Constants.Particles.Smoke.PARTICLES_COUNT);
    },
    initWithTotalParticles:function (numberOfParticles) {
        if (cc.ParticleSystem.prototype.initWithTotalParticles.call(this, numberOfParticles)) {
            // duration
            this.setDuration(cc.PARTICLE_DURATION_INFINITY);

            // Gravity Mode
            this.setEmitterMode(cc.PARTICLE_MODE_GRAVITY);

            // Gravity Mode: gravity
            this.setGravity(cc.p(0, 0));

            // Gravity Mode: radial acceleration
            this.setRadialAccel(0);
            this.setRadialAccelVar(0);

            // Gravity Mode: speed of particles
            this.setSpeed(Constants.Particles.Smoke.SPEED);
            this.setSpeedVar(0);

            // starting angle
            this.setAngle(90);
            this.setAngleVar(10);

            // emitter position
			this.setPosition(cc.p(0,0));
            this.setPosVar(cc.p(20, 0));

            // life of particles
            this.setLife(0.25);
            this.setLifeVar(0.25);

            // size, in pixels
            this.setStartSize(15.0);
            this.setStartSizeVar(5.0);
            this.setEndSize(cc.PARTICLE_START_SIZE_EQUAL_TO_END_SIZE);

            // emits per frame
            this.setEmissionRate(this.getTotalParticles() / this.getLife());

            // color of particles
            this.setStartColor(cc.c4f(0.2,0.2,0.2,1.0));
            this.setStartColorVar(cc.c4f(0,0,0,0));
            this.setEndColor(cc.c4f(0,0,0,1));
            this.setEndColorVar(cc.c4f(0,0,0,0));

			this.setPositionType(cc.PARTICLE_TYPE_GROUPED);
			
            // additive
            this.setBlendAdditive(true);
            return true;
        }
        return false;
    }
});

Smoke.create = function (x, y) {
    var ret = new Smoke();
    if (ret.init()) {
		ret.setPosition(x, y);
		ret.setTexture(cc.TextureCache.getInstance().addImage(assetsParticles + 'smoke.png'));
        return ret;
    }
    return null;
};