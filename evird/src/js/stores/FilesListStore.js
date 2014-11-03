var _ = require('lodash');
var EvirdServerActions = require('../actions/EvirdServerActionsCreator');
var Reflux = require('reflux');

var FilesListStore = exports.FilesListStore = Reflux.createStore({

    init: function() {
        this.data = {files: [], sortAsc: true, sortBy: null, isLoading: true};

        this.listenTo(EvirdServerActions.retrieveFilesFulfilled, this.onRetrieveFilesFulfilled);
        this.listenTo(EvirdServerActions.retrieveFiles, this.onRetrieveFiles);
    },

    onRetrieveFiles: function() {
        this.data.isLoading = true;
        this.trigger(this.data);
    },

    onRetrieveFilesFulfilled: function(files) {
        this.data.files = _.sortBy(files, this.data.sortBy || function(f) {
            return [f.mimeType !== 'application/vnd.google-apps.folder', f.title]}
        );
        this.data.isLoading = false;
        this.trigger(this.data);
    }

});
