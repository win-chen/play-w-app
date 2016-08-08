 document.addEventListener('deviceready', function() {
  // window.location.origin does not work
  var socket = io("http://192.168.0.4:5000");

  socket.on('connect', function() {
      console.log("Conected to server!");

      // Tell server this user is playing a note
      musicTouch.on('playing', function (note){
          socket.emit('imPlaying', note)
      })

      // Play notes received from server
      socket.on('othersPlay', function(note){
        musicTouch.echo(note);
      })
   });
});
