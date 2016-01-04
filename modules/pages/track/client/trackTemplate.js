Template.trackTemplate.onCreated(function(){
  this.isTracking = new ReactiveVar(false);
  this.tkShow = new ReactiveVar(null);
});

Template.trackTemplate.helpers({
  tracking: function(){
    return Template.instance().isTracking.get();
  },
  timeSpent: function(){
    var start = Template.instance().tkShow.get();
    if(start){
      return Chronos.liveMoment(start).fromNow(true);
    } else {
      return null;
    }
  }
});

Template.trackTemplate.f = {
  resetTrackers: function(t){
    var onTracker = t.parent().find('li.on');
    if(onTracker){
      onTracker.click();
    }
  },
  startTracker: function(t){
    var tId = TrackerData.insert({'tracker': t.data._id});
    //t.parent().currentTracker.set(tId);
    Session.set('currentTracker', tId);
    var cTk = TrackerData.findOne({_id: tId});
    t.tkShow.set(cTk.tStart);
  },
  stopTracker: function(t){
    //var tk = t.parent().currentTracker;
    var tk = Session.get('currentTracker');
    TrackerData.update(tk, {});
    //tk.set(null);
    Session.set('currentTracker', null);
    t.tkShow.set(null);
  }
};

Template.trackTemplate.events = {
  'click li.on': function(e, t){
    t.isTracking.set(false);
    Template.trackTemplate.f.stopTracker(t);
  },
  'click li.off': function(e, t){
    t.isTracking.set(true);
    Template.trackTemplate.f.resetTrackers(t);
    Template.trackTemplate.f.startTracker(t);
  }
};
