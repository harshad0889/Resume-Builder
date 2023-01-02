var express = require('express')
var app = express()
 
 

 

 
 

 
 
app.set('view engine', 'ejs')

//app.use(cors({origin: '*'}));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

 
 
/**
 * body-parser module is used to read HTTP POST data
 * it's an express middleware that reads form's input
 * and store it as javascript object
 */
var bodyParser = require('body-parser')
/**
 * bodyParser.urlencoded() parses the text as URL encoded data
 * (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body.
 */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())




/**
 * This module let us use HTTP verbs such as PUT or DELETE
 * in places where they are not supported
 */
 
/**
 * using custom logic to override method
 *
 * there are other ways of overriding as well
 * like using header & using query value
 */
 

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%5*/

/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/


app.use('/npmlib', express.static('node_modules'));
app.use('/public', express.static('public'));
 
 
var index = require('./routes/indexRoute')
app.use('/*', index)


app.listen(7770, function(){
	console.log('Server running at port 9000: http://127.0.0.1:7770')
})
