SiteUser = new Mongo.Collection('SiteUser');
const SiteUserScheme = {
    myName: {
        type: String
    },
    roomOwned: {
        type: String
    },
    joined: {
        type: Date,
        denyUpdate: true
    }
};
SiteUser.attachSchema(SiteUserScheme);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    SiteUser.allow({
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
/*--------------------------------------------------------------My work---------------------------------------------------------------------
 --------------------------------------------------------------Hidden in server-------------------------------------------------------------//
 */

//myRoom,uniqueIdentifier,roomOwned,joined
/**
 * class site manager will provide insert operation for new user
 * @param{string} userName {a string for the user name}
 * @param{string} t roomName {a string for the room name}
 * @param{array} randomNumberArray { a random crypto array which need client window to genrate, here we will sort any of them as uniqueNo}
 */

if (Meteor.isServer) {
    class SiteUserManange {

        constructor(userName, roomName, randomNumberArray) {
            this.userName = userName;
            this.roomName = roomName;
            this.secureNumber = randomNumberArray[Math.round(Math.random() * (8 - 1) + 1)];
        }

        setUser() {
            try {
                var dataToSave = {
                    _id: Meteor.userId() || null,
                    myName: this.userName,
                    uniqueIdentifier: this.secureNumber,
                    roomOwned: this.roomName,
                    joined: new Date
                };

            }
            catch (e) {
                throw e;
                //return new Meteor.Error("invalid_input", "Put a valid user input to continue!!");
            }
            console.log(dataToSave);
            return SiteUser.insert(dataToSave);
        }

        setRoom() {
            try {
                var dataToSaveRoom = {
                    _id: Meteor.userId() || null,
                    roomName: this.roomName,
                    uniqueRoomId: this.secureNumber,
                    roomOpen: false,
                    createdAt: new Date()
                };
            }
            catch (e) {
                throw e;
                //return new Meteor.Error("invalid_input", "Put a valid input to continue!!");
            }
            console.log(dataToSaveRoom);
            return MyRoom.insert(dataToSaveRoom);
        }

        setMessageBox(roomId) {
            try {
                var dataToSaveBox = {
                    _id: roomId,
                    boxId: this.secureNumber,
                    message: [{
                        sentBy: "System",
                        content: "Welcome in your inbox!",
                        timeSend: new Date()
                    }]
                };
            }
            catch (e) {
                throw e;
                //return new Meteor.Error("invalid_input", "Put a valid input to continue!!");
            }
            console.log(dataToSaveBox);
            return messageBox.insert(dataToSaveBox);
        }

        init() {
            let isUserSet = this.setUser();
            if (isUserSet) {
                let roomId = this.setRoom();
                if (roomId && roomId !== undefined && roomId !== null)
                    return this.setMessageBox(roomId);
            }


        }

    }

    Meteor.methods({
            insertSiteUser: function (userName, roomName, uniqueNumber) {
                check(userName, String);
                check(roomName, String);
                check(uniqueNumber, Object);
                console.log(arguments);
                let newUser = new SiteUserManange(userName, roomName, uniqueNumber).init();
                console.log(newUser);
                return newUser;
            }
        }
    )
}