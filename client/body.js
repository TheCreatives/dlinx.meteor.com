(function(){
  var _messages;
  var _msgContainer;
  //Body
  Template.body.helpers({
    g_user:function(){
      return Meteor.user();
    },
    targetProfile:function(){
      return Meteor.users.findOne(Session.get("targetProfileID"));
    }
  });
}());