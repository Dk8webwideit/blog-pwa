import React, { Component, Fragment } from "react";
import { Link, Redirect, NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import striptags from "striptags";
import {
  Icon,
  ButtonBase,
  Paper,
  Grid,
  Card,
  CardActions,
  CardMedia,
  CardContent
} from "@material-ui/core";

//App
import { login, user, logout } from "services/authService";
import { execApi } from "services/apiService";

class HomeView extends Component {
  state = {
    blogs: []
  };

  componentDidMount() {
    execApi("GET", "blogs").then(res => {
      if (res.error) {
        return console.log("Error occured", res.data);
      }
      let blogs = [];
      res.data.forEach(function(doc) {
        blogs.push(doc.data());
      });
      return this.setState({ blogs });
    });
  }

  render() {
    let { classes, authUser } = this.props;
    let { blogs = [] } = this.state;
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
        <div className={classes.container}>
          <Grid container spacing={24}>
            {blogs.map(blog => {
              console.log("Blog", blog);
              return (
                <Grid item xs={6} sm={3} key={blog.id}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.media}
                      image={blog.banner}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="headline"
                        component="h2"
                      >
                        {blog.name}
                      </Typography>
                      <Typography component="p">
                        {striptags(blog.description)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
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
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
};

export default withStyles(styles)(HomeView);
