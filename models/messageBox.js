messageBox = new Mongo.Collection('messageBox');

messageBox.attachSchema(
    new SimpleSchema({
        boxId: {
            type: String
        },
        "message.$.sentBy": {
            type: String
        },
        "message.$.content": {
            type: String
        },
        "message.$.timeSend": {
            type: Date
        }
    })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    messageBox.allow({
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
