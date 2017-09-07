var React = require("react");

var helpers = require("../utils/helpers");

var Main = React.createClass({

  getInitialState: function() {
    return { savedArticles: "" };
  },

  // When this component mounts, get all saved articles from our db
  componentDidMount: function() {
    helpers.getSaved().then(function(articleData) {
      this.setState({ savedArticles: articleData.data });
      console.log("saved results", articleData.data);
    }.bind(this));
  },

  // This code handles the deleting saved articles from our database
  handleClick: function(item) {
    console.log("CLICKED");
    console.log(item);

    // Delete the list!
    helpers.deleteSaved(item.title, item.date, item.url).then(function() {

      // Get the revised list!
      helpers.getSaved().then(function(articleData) {
        this.setState({ savedArticles:articleData.data });
        console.log("saved results",articleData.data);
      }.bind(this));

    }.bind(this));
  },
  // A helper method for rendering the HTML when we have no saved articles
  renderEmpty: function() {
    return (
      <li className="list-group-item">
        <h3>
          <span>
            <em>Save your first fav NYT article...</em>
          </span>
        </h3>
      </li>
    );
  },

  // A helper method for mapping through our articles and outputting some HTML
  renderArticles: function() {
    return this.state.savedArticles.map(function(article, index) {

      return (
        <div key={index}>
          <li className="list-group-item">
            <h3>
              <span>
                <em>{article.title}</em>
              </span>
              <span className="btn-group pull-right">
                <a href={article.url} rel="noopener noreferrer" target="_blank">
                  <button className="btn btn-default ">View article</button>
                </a>
                <button className="btn btn-primary" onClick={() => this.handleClick(article)}>Delete</button>
              </span>
            </h3>
            <p>Date Published: {article.date}</p>
          </li>
        </div>
      );
    }.bind(this));
  },

  // A helper method for rendering a container and all of our artiles inside
  renderContainer: function() {
    return (
      <div className="main-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">
                  <strong>
                    <i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong>
                </h1>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {this.renderArticles()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  // Our render method. Utilizing a few helper methods to keep this logic clean
  render: function() {
    // If we have no articles, we will return this.renderEmpty() which in turn returns some HTML
    if (!this.state.savedArticles) {
      return this.renderEmpty();
    }
    // If we have articles, return this.renderContainer() which in turn returns all saves articles
    return this.renderContainer();
  }
});

// Export the module back to the route
module.exports = Main;
