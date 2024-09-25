import React from 'react';
import Header from "../components/Header";
import Navigationbar from "../components/Navigationbar";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

import { Container, Row, Col } from 'react-bootstrap';


function Login(){

    return(
       <>
        <Header/>
        <Navigationbar/>
     
 
   

            <Container className="mt-5">
            <Row>
              <Col sm={2}>
               
               
              </Col>
              <Col sm={8}>
                
                <div>
                <h1>Login</h1>
                 <LoginForm />
                 <RegistrationForm/>
                 </div>
                
              </Col>
              <Col sm={2}>
               
                
              </Col>
            </Row>
          </Container>

          </>
          
        );
    


}
export default Login;