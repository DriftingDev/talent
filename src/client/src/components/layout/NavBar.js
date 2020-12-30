import { useContext, useEffect } from 'react'
import { Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthOptions from '../auth/AuthOptions'
import ArtistOptions from '../layout/ArtistOptions'
import ProducerOptions from '../layout/ProducerOptions'
import { CurrentUserContext } from '../../store/currentUser'
import { useHistory } from 'react-router'


function NavBar() {

  const history = useHistory()
  const {state: currentUserState, dispatch} = useContext(CurrentUserContext)

  useEffect(() => {
    
  },[currentUserState])

  const logoutFunc = () => {
    dispatch({
      type: "clearUser"
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
        <NavDropdown.Item onClick={() => history.push(`/${dynamicURL}/team`)}>
          Team
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => history.push(`/${dynamicURL}/companies`)}>
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
