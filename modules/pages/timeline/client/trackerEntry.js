Template.trackerEntry.helpers({
  totalTime: function(){
    var tkId = Template.instance().data._id;
    var total = 0;
    TrackerData.find({
      tracker: tkId
    }).forEach(function(td){
      total += td.tStop - td.tStart;
    });
    if(total > 0){
      return 'about ' + moment.duration(total).humanize();
    } else {
      return null;
    }
  },
  chartId: function(){
    return Template.instance().data._id;
  },
  hasData: function(){
    var tkId = Template.instance().data._id;
    return UserSData.find({tracker: tkId}).count()
  },
  chartData: function(){
    var tkId = Template.instance().data._id;
    var dataSet = UserSData.find({tracker: tkId});
    var xAxis = ['x'];
    var yAxis = ['y'];
    dataSet.forEach(function(entry){
      xAxis.push(entry.sDate);
      yAxis.push((entry.timeSpent/60000).toFixed(2));
    });
    return {
      data: {
        x: 'x',
        columns: [xAxis, yAxis],
        type: 'bar',
        labels: {
          format: function(v, id, i, j){
            return moment.duration(v, 'minutes').humanize() + ' [' + v + ' m]';
          }
        }
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%m/%d/%Y',
            rotate: 45
          },
          label: 'Time'
        },
        y: {
          label: 'Minutes'
        }
      },
      zoom: {
        enabled: true
      },
      legend: {
        show: false
      }
    }
  }
});