import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Navigationbar from "../components/Navigationbar";
import Brakingnews from "../components/Brakingnews";
import Tophits from "../components/Tophits";
import Gosipc from "../components/Gosipc";
import Image from "../components/Image";
import Educational from "../components/Educational";
import CustomPagination from '../components/CustomPagination';
import { Container, Card, Row, Col } from 'react-bootstrap';
import '../components/ABC.css';
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";

function Homepage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]); // Changed to 'items'
  const itemsPerPage = 10; // Number of items per page

  // Fetch data from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/items'); // Adjust the endpoint as needed
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        
        // Exclude items in specific categories
        const filteredItems = data.filter(item => 
          item.category !== 'Brakingnews' && 
          item.category !== 'Educational' && 
          item.category !== 'Tophits' && 
          item.category !== 'Gossip'
        );
        setItems(filteredItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
  
    fetchItems();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem); // Use 'items' instead of 'data'

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <Navigationbar />
      <Image 
        style={{ width: '100px', height: '100px', marginBottom: '15px' }} // Fixed size for Image component
      />  
      
      <Container className="mt-5">
  <Row>
    {/* Middle Column (Image + Cards) */}
    <Col sm={6} xs={{ order: 1 }} className="mb-4">
     
      {currentItems.map((item) => (
        <Card key={item.id} className="mb-4">
          <Card.Body className="d-flex align-items-center card-body-custom">
            <div className="d-flex align-items-center">
              <Card.Img 
                variant="top" 
                src={item.image} 
                alt={item.name} 
                className="card-img-custom" 
                style={{ height: "100px", width: "100px", marginRight: "15px" }} 
              />
              <div>
                <Card.Title className="card-title-custom">
                  <Link to={`/items/${item.id}`}>{item.name}</Link>
                </Card.Title>
                <Card.Text>{item.category}</Card.Text>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Col>

    {/* Left Column */}
    <Col sm={3} xs={{ order: 2 }} className="mb-4">
      <h5>Brakingnews</h5>
      <Brakingnews />
      <h5>Educational</h5>
      <Educational />
    </Col>

    {/* Right Column */}
    <Col sm={3} xs={{ order: 3 }}>
      <h5>Top hits</h5>
      <Tophits />
      <h5>Gossip</h5>
      <Gosipc />
    </Col>
  </Row>

        <CustomPagination
          totalItems={items.length} // Use 'items.length' instead of 'data.length'
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Container>

      <Footer />
    </>
  );
}

export default Homepage;


