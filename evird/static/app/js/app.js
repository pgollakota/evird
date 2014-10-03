/** @jsx React.DOM */

var GoogleApiAuthForm = React.createClass({
    render: function () {
        return (
            <form role="form">
                <div class="form-group">
                    <label for="client_id">Client Id</label>
                    <input id="client_id" type="text" name="client_id" placeholder="Google API Client ID"/>
                </div>
                <div class="form-group">
                    <label for="api_key">API Key</label>
                    <input id="api_key" type="text" name="api_key" placeholder="Google API Key"/>
                </div>
            </form>
        );
    }
});

React.renderComponent(<GoogleApiAuthForm />, document.getElementById('app'));
