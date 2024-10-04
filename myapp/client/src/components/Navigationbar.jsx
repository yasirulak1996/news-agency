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
            <Nav.Link style={{ color: 'white' }}>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/Localnews">
            <Nav.Link style={{ color: 'white' }}>Local News</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/Foreginnews">
            <Nav.Link style={{ color: 'white' }}>Foreign News</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/sports">
            <Nav.Link style={{ color: 'white' }}>Sports</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/Political">
            <Nav.Link style={{ color: 'white' }}>Political News</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/Gossip">
            <Nav.Link style={{ color: 'white' }}>Gossip</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/Login">
            <Nav.Link style={{ color: 'white' }}>Login</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>

      {/* Inline CSS for hover effect */}
      <style jsx>{`
        .nav-link:hover {
          color: rgb(0, 0, 139) !important; /* Dark Blue on hover */
        }
      `}</style>
    </Navbar>
  );
}

export default Navigationbar;