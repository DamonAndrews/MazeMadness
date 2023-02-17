import React, { useState } from 'react';
import {useMutation} from '@apollo/client';
// import { Link } from 'react-router-dom';
import { Navigate} from 'react-router-dom';

import { LOGIN_USER, ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);
  const [addUser, { error:signuperror }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { username: formState.username, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  
    const [signupState, setSignupState] = useState({ email: '', password: '' });
  
    const userSignup = async (event) => {
      event.preventDefault();
      const mutationResponse = await addUser({
        variables: {
          email: signupState.email,
          username: signupState.username,
          password: signupState.password,
      
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSignupChange = (event) => {
    const { name, value } = event.target;
    setSignupState({
      ...signupState,
      [name]: value,
    });
  };

  if (Auth.loggedIn()) {
    return <Navigate to="/home" />;
  };

    return (
    <div id="flexBox">
    <main>
      <div className="container my-1">
      <h2 id="headerTitle">Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Username:</label>
          <br></br>
          <input
            placeholder="username"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <br></br>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd" 
            onChange={handleChange}
          />
          </div>
          <br></br>
          <div id ="flexBox">
          <div>
          <button type="submit" id="startButton" class="btn btn-lg btn-light m-2">LOGIN</button>
        </div>
          </div>
          </form>
          </div>
        <br></br>
     <div className="container my-1">
      <h2 id="headerTitle">Create Player</h2>
      <form onSubmit={userSignup}>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Username:</label>
          <br></br>
          <input
            placeholder="FutureBaller23"
            name="username"
            type="username"
            id="username"
            onChange={handleSignupChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <br></br>
          <input
            placeholder="ballrunner@host.com"
            name="email"
            type="email"
            id="email"
            onChange={handleSignupChange}
          />
          </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <br></br>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd" 
            onChange={handleSignupChange}
          />
          </div>
          <br></br>
          <div id="flexBox">
          <button type="submit" id="startButton" class="btn btn-lg btn-light m-2">CREATE PLAYER</button>
          </div>
          </form>
          <br></br>
          <br></br>
          </div>          
          </main> 
          </div>
    );
  }
  export default Login;
