/** @jsx React.DOM */

var EvirdApp = require('../components/EvirdApp.jsx').EvirdApp;
var EvirdServerActionsCreator = require('../actions/EvirdServerActionsCreator').EvirdServerActionsCreator;
var EvirdStore = require('../stores/EvirdStore').EvirdStore;
var React = require('react');
var gapi = require('../gapi');
var retrieveAllFiles = require('../utils/APIUtils').retrieveAllFiles;


exports.GoogleApiAuthForm = React.createClass({
    componentDidMount: function() {
        EvirdStore.on('change', this._onChange);
    },

    componentWillUnmount: function() {
        EvirdStore.removeListener('change', this._onChange);
    },

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
        var clientId = this.refs.clientId.getDOMNode().value.trim();
        EvirdServerActionsCreator.authorize(clientId);
    },

    _onChange: function() {
        React.renderComponent(<EvirdApp />, document.getElementById('app'));
    }
});
