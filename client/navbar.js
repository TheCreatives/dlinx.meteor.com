(function(){
  Meteor.subscribe("user");
  Meteor.subscribe("getAllUsers");
  Meteor.subscribe("getAllMessages");
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

  };
}());