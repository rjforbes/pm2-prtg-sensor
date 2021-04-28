var pm2 = require('pm2');
var request = require('request');
var config = require('./config.js');

pm2.connect(function(err) {
  if (err) {
    console.error("PM2 Connect Error" + err);
  } else {
    pm2.list(errback);
    setInterval(function() {
      pm2.list(errback);
    }, config.prtg_interval);
  }
});

function errback(err, resp){
  if (err) {
    console.error("PM2 List Error" + err);
  } else {
    //console.log(resp);
    var sensorArray = [];
    for (var index = 0; index < resp.length; index++) {
        var element = resp[index];
        sensorArray.push({"channel": (element.name + "-memory"),"value": element.monit.memory,"unit": "custom","customunit": "memory"});
        sensorArray.push({"channel": (element.name + "-cpu"),"value": element.monit.cpu,"unit": "custom","customunit": "cpu","float": "1"});
    }
    var sensor = {prtg:{result:sensorArray},text:""};
    var url = config.prtg_server + config.prtg_token + "?content=" + JSON.stringify(sensor);
    if(config.prtg_server != "" && config.prtg_token != "" ){
      console.log(url);
      request
      .get(url)
      .on('response', function(response) {
        console.log(response.statusCode)})
      .on('error', function(err) {
        console.error(err);
      });
    } else {
      console.log("Update config.js with PRTG server and token");
    }
  }
}

