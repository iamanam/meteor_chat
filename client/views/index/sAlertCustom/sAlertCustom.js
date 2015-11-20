Template.sAlertCustom.hooks({});
Template.sAlertCustom.events({
    'click .guestManage': function (e) {
        e.preventDefault();
        let d = $(e.currentTarget).attr("data-id");


    },
    'click .guestAdd': function (e) {
        e.preventDefault();
        let d = $(e.currentTarget).attr("data-id");
        Meteor.call("connect", Session.get("room"), d, function (e, r) {
            if (e) throw e;
            console.log(r);
        });

        console.log(d);

    },
    'click .guestTrash': function (e) {
        e.preventDefault();
        let d = $(e.currentTarget).attr("data-id");


    }
});