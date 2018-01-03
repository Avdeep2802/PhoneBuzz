var VoiceResponse = require('twilio').twiml.VoiceResponse;
const express = require('express');
const twilio = require('twilio');
var mysql = require('mysql');
var db = require('../db');

function findRecord(phone_number){
	return new Promise(function(resolve, reject){
		db.query("SELECT * FROM Call_History Where phone_number = ? ORDER BY ID DESC LIMIT 1", [phone_number], function(err, rows, fields){
			if(err){
				return reject(err);
			}
			console.log(rows[0].id);
			resolve(rows[0].id);
		});
	});
}

function findFizzBuzz(phone_number){
	return new Promise(function(resolve, reject){
		db.query("SELECT * FROM Call_History Where phone_number = ? ORDER BY ID DESC LIMIT 1", [phone_number], function(err, rows, fields){
			if(err){
				return reject(err);
			}
			console.log(rows[0].fizzbuzz);
			resolve(rows[0].fizzbuzz);
		});
	});
}

function add_fizzbuzz_to_call_record(fizzbuzz, id)
{

    return new Promise(function(resolve, reject) {
        
	    	db.query("UPDATE Call_History SET fizzbuzz = ? Where id = ?", [fizzbuzz, id], function(err,result){	            
	            if (err) {
	                return reject(err);
	            }	            
	            resolve("updated");
    		});
    });
}


exports.voice = function(request, response){
	
	
	console.log(request.body.sendDigits + " : "+ request.params.sendDigits + " ::::::::");
	const twiml = new VoiceResponse();

	  const gather = twiml.gather({
	    numDigits: 99,
	    action: '/gather',
	  });
	  gather.say('Please enter any number for which you want to get the Fizz Buzz followed by pound key');
	  // If the user doesn't enter input, loop
	  twiml.redirect('/voice');
	  // Render the response as XML in reply to the webhook request
	  response.type('text/xml');
	  response.send(twiml.toString());	
}
	

exports.gather = function(request, response){

	var phone_number = request.body.To;
	const twiml = new VoiceResponse();

	  // If the user entered digits, process their request
	  if (request.body.Digits) {
		console.log(request.body.Digits);
		var number = request.body.Digits;
		var answer = "";
		if(number > 99){
			twiml.say("Sorry. Please enter a number between 1 and 99");
	        twiml.redirect('/voice');
		}
		else if(number < 100 && number >0){
			for(var i=1; i <= number; i+=1 ){
				if(i % 3 == 0 && i % 5 == 0){
					answer = answer + "fizzbuzz. ";
				}else if(i % 3 == 0){
					answer = answer + "fizz. ";
				}else if(i % 5 == 0){
					answer = answer + "buzz. ";
				}else{
					answer = answer + i + ". ";
				}
			}
			findRecord(phone_number).then(function(id){
				add_fizzbuzz_to_call_record(answer, id).then(function(status){
					if(status == "updated"){
						console.log("success");
					}
				});
			});
			console.log(answer);
			twiml.say(answer);
			
			twiml.say("Thank You for using Phonebuzz");
			
			
		}
	    
	  } else {	    
	    twiml.redirect('/voice');
	  }
	 
	  
	  response.type('text/xml');
	  response.send(twiml.toString());
	  
}




exports.voice2 = function(request, response){
	
	var phone_number = request.body.To;
	const twiml = new VoiceResponse();
	var x;
	findFizzBuzz(phone_number).then(function(fizzbuzz){
		x = fizzbuzz;
		console.log(fizzbuzz + " :::::: ??????");
		
	});
	setTimeout(function () {
	twiml.say(x);
	response.type('text/xml');
	response.send(twiml.toString());
	}, 1000);
}
