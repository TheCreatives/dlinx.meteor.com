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
      return Profiles.findOne(Session.get("targetProfileID"));
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
    'keypress #chatMsg': function (e) {
      if($("#chatMsg").val()=="")return;
      if(e.keyCode===13){
        var _targetUsr=Session.get("targetProfileID");
        var _msg=$("#chatMsg").val();
        Meteor.call("sendMessage",_targetUsr,_msg);
        //Clear textbox.

        $("#chatMsg").val("");
        //move scrollbar to message
        if(_msgContainer.scrollHeight > _msgContainer.clientHeight) {
          _msgContainer.scrollTop = _msgContainer.scrollHeight - _msgContainer.clientHeight;
        }
      }
    }
  });
}());