import React from 'react';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';
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
  }, [CompanyState]);
  
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
        <Row className="bg-dark p-2 my-2 rounded">
        <div>
          <h1 className='d-flex justify-content-center'>My Profile</h1>
        </div>
        <CurrentUserCard user={currentUser[0]} />
        </Row>

        <Row>
          <Col><h1>My Team</h1></Col>
          { !currentUserState.user.is_artist &&
            <Col>
            <Button 
            onClick={() => {history.push('/team/create')}}
            className='float-right'>
              Add Team Member
            </Button>
            </Col>
          }
        </Row>
        {producers.length > 1 ? 
          producers.map((user) => {
            return <YourTeamCard user={user} />;
          })
          :
          <Alert variant='info'>
            <h4 className='text-center text-dark'>
              No producers have been attached to this company.
            </h4>
          </Alert>
          }
      </Container>
      :
      <Loading/>
      }
    </>
  );
}

export default Team;
