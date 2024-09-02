import React from 'react';
import Header from "../components/Header";
import Navigationbar from "../components/Navigationbar";

import { Container, Row, Col } from 'react-bootstrap';


function Foreginnews(){

    return(
       <>
        <Header/>
        <Navigationbar/>
     
 
   

            <Container className="mt-5">
            <Row>
              <Col sm={2}>
                <h3>Column 1</h3>
               
              </Col>
              <Col sm={8}>
                <h3>Column 2</h3>
                
              </Col>
              <Col sm={2}>
                <h3>Column 3</h3>
                
              </Col>
            </Row>
          </Container>

          </>
          
        );
    
    
    
    
    
        
    
    






}
export default Foreginnews;