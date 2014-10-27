var gapi = require('../gapi');
var EvirdServerActionsCreator = require(
    '../actions/EvirdServerActionsCreator').EvirdServerActionsCreator;

exports.retrieveAllFiles = function retrieveAllFiles(initialRequest) {
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
                EvirdServerActionsCreator.retrievedAll(result);
            }
        });
    };
    retrievePageOfFiles(initialRequest, []);
};
