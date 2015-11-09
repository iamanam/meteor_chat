Meteor.publish('messageCount', function (room, filter) {
    check(room, String);
    check(filter, Number);
    Counts.publish(this, 'msgCount', messageRoom.find({roomName: room}), {countFromFieldLength: 'message'});
});
Meteor.publish('msg', function (room, filter) {
    check(room, String);
    check(filter, Number);
    return messageRoom.find({roomName: room}, {fields: {message: 1}});
});