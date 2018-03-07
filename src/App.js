import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const Tweet = ({
  user: { screenName = "no user" } = {},
  text = "no tweet text"
} = {}) => (
  <div>
    <h4> {screenName} </h4>
    <p> {text}</p>
  </div>
);

const Timeline = ({ timeline: { tweets = [] } = {} }) =>
  tweets.length === 0 ? (
    <div> "no tweets" </div>
  ) : (
    <div>{tweets.map(t => <Tweet key={t.id} {...t} />, tweets)}</div>
  );

const TWITTER_TIMELINE = gql`
  {
    me {
      twitter {
        id
        name
        timeline {
          tweets {
            id
            user {
              screenName
            }
            createdAt
            retweeted
            text
          }
        }
      }
    }
  }
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Simple twitter</h1>
        </header>
        <Query query={TWITTER_TIMELINE}>
          {({ loading, error, data }) => {
            if (loading) return "Loading timeline";
            if (error) return "Error loading timeline";
            return <Timeline timeline={data.me.twitter.timeline} />;
          }}
        </Query>
      </div>
    );
  }
}

export default App;
