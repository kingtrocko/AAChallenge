var express       = require('express');
var path          = require('path');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var mongoose 	  = require('mongoose');
var routes        = require('./routes/index');
var fs 			  = require('fs');
var app           = express();

var db    = 'mongodb://admin:admin+123@ds051543.mongolab.com:51543/aa_dev_challenge_db';

mongoose.connect(db);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

/**
 * Load all the Models
 */
fs.readdirSync(__dirname + '/models').forEach(function (filename) {
	if (~filename.indexOf('.js')) {
		require(__dirname + '/models/' + filename);
	}
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('port', (process.env.PORT || 8000));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

var server = app.listen(app.get('port'), function () {
  var port = server.address().port;
  console.log('======================= STARTING SERVER =======================');
  console.log('AA Challenge App listening at localhost:%s', port);
  console.log('======================= STARTING SERVER =======================');
});

