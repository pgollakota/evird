var _ = require('lodash');
var EvirdServerActions = require('../actions/EvirdServerActionsCreator');
var Reflux = require('reflux');

var FilesListStore = exports.FilesListStore = Reflux.createStore({

    init: function() {
        this.data = {files: [], sortAsc: true, sortBy: null};

        this.listenTo(EvirdServerActions.retrieveFilesFulfilled, this.onRetrieveFilesFulfilled);
    },

    onRetrieveFilesFulfilled: function(files) {
        this.data.files = _.sortBy(files, this.data.sortBy || function(f) {
            return [f.mimeType !== 'application/vnd.google-apps.folder', f.title]}
        );
        this.trigger(this.data.files);
    }

});
