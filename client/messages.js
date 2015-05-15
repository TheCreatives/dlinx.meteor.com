(function(){
  //Messages
  Template.messages.helpers({
    messages: function () {
      return  Messages.find({
          $or:[{
            sender:Session.get("targetProfileID")
          },{
            receiver:Session.get("targetProfileID")
          }]
        });
    },
    targetProfile:function(){
      return Meteor.users.findOne(Session.get("targetProfileID"))
    }
  });

  Template.messages.rendered=function(){
    _msgContainer = $(".msgContainer")[0] ;
    if(_msgContainer.scrollHeight > _msgContainer.clientHeight) {
      _msgContainer.scrollTop = _msgContainer.scrollHeight - _msgContainer.clientHeight;
    }
  };

  //Messages Events
  Template.messages.events({
    // Send new msg
    'keypress #chatMsg': function (event) {
      if($("#chatMsg").val()=="")return;
      if(window.event.which===13){
        var _targetUsr=Session.get("targetProfileID");
        Meteor.call("sendMessage",_targetUsr,$("#chatMsg").val());
        $("#chatMsg").val("");
        if(_msgContainer.scrollHeight > _msgContainer.clientHeight) {
          _msgContainer.scrollTop = _msgContainer.scrollHeight - _msgContainer.clientHeight;
        }
      }
    }
  });
}());