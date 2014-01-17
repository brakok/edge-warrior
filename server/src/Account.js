
var Account = new function(){
	var cradle = require('cradle');
	var db = new(cradle.Connection)('http://127.0.0.1', 5984, { cache: true, raw: false }).database('dream');
	var crypto = require('crypto');
	var sha1 = crypto.createHash('sha1');
	
	function validateProfile(profile){
		
		if(profile.username == null || profile.username == '')
			return false;
			
		if(profile.password == null || profile.password == '')
			return false;
			
		if(profile.confirmation == null || profile.confirmation == '')
			return false;
			
		if(profile.email == null || profile.email == '')
			return false;
			
		if(profile.password.length < 6)
			return false;
			
		if(profile.password != profile.confirmation)
			return false;
			
		if(!/^\S{0,}@\S{0,}[.]{1}[a-zA-Z0-9]{2,}$/.test(profile.email))
			return false;
		
		return true;
	};
	
	this.create = function(profile, callback){
	
		if(!validateProfile(profile))
			return false;
	
		//Erase confirmation (useless to stock).
		profile.confirmation = null;
	
		//Hash password.
		profile.password = sha1.update(profile.password).digest('hex');
	
		db.save(profile.username, profile, function(err, res){

			if(err)
				console.log('Adding user failed (' + profile.username + ')');
				
			callback(err == null);
		});
	};
};