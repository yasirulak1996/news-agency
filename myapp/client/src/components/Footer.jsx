import React from 'react';
import { Container } from 'react-bootstrap';



function Footer() {

  return (
    <Container fluid className="p-5 bg-primary text-white text-center">
  <p>thank u for visit our site</p>
  
  <div className="d-flex justify-content-center">
    <a href="/Aboutus" className="mx-3 text-white">About Us</a>
    <a href="/Contactus" className="mx-3 text-white">Contact Us</a>
    <a href="/privacypolicy" className="mx-3 text-white">Privacy Policy </a>
    <a href="/Termsofservice" className="mx-3 text-white">Terms of Service</a>
  </div>
</Container>
 

  );
}

export default Footer;