var sub = new Tracker.Dependency;
Template.mainPart.hooks({
    created: function () {
        const roomUsed = Match.test(Session.get("room"), String) ? Session.get("room") : null;
        this.subscribe("guestCount", Session.get("room"), 1);//to check if any pending guest
        this.subscribe("MyRoom", Session.get("room"))
    }
});

/**
 * Helpers for user & global.............................................................................................................
 */
Template.mainPart.helpers({
    userData: function () {
        return {name: Session.get("user"), room: Session.get("room")}
    },
    guestManager: function () {
        //data borrowed from the Index without sending another request to server
        //var userData = Template.instance().parent(1, true).myData;
        //if one session is end but still user logged in for the Session then userData will be null
        if (Template.instance().subscriptionsReady()) {
            return Meteor.call("myRoom", function (e, r) {
                if (e) throw e;
                console.log(r.pendingUser);
                return r;
            });
        }
        else
            return null
    }
});

/**
 * Helpers for user.............................................................................................................

 if (!Meteor.userId()) {
    Template['mainPart'].helpers({
        guestManager: function () {
            if (Match.test(Counts.get("guestCount"), Number)) {
                let list = ReactiveMethod.call("guestFind", Session.get("room"), Counts.get("guestCount"));
                var count = 0;
                if (list && list !== undefined && count === 0) {
                    count++;
                    if (!list.pendingUser)
                        return null;
                    list.pendingUser.forEach(function (pendingUser) {
                        sAlert.info({
                            id: pendingUser.guestId,
                            sAlertIcon: 'asterisk',
                            sAlertTitle: 'New guest is knocking to connect with ya!!',
                            message: "That person called :" + pendingUser.name
                        });
                    }, {timeout: false});
                    return list;
                }
                return null;
            }
            return new Meteor.Error("invalid user");
        },
        msgList: function () {
            sub.depend();
            //console.log(Counts.get("msgCount"));
            Meteor.subscribe("msg", Session.get("room"), Counts.get("msgCount"));
            //console.log(msgSub.subscriptionId);
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

}
 */
Template['mainPart'].events({
    'submit .messageForm': function (e, t) {
        e.preventDefault();
        let msg = Match.test(t.$(".msg").val(), String) ? t.$(".msg").val() : Meteor.error("msg invalid");
        Meteor.call("inData", Session.get("room"), Session.get("user"), msg, function (e, r) {
            if (e) throw e;
            //console.log(r);
            sub.changed();
        });
    }
});
