var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var ActionTypes = require('../constants/EvirdConstants').EvirdConstants.ActionTypes;

exports.EvirdServerActionsCreator = {
    retrievedAll: function (files) {
        AppDispatcher.handleServerAction({
            actionType: ActionTypes.RETRIEVED_ALL_FILES,
            files: files
        });
    }
};
