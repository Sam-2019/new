import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider, useQuery, ApolloClient } from '@apollo/client'
import { ApolloLink, HttpLink, gql } from '@apollo/client';
import {  InMemoryCache } from '@apollo/client/cache';
import * as serviceWorker from './serviceWorker';


const client = new ApolloClient({
  uri: 'https://v3jnt.sse.codesandbox.io/graphql',
  cache: new InMemoryCache()
});


client
.query({
  query: gql`
    {
      notes {
        title
        detail
      }
    }
    `
  })
  .then(result => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
