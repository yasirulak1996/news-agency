import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Navigationbar from "../components/Navigationbar";
import Localc from "../components/Localc";
import CustomPagination from '../components/CustomPagination';
import { Container, Card, Row, Col } from 'react-bootstrap';
import '../components/ABC.css'
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";

function Homepage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const itemsPerPage = 10; // Number of items per page

  // Fetch data from the backend
  useEffect(() => {
    fetch('http://localhost:5000/items')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Calculate the current items to be displayed based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  return (
    <>
      <Header />
      <Navigationbar />
      
      <Container className="mt-5">
        <Row>
          <Col sm={3}>
          <Localc />
          </Col>
          <Col sm={6}>
          <div className='my class1'>
          {currentItems.map((item) => (
          <Card key={item.id} className="mb-4">
        <Card.Img variant="top" src={item.image} alt={item.name}
         className="card-img-custom"
         />
         </Card>))}
            



          </div>
          {currentItems.map((item) => (
          <Card key={item.id} className="mb-4">
         <Card.Img variant="top" src={item.image} alt={item.name}
         className="card-img-custom" 
         />
        <Card.Body className="card-body-custom">
        <Card.Title className="card-title-custom"><Link to={`/items/${item.id}`}>{item.name}</Link></Card.Title>
        <Card.Text>{item.category}</Card.Text>
        

          
        
          
        </Card.Body>
      
      </Card> ))}
          

          
            

            {/* Pagination component */}
            <CustomPagination
              totalItems={data.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </Col>
          <Col sm={3}>
            {/* You can add content here */}
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
}

export default Homepage;
