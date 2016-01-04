Template.trexStory.onRendered(function(){
  $('.parallax').parallax();
});
Router.route('story', {
  path: '/story',
  layoutTemplate: 'trexLayout',
  template: 'trexStory'
});