import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link component

function Localc() {
  const [items, setItems] = useState([]); // Use 'items' to store the fetched data

  // Fetch data from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/items'); // Adjust the endpoint as needed
        const data = await response.json();
        
        // Filter only the items in the 'local-news' category
        const localNewsItems = data.filter(item => item.category === 'local-news');
        setItems(localNewsItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []); // Empty dependency array ensures it runs once after the component mounts

  return (
    <>
      {items.map((item) => (
        <Card key={item.id} className="mb-4">
          <Card.Body className="card-body-custom">
            <Card.Title className="card-title-custom">
              <Link to={`/items/${item.id}`}>{item.name}</Link>
            </Card.Title>
            <Card.Text>{item.category}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default Localc;