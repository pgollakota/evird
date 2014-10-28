var gapi = require('../gapi');
var AppDispatcher = require('../dispatcher/AppDispatcher').AppDispatcher;
var ActionTypes = require('../constants/EvirdConstants').EvirdConstants.ActionTypes;

exports.EvirdServerActionsCreator = {

    retrievedAll: function (files) {
        AppDispatcher.handleServerAction({
            actionType: ActionTypes.RETRIEVED_ALL_FILES,
            files: files
        });
    },

    authorize: function(clientId) {
        var scopes = ['https://www.googleapis.com/auth/drive.readonly'];
        gapi.auth.authorize({client_id: clientId, scope: scopes}, function (result) {
            AppDispatcher.handleServerAction({
                actionType: ActionTypes.GAPI_AUTHORIZED,
                result: result
            });
        });
    },

    loadDriveAPI: function() {
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
};
