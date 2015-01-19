var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var five = require("johnny-five"),
    // or "./lib/johnny-five" when running from the source
    board = new five.Board(),
    led,
    flickerThread,
    toggleState=false;


board.on("ready", function() {
    console.log('board ready');
    led=new five.Led(9);
    // Create an Led on pin 13 and strobe it on/off
    // Optionally set the speed; defaults to 100ms
    toggleState=true;
    led.on();

});

app.post('/off',function(req,res){
    clearInterval(flickerThread);
    if(toggleState) led.off();
    toggleState=false;
    console.log(toggleState);
    res.send(toggleState);
});

app.post('/on',function(req,res){
    clearInterval(flickerThread);
    if(!toggleState) led.on();
    toggleState=true;
    console.log(toggleState);
    res.send(toggleState);
});

app.post('/flicker',function(req,res){
    console.log(req.body.rate);
    var rate=req.body.rate;
    clearInterval(flickerThread);
    flickerThread=setInterval(toggleLed,rate);
    function toggleLed(){
        toggleState=!toggleState;
        if(toggleState) led.on();
        else led.off();
    }
    res.send('reached');
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



app.listen(3000);
module.exports = app;
