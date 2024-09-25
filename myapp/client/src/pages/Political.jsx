import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Navigationbar from "../components/Navigationbar";
import CustomPagination from '../components/CustomPagination';
import { Container, Card, Row, Col } from 'react-bootstrap';
import Footer from "../components/Footer";

function Political() {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]); // Use 'items' to store the fetched data
  const itemsPerPage = 10; // Number of items per page

  // Fetch data from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/items'); // Adjust the endpoint as needed
        const data = await response.json();
        
        // Filter only the items in the 'sport' category
        const sportItems = data.filter(item => item.category === 'politicalnews');
        setItems(sportItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []); // Empty dependency array ensures it runs once after the component mounts

  // Calculate the current items to be displayed based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem); // Use 'items' here

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // DescriptionCard component to display each item
  const DescriptionCard = ({ item }) => {
    const [showDescription, setShowDescription] = useState(false);
  
    const toggleDescription = () => {
      setShowDescription(!showDescription);
    };

    return (
      <Card key={item.id} className="mb-4">
        <Card.Img
          variant="top"
          src={item.image}
          alt={item.name}
          className="card-img-custom"
        />
        <Card.Body className="card-body-custom">
          <Card.Title className="card-title-custom">{item.name}</Card.Title>

          {showDescription && (
            <Card.Text className="card-text-custom">{item.description}</Card.Text>
          )}

          <button onClick={toggleDescription} className="btn btn-primary">
            {showDescription ? 'click for Hide' : 'click for Read'}
          </button>
        </Card.Body>
      </Card>
    );
  };

  return (
    <>
      <Header />
      <Navigationbar />
      
      <Container className="mt-5">
        <Row>
          <Col sm={1}>
            {/* You can add content here */}
          </Col>
          <Col sm={9}>
            {/* Loop through the current items and display them */}
            {currentItems.map((item) => (
              <DescriptionCard key={item.id} item={item} />
            ))}

            {/* Pagination component */}
            <CustomPagination
              totalItems={items.length} // Use 'items' here
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </Col>
          <Col sm={2}>
            {/* You can add content here */}
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
}








export default Political;