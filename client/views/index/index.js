Template.index.created = function () {
    let self = this;
    this.loggedUser = Session.get("user") === undefined ? new ReactiveVar(false) : new ReactiveVar(true);
};

Template.index.helpers({
    logged: function () {
        return Template.instance().loggedUser.get();
    }
});

