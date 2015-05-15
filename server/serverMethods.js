(function(){

  Meteor.methods({
    sendMessage:function(to,message){
      Messages.insert({
        sender:this.userId,
        receiver:to,
        message:message,
        date:new Date()
      });
    }
  });
}());
