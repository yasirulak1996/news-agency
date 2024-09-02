import React from 'react';
import { Container } from 'react-bootstrap';
//import './Header.css'


function Header() {

  return (
    <Container fluid className="p-5 bg-primary text-white text-center">
    <h1>My First Bootstrap Page</h1>
    <p>Resize this responsive page to see the effect!</p>
  </Container>
 

  );
}

export default Header;