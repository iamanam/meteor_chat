Meteor.startup(function () {
    sAlert.config({
        effect: 'scale',
        position: 'bottom',
        timeout: 25000,
        html: true,
        onRouteClose: true,
        stack: true,
        // or you can pass an object:
        stack: {
            spacing: 5,
            limit: 2
        },
        offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: false
        // examples:
        // beep: '/beep.mp3'  // or you can pass an object:
        // beep: {
        //     info: '/beep-info.mp3',
        //     error: '/beep-error.mp3',
        //     success: '/beep-success.mp3',
        //     warning: '/beep-warning.mp3'
        // }
    });
    viewPort = function () {
        let width = $(document).width();
        return width;
    };
});