var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var ActionTypes = require('../constants/EvirdConstants').EvirdConstants.ActionTypes;

var sortFiles = function sortFiles (sortBy) {
    AppDispatcher.handleViewAction({
        actionType: ActionTypes.CHANGED_SORT_BY,
        sortBy: sortBy
    });
};
