import React from 'react';
import Header from "../components/Header";
import Navigationbar from "../components/Navigationbar";
import AddItemForm from "../components/AddItemForm";


import { Container, Row, Col } from 'react-bootstrap';


function Dashboard(){

    return(
       <>
        <Header/>
        <Navigationbar/>
     
 
   

            <Container className="mt-5">
            <Row>
              <Col sm={2}>
               
               
              </Col>
              <Col sm={8}>
              <AddItemForm/>
                
                
                
              </Col>
              <Col sm={2}>
               
                
              </Col>
            </Row>
          </Container>

          </>
          
        );
    


}
export default Dashboard;