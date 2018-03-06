import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const ME = gql`
  {
    me {
      twitter {
        id
        name
      }
    }
  }
`;

class Me extends Component {
  render() {
    console.log("Will fetch data about me");
    return (
      <Query query={ME}>
        {({ loading, error, data }) => {
          if (loading) return "Loading ...";
          if (error) return "Error loading my information";
          console.log(data);
          if (data.me.twitter === null)
            console.error("We didn't get currently logged user.");
          return (
            <div>
              {(data.me && data.me.twitter && data.me.twitter.name) ||
                "Unknown user is logged in"}
              <button onClick={this.props.onLogOut}>Logout</button>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Me;
