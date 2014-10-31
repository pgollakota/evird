var gapi = require('../gapi');
var Reflux = require('reflux');

var authorize = Reflux.createAction({
    preEmit: function(clientId) {
        var scopes = ['https://www.googleapis.com/auth/drive.readonly'];
        gapi.auth.authorize({client_id: clientId, scope: scopes}, function (result) {
            console.log('returning authorizeCallback');
            return authorizeCallback(result);
        });
    }
});

var authorizeCallback = Reflux.createAction('authorizeCallback');

authorizeCallback.preEmit = function () {
    console.log('in authorize callback');
    console.log(arguments);
};

exports.authorize = authorize;
exports.authorizeCallback = authorizeCallback;

var loadDriveApi = Reflux.createAction({
    preEmit: function() {
        console.log('preemit for loadDriveApi')
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


var retrieveFiles= Reflux.createActions([
    'retrieveFiles', 'retrieveFilesFulfilled']);

retrieveFiles.retrieveFiles.preEmit = function retrieveAllFiles(q) {
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
                retrieveFiles.retrieveFilesFulfilled(result);
            }
        });
    };
    retrievePageOfFiles(initialRequest, []);
};

exports.retrieveFiles = retrieveFiles.retrieveFiles;
exports.retriveFilesFulfilled = retrieveFiles.retrieveFilesFulfilled;

