/** @jsx React.DOM */

var _ = require('lodash');
var React = require('react');

exports.SideBar = React.createClass({
    render: function() {
        return (
            <div className="col-md-2 sidebar">
                <ul className="nav nav-sidebar">
                    <li>
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
                    <li>
                        <a href="#">Trash</a>
                    </li>
                </ul>
            </div>
        );
    }
});
