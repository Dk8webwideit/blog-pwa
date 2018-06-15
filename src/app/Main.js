import React, { Component, Fragment } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//APP
import HomeView from "views/home";
import AddCategory from "views/category/addCategory";
import AddBlog from "views/blog/addBlog";
import withAuth from "components/withAuth";
import "styles/index";

class Main extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <div className="ai-page">
          <HashRouter hashType="hashbang">
            <Switch>
              <Route exact path="/" component={HomeView} />
              <Route exact path="/addCategory" component={AddCategory} />
              <Route exact path="/addBlog" component={AddBlog} />
            </Switch>
          </HashRouter>
        </div>
      </Fragment>
    );
  }
}

export default withAuth(Main);
