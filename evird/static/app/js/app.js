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
                    'pageToken': nextPageToken
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
        return {filesList: {}}
    },

    componentDidMount: function() {
        retrieveAllFiles(gapi.client.request(
            {path: '/drive/v2/files', params: {q: "'root' in parents and trashed=false"}}),
            function (data) { this.setState({filesList: data}); }.bind(this));
    },

    handleClickTrashFolder: function() {
        retrieveAllFiles(gapi.client.request(
            {path: '/drive/v2/files', params: {q: "trashed=true"}}),
            function (data) { this.setState({filesList: data}); }.bind(this));
    },

    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <SideBar handleClickTrashFolder={this.handleClickTrashFolder} />
                    <FilesList filesList={this.state.filesList}/>
                </div>
            </div>
        );
    }

});


var SideBar = React.createClass({
    render: function() {
        return (
            <div className="col-md-2 sidebar">
                <ul className="nav nav-sidebar">
                    <li className="active">
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
                    <li onClick={this.props.handleClickTrashFolder}>
                        <a href="#">Trash</a>
                    </li>
                </ul>
            </div>
        );
    }
});


var FilesList = React.createClass({
    render: function() {
        var rows = [];
        if (!_.isUndefined(this.props.filesList)) {
            rows = _.map(
                _.sortBy(
                    this.props.filesList,
                    function(x) {
                        return [!(x.mimeType === 'application/vnd.google-apps.folder'), x.title]
                    }
                ),
                function(x) {
                    return (
                        <tr>
                            <td> <img src={x.iconLink}></img> {x.title} </td>
                            <td> {x.modifiedDate} </td>
                        </tr>
                    );
                });
        }
        return (
            <div className="col-md-10">
                <table className="table table-striped">
                    <thead> <td> Name </td> <td> Last Modified </td> </thead>
                    <tbody> {rows} </tbody>
                </table>
            </div>
        );
    }
});


React.renderComponent(<GoogleApiAuthForm />, document.getElementById('app'));
