import React, { Component, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import ReactQuill from "react-quill";
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
  IconButton,
  Tooltip,
  LinearProgress,
  MenuItem
} from "@material-ui/core";

import "react-quill/dist/quill.snow.css";

//App
import { user, login, logout } from "services/authService";
import { execApi } from "services/apiService";
import { uploadFile } from "../../services/storageService";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "video"],
    ["clean"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};

class AddBlog extends Component {
  state = {
    credentials: {
      name: null,
      description: null,
      banner: null,
      isActive: "",
      category: "",
      categories: null,
      banner: null
    },
    file: null,
    loader: false
  };

  componentDidMount() {
    execApi("GET", "categories").then(res => {
      if (res.error) {
        return console.log("Error occured", res.data);
      }
      let categories = [];
      res.data.forEach(function(doc) {
        categories.push({ id: doc.id, name: doc.data().name });
      });
      return this.setState({ categories });
    });
  }

  handleChange = name => event => {
    if (name === "banner") {
      this.setState(
        { file: event.target.files[0] },
        console.log("Banner", this.state)
      );
    }
    let value = name === "description" ? event : event.target.value;
    this.setState({
      credentials: { ...this.state.credentials, [name]: value }
    });
  };

  handleSubmit = () => {
    this.setState({ loader: true });
    let { credentials, file } = this.state;
    if (file === null) {
      alert("Please upload banner by clicking on camera icon");
      return this.setState({ loader: false });
    }
    let task = uploadFile(
      "banners/" + credentials.name.replace(" ", "_") + ".jpeg",
      file
    );
    return task.then(snapshot => {
      return snapshot.ref.getDownloadURL().then(downloadURL => {
        credentials.banner = downloadURL;
        if (credentials.banner) {
          execApi("POST", "blogs", credentials).then(res => {
            if (res.error) {
              this.setState({ loader: false });
              return console.log("Error occured", res.data);
            }
            this.setState({ loader: false });
            return alert("Data added");
          });
        }
      });
    });
  };
  render() {
    let { classes, authUser } = this.props;
    let { credentials, categories, loader } = this.state;
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
                  Add Blog
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
            {loader ? (
              <LinearProgress className={classes.loader} color="secondary" />
            ) : null}
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12}>
                <Typography variant="title" style={{ textAlign: "center" }}>
                  Add Blog
                </Typography>
                <div className={classes.right}>
                  <input
                    accept="image/*"
                    className={classes.hidden_input}
                    id="banner"
                    type="file"
                    onChange={this.handleChange("banner")}
                  />
                  <label htmlFor="banner" className={classes.rightAlign}>
                    <Tooltip
                      id="tooltip-bottom"
                      title="Add banner"
                      placement="bottom"
                    >
                      <Icon
                        color="primary"
                        className={classes.form_icon}
                        component="span"
                      >
                        camera_alt
                      </Icon>
                    </Tooltip>
                  </label>
                </div>
              </Grid>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Category"
                  fullWidth
                  className={classes.textField}
                  value={credentials.category}
                  onChange={this.handleChange("category")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  margin="normal"
                >
                  {categories
                    ? categories.map(doc => {
                        return (
                          <MenuItem key={doc.id} value={doc.id}>
                            {doc.name}
                          </MenuItem>
                        );
                      })
                    : null}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Status"
                  fullWidth
                  className={classes.textField}
                  value={credentials.isActive}
                  onChange={this.handleChange("isActive")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  margin="normal"
                >
                  <MenuItem key="incative" value={false}>
                    Inactive
                  </MenuItem>
                  <MenuItem key="incative" value={true}>
                    Active
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12}>
                <ReactQuill
                  modules={modules}
                  value={credentials.description}
                  onChange={this.handleChange("description")}
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
    position: "relative",
    flexGrow: "grow"
  },
  rightButton: {
    marginTop: 16,
    float: "right"
  },
  hidden_input: {
    display: "none"
  },

  dateField: {
    marginTop: 17
  },

  form_icon: {
    marginTop: 10,
    fontSize: 36
  },
  rightAlign: {
    textAlign: "right"
  },
  right: {
    float: "right"
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%"
  }
};

export default withStyles(styles)(AddBlog);
