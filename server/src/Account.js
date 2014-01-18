
var Account = new function(){
	var cradle = require('cradle');
	var db = new(cradle.Connection)('http://127.0.0.1', 5984, { cache: true, raw: false }).database('dream');
	var crypto = require('crypto');

	//Hash password with salt.
	function sha1(pass, salt) {
	  return crypto.createHmac('sha1', salt).update(pass).digest('hex');
	}
	
	//Generate random salt.
	function generateSalt(len) {
	
	  var chars = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	  var salt = '';
		  
	  for (var i = 0; i < len; i++) {
		var p = Math.floor(Math.random() * chars.length);
		salt += chars[p];
	  }
	  
	  return salt;
	}
	
	//Validate profile.
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
			
		if(profile.username.length < 6)
			return false;
			
		if(profile.password != profile.confirmation)
			return false;
			
		if(!/^\S{0,}@\S{0,}[.]{1}[a-zA-Z0-9]{2,}$/.test(profile.email))
			return false;
		
		return true;
	};
	
	//Authentication
	this.authenticate = function(profile, callback){
		
		var errorMsg = [];
		
		if(profile.username == null || profile.username == '' || profile.password == null || profile.password == '')
		{
			errorMsg.push('Username/password are required.');
			callback(errorMsg);
			return;
		}
		
		db.get(profile.username.toLowerCase(), function(err, doc){
			
			if(doc == null)
			{
				errorMsg.push('Invalid username/password.');
				callback(errorMsg);
				return;
			}
			
			var password = sha1(profile.password, doc.salt);
						
			if(password != doc.password)
			{
				errorMsg.push('Invalid username/password.');
				callback(errorMsg);
				return;
			}
			else
				callback(errorMsg);
		});
	};
	
	//Create new account
	this.create = function(profile, callback){
	
		var errorMsg = [];
	
		if(!validateProfile(profile))
		{
			errorMsg.push('Invalid account.');
			callback(errorMsg);
			return;
		}
	
		//Check unicity.
		db.get(profile.username.toLowerCase(), function(err, doc){
		
			if(doc != null)
			{
				errorMsg.push('Username already taken.');
				callback(errorMsg);
				return;
			}
		
			//Erase confirmation (useless to stock).
			profile.confirmation = null;
		
			//Hash password.
			profile.salt = generateSalt(12);
			profile.password = sha1(profile.password, profile.salt);
	
			db.save(profile.username.toLowerCase(), profile, function(err, res){

				if(err)
				{
					console.log('Adding user failed (' + profile.username + ')');
					errorMsg.push('Unexpected error when creating account.');
				}
				
				callback(errorMsg);
			});
		});
	};
};