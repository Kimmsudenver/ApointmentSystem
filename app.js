var express = require('express');
var path = require('path');
var when = require('when');

//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var redis = require('then-redis');

var db = redis.createClient();
var db = redis.createClient('tcp://localhost:6379');
var db = redis.createClient({
    host: 'localhost',
    port: 6379
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error');
});

var http = require('http').Server(app);

//http.Server(app);

var io= require('socket.io')(http);
//console.log(io)
var count=0
//console.log("Server running at http://127.0.0.1:1337 on thread number " + process.threadId)

io.on('connection', function (socket) {
    var list = {}
        socket.emit('appointments', { list:list});
    console.log("connection open " + socket['id'] );
    socket.on('book', function (data) {
        console.log(data.id);
        io.sockets.emit("pending",{id:data.id,book:true,status:"pending"})
        delay().then(function(result) {
            db.set(data.id, {id:data.id,book: true, status: 'done', socketId: data.socketId})
            io.sockets.emit("done", {id: data.id, book: true})
            //list.push({id: data.id, book: true})
        })
    });


});
http.listen(3000,function(){
    console.log("listening to port 3000")
})
var delay = function(){
    var d = when.defer();
    setTimeout(function(){
        return d.resolve();
    }, 3000);

    return d.promise;
}


module.exports = app;
