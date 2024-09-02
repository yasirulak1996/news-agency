import React from 'react';
import Header from "../components/Header";
import Navigationbar from "../components/Navigationbar";

import { Container, Row, Col } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';


function Homepage(){

    return(
       <>
        <Header/>
        <Navigationbar/>
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">My Website</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Links to internal sections using anchor links */}
              <Nav.Link href="#home-section">Home</Nav.Link>
              <Nav.Link href="#features-section">Features</Nav.Link>
              <Nav.Link href="#pricing-section">Pricing</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
     
 
   

            <Container className="mt-5">
            <Row>
              <Col sm={2}>
                <h3>Column 1</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
              </Col>
              <Col sm={8}>
              <section id="home-section" style={{ padding: '100px 0', backgroundColor: '#f8f9fa' }}>
        <Container>
          <h2>Home Section</h2>
          <p>This is the home section of your page.</p>
        </Container>
      </section>

      <section id="features-section" style={{ padding: '100px 0', backgroundColor: '#e9ecef' }}>
        <Container>
          <h2>Features Section</h2>
          <p>This is the features section of your page.</p>
        </Container>
      </section>

      <section id="pricing-section" style={{ padding: '100px 0', backgroundColor: '#f8f9fa' }}>
        <Container>
          <h2>Pricing Section</h2>
          <p>This is the pricing section of your page.</p>
        </Container>
      </section>
      </Col>

              <Col sm={2}>
                <h3>Column 3</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
              </Col>
            </Row>
          </Container>

          </>
          
        );
    
    
    
    
    
        
    
    






}
export default Homepage;