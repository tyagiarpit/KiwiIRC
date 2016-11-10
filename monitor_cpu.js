var http      = require('http');
var redis = require('redis')
var multer  = require('multer')
var fs      = require('fs')
var TARGET  = 'http://159.203.131.189:3000/spawn';
var REDIS   = '159.203.131.189'

var request = require('sync-request');

 // Twilio Credentials
var accountSid = 'AC17bf6bf96e992e52df14527fd55a4a63';
var authToken = '0d33a8deedcda20364a3076873baa8a9';

 //require the Twilio module and create a REST client
var twilio = require('twilio')(accountSid, authToken);


function sendText(text){
 	twilio.messages.create({
       to: '+19199316708',
       from: '+19842052297',
       body: text,
   	}, function (err, message) {
       console.log(message.sid);
   	});
}
var os = require("os");
var tick = 0;
function cpuAverage() {
  var totalIdle = 0, totalTick = 0;
  var cpus = os.cpus();

  for(var i = 0, len = cpus.length; i < len; i++) {

    var cpu = cpus[i];

    for(type in cpu.times) {
      totalTick += cpu.times[type];
   }     

    totalIdle += cpu.times.idle;
  }

  return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}

function monitor(){
	var startMeasure = cpuAverage();

	setTimeout(function() { 

  		var endMeasure = cpuAverage(); 

  		var idleDifference = endMeasure.idle - startMeasure.idle;
  		var totalDifference = endMeasure.total - startMeasure.total;

  		var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

		if(percentageCPU > 75)
		{
			if(tick==0){
				sendText("CPU Utilazition Exceeds 75%");
        var res = request('GET', TARGET);
				tick=10;
			}
			else
			{
				tick--;
			}
		}
  		console.log(percentageCPU + "% CPU Usage.");

	}, 10000);
}

setInterval(monitor,30000);
