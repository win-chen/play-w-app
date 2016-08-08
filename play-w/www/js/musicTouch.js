window.musicTouch = new window.EventEmitter();

musicTouch.play = function(color) {
  console.log("playing color", color);
  playNote(color);
  musicTouch.emit('playing', color);
}

musicTouch.echo = function(color) {
  console.log("heard " + color);
  playNote(color);
}

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

// // get touch location in context of element
// function getTouchLocation(element, event) {
//     var ele = getElementLocation(element);
//     return {
//       x: event.pageX - ele.x,
//       y: event.pageY - ele.y
//     }
// }

function getTouchLocation2(element, event) {
    var ele = getElementLocation(element);
    return {
      x: (event.pageX - ele.x) * 2 ,
      y: (event.pageY - ele.y) * 2
    }
}



// function getTouchLocation(element, event) {
//     return {
//       x: event.pageX,
//       y: event.pageY
//     }
// }


// average pixel data
function avgColor(data) {
  // sum r, g, b values
  var avg = [];
  for(var i = 0; i < 3; i++) {
    avg[i] = 0;
  }
  for(var j = 0; j < data.length; j) {
    for(var k = 0; k < avg.length && j < data.length; k++) {
      avg[k] += data[j++];
    }
  }
  // avg r, g, b values
  var rows = Math.floor(data.length / avg.length);
  var remainder = data.length % avg.length;
   for(var m = 0; m < avg.length; m++) {
    if(m < remainder) avg[m] = avg[m] / (rows + 1);
    else avg[m] = avg[m] / rows;
  }
  return avg;
}

function sumColor(data) {
  // sum r, g, b values
  var sum = new Uint8Array(3);
  for(var j = 0; j < data.length; j) {
    for(var k = 0; k < sum.length && j < data.length; k++) {
      sum[k] += data[j++];
    }
  }
  return sum;
}

// Attach click handler to screen
function initPlayer() {
  console.log("Music touch ready");

  // Get webgl of threeJS canvas
  var canvas = document.getElementsByTagName('canvas')[0];
  var context;
  var container = canvas.parentElement;

  container.addEventListener('click', function(event) {
      console.log("Clicked!");
      var clickLoc = getTouchLocation2(this, event);
      context = canvas.getContext('webgl', {preserveDrawingBuffer: true})
      // rerender using scene and camera
      renderer.render(sceneStars, camera);

      // after render, readpixels
      var numpxls = 30;
      console.log("xy", clickLoc.x, clickLoc.y)
      var pixels = new Uint8Array(numpxls * numpxls * 4);
      context.readPixels(clickLoc.x, clickLoc.y, numpxls, numpxls, context.RGB, context.UNSIGNED_BYTE, pixels);

      var avgpxls = avgColor(pixels);
      var sumpxls = sumColor(pixels)
      // console.log("pixels", pixels);
      console.log("avg", avgpxls);
      console.log("sum", sumpxls);
      // play note
      musicTouch.play("ffffee");
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
