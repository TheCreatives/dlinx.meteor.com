(function(){
	//Get current user info
	Meteor.publish("user",function(){
	  return Meteor.users.find(this.userId,{
	  	fields:{
	  		"services.google.accessToken":0,
	  		"services.google.expiresAt":0,
	  		"services.google.idToken":0,
	  		"services.resume":0
	  	}
	  });
	});

	//Get All messages for current user and target user
	Meteor.publish("getAllMessages",function(){
	  return Messages.find({
	      $or:[{
	        sender:this.userId
	      },{
	        receiver:this.userId
	      }]
	    });
	});

	//Get all users info
	Meteor.publish("getAllUsers",function(){
		return Meteor.users.find({},{
			fields:{
		  		"services.google.accessToken":0,
		  		"services.google.expiresAt":0,
		  		"services.google.idToken":0,
		  		"services.resume":0
		  	}
		});
	});

	//Get my all alerts
	Meteor.publish("getAlerts",function(){
		return Alerts.find({
			to:this.userId
		})
	});
}());