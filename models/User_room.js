User_room = new Mongo.Collection('User_room');
let errorCheck = function (e, r) {
    if (e) {
        //throw new Meteor.Error("unique", e.sanitizedError.reason);
        throw e;
    }
    return r;
};

setTimeoutFor3sCb = function (value, cb) {
    var result = value;
    Meteor.setTimeout(function () {
        console.log('Result after timeout', result);
        cb(null, result)
    }, 3000);
};
var userValidScheme = {
    owner: {
        type: String
    },
    room_name: {
        type: String,
        index: true
    },
    roomIsOpen: {
        type: Boolean,
        autoValue: function () {
            return false;
        },
        optional: true
    },
    maxUser: {
        type: Number,
        autoValue: function () {
            return 10
        },
        optional: true
    },
    pending: {
        type: [String],
        optional: true,
        autoValue: function () {
            if (this.isInsert)
                return ["nah"]
        }

    },
    userIn: {
        type: [String],
        autoValue: function (doc) {
            if (this.isInsert) {
                return [doc.owner];
            }
            else if (this.isUpsert) {
                return {$push: {userIn: doc.userIn}}
            }
        }
    },
    blocked: {
        type: [String],
        optional: true
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
};
User_room.attachSchema(
    new SimpleSchema(userValidScheme)
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
            let isMsgCreated = messageRoom.findOne({roomName: y});
            //checking with the database if any msg room with this value already exist, will return undefined if not
            if (isMsgCreated === undefined) {
                //with this data array we are cross checking if the values are true with the scheme
                let datForMsgRoom = {
                    roomName: y,
                    uniqueMessageRoomId: "Random",
                    message: [{"owner": "System", "msg": "room created"}]
                };
                let dataForUserRoom = {
                    owner: x,
                    room_name: y
                };
                //Cross checking with the scheme to find any mismatch
                try {
                    check(datForMsgRoom, msgScheme);
                    check(dataForUserRoom, userValidScheme);
                }
                catch (e) {
                    throw e;
                }
                finally {
                    // After scheme checking insert the data in msgROom
                    try {
                        messageRoom.insert(datForMsgRoom);
                        User_room.insert(dataForUserRoom);
                        console.log(true);
                        return {"msgInsert": true, "userRoomInsert": true};

                    }
                    catch (e) {
                        throw e;

                    }
                }
            }
            else {
                return false;
            }

            //throw new Meteor.error("duplicate", "A roomName with this exist, try another");
        },
        "searchRoom": function (valRoom) {
            check(valRoom, String);
            return User_room.findOne({room_name: valRoom}, {fields: {id_1: 1, owner: 1}});
        },
        "pendReq": function (roomId, user = "unknown") {
            check(roomId, String);
            check(user, String);
            return User_room.update(roomId, {$push: {"pending": user}})
        }
    })
}

