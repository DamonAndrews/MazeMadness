import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { Link, Navigate } from 'react-router-dom';
import { QUERY_SCORES } from '../utils/queries';

const Scores = () => {

  const { loading } = useQuery(QUERY_SCORES);
  const scores = [{_id:"630a5a4b5d1bbb86bff9edbf", userName:"Jeff", userScore:100},{_id:"630a5a4b5d1bbb86bff9edbf", userName:"Damon", userScore:100}, {_id:"630a5a4b5d1bbb86bff9edbf", userName:"Jenny", userScore:100},
  {_id:"630a5a4b5d1bbb86bff9edbf", userName:"Stephen", userScore:100},{_id:"630a5a4b5d1bbb86bff9edbf", userName:"Corey", userScore:100}, {_id:"630a5a4b5d1bbb86bff9edbf", userName:"Serena", userScore:100}]

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
  <div id="flexBox">
    <main>
    <h1 id="flexBox">Leaderboard:</h1>
      <div className="flex-row my-4">
        {scores &&
         scores.map((scores) => (
          <div key={scores._id} className="col-12 mb-3 pb-3">
            <div className="p-3 bg-dark text-light">
                <h2 id="flexBox" className="card-header">
                  {scores.userName} scored{' '} {scores.userScore}
                </h2>
            </div>
          </div>
          ))}
      </div>
      <div>
      <Link to="/game">
        <button  id="leaderBoardButton" class="btn btn-lg btn-light m-2" >Start New Game</button>
      </Link>
      </div>
    </main>
  </div>
  );
};

export default Scores;
