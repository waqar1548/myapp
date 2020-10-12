var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var StudentController = require('./routes/students/student.controller');
const { response } = require('express');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//connection to db 
var connectionstring = 'mongodb://admin:admin123@ds041536.mlab.com:41536/studentproject'

try{
  mongoose.connect(connectionstring,{
    useNewUrlParser: true,
    useUnifiedTopology: true,

  },function(err,db){
    console.log('connection to db is successful')
  })
  mongoose.connection.on('error',function(error){
    console.log('Mongoose conection is not established')
    console.log(error);
    process.exit(-1);
  })

}catch(error){
console.log('error in mongose connection ',error);

}


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/students',StudentController.getAllStudents)
app.post('/signup',StudentController.saveStudent)
app.post('/apilogin',StudentController.loginStudent)
app.get('/delete/:id',StudentController.deleteStudent)
app.get('/getStudentDetails/:id', StudentController.getSingleStudentDetails)
app.post('/update',StudentController.updateStudent)
// catch 404 and forward to error handler
try{
app.get('/hello',function(req,res)
{
  res.status(200).send('thankyou i recieve your text')
}

)
}
catch(error){
  console.log(error);
}


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
  res.render('error');
});

module.exports = app;
