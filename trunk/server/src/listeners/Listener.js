
cd.Server.Listeners = function(game){
	this.currentGame = game;
	
	//All listeners.
	this.DeathZoneListener = new cd.Server.DeathZoneListener(this.currentGame);
	this.GoalListener = new cd.Server.GoalListener(this.currentGame);
	this.DropListener = new cd.Server.DropListener(this.currentGame);
	this.GroundListener = new cd.Server.GroundListener(this.currentGame);
	this.BlockListener = new cd.Server.BlockListener(this.currentGame);
	this.NpcListener = new cd.Server.NpcListener(this.currentGame);
	this.TriggerListener = new cd.Server.TriggerListener(this.currentGame);
	
};

cd.Server.Listeners.prototype.registerHandlers = function(){

	var currentListeners = this;

	//Add goal listener.
	this.currentGame.space.addCollisionHandler(Enum.Collision.Type.WINNING_GOAL, 
											   Enum.Collision.Type.PLAYER, 
											   function(arbiter, space){ currentListeners.GoalListener.begin(arbiter, space);}, 
											   null, 
											   null, 
											   null);
	
	//Add death zone listener.
	this.currentGame.space.addCollisionHandler(Enum.Collision.Type.DEATH_ZONE, 
											   Enum.Collision.Type.PLAYER, 
											   function(arbiter, space){ currentListeners.DeathZoneListener.begin(arbiter, space);}, 
											   null, 
											   null, 
											   null);
								   
	this.currentGame.space.addCollisionHandler(Enum.Collision.Type.DEATH_ZONE, 
											   Enum.Collision.Type.BLOCK, 
											   function(arbiter, space){ currentListeners.DeathZoneListener.begin(arbiter, space);}, 
											   null, 
											   null, 
											   null);
								   
	this.currentGame.space.addCollisionHandler(Enum.Collision.Type.DEATH_ZONE, 
											   Enum.Collision.Type.STATIC, 
											   function(arbiter, space){ currentListeners.DeathZoneListener.begin(arbiter, space);}, 
											   null, 
											   null, 
											   null);
	
	//Add npc listener.
	this.currentGame.space.addCollisionHandler(Enum.Collision.Type.NPC, 
											   Enum.Collision.Type.PLAYER, 
											   function(arbiter, space){ currentListeners.NpcListener.begin(arbiter, space);}, 
											   null, 
											   null, 
											   function(arbiter, space){ currentListeners.NpcListener.separate(arbiter, space);});
								   
	//Add trigger listener.
	this.currentGame.space.addCollisionHandler(Enum.Collision.Type.TRIGGER, 
											   Enum.Collision.Type.PLAYER, 
											   function(arbiter, space){ currentListeners.TriggerListener.begin(arbiter, space);}, 
											   null, 
											   null, 
											   function(arbiter, space){ currentListeners.TriggerListener.separate(arbiter, space);});
								   
	this.currentGame.space.addCollisionHandler(Enum.Collision.Type.TRIGGER, 
											   Enum.Collision.Type.BLOCK, 
											   function(arbiter, space){ currentListeners.TriggerListener.begin(arbiter, space);}, 
											   null, 
											   null, 
											   function(arbiter, space){ currentListeners.TriggerListener.separate(arbiter, space);});
											   
	this.currentGame.space.addCollisionHandler(Enum.Collision.Type.TRIGGER, 
											   Enum.Collision.Type.STATIC, 
											   function(arbiter, space){ currentListeners.TriggerListener.begin(arbiter, space);}, 
											   null, 
											   null, 
											   function(arbiter, space){ currentListeners.TriggerListener.separate(arbiter, space);});
	
	//Add ground sensor callback.
	this.currentGame.space.addCollisionHandler(Enum.Collision.Type.GROUND_SENSOR, 
											   Enum.Collision.Type.STATIC, 
											   function(arbiter, space){ currentListeners.GroundListener.begin(arbiter, space);}, 
											   null, 
											   null, 
											   function(arbiter, space){ currentListeners.GroundListener.separate(arbiter, space);});
								   
	this.currentGame.space.addCollisionHandler(Enum.Collision.Type.GROUND_SENSOR, 
											   Enum.Collision.Type.PLAYER, 
											   function(arbiter, space){ currentListeners.GroundListener.begin(arbiter, space);}, 
											   null, 
											   null, 
											   function(arbiter, space){ currentListeners.GroundListener.separate(arbiter, space);});
				
	//Add block listener callback.
	this.currentGame.space.addCollisionHandler(Enum.Collision.Type.BLOCK, 
											   Enum.Collision.Type.STATIC, 
											   function(arbiter, space){ currentListeners.BlockListener.begin(arbiter, space);}, 
											   null, 
											   null, 
											   null);
	this.currentGame.space.addCollisionHandler(Enum.Collision.Type.BLOCK, 
											   Enum.Collision.Type.BLOCK, 
											   function(arbiter, space){ currentListeners.BlockListener.begin(arbiter, space); }, 
											   null, 
											   null, 
											   null);
	this.currentGame.space.addCollisionHandler(Enum.Collision.Type.BLOCK, 
											   Enum.Collision.Type.PLAYER, 
											   function(arbiter, space){ currentListeners.BlockListener.begin(arbiter, space); }, 
											   null, 
											   null, 
											   null);

	//Add drop zone listener callback.
	this.currentGame.space.addCollisionHandler(Enum.Collision.Type.DROP_SENSOR, 
											   Enum.Collision.Type.STATIC, 
											   function(arbiter, space){ currentListeners.DropListener.begin(arbiter, space);}, 
											   null, 
											   null, 
											   function(arbiter, space){ currentListeners.DropListener.separate(arbiter, space);});
											   
	this.currentGame.space.addCollisionHandler(Enum.Collision.Type.DROP_SENSOR, 
											   Enum.Collision.Type.SPAWN, 
											   function(arbiter, space){ currentListeners.DropListener.begin(arbiter, space);}, 
											   null, 
											   null, 
											   function(arbiter, space){ currentListeners.DropListener.separate(arbiter, space);});
};