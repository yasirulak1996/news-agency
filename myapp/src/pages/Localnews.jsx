import React from 'react';
import Header from "../components/Header";
import Navigationbar from "../components/Navigationbar";

import { Container, Row, Col } from 'react-bootstrap';


function Localnews(){

    return(
       <>
        <Header/>
        <Navigationbar/>
     
 
   

            <Container className="mt-5">
            <Row>
              <Col sm={2}>
                <h3>Column 1</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                
              </Col>
              <Col sm={8}>
                <h3>Column 2</h3>
               
                
              </Col>
              <Col sm={2}>
                <h3>Column 3</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                
              </Col>
            </Row>
          </Container>

          </>
          
        );
    
    
    
    
    
        
    
    






}
export default Localnews;