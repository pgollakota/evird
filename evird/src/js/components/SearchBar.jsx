/** @jsx React.DOM */

var React = require('react');

exports.SearchBar = React.createClass({
    render: function() {
        return (
            <div className="input-group">
                <input className="form-control" id="searchText" />
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button">
                        Search
                    </button>
                </span>
            </div>
        );
    }
});
