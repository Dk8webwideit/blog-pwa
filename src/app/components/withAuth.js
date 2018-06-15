import React from "react";

import { auth } from "services/authService";

const AuthContext = React.createContext(null);

export default function withContext(Component) {
  class WithContext extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null
      };
    }

    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        if (authUser) {
          console.log("as", authUser);
          return this.setState({ authUser });
        }

        return this.setState({ authUser: false });
      });
    }

    render() {
      let { authUser } = this.state;
      return <Component authUser={authUser} />;
    }
  }
  return WithContext;
}
