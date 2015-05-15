(function(){

  Meteor.methods({
    sendMessage:function(to,message){
      Messages.insert({
        sender:this.userId,
        receiver:to,
        message:message,
        date:new Date()
      });
      Alerts.insert({
        from:this.userId,
        to:to,
        message:message
      });
    },
    removeAlert:function(_id){
      Alerts.remove({
        _id:_id,
        to:this.userId
      })
    }
  });
}());
