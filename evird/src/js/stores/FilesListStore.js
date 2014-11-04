var _ = require('lodash');
var EvirdServerActions = require('../actions/EvirdServerActionsCreator');
var Reflux = require('reflux');


exports.FilesListStore = Reflux.createStore({

    init: function() {
        this.data = {files: [], sortAsc: true, sortBy: null, isLoading: true};

        this.listenTo(EvirdServerActions.retrieveFilesFulfilled, this.onRetrieveFilesFulfilled);
        this.listenTo(EvirdServerActions.retrieveFiles, this.onRetrieveFiles);
        this.listenTo(this.actions.sortFiles, this.onSortBy);
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
    },

    onSortBy: function (sortBy) {
        this.data.files = _.sortBy(this.data.files, sortBy);
        this.trigger(this.data);
    },

    actions: {

        openFolder: Reflux.createAction({
            preEmit: function (fileId) {
                EvirdServerActions.retrieveFiles("'" + fileId + "' in parents and trashed=false");
            }
        }),

        sortFiles: Reflux.createAction('sortFiles')
    }

});
