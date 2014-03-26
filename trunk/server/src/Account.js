
var Account = new function(){
	var cradle = require('cradle');
	var db = new(cradle.Connection)('http://127.0.0.1', 5984, { cache: true, raw: false, auth: { username: 'ptlarouche', password: 'Silver75' } }).database('dream');
	var crypto = require('crypto');
	
	//To send email.
	var nodemailer = require('nodemailer');
	var smtpTransport = nodemailer.createTransport('SMTP', {
		service: 'Gmail',
		auth: {
			user: 'crushed.dream.the.game@gmail.com',
			pass: 'goldrush975'
		}
	});

	//Create views.
	if(Config.CreateCouchDbViews)
		db.save('_design/players', {
			views: {
				all: {
					map: function(doc){ 
						if(doc.username) 
							emit(doc.username, doc); 
					}
				},
				byEmail: {
					map: function(doc){ 
						if(doc.email) 
							emit(doc.email.toLowerCase(), doc);
					}
				}
			}
		}, function(err, res){
		
			if(err)
				console.log('Error when creating couchdb views.');
		});
	
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
	}
	
	function validateNewPassword(oldPassword, newPassword, confirmation){
		
		if(!oldPassword || !newPassword || !confirmation || oldPassword == '' || newPassword == '' || confirmation == '')
			return false;
			
		if(oldPassword == newPassword)
			return false;
			
		if(newPassword != confirmation)
			return false;
			
		return true;
	}
	
	function validateResetPassword(username, email){
		
		if(username == null || username == '')
			return false;
		
		if(email == null || email == '')
			return false;
		
		if(!Constants.Regex.EMAIL.test(email))
			return false;
		
		return true;
	}
	
	//Add score to winner.
	this.win = function(username, points){
	
		if(username == null || username == '')
			return;
			
		db.get(username.toLowerCase(), function(err, profile){
			
			if(profile == null)
				return;
				
			if(profile.score == null)
				profile.score = 0;
				
			if(profile.wins == null)
				profile.wins = 0;
			
			profile.score += points;
			profile.wins++;
			
			db.merge(username.toLowerCase(), { score: profile.score, wins: profile.wins }, function(err, res){
			
				if(err)
					console.log('Add victory failed (' + profile.username + ')');
			});
		});
	};
	
	//Get player stats.
	this.getStats = function(username, callback){
		
		if(username == null || username == '')
			return;
			
		db.get(username.toLowerCase(), function(err, profile){
		
			if(profile == null)
				return;
				
			var stats = {
				score: profile.score,
				wins: profile.wins,
				loses: profile.loses
			};
			
			callback(stats);
		});
	};
	
	//Remove score to loser.
	this.lose = function(username){
	
		if(username == null || username == '')
			return;
			
		db.get(username.toLowerCase(), function(err, profile){
			
			if(profile == null)
				return;
				
			if(profile.score == null)
				profile.score = 0;
				
			if(profile.loses == null)
				profile.loses = 0;
				
			profile.score--;
			profile.loses++;
			
			db.merge(username.toLowerCase(), { score: profile.score, loses: profile.loses }, function(err, res){
			
				if(err)
					console.log('Add defeat failed (' + profile.username + ')');
			});
		});
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
		db.view('players/byEmail', { key: profile.email.toLowerCase() }, function(err, players){
				
			if(players && players.length > 0)
			{
				errorMsg.push('Email already taken.');
				callback(errorMsg);
				return;
			}
		
			db.get(profile.username.toLowerCase(), function(err, doc){
			
				if(doc != null)
				{
					errorMsg.push('Username already taken.');
					callback(errorMsg);
					return;
				}
			
				//Erase confirmation (useless to stock).
				delete profile.confirmation;
			
				//Hash password.
				profile.salt = generateSalt(12);
				profile.password = sha1(profile.password, profile.salt);
				profile.score = 0;
				profile.wins = 0;
				profile.loses = 0;
		
				db.save(profile.username.toLowerCase(), profile, function(err, res){

					if(err)
					{
						console.log('Adding user failed (' + profile.username + ')');
						errorMsg.push('Unexpected error when creating account.');
					}
					
					callback(errorMsg);
				});
			});
		});
	};
	
	//Change password
	this.changePassword = function(profile, oldPassword, newPassword, confirmation, callback){
	
		var errors = [];
	
		if(!validateNewPassword(oldPassword, newPassword, confirmation))
		{
			errors.push('Error when validating new password.');
			callback(errors);
			return;
		}
	
		db.get(profile.username.toLowerCase(), function(err, doc){
			
			if(err || !doc)
			{
				errors.push('Error when changing password.');
				callback(errors);
				return;
			}
			
			var password = sha1(oldPassword, doc.salt);
						
			//Check if old password has been correctly input.
			if(password != doc.password)
			{
				errors.push('Old password mismatches current password.');
				callback(errorMsg);
				return;
			}
			
			//Hash password.
			doc.salt = generateSalt(12);
			doc.password = sha1(newPassword, doc.salt);
			
			db.merge(profile.username.toLowerCase(), { salt: doc.salt, password: doc.password }, function(err, res){
			
				if(err)
				{
					console.log('Change password failed (' + profile.username + ')');
					errors.push('Unexpected error when changing password.');
				}
				
				callback(errors);
			});
		});
	};
	
	//Reset password.
	this.resetPassword = function(profile, email, callback){
		
		var errors = [];
		
		if(!validateResetPassword(profile.username, email))
		{
			errors.push('Error when validating informations to reset password.');
			callback(errors);
			return;
		}
		
		db.view('players/byEmail', { key: email.toLowerCase() }, function(err, players){
		
			if(!players || players.length == 0)
			{
				errors.push('No user is bound to this email.');
				callback(errors);
				return;
			}
		
			var player = players[0].value;
		
			if(player.username.toLowerCase() != profile.username.toLowerCase())
			{
				errors.push('Wrong user/email.');
				callback(errors);
				return;
			}
			
			var newPassword = generateSalt(8);
			var newSalt = generateSalt(12);
			
			player.salt = newSalt;
			player.password = sha1(newPassword, newSalt);
			
			db.merge(player.username.toLowerCase(), { salt: player.salt, password: player.password }, function(err, res){
			
				if(err)
				{
					console.log('Reset password failed (' + profile.username + ')');
					errors.push('Unexpected error when resetting password.');
				}
				else
				{
					//Send email to player to confirm.
					var mailOptions = {
						from: 'Crushed Dream <crushed.dream.the.game@gmail.com>',
						to: player.email,
						subject: 'Reset password',
						html: '<h1>Password has been reset!</h1><p>This is your new password : ' + newPassword  
							  + ' <br /> Please change this password in the Change Password screen after your next login. </p><p> See you soon!</p>'
					};
					
					smtpTransport.sendMail(mailOptions, function(err, response){
						if(err)
						{
							errors.push('Error when sending email. Try again or contact crushed.dream.the.game@gmail.com for help.');
							callback(errors);
							return;
						}
					});
				}
				
				callback(errors);
			});
		});
	};
};