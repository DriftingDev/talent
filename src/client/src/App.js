import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import SignUp from './components/SignUp';
//Router
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Container bg='dark' fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <NavBar />
      <Switch>
        <Route path='/' exact>
          <LoginForm />
        </Route>
        <Route path='/signup' exact>
          <SignUp />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
