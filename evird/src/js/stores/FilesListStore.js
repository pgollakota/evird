var EvirdServerActions = require('../actions/EvirdServerActionsCreator');
var Reflux = require('reflux');

var FilesListStore = exports.FilesListStore = Reflux.createStore({

    init: function() {
        this.data = {files: [], sortAsc: true, sortBy: 'title'};

        this.listenTo(EvirdServerActions.retrieveFilesFulfilled, this.onRetrieveFilesFulfilled);
    },

    onRetrieveFilesFulfilled: function(files) {
        this.data.files = files;
        this.trigger(this.data.files);
    }

});
