var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var ActionTypes = require('../constants/EvirdConstants').EvirdConstants.ActionTypes;
var retrieveAllFiles = require('../utils/APIUtils').retrieveAllFiles;

exports.EvirdActionsCreator = {

    changeSortBy: function (sortBy) {
        AppDispatcher.handleViewAction({
            actionType: ActionTypes.CHANGED_SORT_BY,
            sortBy: sortBy
        });
    },

    openFolder: function (fileId) {
        retrieveAllFiles("'" + fileId + "' in parents and trashed=false");
    }
};
