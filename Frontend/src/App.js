import React, { Component } from 'react';
import './App.css';
import './Sidebar.css';
import Main from './components/Main';
import {HashRouter} from 'react-router-dom';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

//apollo client setup
const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
})

class App extends Component {
  
  render() {
    return (
      //Use Browser Router to route to different pages
      <HashRouter>
        <div>
         {/*  <h1>Started with GraphQL</h1> */}
      <ApolloProvider client={client}>
           <Main/> 
       </ApolloProvider>
        </div>
      </HashRouter>
    );
  }
}

export default App;
