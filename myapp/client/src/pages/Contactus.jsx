import Header from "../components/Header";
import Navigationbar from "../components/Navigationbar";
import { Container, Row, Col } from 'react-bootstrap';
import Footer from "../components/Footer";

function Contactus() {
 
  return (
    <>
      <Header />
      <Navigationbar />
      <Container className="mt-5">
        <Row>
          <Col sm={1}>
         
          </Col>
          <Col sm={9}>
          <h2>Contact Us</h2>
          Contact Us

We'd love to hear from you! Whether you have questions, feedback, or inquiries about Sinhanews, feel free to reach out using any of the options below.<br/>

<h4>How to Reach Us:<br/></h4>

Email: For general inquiries, you can email us at sinhanews123@gmail.com. We aim to respond to all emails during business hours.<br/>

Phone: Have an urgent matter? Give us a call at 0753641213 during our business hours. <br/>

Social Media: Connect with us on social media:<br/>
Facebook: [Your Social Media Handle or Link] <br/>

Our Address: For in-person meetings or mail correspondence, you can find us at:
Nikaweeratiya, Sri Lanka<br/>

We value your feedback and are always here to help with any questions or concerns.


Thank you for being part of the Sinhanews community!<br/>
teachnical support- yasiru lakshan 0753641213<br/>
news content problems-pasindu madusanka 0751891213<br/>

Sincerely,<br/>
<b>The Sinhanews Team</b> <br/>
          
           
          </Col>
          <Col sm={2}>
           
          </Col>
        </Row>
      </Container>

      
   
      <Footer/>
    </>
  );
}





export default Contactus;