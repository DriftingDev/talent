import React from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router';
//Context
import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../store/currentUser';
import { CompanyContext } from '../../store/company';

//Components
import NavBar from '../layout/NavBar';
import CurrentUserCard from './CurrentUserCard';
import YourTeamCard from './YourTeamCard';
import Loading from '../layout/Loading';

function Team() {
  const { state: currentUserState } = useContext(CurrentUserContext);
  const { state: CompanyState, fetchCurrentCompany } = useContext(
    CompanyContext
  );

  const history = useHistory();

  let currentUser;
  let producers;

  useEffect(() => {
    if (
      CompanyState.currentCompany === null &&
      localStorage.getItem('currentCompany')
    ) {
      fetchCurrentCompany();
    } else if (
      CompanyState.currentCompany === null &&
      !localStorage.getItem('currentCompany')
    ) {
      history.push('/companies');
    }
  }, [CompanyState]);

  if (CompanyState.currentCompany != null) {

    currentUser = CompanyState.currentCompany.users
      .filter(user => user._id === currentUserState.user._id);

    producers = CompanyState.currentCompany.users.filter(
      (user) =>
        user.is_artist === false &&
        user._id !== currentUserState.user._id
    );
  }

  return (
    <>
      <NavBar />
      {CompanyState.currentCompany != null ?
      <Container>
        <div>
          <h1 className='d-flex justify-content-center'>My Profile</h1>
        </div>
        <CurrentUserCard user={currentUser[0]} />
        <h1 className='d-flex justify-content-center'>My Team</h1>

        {producers &&
          producers.map((user) => {
            return <YourTeamCard user={user} />;
          })}
      </Container>
      :
      <Loading/>
      }
    </>
  );
}

export default Team;
