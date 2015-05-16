(function(){
  //Friend List
  Template.friendList.helpers({
    recentUsers:function(){
    	if(Profiles.findOne(Meteor.userId())){
    		var _recent=Profiles.findOne(Meteor.userId()).recent.reverse();
	    	return Profiles.find({
	    		_id:{
	    			$in:_recent
	    		}
	    	});
	    }
    }
  });

  Template.friendList.events({
  	'click .recentUsr':function(e){
  		var _uid=$(e.currentTarget).data("uid");
      Session.set("targetProfileID",_uid);
  	}
  })
}());