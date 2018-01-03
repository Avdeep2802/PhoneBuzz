/**
 * http://usejsdoc.org/
 */
var mysql = require('mysql');
var db = require('../db');


function GetCall_Log()
{
    return new Promise(function(resolve, reject) {
        
	    	db.query('SELECT * FROM Call_History', function(err, rows, fields){	            
	            if (err) {
	                return reject(err);
	            }	        
	            resolve(rows);
    		});
    });
}


exports.call_log = function(req, res){
	
	GetCall_Log().then(function(rows){
		console.log(JSON.stringify(rows));
		var data = JSON.stringify(rows);
		console.log(rows.length +  " ::::: ");
		res.render('call_log', { data: rows});
	});
	
}