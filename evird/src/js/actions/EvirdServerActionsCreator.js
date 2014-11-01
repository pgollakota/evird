var gapi = require('../gapi');
var Reflux = require('reflux');

var authorize = Reflux.createAction({
    preEmit: function(clientId) {
        var scopes = ['https://www.googleapis.com/auth/drive.readonly'];
        gapi.auth.authorize({client_id: clientId, scope: scopes}, function (result) {
            return authorizeCallback(result);
        });
    }
});

var authorizeCallback = Reflux.createAction('authorizeCallback');

exports.authorize = authorize;
exports.authorizeCallback = authorizeCallback;

var loadDriveApi = Reflux.createAction({
    preEmit: function() {
        gapi.client.load('drive', 'v2').then(
            loadDriveApiFulfilled(),
            loadDriveApiRejected()
        );
    }
});

var loadDriveApiFulfilled  = Reflux.createAction('loadDriveApiFulfilled');
var loadDriveApiRejected  = Reflux.createAction('loadDriveApiRejected');

exports.loadDriveApi = loadDriveApi;
exports.loadDriveApiFulfilled = loadDriveApiFulfilled;
exports.loadDriveApiRejected = loadDriveApiRejected;


var retrieveFiles = Reflux.createAction({
    preEmit: function retrieveAllFiles(q) {
        var initialRequest = gapi.client.request(
            {path: '/drive/v2/files', params: {q: q}});

        var retrievePageOfFiles = function (request, result) {
            request.execute(function (resp) {
                result = result.concat(resp.items);
                var nextPageToken = resp.nextPageToken;
                if (nextPageToken) {
                    request = gapi.client.drive.files.list({
                        pageToken: nextPageToken
                    });
                    retrievePageOfFiles(request, result);
                } else {
                    retrieveFilesFulfilled(result);
                }
            });
        };
        retrievePageOfFiles(initialRequest, []);
    }
});

var retrieveFilesFulfilled = Reflux.createAction('retrieveFilesFulfilled');

exports.retrieveFiles = retrieveFiles;
exports.retrieveFilesFulfilled = retrieveFilesFulfilled;

