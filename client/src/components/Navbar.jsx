import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setUnauthenticated } from '../redux/AuthSlice';

const NavbarComponent = () => {
  const isAuthenticated = useSelector(selectAuthState);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setUnauthenticated);
  };
  return (
    <>
      <Navbar collapseOnSelect expand='lg' className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand href='/'>Notes...</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='ms-auto'>
              {isAuthenticated ? (
                <a href='/login' onClick={handleLogout} className='nav-link'>
                  Logout
                </a>
              ) : (
                <>
                  <Nav.Link as={Link} to='/login'>
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to='/signup'>
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
