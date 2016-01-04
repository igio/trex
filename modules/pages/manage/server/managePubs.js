Meteor.publish('userTrackers', function(){
  var currentUserId = this.userId;
  var uTrackers = Trackers.find({
    user: currentUserId
  });
  if(uTrackers){
    return uTrackers;
  }
  return this.ready();
});