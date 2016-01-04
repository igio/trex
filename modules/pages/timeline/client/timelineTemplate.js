UserSData = new Mongo.Collection('user_s_data');

Router.route('timeline', {
  path: '/timeline',
  layoutTemplate: 'trexLayout',
  template: 'timelineTemplate',
  waitOn: function(){
    return [
      Meteor.subscribe('userTrackers'),
      Meteor.subscribe('timelineData'),
      Meteor.subscribe('summaryData')
    ]
  },
  data: {
    trackers: function(){return Trackers.find({}, {sort: {'name': 1}});},
    userData: function(){return TrackerData.find();},
    usData: function(){return UserSData.find();}
  }
});

Template.timelineTemplate.onRendered(function(){
  $('.collapsible').collapsible({accordion: true})
});
