'use-strict';

var chalk = require('chalk');
var db = require('./db');
var socketio = require('socket.io');

// Create node server
var server = require('http').createServer();

var createApplication = function () {
    var app = require('./app')(db);
    server.on('request', app); // Attach the Express application.
    // require('./io')(server);   // Attach socket.io.
};

var io = socketio(server);

io.on('connection', function(socket) {
  //receives the newly connected socket
  //called for each browser that connects to our server
  console.log('A new client has connected')
  console.log('socket id: ', socket.id)

  //event that runs anytime a socket disconnects
  socket.on('disconnect', function(){
    console.log('socket id ' + socket.id + ' has disconnected. : (');
  })

  socket.on('imPlaying', function(note) {
    console.log('catching a note')

    // Broadcast(other sockets only)
    socket.broadcast.emit('othersPlay', note);
  })
})

var startServer = function () {

    var PORT = process.env.PORT || 5000;

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

};

// #useTheForce wisely
db.sync().then(createApplication).then(startServer).catch(function (err) {
    console.error(chalk.red(err.stack));
});
