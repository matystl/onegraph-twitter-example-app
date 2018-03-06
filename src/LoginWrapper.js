import React, { Component } from "react";
import OneGraphAuth from "onegraph-auth";
import Me from "./Me";

const auth = new OneGraphAuth({
  appId: "cbf75b15-4c10-4772-adb4-06fc19799d02",
  service: "twitter"
});

class LoginWrapper extends Component {
  state = { logged: null };

  logIn = () => {
    console.log("Will try to log in.");
    auth.login().then(() => {
      auth.isLoggedIn().then(isLoggedIn => {
        if (isLoggedIn) {
          console.log("Successfully logged in to " + auth.service);
          this.setState({ logged: true });
        } else {
          console.log("Did not grant auth for service " + auth.service);
        }
      });
    });
  };

  logOut = () => {
    auth
      .logout()
      .then(response => {
        if (response.result === "success") {
          console.log("Logging out succesfull");
          this.setState({ logged: false });
        } else {
          console.log("Logout failed");
        }
      })
      .catch(e => console.error("Error logging in", e));
  };

  componentDidMount() {
    auth.isLoggedIn().then(isLoggedIn => {
      console.log("I finished loading loggin state" + isLoggedIn);
      this.setState({ logged: isLoggedIn });
    });
  }
  render() {
    if (this.state.logged === null) {
      return <div> Loading ... </div>;
    } else if (this.state.logged === false) {
      return (
        <div>
          <button onClick={this.logIn}>Login</button>
        </div>
      );
    } else {
      return (
        <div>
          <Me onLogOut={this.logOut} />
          {this.props.children()}
        </div>
      );
    }
  }
}

export default LoginWrapper;
