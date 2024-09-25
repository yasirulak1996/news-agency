import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap'; // Import LinkContainer

function Navigationbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>news</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* Use LinkContainer for React Router links */}
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/Localnews">
            <Nav.Link>Local News</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/Foreginnews">
            <Nav.Link>Foreign News</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/sports">
            <Nav.Link>Sports</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Political">
            <Nav.Link>Political News</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Gossip">
            <Nav.Link>Gossip</Nav.Link>
            </LinkContainer>


            <LinkContainer to="/Login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigationbar;