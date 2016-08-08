 document.addEventListener('deviceready', function() {
  // window.location.origin does not work
  var socket = io("http://192.168.0.4:5000");
  console.log("device ready");
  socket.on('connect', function() {
      console.log("Conected to server!");

      // Tell server this user is playing a note
      musicTouch.on('playing', function (color){
          console.log("sending color");
          socket.emit('imPlaying', color)
      })

      // Play notes received from server
      socket.on('othersPlay', function(color){
        musicTouch.echo(color);
      })
   });
});
