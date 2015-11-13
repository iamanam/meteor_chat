Meteor.publish('guestUser', function () {
  return guestUser.find();
});
