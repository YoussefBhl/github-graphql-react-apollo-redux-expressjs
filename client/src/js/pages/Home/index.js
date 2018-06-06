
import React from "react";
import ReactDOM from "react-dom";
import Repositories from "../Repositories";
import { Route, Router } from "react-router-dom";
import { history } from '../../common/history';
import Header from './components/Header';
import RepositoryDetail from "../RepositoryDetail";

import { ApolloProvider, Query } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

const GITHUB_BASE_URL = 'https://api.github.com/graphql';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { client: null };
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    const httpLink = new HttpLink({
      uri: GITHUB_BASE_URL,
      headers: {
        authorization: `Bearer ${
          token
          }`,
      },
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    });

    const link = ApolloLink.from([errorLink, httpLink]);
    const cache = new InMemoryCache();
    const client = new ApolloClient({
      link,
      cache,
    });
    this.setState({ client });
  }
  render() {
    return (
      <ApolloProvider client={this.state.client}>
        <Router history={history}>
          <div>
            <Header />
            <Route exact path="/" component={Repositories} />
            <Route exact path="/:id/:id/:id" component={RepositoryDetail} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}
