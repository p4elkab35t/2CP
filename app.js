const   express           = require('express'),
        path              = require('path'),
        cookieParser      = require('cookie-parser'),

        logger            = require('morgan'),
        indexRouter       = require('./routes/index'),
        listRouter        = require('./routes/ylist'),
        adminRouter       = require('./routes/admin'),
        app               = express(),
        bodyParser        = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', indexRouter);
app.use('/ylist', listRouter);
app.use('/admin', adminRouter);

module.exports = app;
