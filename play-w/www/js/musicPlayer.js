window.musicPlayer = new window.EventEmitter();

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
  console.log("Running music player");

  // Create canvas layer over threeJSCanvas
  var threeJSCanvas = document.getElementsByTagName('canvas')[0];
  var canvas = document.createElement('canvas');
  canvas.setAttribute("id", "musicLayer");

  var container = threeJSCanvas.parentElement;
  container.appendChild(canvas);
  canvas.width = threeJSCanvas.width;
  canvas.height = threeJSCanvas.height;
  console.log("canvas", canvas);

  container.addEventListener('click', function(event) {
      console.log("Clicked!");
      var clickLoc = getTouchLocation(this, event);
      console.log("click", clickLoc);
      console.log("this", this);
      var context = canvas.getContext('2d');
      console.log("context", context);
      var pixel = context.getImageData(clickLoc.x, clickLoc.y, 5, 5).data;
      console.log("pixels", pixel);
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
