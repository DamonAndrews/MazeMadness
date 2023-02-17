import React from 'react';
import { Link } from 'react-router-dom';
import maze from '../../components/maze.png';
import ball from '../../components/ball.png';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();

  };

  return (
    <header className=" navbar text-light mb-4 py-3 flex-row align-center" style={{ backgroundColor: '#0a4275' }}>
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <h1 className="m-0" id="headerTitle" >
            Ball
            <img src={ball} class="ballRunner" alt="a round, yellow ball"></img>
            Runner</h1>
              <p className="m-0"  id="headerTitle">Try to ESCAPE the MADNESS of the MAZE!!</p>
        </div>
      <div id="flexBox" >
        {Auth.loggedIn() ? (     
          <>          
           { <Link to="/scores">
        <button id="leaderBoardButton" class="btn btn-lg btn-light m-2">Leaderboard</button>
      </Link> }
          </>
          ) : (
          <>           
          </>          
        )}           
      </div>
        <div>
          <img src={maze} class="mazeRunner" alt="the maze layout as experienced in game"></img>
        </div>  
      </div>
    </header>
  );
};

export default Header;
