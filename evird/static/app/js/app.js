/** @jsx React.DOM */

var GoogleApiAuthForm = React.createClass({
    render: function () {
        return (
            <form role="form">
                <div className="form-group">
                    <label for="client_id">Client Id</label>
                    <input
                        id="client_id"
                        className="form-control"
                        type="text"
                        name="client_id"
                        placeholder="Google API Client ID" />
                </div>
                <div className="form-group">
                    <label for="api_key">API Key</label>
                    <input
                        id="api_key"
                        className="form-control"
                        type="text"
                        name="api_key"
                        placeholder="Google API Key"/>
                </div>
                <button className="btn btn-lg btn-primary" type="submit">Authenticate</button>
            </form>
        );
    }
});

React.renderComponent(<GoogleApiAuthForm />, document.getElementById('app'));
