/** @jsx React.DOM */

var _ = require('lodash');
var EvirdActionsCreator = require('../actions/EvirdActionsCreator').EvirdActionsCreator;
var FilesListStore = require('../stores/FilesListStore').FilesListStore;
var React = require('react');

exports.FilesList = React.createClass({

    getInitialState: function () {
        return {sortAsc: true, sortBy: 'title'}
    },

    componentDidMount: function() {
        FilesListStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        FilesListStore.removeChangeListener(this._onChange);
    },

    handleDoubleClickRow: function (fileId, title) {
        this.props.updateFilesList("'" + fileId + "' in parents and trashed=false");
        this.props.addToCrumbs(title);
    },

    render: function () {
        var rows = [];
        if (this.props.isLoading) {
            return (
                <div className="col-md-10"> Loading </div>
            );
        }

        if (!_.isUndefined(this.props.filesList)) {
            rows = _.map(this.props.filesList,
                function (x) {
                    if (x.mimeType === 'application/vnd.google-apps.folder') {
                        return (
                            <tr key={x.id} onDoubleClick={_.partial(this.handleDoubleClickRow, x.id, x.title)}>
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

    _changeSortBy: function (sortBy) {
        EvirdActionsCreator.changeSortBy(sortBy);
    }
});
