/** @jsx React.DOM */

var _ = require('lodash');
var BreadCrumb = require('./BreadCrumb.jsx').BreadCrumb;
var FilesList = require('./FilesList.jsx').FilesList;
var React = require('react');
var SideBar = require('./SideBar.jsx').SideBar;
var SearchBar = require('./SearchBar.jsx').SearchBar;


exports.EvirdApp = React.createClass({

    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <SideBar />
                    <div className="col-md-10">
                        <BreadCrumb />
                        <SearchBar />
                        <FilesList />
                    </div>
                </div>
            </div>
        );
    }
});
