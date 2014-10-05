/** @jsx React.DOM */

var GoogleApiAuthForm = React.createClass({
    getInitialState: function() {
        return {apiKey: null, clientId: null};
    },
    render: function () {
        return (
            <form role="form">
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
                <div className="form-group">
                    <label for="api_key">API Key</label>
                    <input
                        ref="apiKey"
                        id="api_key"
                        className="form-control"
                        type="text"
                        name="api_key"
                        placeholder="Google API Key"/>
                </div>
                <button
                    className="btn btn-lg btn-primary"
                    type="submit"
                    onSubmit={this.handleSubmit}>
                        Authenticate
                </button>
            </form>
        );
    },

    handleSubmit: function(ev) {

        ev.preventDefault();
        var scopes = ['https://www.googleapis.com/auth/drive.readonly'];
        var clientId = this.refs.clientId.getDOMNode().value.trim();
        var apiKey = this.refs.apiKey.getDOMNode().value.trim();
        gapi.client.setApiKey(apiKey);

        function checkAuth() {
            gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true});
        }

    }
});

React.renderComponent(<GoogleApiAuthForm />, document.getElementById('app'));
