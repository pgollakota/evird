/** @jsx React.DOM */

var _ = require('lodash');
var BreadCrumb = require('./BreadCrumb.jsx').BreadCrumb;
var FilesList = require('./FilesList.jsx').FilesList;
var FilesListStore = require('../stores/FilesListStore').FilesListStore;
var React = require('react');
var SideBar = require('./SideBar.jsx').SideBar;


exports.EvirdApp = React.createClass({

    getInitialState: function() {
        return {filesList: [], isLoading: false, sortAsc: true, crumbs: []};
    },

    addToCrumbs: function(title) {
        var crumbs = this.state.crumbs.concat([title]);
        this.setState({crumbs: crumbs});
    },

    resort: function(sortKey) {
        var sortAsc = this.state.sortAsc;
        var resorted = _.sortBy(this.state.filesList, sortKey);
        if (sortAsc) {
            resorted.reverse();
        }
        this.setState({filesList: resorted, sortAsc: !sortAsc});
    },

    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <SideBar />
                    <div className="col-md-10">
                        <BreadCrumb crumbs={this.state.crumbs} />
                        <FilesList
                            isLoading={this.state.isLoading}
                            filesList={this.state.filesList}
                            updateFilesList={this.updateFilesList}
                            resort={this.resort}
                            addToCrumbs={this.addToCrumbs}
                        />
                    </div>
                </div>
            </div>
        );
    }
});
