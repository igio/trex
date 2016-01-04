Template.trexHome.onRendered(function(){
  $('.parallax').parallax();
});
Router.route('home', {
  path: '/',
  layoutTemplate: 'trexLayout',
  template: 'trexHome'
});