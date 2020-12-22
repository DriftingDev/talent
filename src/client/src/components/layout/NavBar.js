import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions'


function NavBar() {
  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand as={Link} to='/'>
        Talent
      </Navbar.Brand>
      <AuthOptions />
    </Navbar>
  );
}

export default NavBar;
