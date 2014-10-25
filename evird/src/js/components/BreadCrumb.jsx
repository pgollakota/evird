/** @jsx React.DOM */

exports.BreadCrumb = React.createClass({
    render: function () {
        var crumbsNodes = this.props.crumbs.map(function (crumb) {
            return <li key={crumb}>
                <a>{crumb}</a>
            </li>;
        });
        return <ol className="breadcrumb">{crumbsNodes}</ol>
    }
});
