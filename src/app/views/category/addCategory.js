import React, { Component, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  Icon,
  ButtonBase,
  Paper,
  AppBar,
  TextField,
  Grid,
  IconButton
} from "@material-ui/core";

//App
import { user, login, logout } from "services/authService";
import { execApi } from "services/apiService";

class AddCategory extends Component {
  state = {
    credentials: {
      name: null,
      description: null
    }
  };
  componentDidMount() {
    if (!user) {
    }
  }

  handleChange = name => event => {
    let value = event.target.value;
    this.setState({
      credentials: { ...this.state.credentials, [name]: value }
    });
  };

  handleSubmit = () => {
    let { credentials } = this.state;
    console.log("Crede", credentials);
    if (credentials.name) {
      execApi("POST", "categories", credentials).then(res => {
        if (res.error) {
          return console.log("Error occured", res.data);
        }
        return alert("Data added");
      });
    }
  };
  render() {
    let { classes, authUser } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton component={NavLink} to="/" color="inherit">
                  <Icon color="inherit">arrow_back</Icon>
                </IconButton>
                <Typography
                  variant="title"
                  color="inherit"
                  className={classes.flex}
                >
                  Add Category
                </Typography>

                <Typography color="inherit">
                  {user ? user.email : null}
                </Typography>
                <Button color="inherit" onClick={user ? logout : login}>
                  {user ? "Logout" : "Login"}
                </Button>
              </Toolbar>
            </AppBar>
          </div>
        </header>

        <div className={classes.container}>
          <Paper className={classes.paper}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="name"
                  label="Name"
                  fullWidth
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange("name")}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="description"
                  label="Description"
                  fullWidth
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange("description")}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.rightButton}
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
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
  paper: {
    padding: 15,
    flexGrow: "grow"
  },
  rightButton: {
    marginTop: 16,
    float: "right"
  }
};

export default withStyles(styles)(AddCategory);
