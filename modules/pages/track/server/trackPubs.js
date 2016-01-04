Meteor.publish('userTrackData', function(){
  var currentUserId = this.userId;
  var uTrackers = Trackers.find({user: currentUserId}, {_id: 1});
  var tList = [];
  uTrackers.forEach(function(t){
    tList.push(t._id);
  });
  var cTracks = TrackerData.find({
    tracker: {$in: tList},
    current: true
  });
  if(cTracks){
    return cTracks;
  }
  return this.ready()
});