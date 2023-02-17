import React from 'react';
import Auth from '../utils/auth';

import { Link, Navigate } from 'react-router-dom';
import maze from '../components/maze.png';

const Home = () => {

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  };

  return (
    <div id="flexBox">
    <main>
    <h1 id="flexBox">Hello Ball Runner!</h1><br></br><br></br><p id="flexBox">The goal is to make it to the end of the maze before time expires.</p>
    <p id="flexBox"> Controls: "W" for up, "S" for down, "A" for left and "D" for right!</p>
    <br></br>
    <div id="flexBox">
      <Link to="/game">
        <button id="startButton" class="btn btn-lg btn-light m-2">Start New Game</button>
      </Link>
      <Link to="/scores">
        <button id="leaderBoardButton" class="btn btn-lg btn-light m-2">Leaderboard</button>
      </Link>
      </div>
      <img src={maze} alt="the maze as seen in game"></img>
    </main>
    </div>
  );
};

export default Home;
