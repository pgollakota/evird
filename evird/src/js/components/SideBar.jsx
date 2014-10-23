/** @jsx React.DOM */

var _ = require('lodash');

var SideBar = React.createClass({
    render: function() {
        return (
            <div className="col-md-2 sidebar">
                <ul className="nav nav-sidebar">
                    <li onClick={
                        _.partial(this.props.updateFilesList,
                            "'root' in parents and trashed=false")}>
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
                    <li onClick={_.partial(this.props.updateFilesList, 'trashed=true')}>
                        <a href="#">Trash</a>
                    </li>
                </ul>
            </div>
        );
    }
});


module.exports = SideBar;
