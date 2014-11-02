var EvirdServerActions = require('../actions/EvirdServerActionsCreator');
var Reflux = require('reflux');

var EvirdStore = exports.EvirdStore = Reflux.createStore({

    init: function() {
        this.data = {driveApiLoaded: false};

        this.listenTo(EvirdServerActions.authorizeCallback, this.onAuthorizeCallback);
        this.listenTo(EvirdServerActions.loadDriveApiFulfilled, this.onLoadDriveApiFulfilled);
    },

    onAuthorizeCallback: function() {
        EvirdServerActions.loadDriveApi();
    },

    onLoadDriveApiFulfilled: function() {
        this.data.driveApiLoaded = true;
        this.trigger(this.data);
    }
});
