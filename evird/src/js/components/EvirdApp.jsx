/** @jsx React.DOM */

var _ = require('lodash');
var FileListStore = require('../stores/FileListStore');

var EvirdApp = React.createClass({

    getInitialState: function() {
        return {filesList: [], isLoading: false, sortAsc: true, crumbs: []};
    },

    componentDidMount: function() {
        FileListStore.addChangeListener(this._onChange);
        //this.updateFilesList("'root' in parents and trashed=false");
    },

    componentWillUnmount: function() {
        FileListStore.removeChangeListener(this._onChange);
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
                    <SideBar updateFilesList={this.updateFilesList} />
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
    },

    updateFilesList: function(q) {
        this.setState({filesList: [], isLoading: true});
        retrieveAllFiles(gapi.client.request(
            {path: '/drive/v2/files', params: {q: q}}),
            function (data) { this.setState({filesList: data, isLoading: false}); }.bind(this));
    }

});

module.exports = EvirdApp;
