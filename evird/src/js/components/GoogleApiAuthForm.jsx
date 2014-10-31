/** @jsx React.DOM */

var EvirdApp = require('../components/EvirdApp.jsx').EvirdApp;
var EvirdServerActions = require('../actions/EvirdServerActionsCreator');
var EvirdStore = require('../stores/EvirdStore').EvirdStore;
var React = require('react');
var Reflux = require('reflux');


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

    mixins: [
        Reflux.listenTo(EvirdStore, "renderApp")
    ],

    renderApp: function() {
        React.renderComponent(<EvirdApp />, document.getElementById('app'));
    },

    handleSubmit: function(ev) {
        ev.preventDefault();
        EvirdServerActions.authorize(this.refs.clientId.getDOMNode().value).bind(this);
    }
});
