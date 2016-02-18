function animateLogo() {
  TweenMax.fromTo("#react-logo", 2, {
    css: {
      //top: "-30px",
      // uses CSS3 transform
      y: "-30px",
    }
  }, {
    css: {
      //top: "30px",
      y: "30px",
    }, 
    repeat: -1,
    yoyo: true,
    ease: Power2.easeInOut,
  });
}

function animateRobot() {
  var t = new TimelineMax({yoyo: true, repeat: -1});
  t.to("#android-robot", 1, {rotation: "+=10deg"})
    .to("#android-robot", 1, {rotation: "-=20deg"});
}

function updateSliderControl() {
  var links = document.querySelectorAll("#slider-control a");
  for (var i=0; i<links.length; i++) {
    var link = links[i];

    var section = document.querySelector(link.getAttribute("href"));
    sectionTop = section.offsetTop;
    var sectionBottom = sectionTop + window.innerHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      link.className = "active";
    } else {
      link.className = "";
    }
  }
}

function scrollToElement(element) {
  var topOfElement = element.offsetTop;

    TweenMax.to(window,1,{
      scrollTo: {
        y: topOfElement,
      },

      ease: Power2.easeInOut,
    });
}

function addSmoothScrolling() {
  var links = document.querySelectorAll("#slider-control a");

  for(var i=0; i<links.length; i++) {
    var link = links[i];

    (function (link) {
      link.addEventListener("click",function(event) {
        // `event` 是鼠标点击事件
        event.preventDefault();
        // BUG 警告！使用闭包或者 ES6 `let` 修复。
        var href = link.getAttribute("href");
        scrollToElement(document.querySelector(href));
      })}(link));
  }
}
window.onload = function () {
  animateLogo();
  animateRobot();
  addSmoothScrolling();
};

window.onscroll = function() {
  updateSliderControl();
}
