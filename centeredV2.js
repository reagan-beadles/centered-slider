function resizeImage (image) {
  var ratio = image.width / image.height;

  image.height = 250;
  image.width = Math.round(250 * ratio);

  return image;
}

function loadImages () {

  // .map() just applies our function (which calls resizeImage)
  // to each child of #album's, then returns the resulting
  // children array
  return $('#album').children().map(function (index, image) {
    return resizeImage(image);
  });
}

// This replaces the need to set the #filler width in css
function setFillerWidth (images) {
  var total = 0;

  images.each(function (index, image) {
    total += image.width;
  });

  $('#filler').width(total);
}

var spotlight;

window.addEventListener('load', function () {
  var images = loadImages();

  setFillerWidth(images);

  // Inject the images into the #filler div
  images.each(function (index, image) {
    $('#filler').append(image);
  });

  // Calculate an index that is about in the middle of the children array.
  // This index never changes because we are moving the first and last children
  // around respectively, and gives us some room to do that out of the user's
  // sight.
  spotlight = Math.round($('#filler').children().size() / 2);

  centerSpotlight();
});

function slide (direction) {
  // With jQuery, when you prepend() or append() a child,
  // if the child is already one of the parent's children,
  // then jQuery doesn't create another child, it simply
  // moves it.

  if (direction < 0) {
    var lastImage = $('#filler').children().last();
    $('#filler').prepend(lastImage);
  }
  else {
    var firstImage = $('#filler').children().first();
    $('#filler').append(firstImage);
  }

  centerSpotlight();
}

// centerSpotlight() basically calculates what to set the marginLeft
// property of the #filler div, so that the spotlight image is centered.
function centerSpotlight () {
  var widthSum = 0;

  var children = $('#filler').children().slice(0, spotlight + 1);

  children.each(function (index, child) {
    if (index == spotlight) {
      return widthSum += Math.round(child.width / 2);
    }

    widthSum += child.width;
  });

  var adjustment = widthSum - Math.round($('#viewer').width() / 2);

  $('#filler').animate({'marginLeft': '-' + adjustment});
}
