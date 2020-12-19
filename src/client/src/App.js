import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './App.scss';
//Components
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import SignUp from './components/SignUp';
import NavTabs from './components/NavTabs';
//Screens
import ArtistList from './screens/ArtistList';
//Router
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ArtistScreen from './screens/ArtistScreen';

function App() {
  return (
    <Router>
      <NavBar fixed='top' />
      <Container bg='dark' fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Route path='/' component={LoginForm} exact />
        <Route path='/signup' component={SignUp} exact />
        <Route path='/artists' component={ArtistList} exact />
        <Route path='/artists/:id' component={ArtistScreen} />
      </Container>
      <NavTabs />
    </Router>
  );
}

export default App;
