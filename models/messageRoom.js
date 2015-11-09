messageRoom = new Mongo.Collection('messageRoom');
msgScheme = new SimpleSchema({
    roomName: {
        type: String,
        optional: true
    },
    uniqueMessageRoomId: {
        type: String,
        optional: true
    },

    "message.$.owner": {
        type: String
    },
    "message.$.msg": {
        type: String
    }
});
messageRoom.attachSchema(msgScheme);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    messageRoom.allow({
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


setTimeoutFor3sCb = function (value, cb) {
    var result = value;
    Meteor.setTimeout(function () {
        console.log('Result after timeout', result);
        cb(null, result + 3)
    }, 3000);
};
//-----------------Methods start here----------------------------------------------------/////////////////

Meteor.methods({
    inData: function (room_name, owner, msg) {
        check(room_name, String);
        check(owner, String);
        check(msg, String);
        let pushMsg = {"owner": owner, "msg": msg};
        return messageRoom.update({roomName: room_name}, {$push: {"message": pushMsg}});
    },
    findMsg: function (room, limit) {
        check(room, String);
        check(limit, Number);
        let result = messageRoom.find({roomName: room}, {fields: {message: 1}, limit: limit}).fetch()[0];
        return result;
    }
});
