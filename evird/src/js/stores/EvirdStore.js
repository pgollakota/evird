var merge = require('react/lib/merge');
var ActionTypes = require('../constants/EvirdConstants').EvirdConstants.ActionTypes;
var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var EventEmitter = require('events').EventEmitter;
var EvirdServerActionCreator = require('../actions/EvirdServerActionsCreator').EvirdServerActionsCreator;
var retrieveAllFiles = require('../utils/APIUtils').retrieveAllFiles;

var EvirdStore = exports.EvirdStore = merge(EventEmitter.prototype, {});

AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
        case ActionTypes.GAPI_AUTHORIZED:
            EvirdServerActionCreator.loadDriveAPI();
            return true;
        case ActionTypes.DRIVE_API_LOADED:
            retrieveAllFiles("'root' in parents and trashed=false");
            break;
        default:
            return true;
    }

    EvirdStore.emit('change');

    return true; // No errors.  Needed by promise in Dispatcher.
});
