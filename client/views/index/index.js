Template.index.created = function () {
    let self = this;
    this.loggedUser = new ReactiveVar(false);
};

Template.index.helpers({
    logged: function () {
        return Template.instance().loggedUser.get();
    }

});
Template.index.destroyed = function () {
    Session.set("user", null);
    Session.set("room", null);
};

