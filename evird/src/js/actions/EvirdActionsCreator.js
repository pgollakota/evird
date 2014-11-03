var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var ActionTypes = require('../constants/EvirdConstants').EvirdConstants.ActionTypes;
var retrieveAllFiles = require('../utils/APIUtils').retrieveAllFiles;

var sortFiles = function sortFiles (sortBy) {
    AppDispatcher.handleViewAction({
        actionType: ActionTypes.CHANGED_SORT_BY,
        sortBy: sortBy
    });
};


function openFolder (fileId) {
    retrieveAllFiles("'" + fileId + "' in parents and trashed=false");
}
