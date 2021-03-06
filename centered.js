window.addEventListener('load', function() {
	album = getAlbum();
	var viewerCenter = measureViewer();
	draw();
	initCenter(viewerCenter);
})
var album = [];
var centerSlide = 0;


function draw(){
	$('#filler').append(album);
}

function initCenter(viewerCenter) {
	var image = album[centerSlide];
	var imageW = image.width;
	var offset = viewerCenter - imageW/2;
	$('#filler').animate({"marginLeft": offset + "px"});
}

function getAlbum() {
	var album = document.getElementById('album');
	var photos = album.children;
	var photoArr = [];
	for (var i = 0; i <= photos.length - 1; i ++) {
		resizeImg(photos[i]);
		photoArr.push(photos[i]);
	}
	return photoArr;
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
    return viewerX / 2;
}

function slide(direction) {
	var obj = $('#filler');
	var adjust = album[centerSlide].width / 2;
	// slide next
	if (direction == 1) {
		centerSlide += 1;
		centerSlide = wrap(centerSlide);
		adjust += album[centerSlide].width / 2;
		obj.animate({"marginLeft": "-=" + adjust + "px"});
		loop();
	} 
	// slide prev
	else {
		centerSlide -= 1;
		centerSlide = wrap(centerSlide);
		adjust += album[centerSlide].width / 2;
		obj.animate({"marginLeft": "+=" + adjust + "px"});
		loop();
	}

}

function wrap(x) {
	// TODO make sure prevPhoto isn't less than 0
    if (x > album.length - 1) {
        return x % album.length;
    }
    else if (x < 0){
        return album.length - Math.abs(x);
    }
    else return x;
}

function loop() {
	// last image element
	var lastImgIndex = $('#filler img:last-child').index();
	var lastImgPos = $('#filler img:last-child').position();
	var lastImgEnd = lastImgPos.left + $('#filler img:last-child').width();
	
	// viewer
	var vPos = $('#viewer').position();
	var vMargin = parseInt($('#viewer').css('marginLeft'), 10);
	var vStart = vPos.left + vMargin;
	var vEnd = vPos.left + $('#viewer').width();

	// first image element
	var firstImgIndex = $('#filler img:first-child').index();
	var firstImgPos = $('#filler img:first-child').position();
	var firstImgMargin = $('#filler').css('marginLeft');
	var firstImgMarginInt = parseInt($('#filler').css('marginLeft'), 10);
	var firstImgStart = firstImgPos.left + firstImgMargin;

	if (lastImgEnd < vEnd){
		console.log('if');
		$('#filler img:first-child').appendTo($('#filler'));
		var adjust = album[0].width;
		
		var saveFirst = album.shift();
		album.push(saveFirst);
		// use something other than animate
		$('#filler').animate({"marginLeft": "+=" + adjust + "px"});
	}
	else if (vStart < firstImgStart) {
		console.log('elseIf')
		$('#filler img:last-child').prependTo($('#filler'));
		var adjust = album[album.length - 1].width;
		var saveLast = album.pop();
		album.unshift(saveLast);
		$('#filler').animate({"marginLeft": "-=" + adjust + "px"});

	}
	 else {
		console.log('else')
	}
}

// TODO measure length of photos and set filler width
// TODO loop photos