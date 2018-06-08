var express = require("express");
var path = require("path");

var app = express();
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render("index");
});

var server = app.listen(8000, function() {
    console.log("listening on port 8000");
});

var io = require('socket.io')(server);   
var querystring = require('querystring');

io.sockets.on('connection', function (socket) {
    // console.log("socket:" , socket)
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    socket.on( "submit", function (data){
        //format serialized data into JSON object using querystring
        data = querystring.parse(data);
        //generate random number
        var random = Math.floor(Math.random()*1001) + 1
        //send data and number back
        socket.emit('updated_message', data);
        socket.emit('random_number', {random: random});
    });
});