
import Header from "../components/Header";
import Navigationbar from "../components/Navigationbar";
import { Container, Row, Col } from 'react-bootstrap';
import Footer from "../components/Footer";

function Aboutus() {
 
  return (
    <>
      <Header />
      <Navigationbar />
      <Container className="mt-5">
        <Row>
          <Col sm={1}>
         
          </Col>
          <Col sm={9}>
          <h2>About Us</h2>

          Welcome to www.sinhanews.com, your go-to source for the latest news and gossip. We are dedicated to delivering high-quality, reliable, and engaging content that keeps you informed and empowered.

Founded in 2024, Sinhanews has rapidly grown to become a trusted name in news reporting. Our mission is to provide daily updates tailored specifically to news readers. We believe in accuracy, inclusivity, and strive to present our content in a way that is both informative and entertaining.

Whether you're here for breaking news or the latest gossip, we are committed to delivering the best experience possible. We are always evolving and continuously updating our platform to ensure it meets the needs of our readers.

We value your feedback and welcome any suggestions to make Sinhanews a place you love to visit. Thank you for being part of our community!

If you have any questions or comments, feel free to reach out to us at sinhanews123@gmail.com.

<br/>
Sincerely,
<br/>
The sinhanews Team


          
           
          </Col>
          <Col sm={2}>
           
          </Col>
        </Row>
      </Container>

      
   
      <Footer/>
    </>
  );
}





export default Aboutus;