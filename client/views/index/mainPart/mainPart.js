var sub = new Tracker.Dependency;
Template.mainPart.hooks({
    created: function () {
        const roomUsed = Match.test(Session.get("room"), String) ? Session.get("room") : null;
        this.subscribe("messageCount", roomUsed, 1);
        this.subscribe("UserDb", roomUsed);
    }
});

Template['mainPart'].helpers({
    userData: function () {
        return {name: Session.get("user"), room: Session.get("room")}
    },
    userList: function () {
        if (Match.test(Session.get("room"), String)) {

            let list = ReactiveMethod.call("findRoomUser", Session.get("room"), Counts.get("userRoom"));
            if (list !== undefined) {
                console.log(list, "list");
                return list;
            }
            return null;
        }
        return Meteor.error;
    },
    msgList: function () {
        sub.depend();
        console.log(Counts.get("msgCount"));
        let msgSub = Meteor.subscribe("msg", Session.get("room"), Counts.get("msgCount"));
        console.log(msgSub.subscriptionId);
        if (Template.instance().subscriptionsReady()) {
            if (Match.test(Session.get("room"), String)) {
                let msglist = ReactiveMethod.call("findMsg", Session.get("room"), Counts.get("msgCount"));
                console.log(msglist);
                if (msglist !== undefined) {
                    return msglist.message;
                }
                return Meteor.error;
            }
        }
        return Meteor.error;
    }

});

Template['mainPart'].events({
    'submit .messageForm': function (e, t) {
        e.preventDefault();
        let msg = Match.test(t.$(".msg").val(), String) ? t.$(".msg").val() : Meteor.error("msg invalid");
        Meteor.call("inData", Session.get("room"), Session.get("user"), msg, function (e, r) {
            if (e) throw e;
            console.log(r);
            sub.changed();
        });
    }
});
