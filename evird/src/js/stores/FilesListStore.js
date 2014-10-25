var merge = require('react/lib/merge');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var EvirdConstants = require('../constants/EvirdConstants');

var _filesList = [];
var _sortAsc = true;
var _sortBy = 'title';

var CHANGE_EVENT = 'change';

function _changeSortBy (sortBy) {}

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

    getAll: function () {
        return _filesList;
    }

});

AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
        case EvirdConstants.CHANGED_SORT_BY:
            _changeSortBy(action.sortBy);
            break;
        default:
            return true;
    }

    FilesListStore.emitChange();

    return true; // No errors.  Needed by promise in Dispatcher.
});
