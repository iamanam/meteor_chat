Meteor.publish('MyRoom', function () {
    return MyRoom.find();
});
Meteor.publish('guestCount', function (room, filter) {
    check(room, String);
    check(filter, Number);
    Counts.publish(this, 'guestCount', MyRoom.find({roomName: room}), {countFromFieldLength: 'pendingUser'});
});
