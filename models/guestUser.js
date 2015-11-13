GuestUser = new Mongo.Collection('GuestUser');

GuestUser.attachSchema(
    new SimpleSchema({
        guestName: {
            type: String
        },
        guestIp: {
            type: String
        },
        roomConnected: {
            type: String
        },
        "message.$.sentBy": {
            type: String,
            optional: true
        },
        "message.$.content": {
            type: String,
            optional: true
        },
        "message.$.timeSend": {
            type: Date,
            optional: true
        },
        lastActive: {
            type: Date,
            autoValue: function () {
                if (this.isInsert) {
                    return new Date;
                } else if (this.isUpsert) {
                    return {$setOnInsert: new Date};
                } else {
                    this.unset();  // Prevent user from supplying their own value
                }
            }
        }
    })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    GuestUser.allow({
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

    /**--------------------------------------------------------------------------------------------------------------------------------------
     * /////////////////////////////////////////////Server custom method//////////////////////////////////////////////////////////////////////
     */
    Meteor.methods({
        newGuest: function (guestName, guestIp, roomUniqueId) {
            check(guestName, String);
            check(guestIp, String);
            check(roomUniqueId, String);
            let guestId = GuestUser.insert({
                guestName: guestName,
                guestIp: guestIp,
                roomConnected: roomUniqueId + " : pending"
            });
            return MyRoom.update({uniqueRoomId: roomUniqueId}, {
                $push: {
                    "pendingUser": {
                        name: guestName,
                        guestId: guestId
                    }
                }
            })
        }
    })
}
