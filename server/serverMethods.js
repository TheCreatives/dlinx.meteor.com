(function(){
  Meteor.methods({
    sendMessage:function(to,message){
      Messages.insert({
        sender:this.userId,
        receiver:to,
        message:message,
        date:new Date()
      });
      Alerts.update({
        to:to  
      },{
        from:this.userId,
        to:to,  
        message:message
      },{
        upsert:true
      });

      //Add to my recent list
      var _myProfile=Profiles.findOne(this.userId);
      var _toIndex=_myProfile.recent.indexOf(to);
      if(_toIndex===-1){
        _myProfile.recent.push(to);
        Profiles.update({
          _id:this.userId
        },{
          $set:{
            recent:_myProfile.recent
          }
        });
      }

      //Add to receivers recent list
      var _receiverProfile=Profiles.findOne(to);
      var _myIndex=_receiverProfile.recent.indexOf(this.userId);
      if(_myIndex===-1){
        _receiverProfile.recent.push(this.userId);
        Profiles.update({
          _id:to
        },{
          $set:{
            recent:_receiverProfile.recent
          }
        });
      }
    },
    removeAlert:function(_id){
      Alerts.remove({
        _id:_id,
        to:this.userId
      })
    },
    createProfile:function(){
      var _currentProfile,_googleProfile;

      _currentProfile=Profiles.findOne(this.userId);
      _googleProfile=Meteor.user();

      if(!_currentProfile)
        _currentProfile={};

      if(!_currentProfile.picture)
        _currentProfile.picture=_googleProfile.services.google.picture;

      if(!_currentProfile.name)
        _currentProfile.name=_googleProfile.services.google.name;

      if(!_currentProfile.email)
        _currentProfile.email=_googleProfile.services.google.email;

      if(!_currentProfile.gender)
        _currentProfile.gender=_googleProfile.services.google.gender;

      if(_currentProfile.recent==undefined)
        _currentProfile.recent=[];

      _currentProfile._id=this.userId;
      Profiles.update({
        _id:this.userId
      },_currentProfile,{
        upsert:true
      });
    }
  });
}());
