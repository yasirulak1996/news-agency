import React, { useState } from 'react';

function AddItemForm() {
  // State to hold form data
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the form data
    const newItem = {
      name,
      description,
      image,
    };

    try {
      // Send a POST request to the backend
      const response = await fetch('http://localhost:5000/add-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      // Check if the request was successful
      if (response.ok) {
        const data = await response.json();
        alert('Item added successfully!');
        // Reset form fields
        setName('');
        setDescription('');
        setImage('');
      } else {
        alert('Failed to add item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default AddItemForm;