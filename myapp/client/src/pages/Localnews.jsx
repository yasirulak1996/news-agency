import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import Header from "../components/Header";
import Navigationbar from "../components/Navigationbar";
import CustomPagination from '../components/CustomPagination';
import { Container, Card, Row, Col } from 'react-bootstrap';
import Footer from "../components/Footer";
import Brakingnews from '../components/Brakingnews'; 
import Politicalc from '../components/Politicalc';
import Foregnnewsc from '../components/Foregnnewsc';
import Gosipc from '../components/Gosipc';


function Localnews() {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const itemsPerPage = 10; 

  // Fetch data from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/items'); 
        const data = await response.json();
        
        // Filter only the items in the 'local-news' category
        const localNewsItems = data.filter(item => item.category === 'local-news');
        setItems(localNewsItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  // Calculate the current items to be displayed based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

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
            <h5>Brakingnews</h5>
            <Brakingnews />
            <h5>political news</h5>
            <Politicalc />
          </Col>

          {/* Middle Column */}
          <Col sm={6}>
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

          {/* Right Column */}
          <Col sm={3}>
            <h5>Foregn news</h5>
            <Foregnnewsc />
            <h5>Gossip</h5>
            <Gosipc />
          </Col>
        </Row>

        <CustomPagination
          totalItems={items.length} 
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Container>
      <Footer />
    </>
  );
}

export default Localnews;