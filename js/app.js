document.addEventListener('DOMContentLoaded', () => {
  // Check if service workers are supported
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  }

  const container = document.querySelector(".container");


//Save "Notes" object e.g. boxes objects inside elements
var elements = document.querySelectorAll('.test-element');


//Add new notes ba appending new box object into boxContainer where all created notes land intially
  function addBox() {
    var boxContainer = document.getElementById("boxContainer");
    var newBox = document.createElement("div");
    newBox.className = "test-element";
    newBox.textContent = "newTask"; // Add text or other content as needed
    boxContainer.appendChild(newBox);
    makeDraggable(newBox); // Make the new box draggable
  }


//Allows for moving notes
  function makeDraggable(element) {
    element.ontouchstart = element.onmspointerdown = startDrag;
  }


 var elements = document.querySelectorAll('.test-element');
 elements.forEach(makeDraggable);

 // Add new box on button click event. Is being called on pressing the add box button. (Box = Note)
 document.getElementById("addBoxBtn").addEventListener("click", addBox);


   function startDrag(e) {
            this.ontouchmove = this.onmspointermove = moveDrag;

            this.ontouchend = this.onmspointerup = function () {
                this.ontouchmove = this.onmspointermove = null;
                this.ontouchend = this.onmspointerup = null;
            }

            var pos = [this.offsetLeft, this.offsetTop];
            var that = this;
            var origin = getCoors(e);

            function moveDrag(e) {
                var currentPos = getCoors(e);
                var deltaX = currentPos[0] - origin[0];
                var deltaY = currentPos[1] - origin[1];
                this.style.left = (pos[0] + deltaX) + 'px';
                this.style.top = (pos[1] + deltaY) + 'px';
                return false; // cancels scrolling
            }

            function getCoors(e) {
                var coors = [];
                if (e.targetTouches && e.targetTouches.length) {
                    var thisTouch = e.targetTouches[0];
                    coors[0] = thisTouch.clientX;
                    coors[1] = thisTouch.clientY;
                } else {
                    coors[0] = e.clientX;
                    coors[1] = e.clientY;
                }
                return coors;
            }
        }

        var elements = document.querySelectorAll('.test-element');
        [].forEach.call(elements, function (element) {
            element.ontouchstart = element.onmspointerdown = startDrag;
        });

        document.ongesturechange = function () {
            return false;
        }

