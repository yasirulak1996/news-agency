import React, { useState, useEffect } from 'react';
import { Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Image() {
  const [items, setItems] = useState([]); 
  const [isMobile, setIsMobile] = useState(false); // State to track if it's mobile view

  // Fetch data from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/items'); // Adjust the endpoint as needed
        const data = await response.json();
        const localNewsItems = data.slice(0, 12); // Limit to 12 items
        setItems(localNewsItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();

    // Detect window width to set mobile view
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Set the initial value

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Group items based on mobile or desktop view (2 or 3 items per group)
  const groupedItems = [];
  const groupSize = isMobile ? 2 : 3; // 2 items for mobile, 3 for larger screens
  for (let i = 0; i < items.length; i += groupSize) {
    groupedItems.push(items.slice(i, i + groupSize));
  }

  return (
    <Carousel 
      interval={2000}   // Slide every 2 seconds
      pause={false}     // Keep sliding even when hovered
      controls={true}   // Show next/prev buttons
      indicators={false} // Hide the slide indicators
      wrap={true}
    >
      {groupedItems.map((group, index) => (
        <Carousel.Item key={index}>
          <div style={{
            display: 'flex', 
            justifyContent: isMobile ? 'space-around' : 'space-between'
          }}>
            {group.map((item) => (
              <Card 
                key={item.id} 
                style={{
                  width: isMobile ? '48%' : '32%',  // Adjust width based on screen size
                  marginRight: isMobile ? '0' : '1%',
                  marginBottom: '15px'
                }}
              >
                <Card.Body>
                  <Card.Title>
                    <Link to={`/items/${item.id}`}>{item.name}</Link>
                  </Card.Title>
                  <Card.Img 
                    variant="top" 
                    src={item.image} 
                    alt={item.name} 
                    style={{ 
                      width: '100%', 
                      height: '200px', 
                      objectFit: 'cover' 
                    }} 
                  />
                </Card.Body>
              </Card>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Image;