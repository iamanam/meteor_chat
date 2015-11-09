UserDb = new Mongo.Collection('UserDb');

UserDb.attachSchema(
    new SimpleSchema({
        user: {
            type: String
        },
        roomUsed: {
            type: String
        }
    })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    UserDb.allow({
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
        "insertUser": function (name, room) {
            check(name, String);
            check(room, String);
            return UserDb.insert({user: name, roomUsed: room})
        },
        "findRoomUser": function (key,limit) {
            check(key, String);
            check(limit, Number);
            let data = UserDb.find({roomUsed: key});
            return data.fetch();
            /*
             a = [];
             check(key, String);
             counter = 0;
             let y = UserDb.find({roomUsed: key});
             let z = y.observeChanges({
             added: function (id, field) {
             counter++;
             console.log(field,"ob");
             a.push(field);
             return field
             }
             });
             if (counter === 0) {
             console.log(y.fetch(),"total");
             return y;
             }
             else return a;
             }
             })*/
        }
    })
}

