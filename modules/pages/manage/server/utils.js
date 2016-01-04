Meteor.startup(function(){
  return Meteor.methods({
    removeTrackerData: function(tracker_id){
      return TrackerData.remove({tracker: tracker_id});
    }
  })
});