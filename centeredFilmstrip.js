window.addEventListener('load', function() {
	getAlbum();
	measureViewer();
	fillViewer();
})

var photoArr = [];
var filler = document.getElementById('filler');
var viewerCenter;
var currentSlide = 1;
var prevSlide = 0;

function getAlbum() {
	var album = document.getElementById('album');
	var photos = album.children;
	for (var i = 0; i <= photos.length - 1; i ++) {
		resizeImg(photos[i]);
		photoArr.push(photos[i]);
	}
}

function resizeImg(x){
    var image = x;
    var ogHeight = image.height;
    var ogWidth = image.width;
    var ratio = ogWidth / ogHeight;
    var newHeight = 250;
    var newWidth = newHeight * ratio;
    image.height = newHeight;
    image.width = newWidth;    
}

function measureViewer() {
	var viewer = document.getElementById('viewer');
    var viewerX = viewer.offsetWidth;
    viewerCenter = viewerX / 2;
}

function wrap(x) {
	// TODO make sure prevPhoto isn't less than 0
    if (x > photoArr.length - 1) {
        return x % photoArr.length;
    }
    else if (x < 0){
        return photoArr.length - Math.abs(x);
    }
    else return x;
}

function measurePhoto(activePhoto, prevPhoto){
	
	var active = activePhoto;
	var prev = prevPhoto;

	// clear margin styles
	for (var i = 0; i <= photoArr.length -1; ++i) {
		photoArr[i].style.marginLeft = 0 + "px";
	}

	var activePhotoWidth = active.width;
	var activePhotoCenter = activePhotoWidth / 2;
	var positionLeft = viewerCenter - activePhotoCenter;
	var prevPhotoWidth = prev.width;
	var whitespace = positionLeft;
	var prevPosition = whitespace - prevPhotoWidth;
	prev.style.marginLeft = prevPosition + "px";
}

function fillViewer(x) {
	currentSlide = wrap(currentSlide);

	var index = currentSlide;
	var activePhoto = photoArr[wrap(index)];
	var prevPhoto = photoArr[wrap(index - 1)];

	measurePhoto(activePhoto, prevPhoto);
	
	// TODO fill up entire white space

	filler.appendChild(prevPhoto);
	filler.appendChild(activePhoto);
	filler.appendChild(photoArr[wrap(index + 1)]);

 }

function clearViewer() {
	 while(filler.firstChild) {
        filler.removeChild(filler.firstChild);
    }    
}

function slidePrev() {
	clearViewer();
	currentSlide -= 1;
	fillViewer(currentSlide);
}

function slideNext()  {
	clearViewer();
	currentSlide += 1;
	fillViewer(currentSlide);
}