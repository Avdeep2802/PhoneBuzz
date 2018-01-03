
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var Voice = require('./routes/Voice');
var Call = require('./routes/Call');
var Events = require('./routes/Events');
var CallLog = require('./routes/CallLog');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/data', function(req, res){
    res.contentType('application/xml');
    res.sendfile('./public/data.xml');
});



app.post('/voice', Voice.voice);
app.post('/voice2', Voice.voice2);
app.post('/call', Call.call);
app.post('/events', Events.call_initiated);
app.post('/gather', Voice.gather);
app.post('/home', routes.index);

app.get('/calllog', CallLog.call_log);




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
