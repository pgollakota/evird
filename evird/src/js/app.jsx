/** @jsx React.DOM */

var React = require('react');
var GoogleApiAuthForm = require('./components/GoogleApiAuthForm.jsx').GoogleApiAuthForm;

React.renderComponent(<GoogleApiAuthForm />, document.getElementById('app'));
