var Schemas = {};

Schemas.User = new SimpleSchema({
  username: {
    type: String,
    optional: true
  },
  emails: {
    type: Array,
    optional: true
  },
  "emails.$": {
    type: Object
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean,
    autoValue: function(){
      return true;
    }
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: Object,
    optional: true,
    blackbox: true
  },
  createdAt: {
    type: Date,
    autoValue: function(){
      if(this.isInsert){
        return new Date();
      } else if (this.isUpsert){
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function(){
      if(this.isUpdate){
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  heartbeat: {
    type: Date,
    optional: true
  }
});

Meteor.users.attachSchema(Schemas.User);

Trackers = new Mongo.Collection('trackers');

Schemas.Tracker = new SimpleSchema({
  name: {
    type: String,
    label: 'Tracker',
    max: 200
  },
  user: {
    type: String,
    autoValue: function(){
      return Meteor.userId();
    }
  },
  createdAt: {
    type: Date,
    autoValue: function(){
      if(this.isInsert){
        return new Date();
      } else if (this.isUpsert){
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function(){
      if(this.isUpdate){
        return new Date();
      }
    },
    optional: true
  }
});

Trackers.attachSchema(Schemas.Tracker);

TrackerData = new Mongo.Collection('tracker_data');

Schemas.TrakerData = new SimpleSchema({
  tracker: {
    type: String
  },
  tStart: {
    type: Date,
    autoValue: function(){
      if(this.isInsert){
        return new Date();
      } else if (this.isUpsert){
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    }
  },
  tStop: {
    type: Date,
    autoValue: function(){
      if(this.isUpdate){
        return new Date();
      }
    },
    optional: true
  },
  current: {
    type: Boolean,
    autoValue: function(){
      if(this.isInsert){
        return true;
      } else if(this.isUpsert){
        return {$setOnInsert: true}
      } else if(this.isUpdate){
        return false;
      } else {
        this.unset();
      }
    }
  }
});

TrackerData.attachSchema(Schemas.TrakerData);