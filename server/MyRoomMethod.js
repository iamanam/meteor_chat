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

if (Meteor.isServer) {
    Meteor.methods({
        /**
         * This function will provide room info for the logged in user after the moment of loggin
         * @returns {array}
         */
        myRoom: function () {
            if (Meteor.user()) {
                return MyRoom.findOne(Meteor.userId(), {fields: {pendingUser: 1, roomConnected: 1}});
            }
        },
        /**
         * This function will give the result if any room with the @param roomName exist
         * @param roomName
         * @returns {roomName[String] or {Undefined if no room exist}
     */
        roomSearch: function (roomName) {
            check(roomName, String);
            return MyRoom.findOne({roomName: roomName}, {fields: {uniqueRoomId: 1}})
        },
        guestFind: function (count) {
            check(count, Number);
            return MyRoom.findOne(Meteor.userId, {fields: {pendingUser: 1, roomConnected: 1}});
        },
        connect: function (id, roomName) {
            check(id, String);
            check(roomName, String);
            console.log(arguments);
            return MyRoom.update({"roomName": roomName}, {
                $push: {
                    "guestConnected": id
                }
            })
        }
    });

}