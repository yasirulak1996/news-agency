const multer = require('multer');
const path = require('path');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');


const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Serve uploaded images from the client/src/assets directory
app.use('/assets', express.static(path.join(__dirname, '../client/src/assets')));

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Hashan1996@',
  database: 'news1'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Multer storage setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../client/src/assets/uploads/')); // Path to save images in client/src/assets
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
  }
});

const upload = multer({ storage });

// Routes to insert data with image uploads
app.post('/add-items', upload.single('image'), (req, res) => {
  const { name, description,category } = req.body;
  const image = req.file ? `/assets/uploads/${req.file.filename}` : null; // Save file path in DB

  const sqlQuery = 'INSERT INTO items (name, description, image,category) VALUES (?, ?, ?,?)';
  db.query(sqlQuery, [name, description, image,category], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Item added successfully!', id: result.insertId });
  });
});


app.get('/items', (req, res) => {
  const sql = 'SELECT * FROM items ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      res.status(500).send('An error occurred while fetching data.');
      return;
    }
    const updatedResults = results.map(item => ({
      ...item,
      image: item.image ? `http://localhost:5000${item.image}` : null // Add full URL to the image path
    }));

    res.json(updatedResults);
  });
});
app.get('/items/:id', (req, res) => {
  const itemId = req.params.id;
  
  db.query('SELECT * FROM items WHERE id = ?', [itemId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    
    if (results.length > 0) {
      // Modify the image path to include the full URL
      const updatedResults = results.map(item => ({
        ...item,
        image: item.image ? `http://localhost:5000${item.image}` : null // Full image URL
      }));
      
      res.json(updatedResults[0]); // Return the first updated item
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });
});

app.delete('/delete-item/:id', (req, res) => {
  const itemId = req.params.id;

  // Query to check if the item exists in the 'items' table
  const checkQuery = 'SELECT * FROM items WHERE id = ?';

  // Check if the id exists in the 'items' table
  db.query(checkQuery, [itemId], (err, results) => {
    if (err) {
      return res.status(500).send(err); // Handle any database errors
    }

    if (results.length > 0) {
      // If the item exists, delete it
      const deleteQuery = 'DELETE FROM items WHERE id = ?';
      db.query(deleteQuery, [itemId], (deleteErr) => {
        if (deleteErr) {
          return res.status(500).send(deleteErr); // Handle deletion error
        }
        return res.json({ message: 'Item deleted successfully from items table' });
      });
    } else {
      // If the item is not found
      return res.status(404).json({ message: 'Item not found in items table' });
    }
  });
});

app.put('/edit-item/:id', upload.single('image'), (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? `/assets/uploads/${req.file.filename}` : null;
  const itemId = req.params.id;

  // Check if the item exists in the 'items' table
  const checkQuery = 'SELECT * FROM items WHERE id = ?';

  db.query(checkQuery, [itemId], (err, results) => {
    if (err) {
      return res.status(500).send(err); // Handle any database errors
    }

    if (results.length > 0) {
      // If the item exists, update it
      const updateQuery = image 
        ? `UPDATE items SET name = ?, description = ?, image = ? WHERE id = ?`
        : `UPDATE items SET name = ?, description = ? WHERE id = ?`;

      const params = image 
        ? [name, description, image, itemId] 
        : [name, description, itemId];

      db.query(updateQuery, params, (updateErr) => {
        if (updateErr) {
          return res.status(500).send(updateErr); // Handle update error
        }
        return res.json({ message: 'Item updated successfully in items table' });
      });
    } else {
      // If the item is not found
      return res.status(404).json({ message: 'Item not found in items table' });
    }
  });
});

 const JWT_SECRET = 'your_jwt_secret_key';
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Hash the password before storing
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
    if (err) throw err;
    res.json({ message: 'User registered successfully' });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = bcrypt.compareSync(password, results[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: results[0].id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  });
});

// Protected route (example)
app.get('/dashboard', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token is not valid' });
    res.json({ message: 'Welcome to the dashboard' });
  });
});

// Dynamic port configuration

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});







