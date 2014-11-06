/** @jsx React.DOM */

var _ = require('lodash');
var EvirdServerActions = require('../actions/EvirdServerActionsCreator');
var FilesListStore = require('../stores/FilesListStore').FilesListStore;
var React = require('react');
var Reflux = require('reflux');

exports.BreadCrumb = React.createClass({
    render: function () {
        var crumbsNodes = this.state.parents.map(function (parent) {
            return (
                <li key={parent.id} onClick={_.partial(this.openFolder, parent.id)}>
                    <a>{parent.title}</a>
                </li>
            );
        }, this);
        return <ol className="breadcrumb">{crumbsNodes}</ol>
    },

    getInitialState: function () {
        return {parents: FilesListStore.data.parents};
    },

    mixins: [
        Reflux.listenTo(FilesListStore, "onParentFoldersChange")
    ],

    openFolder: function(fileId) {
        EvirdServerActions.retrieveFiles(fileId);
    },

    onParentFoldersChange: function() {
        this.setState({parents: FilesListStore.data.parents})
    }
});
