import React from 'react';
import { Container } from 'react-bootstrap';
//Context
import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../store/currentUser';
//Components
import NavBar from '../layout/NavBar';
import CurrentUserCard from './CurrentUserCard';
import YourTeamCard from './YourTeamCard';

function Team() {
  const { state: currentUserState, getAllUsers } = useContext(
    CurrentUserContext
  );
  let user = currentUserState.user;
  let allUsers = currentUserState.users;

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <div>
          <h1 className='d-flex justify-content-center'>My Profile</h1>
        </div>
        <CurrentUserCard user={user} />
        <h1 className='d-flex justify-content-center'>My Team</h1>

        {/* {if user.is_artist === true } */}

        {currentUserState.users &&
          currentUserState.users.users.map((user) => {
            if (user.is_artist == true) {
              return <YourTeamCard user={user} />;
            }
          })}
        {/* {console.log(`this is the all users array: ${currentUserState}`)} */}
        {console.log(typeof currentUserState.users)}
      </Container>
    </>
  );
}

export default Team;
