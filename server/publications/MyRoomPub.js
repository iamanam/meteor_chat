Meteor.publish('MyRoom', function (roomName) {
        check(roomName, String);
        if (roomName)
            return MyRoom.find({roomName: roomName});
        else
            new Meteor.Error("invalid_user ", "Information needed")
    }
)
;
Meteor.publish('guestCount', function (room, filter) {
    check(room, String);
    check(filter, Number);
    Counts.publish(this, 'guestCount', MyRoom.find({roomName: room}), {countFromFieldLength: 'pendingUser'});
});
