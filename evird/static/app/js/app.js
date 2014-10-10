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

var EvirdApp = React.createClass({

    getInitialState: function() {
        return {filesList: {}}
    },

    componentDidMount: function() {
        gapi.client.request(
            {path: '/drive/v2/files', params: {q: "'root' in parents and trashed=false"}}).then(
            function (data) { console.log(data); this.setState({filesList: data}); }.bind(this));
    },

    render: function () {
        return <FilesList filesList={this.state.filesList}/>
    }

});

var FilesList = React.createClass({
    render: function() {
        var rows = [];
        if (!_.isUndefined(this.props.filesList.result)) {
            rows = _.map(
                _.sortBy(
                    this.props.filesList.result.items,
                    function(x) {
                        return [!(x.mimeType === 'application/vnd.google-apps.folder'), x.title]
                    }
                ),
                function(x) {
                    return (
                        <tr>
                            <td> {x.title} </td>
                            <td> {x.modifiedDate} </td>
                            <td> {x.mimeType} </td>
                        </tr>
                    );
                });
        }
        return (
            <table className="table table-striped"> <tbody> {rows} </tbody> </table>
        );
    }
});

React.renderComponent(<GoogleApiAuthForm />, document.getElementById('app'));
