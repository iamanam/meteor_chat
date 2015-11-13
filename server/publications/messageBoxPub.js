Meteor.publish('messageBox', function () {
  return messageBox.find();
});
