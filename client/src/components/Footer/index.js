import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { MDBFooter, MDBContainer} from 'mdb-react-ui-kit';



const Footer = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return ( 

<MDBFooter className='text-center text-white' style={{ backgroundColor: '#0a4275' }}>
      <MDBContainer className='p-4 pb-0'>
        <section className=''>
          <p className='d-flex justify-content-center align-items-center'> 
            <span className='me-3'>Tired of running the Maze Runner</span>
              { <div> 
          Auth.loggedIn() ? (     
          <>          
          <Link to="/gameover">
          <button className="btn btn-lg btn-light m-2" id="leaderBoardButton">End Game</button>
          </Link>
            </>
          ) : (
            <>           
            </>           
          )           
        </div>
};</p>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2022 Copyright:
        <a href className='text-white'>Ball Runner brought to you by Team 1</a>
      </div>
      <div>
          {Auth.loggedIn() ? (     
          <>          
          <Link to="/login">
          <button className="btn btn-lg btn-light m-2" id="leaderBoardButton" onClick={logout}>Logout</button>
          </Link>
            </>
          ) : (
            <>           
            </>          
          )}           
        </div>
    </MDBFooter>
  );}

  export default Footer; 


