Meteor.publish('timelineData', function(){
  var currentUserId = this.userId;
  var uTrackers = Trackers.find({user: currentUserId}, {_id: 1});
  var tList = [];
  uTrackers.forEach(function(t){
    tList.push(t._id)
  });
  var tData = TrackerData.find({
    tracker: {$in: tList},
    current: false
  });
  if(tData){
    return tData;
  }
  return this.ready();
});

Meteor.publish('summaryData', function(){
  var self = this;
  var currentUserId = this.userId;
  var uTrackers = Trackers.find({user: currentUserId}, {_id: 1});
  var tList = [];
  uTrackers.forEach(function(t){
    tList.push(t._id);
  });
  var pipeline = [
    {$match: {tracker: {$in: tList}, current: false}},
    {$group: {_id: {'tracker': '$tracker',
      'summaryDate':
        {$concat: [
          {$substr: [{$year: "$tStart"}, 0, 4]}, "-",
          {$substr: [{$month: '$tStart'}, 0, 2]},"-",
          {$substr: [{$dayOfMonth: "$tStart"}, 0, 2]}
        ]}
    },
      total: {$sum: {$subtract: ["$tStop", "$tStart"]}}}
    }
  ];
  var summary = TrackerData.aggregate(pipeline);
  _.each(summary, function(entry){
    var doc = {
      tracker: entry._id.tracker,
      sDate: entry._id.summaryDate,
      timeSpent: entry.total,
      humanTimeSpent: moment.duration(entry.total).humanize()
    };
    self.added('user_s_data', Random.id(), doc);
  });
  self.ready();
});