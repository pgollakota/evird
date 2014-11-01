/** @jsx React.DOM */

var _ = require('lodash');
var EvirdActionsCreator = require('../actions/EvirdActionsCreator').EvirdActionsCreator;
var FilesListStore = require('../stores/FilesListStore').FilesListStore;
var React = require('react');
var Reflux = require('reflux');

exports.FilesList = React.createClass({

    render: function () {
        var rows = [];
        if (this.props.isLoading) {
            return (
                <div className="col-md-10"> Loading </div>
            );
        }

        if (!_.isUndefined(this.state.files)) {
            rows = _.map(this.state.files,
                function (x) {
                    if (x.mimeType === 'application/vnd.google-apps.folder') {
                        return (
                            <tr key={x.id} onDoubleClick={_.partial(this.handleDoubleClickFolder, x.id, x.title)}>
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
                            <th onClick={_.partial(this._sort, 'title')}> Name </th>
                            <th> Last Modified </th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                ;
                </table>
            </div>
        );
    },

    mixins: [Reflux.listenTo(FilesListStore, "onFilesListChange")],

    getInitialState: function () {
        return {files: FilesListStore.data.files};
    },

    onFilesListChange: function(files) {
        this.setState({files: files})
    },

    handleDoubleClickFolder: function (fileId) {
        EvirdActionsCreator.openFolder(fileId)
    },

    _sort: function() {},

});
