import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset'
import gql from "graphql-tag";

import { ApolloProvider } from "react-apollo";
import { Query } from "react-apollo";


const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// one way
client
  .query({
    query: gql`
		{
		  courses(topic: "Node.js") {
		    title
		  }
		}
    `
  })
  .then(result => console.log(result));


// another way
const Courses = () => (
  <Query
      query={gql`
		{
		  courses(topic: "Node.js") {
		    title,
		    description
		  }
		}
    `
  }
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.courses.map(({ title, description }) => (
        <div key={title}>
          <p>{title}: {description}</p>
        </div>
      ));
    }}
  </Query>
);

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app 🚀</h2>
    </div>
    <Courses />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
