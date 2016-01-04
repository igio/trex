function beforeRoute(){
  if(!Meteor.userId()){
    this.render('trexLogin');
  } else {
    this.next();
  }
}
function closeTracker(){
  var tk = Session.get('currentTracker');
  if(tk) {
    TrackerData.update( tk, {} );
    Session.set( 'currentTracker', null )
  }
  this.next();
}
Router.onBeforeAction(beforeRoute, {
  except: ['home', 'plans', 'story']
});
Router.onBeforeAction(closeTracker, {});