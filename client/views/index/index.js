var isLogged = Session.get("user") && Session.get("room") ? new ReactiveVar(true) : new ReactiveVar(false);
var userData = new ReactiveVar(null);
Template.index.hooks({
    created: function () {
        self = this;
        self.myData = null;
    }
});
Template.index.helpers({
    /**
     * @returns{ the status of user to set the main template for the user
     */
    logged: function () {
        if (isLogged && Match.test(isLogged.get(), Boolean))
            return isLogged.get();
    }
});
Template.index.helpers({
    "userData": function () {
        console.log(userData.get());
        return userData.get();
    }
});
/**
 * When the user logged in check if he got any room connected, if he do then get him to the main page with the required data
 */
Accounts.onLogin(function () {
    Meteor.call("myRoom", function (e, r) {
        if (e) throw e;
        else if (r !== undefined) {
            if (r.roomName) {
                Session.setPersistent({user: Meteor.user().username, room: r.roomName});
                isLogged.set(true);
            }

        }

    });
});
/**
 * This function will work as call back when user logged out, so have to clear all data
 */
Tracker.autorun(function () {
    if (!Meteor.userId()) {
        Session.clearPersistent();
        Session.clear("keys");
        isLogged.set(false);
    }

});

