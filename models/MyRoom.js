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

    Meteor.methods({
        roomSearch: function (roomName) {
            check(roomName, String);
            return MyRoom.findOne({roomName: roomName}, {fields: {uniqueRoomId: 1}})
        },
        assositeFind: function (roomName, count) {
            check(roomName, String);
            check(count, Number);
            return MyRoom.findOne({roomName: roomName}, {fields: {pendingUser: 1, roomConnected: 1}});
        }
    })
}

/**
 ---------------------------------------------------User Function---------------------------------------------------------------------
 ///////////////////////////////////////////////////Server methods//////////////////////////////////////////////////////////////////////
 ?    roomName
 ?    uniqueRoomId
 ?    roomAge
 ?    roomOpen
 ?    roomConnected
 ?    guestUser
 ?    PendingUser
 ?    blackUser_ip

 */


