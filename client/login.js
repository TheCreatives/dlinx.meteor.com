(function(){
  //Login Template
  Template.logintmp.events({
    "click #btnLogin":function(){
       Meteor.loginWithGoogle({
          requestPermissions: ['email']
        }, function(error) {
          if (error) {
            console.log(error);
          }else{
            Meteor.call("createProfile");
          }
        }
      );
    }
  });
}());