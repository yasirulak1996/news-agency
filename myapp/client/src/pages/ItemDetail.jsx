import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import Navigationbar from "../components/Navigationbar";
import { Container, Card, Row, Col } from 'react-bootstrap';
import Footer from "../components/Footer";

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    // Fetch the item details from the server using the ID
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:5000/items/${id}`);
        const data = await response.json();
        console.log(data); // Log the fetched data
        setItem(data);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    

    fetchItem();
  }, [id]);

  if (!item) {
    return <p>Loading...</p>;
  }
  

  return (
    <>
    <Header />
      <Navigationbar />

     
      <Container className="mt-5">
        <Row>
          <Col sm={1}>
           
          </Col>
          <Col sm={9}>
          <Card className="my-4">
      <Card.Img variant="top" src={item.image} alt={item.name} />
      <Card.Body>
        <Card.Title>{item.name || 'No Name Available'}</Card.Title>
        <Card.Text>
          {item.description || 'No Description Available'}
        </Card.Text>
        <Card.Text>{item.category}</Card.Text>
        {!item.image && <p>No image available</p>}
      </Card.Body>
    </Card>
            
            
          </Col>
          <Col sm={2}>
           
          </Col>
        </Row>
      </Container>
      <Footer/>
      

      
  </>
    
  );
}

export default ItemDetail;