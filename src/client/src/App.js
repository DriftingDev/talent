import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <Container bg='dark' fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <NavBar />
      <LoginForm />
    </Container>
  );
}

export default App;
