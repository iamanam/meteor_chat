var invokeSearch = new Tracker.Dependency;

Template.formContainer.onCreated = function () {
    self = this;
    self.chatUser = null;
    self.uniqueRoom = null;
    self.searchRoomName = null;

};

Template['formContainer'].helpers({
    /**
     * This helper depends on event which will fire after user search any room. User will be provided with the info of that room if valid
     * @returns {{name: *, _id: *, owner: (*|owner|{type}|string|number)}}
     */
    searchRoom: function () {
        invokeSearch.depend();
        if (Match.test(Template.instance().searchRoomName, String)) {
            let data = ReactiveMethod.call("roomSearch", Template.instance().searchRoomName);
            if (Match.test(data, Object))
                return {roomName: Template.instance().searchRoomName, uniqueRoom: data.uniqueRoomId};
        }
    }

});

Template['formContainer'].events({
    /**
     * This submit event will add new user with valid name and room
     * @param event {object} Event instance
     * @param temp  {object} Blaze template instance
     * If the dB operation is successful then add this info of room and user in session and set the loggedUser state true
     */
    "submit .newUser": function (event, temp) {
        event.preventDefault();
        temp.chatUser = temp.$(".nameSet").val();
        temp.uniqueRoom = temp.$(".roomInput").val();
        var secureRandom = window.crypto.getRandomValues(new Uint32Array(8));
        Meteor.call("insertSiteUser", temp.chatUser, temp.uniqueRoom, secureRandom, function (e, r) {
            if (e) throw e;
            Session.setPersistent({user: temp.chatUser, room: temp.uniqueRoom});
            temp.parent().loggedUser.set(true);
        });

        /**Tracker autoRun will provide the result if this request on server completed and its mandatory to use for the plugin
         * can reactive method

         Tracker.autorun(function () {
            let userId = ReactiveMethod.call("insertUser", temp.chatUser, temp.uniqueRoom);
            if (Match.test(userId, String)) {// if reactiveMethod got result from db it will be a true or false
                let roomId = ReactiveMethod.call("insertRoom", userId, temp.uniqueRoom);
                if (Match.test(roomId, String) || Match.test(roomId, Object)) {
                    Session.set("user", temp.chatUser);
                    Session.set("room", temp.uniqueRoom);
                    temp.parent().loggedUser.set(true);
                }
                else
                    console.log("server error")
            }
        })
         */
    },
    /**
     * Get the input and search if the room already added
     * @param e {event-object} the event where it occured
     * @param t {object} Template object using for meteor template / current.template instance
     * In return it will invoke another helper to show the search room data
     */
    "submit .advanceUser": function (e, t) {
        e.preventDefault();
        let inputItem = $(e.currentTarget).find(".search");
        let valRoom = Match.test(inputItem.val(), String) ? inputItem.val() : null;
        t.searchRoomName = valRoom;
        inputItem.val = "";
        return invokeSearch.changed();
    }
});
Template.roomResult.events({
    /**
     * This fn will send request to the owner of the room to accept his adding
     * @param e{event}
     * @param t{ Temp instance}
     * This button is a bootstrap state button which will show the return value of the request
     */
    "click #myStateButton": function (event, t) {
        event.preventDefault();
        console.log(t.data);
        //Do work to send the request to the owner

        Meteor.call("newGuest", t.$(".anyThing").val(), "op", t.data.id, function (e, r) {
                if (e) throw e;
                if (r === 1)
                    $(event.currentTarget).button("complete");//Mark the button as complete
            }
        );

    }
});