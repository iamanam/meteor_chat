"use strict";
/*
 bounce flash pulse rubberBand shake swing tada wobble jello bounceIn bounceInDown bounceInLeft bounceInRight
 bounceInUp bounceOut bounceOutDown bounceOutLeft bounceOutRight bounceOutUp fadeIn fadeInDown fadeInDownBig
 fadeInLeft fadeInLeftBig fadeInRight fadeInRightBig fadeInUp fadeInUpBig fadeOut fadeOutDown fadeOutDownBig
 fadeOutLeft fadeOutLeftBig fadeOutRight fadeOutRightBig fadeOutUp fadeOutUpBig flipInX flipInY flipOutX
 flipOutY lightSpeedIn lightSpeedOut rotateIn rotateInDownLeft rotateInDownRight
 */

Template.slide.rendered = function () {
    let self = this;
    //slideText();
    this.$("#topleft").animate({
        left: "-=40%"
    }, 3000);
    this.$("#bottomright").animate({
        right: "-=40%"
    }, 3000, function () {
        self.$(".heading").addClass("bounceIn");
    });
    self.$('h1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        let self = $(this);
        self.addClass("change");
        setTimeout(function () {
            self.removeClass().css("color", color[ran]).
                addClass("animated heading flipInX");
        }, 1500);
        setInterval(function () {
            self.removeClass().addClass("animated heading flipInX");
        }, 10000);
    });
};
Template.home.rendered = function () {
    console.time("x");
    if ($(document).width() > 768) {
        Blaze.render(Template.slide, document.getElementById("slideRect"));
        console.timeEnd("x");
    }
};
