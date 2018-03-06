import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import logo from "./logo.svg";
import "./App.css";

const GET_VIDEO = gql`
  query {
    youTubeVideo(id: "t6CRZ-iG39g") {
      snippet {
        title
        description
      }
    }
  }
`;

class VideoComponent extends Component {
  render() {
    return (
      <Query query={GET_VIDEO}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Uh oh, something went wrong!</div>;
          return (
            <div>
              We fetched a YouTube video with title:{" "}
              {data.youTubeVideo.snippet.title}
            </div>
          );
        }}
      </Query>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <VideoComponent />
      </div>
    );
  }
}

export default App;
