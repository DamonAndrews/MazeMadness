import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Game from './pages/Game';
import Scores from './pages/Scores';
import GameOver from './pages/GameOver';
import Header from './components/Header';
import Footer from './components/Footer';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


// import Login from './pages/Login';



function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <Header />
        <Routes>    
          <Route
            path = "/"
            exact
            element ={<Login />}/>
            <Route
            path = "/game"
            element ={<Game />}/>
            <Route
            path="/scores"
            element={<Scores />}/>
            <Route
            path="/gameover"
            element={<GameOver />}/> 
            <Route
            path="/home"
            element={<Home />}/> 
            <Route
            path="/login"
            element={<Login />}/> 

        </Routes>
      <Footer />
    </Router>
    </ApolloProvider>
  );
}

export default App;
