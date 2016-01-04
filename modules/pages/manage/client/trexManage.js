Router.route('manage', {
  path: '/manage',
  layoutTemplate: 'trexLayout',
  template: 'trexManage',
  waitOn: function(){
    return Meteor.subscribe('userTrackers');
  },
  data: {
    trackers: function() {return Trackers.find({}, {sort: {'name': 1}});}
  }
});