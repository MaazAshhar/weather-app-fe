import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import style from "./styles/Navbar.module.css";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const NavigationBar = ({modal, blur}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove('jwt-token');
    navigate('/login');
  }
  return (
    <Navbar expand="lg" className={`${(modal)?blur:''} bg-body-tertiary`}>
      <Container fluid>
        <Navbar.Brand href="#">Weather App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className={`${style.NavBarScroll} me-auto my-2 my-lg-0`}
            navbarScroll
          >
          </Nav>
          <Button className='bg-secondary ms-1' onClick={handleLogout}>Log out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;