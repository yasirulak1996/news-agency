import React, { useState, useEffect } from 'react';
import { Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link component

function Image() {
  const [items, setItems] = useState([]); // Use 'items' to store the fetched data

  // Fetch data from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/items'); // Adjust the endpoint as needed
        const data = await response.json();

        // Limit the results to 5 items
        const localNewsItems = data.slice(0, 5); // Show only the first 5 items

        setItems(localNewsItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []); // Empty dependency array ensures it runs once after the component mounts

  return (
    <Carousel 
      interval={2000}  // Slide every 1 second (adjust this value for speed)
      pause={false}    // Keep sliding even when hovered
      controls={false} // Optional: Hide next/prev buttons
      indicators={false} // Optional: Hide the slide indicators
    >
      {items.map((item) => (
        <Carousel.Item key={item.id}>
          <Card className="mb-4">
            <Card.Body className="card-body-custom">
              <Card.Title className="card-title-custom">
                <Link to={`/items/${item.id}`}>{item.name}</Link>
              </Card.Title>
              <Card.Img 
                variant="top" 
                src={item.image} 
                alt={item.name} 
                className="card-img-custom1"
              />
            </Card.Body>
          </Card>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Image;