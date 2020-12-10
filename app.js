// installed 3rd party packages

// Error display in the case an html or function does not work
let createError = require('http-errors');
//Initialize the express module from node package manager
let express = require('express');
//Initialize the path module from node package manager
let path = require('path');
//Initialize the cookie-parser module from node package manager
let cookieParser = require('cookie-parser');
//Initialize the morgan module from node package manager
let logger = require('morgan');

//Granting app.js access to the index routes
let indexRouter = require('./routes/index');
//Granting app.js access to the users routes
let usersRouter = require('./routes/users');

let app = express();

/*//database setup
let mongoose=require('mongoose')
let DB = require('./Server/Config/db')

//point mongoose to the DB UrI
mongoose.connect(DB.URI,{useNewUrlParser:true,useUnifiedTopology:true});

let mongoDB=mongoose.connection;
mongoDB.on('error',console.error.bind(console,'Connection Error'));
mongoDB.once('open',()=>{
  console.log('Connected to MongoDb...');
});*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
//Add public folder to app.js
//So that static images an be displayed in the web page
app.use(express.static(path.join(__dirname,'public')))

//Add node modules to app.js
//So that modules can be used by app.js
app.use(express.static(path.join(__dirname,'node_modules')));
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error'});
});

module.exports = app;
