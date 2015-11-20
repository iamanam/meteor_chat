MyRoom = new Mongo.Collection('MyRoom');
MyRoomScheme = {
    roomName: {
        type: String
    },
    uniqueRoomId: {
        type: String
    },
    roomAge: {
        type: Date,
        optional: true
    },
    roomOpen: {
        type: Boolean
    },
    roomConnected: {
        type: [String],
        optional: true
    },
    guestConnected: {
        type: Array,
        optional: true,
        blackbox: true
    },
    "guestConnected.$": {
        type: String
    },
    "pendingUser.$.name": {
        type: String,
        optional: true
    },
    "pendingUser.$.guestId": {
        type: String,
        optional: true
    },
    "pendingUser.$.status": {
        type: String,
        optional: true
    },
    blackBox: {
        type: [String],
        optional: true
    }
};

MyRoom.attachSchema(
    new SimpleSchema(MyRoomScheme));

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    MyRoom.allow({
        insert: function () {
            return true;
        },
        update: function () {
            return true;
        },
        remove: function () {
            return true;
        }
    });


}




