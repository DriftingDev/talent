import { useContext, useEffect } from 'react';
import { Button, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthOptions from '../auth/AuthOptions';
import ArtistOptions from '../layout/ArtistOptions';
import ProducerOptions from '../layout/ProducerOptions';
import logo from '../../data/talentlogo2.png'
import { TiThMenu } from 'react-icons/ti'
import { CurrentUserContext } from '../../store/currentUser';
import { ShowContext } from '../../store/show';
import { CompanyContext } from '../../store/company';
import { useHistory } from 'react-router';
import { VenueContext } from '../../store/venue';

import { BsPersonFill } from 'react-icons/bs';

function NavBar() {
  const history = useHistory();
  const { state: currentUserState, dispatch: currentUserDispatch } = useContext(
    CurrentUserContext
  );
  const { state: showState, dispatch: showDispatch } = useContext(ShowContext);
  const { state: companyState, dispatch: companyDispatch, fetchCurrentCompany } = useContext(CompanyContext);
  const { dispatch: venueDispatch } = useContext(VenueContext);

  useEffect(() => {
    if(!companyState.currentCompany && localStorage.getItem('currentCompany')){
      fetchCurrentCompany()
    }
  }, [currentUserState, companyState]);

  const logoutFunc = () => {
    currentUserDispatch({
      type: 'clearUser',
    });
    showDispatch({
      type: 'clearShows',
    });
    companyDispatch({
      type: 'clearCompanies',
    });
    venueDispatch({
      type: 'clearVenues',
    });
    localStorage.removeItem('token');
    localStorage.removeItem('currentCompany');
    history.push('/');
  };
  

  return (
    <Navbar bg='dark' variant='dark'>

      <Navbar.Brand onClick={() => history.push('/')}>
      <img src={logo} alt="Logo"
        height="35"
        className="d-inline-block align-top invert" /> {companyState.currentCompany && <Button className="d-inline-block align-bottom">{'  '}{companyState.currentCompany.name} </Button>}
      </Navbar.Brand>
      {(currentUserState.user && localStorage.getItem('currentCompany')) &&
      <NavDropdown alignRight title={<TiThMenu size={28} />} className='ml-auto'>
        <NavDropdown.Item onClick={() => history.push(`/team`)}>
          Team
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => history.push(`/companies`)}>
          Companies
        </NavDropdown.Item>
        <NavDropdown.Item onClick={logoutFunc}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
      }
      {/* TABS RENDERING */}
      {(currentUserState.user && localStorage.getItem('currentCompany')) ? 
        currentUserState.user.is_artist ?
        <ArtistOptions /> 
        :
        <ProducerOptions />
      :
      <AuthOptions />
      }

    </Navbar>
  );
}

export default NavBar;
