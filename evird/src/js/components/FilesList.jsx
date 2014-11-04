/** @jsx React.DOM */

var _ = require('lodash');
var FilesListStore = require('../stores/FilesListStore').FilesListStore;
var EvirdServerActions = require('../actions/EvirdServerActionsCreator');
var React = require('react');
var Reflux = require('reflux');

exports.FilesList = React.createClass({

    render: function () {
        var rows = [];
        if (this.state.isLoading) {
            return (
                <div className="col-md-10"> Loading </div>
            );
        }

        if (!_.isUndefined(this.state.files)) {
            rows = _.map(this.state.files,
                function (x) {
                    if (x.mimeType === 'application/vnd.google-apps.folder') {
                        return (
                            <tr key={x.id} onDoubleClick={_.partial(this.openFolder, x.id)}>
                                <td>
                                    <img src={x.iconLink} /> {x.title} </td>
                                <td> {x.modifiedDate} </td>
                            </tr>
                        )
                    } else {
                        return (
                            <tr key={x.id}>
                                <td>
                                    <img src={x.iconLink} /> {x.title} </td>
                                <td> {x.modifiedDate} </td>
                            </tr>
                        )
                    }
                },
                this);
        }

        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th onClick={_.partial(this.sortFiles, 'title')}> Name </th>
                            <th> Last Modified </th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    },

    mixins: [
        Reflux.listenTo(FilesListStore, "onFilesListChange")
    ],

    getInitialState: function () {
        return {files: FilesListStore.data.files};
    },

    openFolder: function(fileId) {
        EvirdServerActions.retrieveFiles("'" + fileId + "' in parents and trashed=false");
    },

    sortFiles: function(sortBy) {
        FilesListStore.actions.sortFiles(sortBy);
    },

    onFilesListChange: function(fileListStoreData) {
        this.setState({files: fileListStoreData.files, isLoading: fileListStoreData.isLoading});
    }

});
