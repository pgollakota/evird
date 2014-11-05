var _ = require('lodash');
var EvirdServerActions = require('../actions/EvirdServerActionsCreator');
var Reflux = require('reflux');


exports.FilesListStore = Reflux.createStore({

    init: function() {
        this.data = {files: [], sortAsc: true, sortBy: null, isLoading: true, parents: []};

        this.listenTo(EvirdServerActions.retrieveFilesFulfilled, this.onRetrieveFilesFulfilled);
        this.listenTo(EvirdServerActions.retrieveFiles, this.onRetrieveFiles);
        this.listenTo(this.actions.sortFiles, this.onSortBy);
    },

    onRetrieveFiles: function() {
        this.data.isLoading = true;
        this.trigger(this.data);
    },

    onRetrieveFilesFulfilled: function(payload) {
        this.data.isLoading = false;
        var parentFolderIdIndex = _.findIndex(this.data.parents, {id: payload.parentFolderId});
        if (payload.parentFolderId !== 'root') {
            if (parentFolderIdIndex !== -1) {
                this.data.parents.slice(0, parentFolderIdIndex);
            } else {
                this.data.parents.push({
                    id: payload.parentFolderId,
                    title: _.find(this.data.files, {id: payload.parentFolderId}).title
                })
            }
        }
        this.data.files = _.sortBy(payload.files, this.data.sortBy || function(f) {
                return [f.mimeType !== 'application/vnd.google-apps.folder', f.title]}
        );
        this.trigger(this.data);
    },

    onSortBy: function (sortBy) {
        this.data.files = _.sortBy(this.data.files, sortBy);
        if (!this.data.sortAsc) {
            this.data.files.reverse();
        }
        this.data.sortAsc = !this.data.sortAsc;
        this.data.sortBy = sortBy;
        this.trigger(this.data);
    },

    actions: {

        openFolder: Reflux.createAction({
            preEmit: function (fileId) {
                EvirdServerActions.retrieveFiles(fileId);
            }
        }),

        sortFiles: Reflux.createAction('sortFiles')
    }

});
