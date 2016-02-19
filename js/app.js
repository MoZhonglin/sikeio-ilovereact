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

function setupScrollMagic() {
  var controller = new ScrollMagic.Controller();
  var intro_mask = new ScrollMagic.Scene({
    triggerElement: "#native",
    triggerHook: "onEnter",
    duration: "100%",
  }).setTween("#intro-section__bg", {opacity: 0})
    .addTo(controller);
    
  //TweenMax.to("#iphone-overlay", 1, {width: "50%", y: 0}
  var move_iphone = new ScrollMagic.Scene({
    triggerElement: "#native",
    triggerHook: "onEnter", 
    duration: "100%",
  }).setTween("#iphone-overlay", {width: "50%", y:0})
    .addTo(controller);

  var pin_iphone = new ScrollMagic.Scene({
    triggerElement: "#native",
    triggerHook: "onLeave", 
    duration: "100%",
  }).setPin("#iphone-overlay")
    .addTo(controller);

  var switch_iphone_screen = new ScrollMagic.Scene({
    triggerElement: "#touch",
    triggerHook: "50%",
    duration: "100%",
  }).setTween("#iphone-screen", {src: "img/swype-demo.jpg"})
    .addTo(controller);
}

window.onload = function () {
  animateLogo();
  animateRobot();
  addSmoothScrolling();
  setupScrollMagic();
};

window.onscroll = function() {
  updateSliderControl();
}
