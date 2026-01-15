window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 121;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}

$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
            initialSlide: 2,
			slidesToScroll: 1,
			slidesToShow: 2,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 8000,
            pauseOnHover: true,
            navigation: true,
            pagination: false,
            navigationSwipe: true,
    }
    
    var doptions = {
            initialSlide: 0,
			slidesToScroll: 1,
			slidesToShow: 5,
			loop: false,
			infinite: false,
			autoplay: false,
			autoplaySpeed: 8000,
            pauseOnHover: true,
            navigation: false,
            pagination: false,
            navigationSwipe: true,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }
    
    var dcarousels = bulmaCarousel.attach('.dcarousel', doptions);

        // Loop on each carousel initialized
    for(var i = 0; i < dcarousels.length; i++) {
    	// Add listener to  event
    	dcarousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }
    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

    // Initialize the comparison widget
    initComparisonWidget();
})

let images_left = []
let images_right = []

// Values you could pass in would be something like `preloadInterpImages(INTERP_BASE, METHOD,NUM_INTERP_FRAMES)` now
function preloadImagesLeft(base, method, apertures) {
    // Clear image array, previously loaded images stay cached by the browser
    images_left = []

    for (aperture in apertures) {
        images_left[i] = new Image()
        images_left[i].src = `images/${base}/${method}/${aperture}.jpg`
    }
}

function preloadImagesRight(base, method, apertures) {
    // Clear image array, previously loaded images stay cached by the browser
    images_right = []

    for (aperture in apertures) {
        images_right[i] = new Image()
        images_right[i].src = `images/${base}/${method}/${aperture}.jpg`
    }
}

function setLeftImage(i) {
  var imageLeft = images_left[i];
  imageLeft.ondragstart = function() { return false; };
  imageLeft.oncontextmenu = function() { return false; };
  $('#left-image-wrapper').empty().append(imageLeft);
}

