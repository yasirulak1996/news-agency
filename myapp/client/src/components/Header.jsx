import React from 'react';
import logo from '../assets/222.png';
import AnimatedText from "../components/AnimatedText";
import '../components/ABC.css';
import { Container, Row, Col } from 'react-bootstrap';


function Header() {

  return (
    <Container fluid className="p-3 bg-primary text-white">
  <Row className="align-items-center">
    {/* Logo on the left (will move to the top on mobile) */}
    <Col xs={12} md={2} className="logo-container text-left">
      <img 
        src={logo} 
        alt="Logo" 
        className="logo-image"
      />
    </Col>

    {/* Title and animated text in the center */}
    <Col xs={12} md={8} className="text-center">
      <h1 className="animated-color">සිංහnews</h1>
      <AnimatedText />
    </Col>
  </Row>
</Container>
 

  );
}

export default Header;