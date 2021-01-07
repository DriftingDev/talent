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

function Team() {
  const { state: currentUserState } = useContext(CurrentUserContext);
  const { state: CompanyState, fetchCurrentCompany } = useContext(
    CompanyContext
  );

  const history = useHistory();

  let currentUser = currentUserState.user;
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
    producers = CompanyState.currentCompany.users
      // .filter(
      //   // (user) => user
      //   (user) => user.companies
      // );
      .filter((user) =>
        user.companies.includes(CompanyContext.currentCompany._id)
      );

    console.log(producers);
  }

  return (
    <>
      <NavBar />
      <Container>
        <div>
          <h1 className='d-flex justify-content-center'>My Profile</h1>
        </div>
        <CurrentUserCard user={currentUser} />
        <h1 className='d-flex justify-content-center'>My Team</h1>

        {/* {currentUserState.users &&
          currentUserState.users.users.map((user) => {
            if (user.is_artist == true) {
              return <YourTeamCard user={user} />;
            }
          })} */}
      </Container>
    </>
  );
}

export default Team;
