Template.trackerTemplate.onCreated(function(){
  this.isEdit = new ReactiveVar(false);
});

Template.trackerTemplate.helpers({
  editing: function(){
    return Template.instance().isEdit.get();
  }
});

Template.trackerTemplate.f = {
  updateTracker: function(id, value){
    Trackers.update(id, {$set: {name: value}});
  }
};

Template.trackerTemplate.events = {
  'click li i.clear': function(){
    Meteor.call('removeTrackerData', this._id);
    Trackers.remove(this._id);
  },
  'click li i.edit': function(e, t){
    t.isEdit.set(true);
  },
  'click li i.done': function(e, t){
    Template.trackerTemplate.f.updateTracker(this._id, t.find('input').value);
    t.isEdit.set(false);
  },
  'keypress li input': function(e, t){
    if(e.keyCode === 13){
      Template.trackerTemplate.f.updateTracker(this._id, t.find('input').value);
      t.isEdit.set(false);
    } else if(e.keyCode === 27){
      t.isEdit.set(false);
    }

  }
};