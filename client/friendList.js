(function(){
  //Friend List
  Template.friendList.helpers({
    users:function(){
      return Meteor.users.find();
    }
  });
}());