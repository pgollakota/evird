var merge = require('react/lib/merge');
var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/EvirdConstants').EvirdConstants.ActionTypes;

var _filesList = [];
var _sortAsc = true;
var _sortBy = 'title';

var CHANGE_EVENT = 'change';

var FilesListStore = exports.FilesListStore = merge(EventEmitter.prototype, {

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getFiles: function () {
        return _filesList;
    }

});

AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
        case ActionTypes.RETRIEVED_ALL_FILES:
            _filesList = action.files;
            break;
        default:
            return true;
    }

    FilesListStore.emitChange();

    return true; // No errors.  Needed by promise in Dispatcher.
});
