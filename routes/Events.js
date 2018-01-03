/**
 * http://usejsdoc.org/
 */
var VoiceResponse = require('twilio').twiml.VoiceResponse;
const express = require('express');

exports.call_initiated = function(req, res){
	  let to = req.body.To;
	  let fromNumber = req.body.From;
	  let callStatus = req.body.CallStatus;
	  let callSid = req.body.CallSid;

	console.log(to, fromNumber, callStatus, callSid);
	  res.send('Event received');
	
	
}