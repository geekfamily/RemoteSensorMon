
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./server/routes.js'),
    cons = require("consolidate"),
    http = require('http'),
    path = require('path'),
    ardconnect = require('./server/arduinoconnect');

var app = module.exports = express();
var appRoot = '/app';
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// all environments
app.configure(function () {
    app.set('views', __dirname + appRoot);
    app.engine('html', cons.ejs);
    app.set('view engine', 'html');

    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + appRoot));
    app.use(app.router);

});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
});

// Main app
app.get('/', routes.index);

// Resources
app.get('/controllers/*', routes.views);
app.get('/directives/*', routes.views);

io.sockets.on('connection', function(socket){

    socket.on('send:ledevent', function (data) {
        console.log("server.js on connection");
        if (data.led=="on"){
            socket.emit('send:ledon', { data: data });
        } else {
            socket.emit('send:ledoff', { data: data });
        }
    });

});

ardconnect.arduinoconnect(io.sockets);

server.listen(8080, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
