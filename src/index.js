import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import "./index.css";
import App from "./App";
import LoginWrapper from "./LoginWrapper";
import registerServiceWorker from "./registerServiceWorker";

const APP_ID = "cbf75b15-4c10-4772-adb4-06fc19799d02";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://serve.onegraph.com/dynamic?app_id=" + APP_ID,
    headers: {"Content-Type": "application/json"},
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <LoginWrapper>{() => <App />}</LoginWrapper>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
