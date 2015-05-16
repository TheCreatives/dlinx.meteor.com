(function(){
  Meteor.subscribe("user");
  Meteor.subscribe("getAllUsers");
  Meteor.subscribe("getAllMessages");
  Meteor.subscribe("getAlerts");
  Meteor.subscribe("getMyProfile");
  Meteor.subscribe("getAllProfiles");
  //navbar
  Template.navbar.helpers({
    g_user:function(){
      return Meteor.user();
    },
    m_user:function(){
      return 
    },
    userList:function(){
      return Meteor.users.find({_id:{
        $not:Meteor.userId()    //Add user text function here
      }});
    }
  });

  Template.navbar.events({
    'click #btnlogout':function(){
      Meteor.logout();
    },
    'focus #txtNewMsg':function(){
      $("#usersAutoComplete").show(100);
    },
    'blur #txtNewMsg':function(){
      setTimeout(function(){
        $("#usersAutoComplete").hide(200);        
      },100);
    },
    'click .searchUser':function(e){
      var _uid=$(e.currentTarget).data("uid");
      Session.set("targetProfileID",_uid);
    }
  });

  //Execute when navbar renders
  Template.navbar.rendered=function(){
    if(Notification && Alerts){
      Alerts.find().observe({
        added:function(newAlert){
          if(Notification.permission!=="granted")
            Notification.requestPermission();
          var _sender=Meteor.users.findOne(newAlert.from).profile.name;
          var notification = new Notification(_sender, {
            icon: '/img/chat_icon.png',
            body: newAlert.message
          });
          setTimeout(function(){
            notification.close();
          },1000);
          Meteor.call("removeAlert",newAlert._id);
        }
      });
    }
  };
}());