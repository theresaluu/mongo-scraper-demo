eact = require("react");
var Link = require("react-router").Link;

// Create the Main component
var Main = React.createClass({

  render: function() {

    return (
        <div className="main-container">
          <div className="container">
            <nav className="navbar navbar-default" role="navigation">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target=".navbar-ex1-collapse"
                  >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  </button>
                  <Link className="navbar-brand" to="/">NYTimes-React</Link>
                </div>

                <div className="collapse navbar-collapse navbar-ex1-collapse">
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/search">Search</Link></li>
                    <li><Link to="/saved">Saved Articles</Link></li>
                  </ul>
                </div>
              </div>
            </nav>

          <div className="jumbotron">
            <h2 className="text-center"><strong>(ReactJS) NYT Article Scrubber</strong></h2>
            <h3 className="text-center">Search for and save articles of interest.</h3>
          </div>


          {this.props.children}

          <footer>
            <hr />
            <p className="pull-right">
              <i className="fa fa-github" aria-hidden="true"></i>
              Proudly built using React.js and Data provided by NYTimes
            </p>
          </footer>
        </div>
      </div>
    );
  }
});

// Export the module back to the route
module.exports = Main;
