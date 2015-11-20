Meteor.publish('SiteUser', function (myName = "null") {
    check(myName, String);
    if (myName)
        return SiteUser.findOne({myName: myName});
    else if (myName === null && Meteor.userId())
        return SiteUser.findOne(Meteor.userId)
    else
        return new Meteor.Error("invalid_user", "Seems like this user has a problem!! ")
});
