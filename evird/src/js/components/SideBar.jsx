/** @jsx React.DOM */

var _ = require('lodash');
var EvirdServerActions = require('../actions/EvirdServerActionsCreator');
var React = require('react');

exports.SideBar = React.createClass({
    render: function() {
        return (
            <div className="col-md-2 sidebar">
                <ul className="nav nav-sidebar">
                    <li onClick={_.partial(this.changeRoute, 'myDrive')}>
                        <a href="#">My Drive</a>
                    </li>
                    <li>
                        <a href="#">Incoming</a>
                    </li>
                    <li>
                        <a href="#">Recent</a>
                    </li>
                    <li onClick={_.partial(this.changeRoute, 'starred')}>
                        <a href="#">Starred</a>
                    </li>
                    <li onClick={_.partial(this.changeRoute, 'trashed')}>
                        <a href="#">Trash</a>
                    </li>
                </ul>
            </div>
        );
    },

    changeRoute: function (route) {
        if (route === 'myDrive') {
            EvirdServerActions.retrieveFiles(null, false, false);
        } else if (route === 'starred') {
            EvirdServerActions.retrieveFiles(null, false, true);
        } else if (route === 'trashed') {
            EvirdServerActions.retrieveFiles(null, true, false);
        }
    }
});
