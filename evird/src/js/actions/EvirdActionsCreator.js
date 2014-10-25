var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var ActionTypes = require('../constants/EvirdConstants').EvirdConstants.ActionTypes;

exports.EvirdActionsCreator = {
    changeSortBy: function (sortBy) {
        AppDispatcher.handleViewAction({
            actionType: ActionTypes.CHANGED_SORT_BY,
            sortBy: sortBy
        });
    }
};
