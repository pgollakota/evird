var gapi = require('./gapi')


function retrieveAllFiles(initialRequest, callback) {
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
                callback(result);
            }
        });
    };
    retrievePageOfFiles(initialRequest, []);
}

module.exports = retrieveAllFiles;
