var mysql = require('mysql');
var db = require('../db');
var dateTime = require('node-datetime');





function add_to_call_log(phone_number, delay, time)
{
    return new Promise(function(resolve, reject) {
        
	    	db.query("INSERT INTO Call_History (phone_number, delay, time) VALUES (?,?,?)", [phone_number, delay, time], function(err, rows, fields){	            
	            if (err) {
	                return reject(err);
	            }	            
	            resolve("inserted");
    		});
    });
}


function add_to_call_log_with_fizz_buzz(phone_number, delay, time, fizzbuzz)
{
    return new Promise(function(resolve, reject) {
        
	    	db.query("INSERT INTO Call_History (phone_number, fizzbuzz, delay, time) VALUES (?,?,?,?)", [phone_number, fizzbuzz, delay, time], function(err, rows, fields){	            
	            if (err) {
	                return reject(err);
	            }	            
	            resolve("inserted");
    		});
    });
}



exports.call = function(req, res){
	var accountSID = "AC897addd05e28b811361b65bfc295d455";
	var authToken = "607a6710abb7dfed6a66d1aa9bfbd9dc";
	var phonenumber = req.body.phonenumber;
	var delay = req.body.TimeGap;
	var decide = req.body.decide;
	var time_in_millisec = delay * 1000;
	console.log("i am inside call");
	

	if(decide == "call"){
		console.log("i am calling from home page");
		setTimeout(function () {
			var dt = dateTime.create();
			dt.format('m/d/Y H:M:S');
			var time = new Date(dt.now());	  
			var client = require('twilio')(accountSID,authToken);
			client.calls.create({
				url:'http://e03f0081.ngrok.io/voice',
				to:phonenumber,
				from: '+13213390843',	
				statusCallback: 'http://e03f0081.ngrok.io/events',
				statusCallbackMethod: 'POST',
				statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed']
			},function(err, call){
				if(err){
					console.log(err);
				}
				else{
					add_to_call_log(phonenumber, delay, time);
					console.log(call.sid);
				}
			});
			}, time_in_millisec);
	}else if(decide == "recall"){
		var fizzbuzz = req.body.fizzbuzz;
		console.log("I am calling from call log");
		console.log(phonenumber + " : "+ fizzbuzz);
		var dt = dateTime.create();
		dt.format('m/d/Y H:M:S');
		var time = new Date(dt.now());	  
		var client = require('twilio')(accountSID,authToken);
		client.calls.create({
			url:'http://e03f0081.ngrok.io/voice2',
			to:phonenumber,
			from: '+13213390843',
			statusCallback: 'http://e03f0081.ngrok.io/events',
			statusCallbackMethod: 'POST',
			statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed']
		},function(err, call){
			if(err){
				console.log(err);
			}
			else{
				add_to_call_log_with_fizz_buzz(phonenumber, delay, time,fizzbuzz);
				console.log(call.sid);
			}
		});
		
	}
	
	

}



