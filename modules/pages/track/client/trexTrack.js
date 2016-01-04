Router.route('track', {
  path: '/track',
  layoutTemplate: 'trexLayout',
  template: 'trexTrack',
  waitOn: function(){
    return [Meteor.subscribe('userTrackers'), Meteor.subscribe('userTrackData')];
  },
  data: {
    trackers: function(){return Trackers.find({}, {sort: {'name': 1}});},
    trackerData: function(){return TrackerData.findOne()}
  }
});