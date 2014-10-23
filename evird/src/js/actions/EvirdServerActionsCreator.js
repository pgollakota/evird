var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/EvirdConstants').ActionTypes;

module.exports = {
    retrievedAll: function (files) {
        AppDispatcher.handleServerAction({
            actionType: ActionTypes.RETRIEVED_ALL_FILES,
            files: files
        });
    }
};
