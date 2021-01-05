import { useContext, useEffect } from 'react'
import { Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthOptions from '../auth/AuthOptions'
import ArtistOptions from '../layout/ArtistOptions'
import ProducerOptions from '../layout/ProducerOptions'
import { CurrentUserContext } from '../../store/currentUser'
import { ShowContext } from '../../store/show'
import { CompanyContext } from '../../store/company'
import { useHistory } from 'react-router'


function NavBar() {

  const history = useHistory()
  const {state: currentUserState, dispatch: currentUserDispatch} = useContext(CurrentUserContext)
  const {state: showState, dispatch: showDispatch} = useContext(ShowContext)

  useEffect(() => {
    
  },[currentUserState, showState])

  const logoutFunc = () => {
    currentUserDispatch({
      type: "clearUser"
    })
    showDispatch({
      type: "clearShows"
    })
    localStorage.removeItem('token')
    history.push('/')
  }

  let dynamicURL;

  if(currentUserState.user){
    currentUserState.user.is_artist ?
    dynamicURL = 'artist' : dynamicURL = 'producer'
  }

  return (
    <Navbar bg='dark' variant='dark'>

      <Navbar.Brand onClick={() => history.push('/')}>
        Talent
      </Navbar.Brand>
      {currentUserState.user &&
      <NavDropdown title="ICON HERE" className='ml-auto'>
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
      {currentUserState.user ? 
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
