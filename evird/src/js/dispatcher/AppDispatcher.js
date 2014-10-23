var Dispatcher = require('flux').Dispatcher;
var PayloadSources = require('../constants/EvirdConstants').PayloadSources;
var copyProperties = require('react/lib/copyProperties');

var AppDispatcher = copyProperties(new Dispatcher(), {
    handleViewAction: function (action) {
        this.dispatch({
            source: PayloadSources.VIEW_ACTION,
            action: action
        });
    },

    handleServerAction: function (action) {
        var payload = {
            source: PayloadSources.SERVER_ACTION,
            action: action
        };
        this.dispatch(payload);
    }
});

module.exports = AppDispatcher;
