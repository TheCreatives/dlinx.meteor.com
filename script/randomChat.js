Messages=new Mongo.Collection("chats");
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
    console.log(owner,Meteor.userId())
    return owner===Meteor.userId();
  });
  Meteor.subscribe("user");
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if(Accounts.loginServiceConfiguration.findOne().length==0){
      Accounts.loginServiceConfiguration.insert({
        service: "google",
        clientId: "970761738859-n1mjjjst085amnmsg5t46p6hoag1s6pb",
        secret: "w8cornhaHEqi1VOYgPIQk_9a"
      });
    }
  });
}
