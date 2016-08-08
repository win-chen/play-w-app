var colors = {
  "#ffffff": "C",
  "#ffeeee": "D",
  "#eeffff": "E",
  "#eeffee": "F",
  "#ffeeff": "G",
  "#eeeeff": "A",
  "#ffffee": "B",
};

var playNote = function(color) {
  // Synth.play(0, colors[color], 4, 3);
  if(!colors[color]) console.log('Note not found');
  var audio = new Audio('audio/' + colors[color] + '.mp3');
  audio.play();
  setTimeout(function() {
     audio.pause();
  }, 10000)
}
