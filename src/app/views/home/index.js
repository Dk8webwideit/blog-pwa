import React, { Component, Fragment } from "react";
import { Link, Redirect, NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Icon, ButtonBase } from "@material-ui/core";

//App
import { login, user, logout } from "services/authService";

class HomeView extends Component {
  componentDidMount() {
    console.log("User", this.props.authUser);
  }
  render() {
    let { classes, authUser } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <Icon color="inherit">menu</Icon>
                <Typography
                  variant="title"
                  color="inherit"
                  className={classes.flex}
                >
                  Title
                </Typography>
                <Typography color="inherit">
                  {user ? user.displayName : null}
                </Typography>
                <Button color="inherit" onClick={user ? logout : login}>
                  {user ? "Logout" : "Login"}
                </Button>
              </Toolbar>
            </AppBar>
          </div>
        </header>

        <div className={classes.container}>
          {user ? (
            <Button
              variant="contained"
              component={NavLink}
              to="addCategory"
              color="primary"
              className={classes.rightButton}
            >
              Add Category
            </Button>
          ) : null}
          {user ? (
            <Button
              variant="contained"
              component={NavLink}
              to="addBlog"
              color="primary"
              className={classes.leftButton}
            >
              Add Blog
            </Button>
          ) : null}
        </div>
      </div>
    );
  }
}

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1,
    paddingLeft: 10
  },
  container: {
    flex: 1,
    padding: 15
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  rightButton: {
    marginTop: 16,
    right: 0,
    float: "right"
  },
  leftButton: {
    marginTop: 16,
    right: 0,
    float: "left"
  }
};

export default withStyles(styles)(HomeView);
