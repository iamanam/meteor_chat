User_room = new Mongo.Collection('User_room');
let errorCheck = function (e, r) {
    if (e) {
        throw new Meteor.Error("unique", e.sanitizedError.reason);
    }
    return r;
};

User_room.attachSchema(
    new SimpleSchema({
        owner: {
            type: String
        },
        room_name: {
            type: String,
            index: true
        },
        userIn: {
            type: String
        },
        createdAt: {
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
    User_room.allow({
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

    //method to insert data
    Meteor.methods({
        "insertRoom": function (x, y) {
            check(x, String);
            check(y, String);

            let makeRoom = {
                roomName: y,
                uniqueMessageRoomId: "xjks",
                message: [{"owner": "System", "msg": "room created"}]
            };
            check(makeRoom, msgScheme);
            let isCreated = messageRoom.findOne({roomName: y});
            let inMsgRoom = isCreated === undefined ? messageRoom.insert(makeRoom) : null;
            console.log(inMsgRoom);
            let inRoom = User_room.insert({owner: x, room_name: y, userIn: x}, errorCheck);
            return {"msg": inMsgRoom, "room": inRoom};
        }
    })
}

