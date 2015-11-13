Meteor.publish('SiteUser', function () {
  return SiteUser.find();
});
