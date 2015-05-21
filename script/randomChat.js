Messages=new Mongo.Collection("chats");
Alerts=new Mongo.Collection("alerts");
Profiles=new Mongo.Collection("profiles");
if (Meteor.isClient) {
  //Format date and time
  Template.registerHelper('formatDate', function(date) {
    var _now=new Date()
      _date=new Date(date);
    if((_now.getDate()-_date.getDate())>0||(_now.getMonth()-_date.getMonth())>0||(_now.getYear()-_date.getYear())>0){
      return moment(_date).calendar()
    }
    return moment(_date).fromNow();
  });
  Template.registerHelper("isMine",function(owner){
    return owner===Meteor.userId();
  });
  Template.registerHelper("getProfile",function(uid){
    return Meteor.users.findOne(uid);
  })
  Meteor.subscribe("user");
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if(Accounts.loginServiceConfiguration.findOne()==undefined || Accounts.loginServiceConfiguration.findOne().length==0){
      Accounts.loginServiceConfiguration.insert({
        service: "google",
        clientId: "970761738859-n1mjjjst085amnmsg5t46p6hoag1s6pb",
        secret: "w8cornhaHEqi1VOYgPIQk_9a"
      });
    }
  });
}
