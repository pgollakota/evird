/** @jsx React.DOM */

var GoogleApiAuthForm = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <form role="form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label for="client_id">Client id</label>
                            <input ref="clientId" id="client_id" className="form-control"
                                type="text" name="client_id" placeholder="Google API Client Id" />
                        </div>
                        <button className="btn btn-lg btn-primary" type="submit">
                            Authenticate
                        </button>
                    </form>
                </div>
            </div>
        );
    },

    handleSubmit: function(ev) {
        ev.preventDefault();
        var scopes = ['https://www.googleapis.com/auth/drive.readonly'];
        var clientId = this.refs.clientId.getDOMNode().value.trim();

        (function checkAuth() {
            gapi.auth.authorize({client_id: clientId, scope: scopes},
                handleAuthResult);
        })();

        function handleAuthResult(result) {
            // FIXME: Handle fail result
            gapi.client.load('drive', 'v2').then(function() {
                React.renderComponent(<EvirdApp />, document.getElementById('app'));
            });
        }

    }
});


function retrieveAllFiles(initialRequest, callback) {
    var retrievePageOfFiles = function (request, result) {
        request.execute(function (resp) {
            result = result.concat(resp.items);
            var nextPageToken = resp.nextPageToken;
            if (nextPageToken) {
                request = gapi.client.drive.files.list({
                    pageToken: nextPageToken
                });
                retrievePageOfFiles(request, result);
            } else {
                callback(result);
            }
        });
    };
    retrievePageOfFiles(initialRequest, []);
}


var EvirdApp = React.createClass({

    getInitialState: function() {
        return {filesList: {}, isLoading: false}
    },

    componentDidMount: function() {
        this.updateFilesList("'root' in parents and trashed=false");
    },

    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <SideBar updateFilesList={this.updateFilesList} />
                    <FilesList
                        isLoading={this.state.isLoading}
                        filesList={this.state.filesList}
                        updateFilesList={this.updateFilesList}
                    />
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


var SideBar = React.createClass({
    render: function() {
        return (
            <div className="col-md-2 sidebar">
                <ul className="nav nav-sidebar">
                    <li onClick={
                        _.partial(this.props.updateFilesList,
                            "'root' in parents and trashed=false")}>
                        <a href="#">My Drive</a>
                    </li>
                    <li>
                        <a href="#">Incoming</a>
                    </li>
                    <li>
                        <a href="#">Recent</a>
                    </li>
                    <li>
                        <a href="#">Starred</a>
                    </li>
                    <li onClick={_.partial(this.props.updateFilesList, 'trashed=true')}>
                        <a href="#">Trash</a>
                    </li>
                </ul>
            </div>
        );
    }
});


var FilesList = React.createClass({
    handleDoubleClickRow: function(fileId) {
        this.props.updateFilesList("'" + fileId + "' in parents and trashed=false");
    },

    render: function() {
        var rows = [];
        if (this.props.isLoading) {
            return (
                <div className="col-md-10"> Loading </div>
            );
        }
        if (!_.isUndefined(this.props.filesList)) {
            rows = _.map(
                _.sortBy(
                    this.props.filesList,
                    function(x) {
                        return [!(x.mimeType === 'application/vnd.google-apps.folder'), x.title]}),
                function(x) {
                    if (x.mimeType === 'application/vnd.google-apps.folder') {
                        return (
                            <tr key={x.id} onDoubleClick={_.partial(this.handleDoubleClickRow, x.id)}>
                                <td> <img src={x.iconLink} /> {x.title} </td>
                                <td> {x.modifiedDate} </td>
                            </tr>
                        )
                    } else {
                        return (
                            <tr key={x.id}>
                                <td> <img src={x.iconLink} /> {x.title} </td>
                                <td> {x.modifiedDate} </td>
                            </tr>
                        )
                    }
                },
                this);
        }
        return (
            <div className="col-md-10">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th> Name </th>
                            <th> Last Modified </th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>;
                </table>
            </div>
        );
    }
});


React.renderComponent(<GoogleApiAuthForm />, document.getElementById('app'));
