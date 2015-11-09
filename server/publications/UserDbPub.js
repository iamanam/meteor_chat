Meteor.publish('UserDb', function (filter, limit) {
    check(filter, String);
    Counts.publish(this, 'userRoom', UserDb.find({roomUsed: filter}));
});