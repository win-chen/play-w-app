 document.addEventListener('deviceready', function() {
  // window.location.origin does not work
  var socket = io("http://192.168.0.4:5000");

  socket.on('connect', function() {
      console.log("Finally connected!");
      alert("connected");

      // catch musicTouch playing event
      musicTouch.on('playing', function (note){
          socket.emit('imPlaying', note)
      })

      socket.on('othersPlay', function(note){
        musicTouch.play(note);
      })
   });
});
