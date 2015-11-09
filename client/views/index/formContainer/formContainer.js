Template.formContainer.onCreated = function () {
    self = this;
    Session.keys = null;
    self.chatUser = null;
    self.uniqueRoom = null;
};

Template['formContainer'].helpers({});

Template['formContainer'].events({
    "submit .newUser": function (event, temp) {
        event.preventDefault();
        temp.chatUser = temp.$(".nameSet").val();
        temp.uniqueRoom = temp.$(".roomInput").val();

        console.log(temp.chatUser, temp.uniqueRoom);
        Tracker.autorun(function () {
            let userId = ReactiveMethod.call("insertUser", temp.chatUser, temp.uniqueRoom);
            if (Match.test(userId, String)) {
                let roomId = ReactiveMethod.call("insertRoom", userId, temp.uniqueRoom);
                if (Match.test(roomId, String) || Match.test(roomId, Object)) {
                    Session.set("user", temp.chatUser);
                    Session.set("room", temp.uniqueRoom);
                    temp.parent().loggedUser.set(true);
                }
            }
        })
    }
});