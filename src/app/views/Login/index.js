import React, { Component, Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Icon, Paper } from "@material-ui/core";

class LoginView extends Component {
  render() {
    let { classes } = this.props;
    return (
      <div className="Login">
        <Paper className={classes.root}>
          <Typography variant="headline" component="h3">
            This is a sheet of paper.
          </Typography>
        </Paper>
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
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

export default withStyles(styles)(LoginView);
