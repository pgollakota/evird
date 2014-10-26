/** @jsx React.DOM */

var React = require('react');
var EvirdApp = require('../components/EvirdApp.jsx').EvirdApp;
var gapi = require('../gapi');
var retrieveAllFiles = require('../utils/APIUtils').retrieveAllFiles;

exports.GoogleApiAuthForm = React.createClass({
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
            require('../gapi').auth.authorize({client_id: clientId, scope: scopes},
                handleAuthResult);
        })();

        function handleAuthResult(result) {
            console.log(document.getElementById('app'));
            console.log(React);
            // FIXME: Handle fail result
                React.renderComponent(<EvirdApp />, document.getElementById('app'));
        }

    }
});
