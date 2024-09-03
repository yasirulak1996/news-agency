const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000; // You can use any port

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost', // Database host
  user: 'root', // Database user
  password: '', // Database password
  database: 'your_database_name' // Database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = results[0];

    // Check if password matches
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    } else {
      res.status(400).json({ message: 'Incorrect password' });
    }
  });
});




// Sample route to fetch data
app.get('/items', (req, res) => {
  const sqlQuery = 'SELECT * FROM items'; // Modify this query according to your table structure
  db.query(sqlQuery, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});


app.post('/add-item', (req, res) => {
  const { name, description, image } = req.body;
  const sqlQuery = 'INSERT INTO items (name, description, image) VALUES (?, ?, ?)';
  db.query(sqlQuery, [name, description, image], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Item added successfully!', id: result.insertId });
  });
});





app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});