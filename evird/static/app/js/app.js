/** @jsx React.DOM */

var GoogleApiAuthForm = React.createClass({
    render: function () {
        return (
            <form role="form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label for="client_id">Client Id</label>
                    <input
                        ref="clientId"
                        id="client_id"
                        className="form-control"
                        type="text"
                        name="client_id"
                        placeholder="Google API Client ID" />
                </div>
                <button
                    className="btn btn-lg btn-primary"
                    type="submit">
                        Authenticate
                </button>
            </form>
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
            gapi.client.load('drive', 'v2').then(function() {console.log('loaded')});
            React.renderComponent(<FilesList />, document.getElementById('app'));
        }

    }
});

var FilesList = React.createClass({
    render: function () {
        return <div> Files here! </div>
    }
});

React.renderComponent(<GoogleApiAuthForm />, document.getElementById('app'));
