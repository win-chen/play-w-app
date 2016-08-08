var playNote = function() {
  var audio = new Audio('audio/fxshadow.mp3');
  audio.play();
  setTimeout(function() {
     audio.pause();
  }, 10000)
  return "audio/fxshadow.mp3";
}
