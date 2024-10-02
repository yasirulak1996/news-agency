import React, { useState, useEffect } from 'react';

function AddItemForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('local-news');
  const [items, setItems] = useState([]);
  const [editMode, setEditMode] = useState(false); // Track if editing
  const [editItemId, setEditItemId] = useState(null); // Track item being edited

  // Fetch existing items
  useEffect(() => {
    fetch('http://localhost:5000/items') // Replace with the appropriate fetch URL
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Function to handle form submission (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('category', category);

    try {
      let url = '';
      let method = 'POST';

      if (editMode) {
        url = `http://localhost:5000/edit-item/${editItemId}`; // Modify with the appropriate edit route
        method = 'PUT';
    } else {
        url = 'http://localhost:5000/add-items';
        method = 'POST'; 
    }

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert(editMode ? 'Item updated successfully!' : 'Item added successfully!');
        resetForm();
        fetchItems(); // Reload items after add or edit
      } else {
        alert('Failed to save item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to reset the form fields
  const resetForm = () => {
    setName('');
    setDescription('');
    setImage("");
    setCategory('local-news');
    setEditMode(false);
    setEditItemId(null);
  };

  // Function to handle edit
  const handleEdit = (item) => {
    setName(item.name);
    setDescription(item.description);
    setCategory(item.category);
    setEditMode(true);
    setEditItemId(item.id); // Use the actual item ID from the DB
  };

  // Function to handle delete
  const handleDelete = async (id, category) => {
    try {
      // Include the category in the URL
      const response = await fetch(`http://localhost:5000/delete-item/${id}`, { 
        method: 'DELETE' 
      });
  
      if (response.ok) {
        alert('Item deleted successfully!');
        fetchItems(); // Reload items after delete
      } else {
        alert('Failed to delete item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to fetch items
  const fetchItems = () => {
    fetch('http://localhost:5000/items') // Fetch existing items again
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching data:', error));
  };

  return (
    <div>
      <h2>{editMode ? 'Edit News Item' : 'Add News Item'}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name:</label>
          <textarea
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', height: '100px' }}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: '100%', height: '300px' }}
          />
        </div>
        <div>
          <label>Upload Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required={!editMode} // Don't require image during edit
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="local-news">Local News</option>
            <option value="sport">Sport</option>
            <option value="foreign-news">Foreign News</option>
            <option value="politicalnews">Political News</option>
            <option value="Gossip">Gossip</option>
            <option value="Brakingnews">Braking news</option>
            <option value="Tophits">Top hits</option>
            <option value="Educational">Educational</option>
            <option value="Biznews">Biznews</option>

          </select>
        </div>
        <button type="submit">{editMode ? 'Update Item' : 'Add Item'}</button>
        {editMode && <button onClick={resetForm}>Cancel Edit</button>}
      </form>

      <h2>Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.category}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddItemForm;