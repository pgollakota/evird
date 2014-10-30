var merge = require('react/lib/merge');
var ActionTypes = require('../constants/EvirdConstants').EvirdConstants.ActionTypes;
var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var EventEmitter = require('events').EventEmitter;
var EvirdServerActionCreator = require('../actions/EvirdServerActionsCreator').EvirdServerActionsCreator;
var reflux = require('reflux')
var retrieveAllFiles = require('../utils/APIUtils').retrieveAllFiles;

var Actions = Reflux.createActions([
    "loadDriveApi",
    "authorize"
  ]);


var EvirdStore = exports.EvirdStore = Reflux.createStore({

    listenables: actions,

    onAuthorize: function(clientId) {
        var scopes = ['https://www.googleapis.com/auth/drive.readonly'];
        gapi.auth.authorize({client_id: clientId, scope: scopes}, function (result) {
            AppDispatcher.handleServerAction({
                actionType: ActionTypes.GAPI_AUTHORIZED,
                result: result
            });
        });
    },

    onLoadDriveApi: function() {
        gapi.client.load('drive', 'v2').then(function() {

            AppDispatcher.handleServerAction({
                actionType: ActionTypes.DRIVE_API_LOADED
            })
        }, function() {
           AppDispatcher.handleServerAction({
                actionType: ActionTypes.DRIVE_API_LOAD_FAILED
            })
        });
    }
});

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
