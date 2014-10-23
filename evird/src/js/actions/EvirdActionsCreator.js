var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/EvirdConstants').ActionTypes;

var EvirdActionsCreator = {
    changeSortBy: function (sortBy) {
        AppDispatcher.handleViewAction({
            actionType: ActionTypes.CHANGED_SORT_BY,
            sortBy: sortBy
        });
    }
};

module.exports = EvirdActionsCreator;
