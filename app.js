const express = require('express');
const path = require('path');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');

require('dotenv').config();

const db = require('./config/database');

// Map global promise
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect(`${db.mongoURI}`)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
    
// Passport Config
require('./config/passport')(passport);    

// Router Files
const index = require('./routes/index');
const google = require('./routes/auth');

const app = express();

// Views
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', expressHbs({ defaultLayout: 'layout', extename: '.hbs'}));
app.set('view engine', 'hbs');

// Static resources
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', index);
app.use('/auth', google);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error Handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// set port
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function(){
	console.log(`Server started on port ${app.get('port')}`);
});