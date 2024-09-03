import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Navigationbar from "../components/Navigationbar";
import CustomPagination from '../components/CustomPagination';
import { Container, Card } from 'react-bootstrap';

function Homepage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const itemsPerPage = 2; // Number of items per page

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
      <Container>
        {/* Render current items */}
        {currentItems.map((item) => (
          <Card key={item.id} className="mb-4">
            <Card.Img variant="top" src={item.image} alt={item.name} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}

        {/* Pagination component */}
        <CustomPagination
          totalItems={data.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Container>
    </>
  );
}

export default Homepage

