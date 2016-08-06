window.musicPlayer = new window.EventEmitter();

(function () {
  // Attach click handler to screen
  console.log("Running music player");
  var screen = document.getElementById('container');
  screen.addEventListener('click', function() {
    console.log("I've been clicked!");
  })
})();
