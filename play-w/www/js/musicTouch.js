window.musicTouch = new window.EventEmitter();

function getElementLocation(element) {
  var x = 0;
  var y = 0;
  while(element) {
    // add position relative to parent
    x += element.offsetLeft;
    y += element.offsetTop;
    // move up to parent to add position of its parent
    element = element.offsetParent
  }
  return {
    x: x,
    y: y
  }
}

// get touch location in context of element
function getTouchLocation(element, event) {
    var ele = getElementLocation(element);
    return {
      x: event.pageX - ele.x,
      y: event.pageY - ele.y
    }
}

// Attach click handler to screen
function initPlayer() {
  console.log("Music touch ready");

  // Get webgl of threeJS canvas
  var canvas = document.getElementsByTagName('canvas')[0];
  var context = canvas.getContext('webgl');
  var container = canvas.parentElement;

  container.addEventListener('click', function(event) {
      console.log("Clicked!");
      var clickLoc = getTouchLocation(this, event);

      // rerender using scene and camera
      renderer.render(scene, camera);

      // after render, readpixels
      console.log(clickLoc.x, clickLoc.y)
      var data = new Uint8Array(5 * 5 * 4);
      context.readPixels(clickLoc.x, clickLoc.y, 5, 5, context.RGB, context.UNSIGNED_BYTE, data);

      console.log("pixels", data);
      // play note
      playNote();
  })
}

(function () {
  // Ensure canvas loads before adding music layer
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        initPlayer();
    }
}, 10);

})();
