// Scroll bar
window.onscroll = function () { myFunction() };

function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
}

// Down Arrow

window.onscroll = function () { myFunction() };

function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
}

// Numbers Animation

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const thousand = document.getElementById("value1");
const hundred = document.getElementById("value2");
const ten = document.getElementById("value3");

animateValue(thousand, 0, 1000, 4200);
animateValue(hundred, 0, 450, 3600);
animateValue(ten, 0, 80, 3000);

$(document).ready(function () {
    var $horizontal = $('#horizontal');

    $(window).scroll(function () {
        var s = $(this).scrollTop(),
            d = $(document).height() / 3.5,
            c = $(this).height();

        scrollPercent = (s / (d - c));

        var position = (scrollPercent * ($(document).width() - $horizontal.width()));

        $horizontal.css({
            'left': position
        });
    });
});

// Typewriter effect

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["an online learning", "a career advancement"];
const typingDelay = 100;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    }
    else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    }
    else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () { // On DOM Load initiate the effect
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Vertical Carousel

var Carousel = {
    width: 300,     // items are forced into a width of this many pixels.
    numVisible: 3,  // The number of items visible at once.
    duration: 600,  // Animation duration in milliseconds.
    padding: 2      // Vertical padding around each image, in pixels.
};

function rotateForward() {
    var carousel = Carousel.carousel,
        children = carousel.children,
        firstChild = children[0],
        lastChild = children[children.length - 1];
    carousel.insertBefore(lastChild, firstChild);
}
function rotateBackward() {
    var carousel = Carousel.carousel,
        children = carousel.children,
        firstChild = children[0],
        lastChild = children[children.length - 1];
    carousel.insertBefore(firstChild, lastChild.nextSibling);
}

function animate(begin, end, finalTask) {
    var wrapper = Carousel.wrapper,
        carousel = Carousel.carousel,
        change = end - begin,
        duration = Carousel.duration,
        startTime = Date.now();
    carousel.style.top = begin + 'px';
    var animateInterval = window.setInterval(function () {
        var t = Date.now() - startTime;
        if (t >= duration) {
            window.clearInterval(animateInterval);
            finalTask();
            return;
        }
        t /= (duration / 2);
        var top = begin + (t < 1 ? change / 2 * Math.pow(t, 3) :
            change / 2 * (Math.pow(t - 2, 3) + 2));
        carousel.style.top = top + 'px';
    }, 1000 / 60);
}

window.onload = function () {
    var carousel = Carousel.carousel = document.getElementById('caro'),
        items = carousel.getElementsByClassName('carous'),
        numitems = items.length,
        imageWidth = Carousel.width,
        aspectRatio = items[0].width / items[0].height,
        imageHeight = imageWidth / aspectRatio,
        padding = Carousel.padding,
        rowHeight = Carousel.rowHeight = imageHeight + 2 * padding;
    carousel.style.width = imageWidth + 'px';
    for (var i = 0; i < numitems; ++i) {
        var image = items[i],
            frame = document.createElement('div');
        frame.className = 'pictureFrame';
        var aspectRatio = image.offsetWidth / image.offsetHeight;
        image.style.width = frame.style.width = imageWidth + 'px';
        image.style.height = imageHeight + 'px';
        image.style.paddingTop = padding + 'px';
        image.style.paddingBottom = padding + 'px';
        frame.style.height = rowHeight + 'px';
        carousel.insertBefore(frame, image);
        frame.appendChild(image);
    }
    Carousel.rowHeight = carousel.getElementsByTagName('div')[0].offsetHeight;
    carousel.style.height = Carousel.numVisible * Carousel.rowHeight + 'px';
    carousel.style.visibility = 'visible';
    var wrapper = Carousel.wrapper = document.createElement('div');
    wrapper.id = 'carouselWrapper';
    wrapper.style.width = carousel.offsetWidth + 'px';
    wrapper.style.height = carousel.offsetHeight + 'px';
    carousel.parentNode.insertBefore(wrapper, carousel);
    wrapper.appendChild(carousel);

    setInterval(function () {
        animate(0, -Carousel.rowHeight, function () {
            rotateBackward();
            carousel.style.top = '0';
        });
    }, 3000);
};
