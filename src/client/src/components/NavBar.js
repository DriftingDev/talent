import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand href='#home'>Talent</Navbar.Brand>
      <Nav className='ml-auto'>
        <Nav.Link href='#home'>Login</Nav.Link>
        <Nav.Link href='#features'>Sign Up</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
