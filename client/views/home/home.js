"use strict";
/*
 bounce flash pulse rubberBand shake swing tada wobble jello bounceIn bounceInDown bounceInLeft bounceInRight
 bounceInUp bounceOut bounceOutDown bounceOutLeft bounceOutRight bounceOutUp fadeIn fadeInDown fadeInDownBig
 fadeInLeft fadeInLeftBig fadeInRight fadeInRightBig fadeInUp fadeInUpBig fadeOut fadeOutDown fadeOutDownBig
 fadeOutLeft fadeOutLeftBig fadeOutRight fadeOutRightBig fadeOutUp fadeOutUpBig flipInX flipInY flipOutX
 flipOutY lightSpeedIn lightSpeedOut rotateIn rotateInDownLeft rotateInDownRight
 */

Template.home.rendered = function () {
    let formContainer = document.getElementById("form-container");
    let slideElm = formContainer.parentNode.previousElementSibling;
    if (!Meteor.userId()) {
        Blaze.render(Template.startForm, formContainer);
    }
    else {
        Blaze.render(Template.chatbox, formContainer);
    }

    if ($(document).width() > 768) {
        Blaze.render(Template.slide, slideElm);
    }
};

/*
 Template silde work to render
 */
Template.slide.rendered = function () {
    let temp = this;
    temp.$(".main_content").delay(7000).slideDown(1000, function () {
        /*
        $(this).find('.carousel').carousel({
            interval: 10000
        });
        */
    });
};
/*
 -----------------------------------------------template silde work finished-----------------------------------------------------------------
 //////////////////////////////////////////////////////////////Template start form work-----------------------------------------------------
 */
Template.startForm.events({
    /*
     Return new user after complete the login form
     */
    "submit #new_user": function (e, t) {
        e.preventDefault();
        let userName = t.$(".userName").val();
        let pass = t.$(".pass").val();
        Accounts.createUser({
            username: userName,
            password: pass
        });
    }
});